import { FlatList, Text, TouchableOpacity, View } from 'react-native';
// Components
import { LayoutBackgroundMedium } from '../../../components/layout/_layoutBackgroundMedium';
import { ButtonBack } from '../../../components/button/ButtonBack';
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { pollRef, db } from './../../../config/firebase';
import { useEffect, useState } from 'react';
import activities from './../../../assets/data/activities.json';
import { useAuth } from '../../../config/auth/authContext';

export function Poll({ route }) {
    const { groupId, groupName, groupMembers, groupAdmins } = route.params;
    const [pollData, setPollData] = useState([]);

    const { user, fetchCurrentUserData } = useAuth();
    const [currentUserData, setCurrentUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const currentUserFetchRef = await fetchCurrentUserData(user.userId);
                setCurrentUserData(currentUserFetchRef);
            } catch (error) {
                console.log('Fetch Error: ', error);
            }
        }
        fetchData();
    }, []);

    const fetchPolls = async () => {
        try {
            const pollDocRef = doc(pollRef, groupId);
            const pollDoc = await getDoc(pollDocRef);

            if (pollDoc.exists()) {
                const data = pollDoc.data();
                const dates = data.dates || [];

                const allPolls = [];
                for (const date of dates) {
                    const dateCollectionRef = collection(pollDocRef, date);
                    const datePollsSnapshot = await getDocs(dateCollectionRef);
                    const datePolls = datePollsSnapshot.docs.map(doc => doc.data());
                    allPolls.push(...datePolls);
                }

                setPollData(allPolls);
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Poll Fetch Error:', error);
        }
    };

    useEffect(() => {
        fetchPolls();
    }, [groupId]);

    // Function to get activity name from the activity ID
    const getActivityName = (activityId) => {
        const activity = activities.find(activity => activity.id === activityId);
        return activity ? activity.name : 'Unknown Activity';
    };

    // Function to handle voting
    const handleVote = async (activityId, pollId, date) => {
        try {
            console.log(`Voting for activityId: ${activityId}, pollId: ${pollId}, date: ${date}`);
            const pollDocRef = doc(pollRef, groupId);
            const dateCollectionRef = collection(pollDocRef, date);
            const pollActivityDocRef = doc(dateCollectionRef, pollId);

            const pollActivityDoc = await getDoc(pollActivityDocRef);
            const pollData = pollActivityDoc.data();

            if (!pollData.votes) {
                pollData.votes = [];
            }

            if (pollData.votes.includes(currentUserData.userId)) {
                await updateDoc(pollActivityDocRef, {
                    votes: arrayRemove(currentUserData.userId)
                });
                console.log('Vote removed successfully');
            } else {
                await updateDoc(pollActivityDocRef, {
                    votes: arrayUnion(currentUserData.userId)
                });
                console.log('Vote added successfully');
            }

            fetchPolls();  // Refetch polls after voting
        } catch (error) {
            console.error('Vote Error:', error);
        }
    };

    // Function to calculate vote percentage
    const calculatePercentage = (votes) => {
        return (votes.length / groupMembers.length) * 100;
    };

    // Function to determine the winning activity
    const getWinningActivity = () => {
        let maxVotes = 0;
        let winningActivity = null;

        pollData.forEach(poll => {
            if (poll.votes && poll.votes.length > maxVotes) {
                maxVotes = poll.votes.length;
                winningActivity = poll;
            }
        });

        // Check if the winning activity has more than 50% votes
        if (maxVotes / groupMembers.length > 0.5) {
            return winningActivity;
        }

        return null;
    };

    // Function to plan the winning activity
    const planActivity = async () => {
        const winningActivity = getWinningActivity();
        if (winningActivity) {
            const planData = {
                groupId: groupId,
                activityId: winningActivity.activityId,
                date: winningActivity.date,
                createdBy: currentUserData.userId,
                timestamp: new Date()
            };

            try {
                await setDoc(doc(db, 'plans', `${groupId}_${winningActivity.date}`), planData);
                console.log('Activity planned successfully');
            } catch (error) {
                console.error('Planning Error:', error);
            }
        } else {
            console.log('No activity has more than 50% votes');
        }
    };

    // Check if the current user is an admin
    const isAdmin = currentUserData && groupAdmins && groupAdmins.includes(currentUserData.userId);

    return (
        <LayoutBackgroundMedium>
            <View className="self-start my-4">
                <ButtonBack />
            </View>

            <View className="m-6 rounded-md p-6 bg-white">
                <Text></Text>
                <FlatList
                    data={pollData}
                    keyExtractor={item => item.pollId}
                    renderItem={({ item }) => {
                        const votePercentage = calculatePercentage(item.votes || []);
                        return (
                            <View>
                                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>
                                    {getActivityName(item.activityId)}
                                </Text>
                                <View className="flex-row justify-between items-center">
                                    <View className="flex-[1] rounded-full my-4 mr-6 h-3 bg-gray">
                                        <View className="absolute rounded-full h-3 bg-secondary-light" style={{ width: `${votePercentage}%` }}></View>
                                    </View>
                                    <TouchableOpacity onPress={() => handleVote(item.activityId, item.pollId, item.date)}>
                                        <View className="rounded-full border-[6px] border-secondary w-5 h-5"></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />

                {isAdmin && (
                    <View className="mt-10">
                        <TouchableOpacity onPress={planActivity}>
                            <View className="rounded-md p-3 bg-primary">
                                <Text className="text-base text-center text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Plan</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </LayoutBackgroundMedium>
    );
}
