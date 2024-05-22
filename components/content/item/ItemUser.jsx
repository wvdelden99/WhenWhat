import { useEffect, useState } from 'react';
import { arrayUnion, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../assets/styles/Styles';
// Components
import { LoadingAnimationSecondary } from '../../animations/LoadingAnimationSecondary';


export function ItemUser({item, currentUserData, userRef, user, usersData}) {
    const [loading, setLoading] = useState(false);
    const [sendRequest, setSendRequest] = useState([]);

    useEffect(() => {
        if (currentUserData) {
            const fetchSendRequests = async () => {
                const q = query(userRef, where('userId', '==', user.userId));
                const querySnapshot = await getDocs(q);
                const userData = querySnapshot.docs[0].data();
                setSendRequest(userData.friendRequests || []);
            };
    
            fetchSendRequests();
        }
    }, [currentUserData]);
    

    // Send Friend Request
    const sendFriendRequest = async (recipientUserId) => {
        try {
            setLoading(true);
            const recipientDocRef = doc(userRef, recipientUserId);

            if (sendRequest.includes(recipientUserId)) {
                return;
            }

            const recipientDoc = await getDoc(recipientDocRef);
            const recipientData = recipientDoc.data();
            if (recipientData && recipientData.friendRequests && recipientData.friendRequests.includes(user.userId)) {
                return;
            }

            await updateDoc(recipientDocRef, {
                friendRequests: arrayUnion(user.userId)
            });
            setSendRequest([...sendRequest, recipientUserId]);
            setLoading(false);
        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Check if send or recieved
    const hasSendRequest = sendRequest.includes(item.userId);
    const recipientDoc = usersData.find(user => user.userId === item.userId);
    const hasReceivedRequest = recipientDoc && recipientDoc.friendRequests && recipientDoc.friendRequests.includes(user.userId);
    const hasFriendRequest = hasSendRequest || hasReceivedRequest;


    return (
        <View className="flex-row justify-between items-center my-3">
            <View className="flex-row items-center gap-3">
                <View className="rounded-full w-12 h-12 bg-secondary">
                    
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item.username}</Text>
            </View>

            <View className="mr-3">
                { loading ? (
                    <View className="-mr-2">
                        <LoadingAnimationSecondary />
                    </View>
                ) : (
                <TouchableOpacity onPress={() => sendFriendRequest(item.userId)}
                                disabled={hasFriendRequest}
                                activeOpacity={opacity.opacity600}>
                    {hasFriendRequest ? (
                        <Image className="w-5 h-5 opacity-40" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_hourglass_01.png')}/>
                    ) : (
                        <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_add_user_01.png')}/>
                    )}
                </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
