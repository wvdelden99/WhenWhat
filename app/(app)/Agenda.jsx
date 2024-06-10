import { useEffect, useState } from 'react';
import { agendaRef } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../config/auth/authContext';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from './../../assets/styles/Styles';
// Components
import { LayoutBackgroundSmall } from './../../components/layout/_layoutBackgroundSmall';
import { LayoutBackgroundBig } from './../../components/layout/_layoutBackgroundBig';
import { ModalGroups } from '../../components/content/modal/agenda/ModalGroups';
import { ItemCalendar } from '../../components/content/item/agenda/ItemCalendar';
import { LoadingAnimationPrimary } from './../../components/animations/LoadingAnimationPrimary';


export function Agenda() {
    const navigation = useNavigation();

    const [loadingData, setLoadingData] = useState(false);

    const { user, fetchCurrentUserData, fetchUsersData, fetchFriendGroups } = useAuth();
    const [currentUserData, setCurrentUserData] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [friendGroupsData, setFriendGroupsData] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showModalGroups, setShowModalGroups] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoadingData(true);
                const currentUserFetchRef = await fetchCurrentUserData(user.userId);
                setCurrentUserData(currentUserFetchRef);
    
                const usersFetchRef = await fetchUsersData();
                setUsersData(usersFetchRef);
                setLoadingData(false);
            } catch(error) {
                console.log('Fetch Error:', error);
                setLoadingData(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoadingData(true);
                if (currentUserData && usersData) {
                    const friendGroupsFetchRef = await fetchFriendGroups();
                    setFriendGroupsData(friendGroupsFetchRef);

                    if (friendGroupsFetchRef.length > 0 && !selectedGroup) {
                        setSelectedGroup(friendGroupsFetchRef[0].groupId);
                    }
                }
                setLoadingData(false);
            } catch(error) {
                console.log('Fetch Friend Group Error:', error);
                setLoadingData(false);
            }
        }
        fetchData();
    }, [currentUserData, usersData]);


    // Create Agenda
    useEffect(() => {
        if (selectedGroup) {
            createAgendaIfNotExists(selectedGroup);
        }
    }, [selectedGroup]);

    const createAgendaIfNotExists = async (groupId) => {
        try {
            const agendaDocRef = doc(agendaRef, groupId);
            const agendaDoc = await getDoc(agendaDocRef);

            if (!agendaDoc.exists()) {
                await setDoc(agendaDocRef, groupId);
            }
        } catch (error) {
            console.log('Error creating agenda:', error);
        }
    };

    // Modal Groups
    const openModalGroups = () => {
        setShowModalGroups(true);
    };

    // Change Group
    const toggleGroupSelection = (group) => {
        setSelectedGroup(group);
    };

    return (
        <>
        {loadingData ? (
            <View className="flex-[1] justify-center items-center">
                <LoadingAnimationPrimary />
            </View>
        ) : (
            <>
            {friendGroupsData.length < 0 ? (
                <LayoutBackgroundBig>
                    <View className="flex-[1] justify-center items-center">
                        <View className="rounded-lg p-6 max-w-[300px] bg-white">
                            <Text className="text-base text-center text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>You have no friend group yet, create one!</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('FriendsContent')} activeOpacity={opacity.opacity900}>
                                <View className="mt-6 rounded-md p-3 bg-primary">
                                    <Text className="text-base text-center text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Create Group</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LayoutBackgroundBig>
            ) : (
                <LayoutBackgroundSmall>
                    <View className="flex-row justify-between items-center my-4 px-4">
                        <TouchableOpacity onPress={openModalGroups} activeOpacity={opacity.opacity900}>
                            <View className="flex-row items-center rounded-lg py-3 pl-4 pr-3 bg-white">
                                <View className="flex-row items-center gap-2">
                                    <View className="rounded-full w-7 h-7 bg-gray"></View>
                                    <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{selectedGroup ? friendGroupsData.find(group => group.groupId === selectedGroup)?.groupName : "Current Group"}</Text>
                                </View>
                                <Image className="ml-2 w-6 h-6" source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                            <View className="rounded-md p-3 bg-white">
                                <Image className="w-6 h-6" source={require('./../../assets/static/icons/icon_users_01.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ItemCalendar currentUserData={currentUserData} usersData={usersData} friendGroupsData={friendGroupsData} group={selectedGroup}/>
                    </View>

                    <ModalGroups friendGroupsData={friendGroupsData} selectedGroup={selectedGroup} toggleGroupSelection={toggleGroupSelection}
                                showModalGroups={showModalGroups} setShowModalGroups={setShowModalGroups}/>
                </LayoutBackgroundSmall>
            )}
            </>
        )}
        </>
    )
}
