import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../config/auth/authContext';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from './../../assets/styles/Styles';
// Components
import { LayoutBackgroundSmall } from './../../components/layout/_layoutBackgroundSmall';
import { LayoutBackgroundBig } from './../../components/layout/_layoutBackgroundBig';
import { ItemCalendar } from '../../components/content/item/agenda/ItemCalendar';
import { LayoutModal } from '../../components/layout/_layoutModal';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { agendaRef } from '../../config/firebase';


export function Agenda() {
    const navigation = useNavigation();

    const { user, fetchCurrentUserData, fetchUsersData, fetchFriendGroups } = useAuth();
    const [currentUserData, setCurrentUserData] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [friendGroupsData, setFriendGroupsData] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showModalGroups, setShowModalGroups] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const currentUserFetchRef = await fetchCurrentUserData(user.userId);
                setCurrentUserData(currentUserFetchRef);
    
                const usersFetchRef = await fetchUsersData();
                setUsersData(usersFetchRef);
            } catch(error) {
                console.log('Fetch Error:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                if (currentUserData && usersData) {
                    const friendGroupsFetchRef = await fetchFriendGroups();
                    setFriendGroupsData(friendGroupsFetchRef);

                    if (friendGroupsFetchRef.length > 0 && !selectedGroup) {
                        setSelectedGroup(friendGroupsFetchRef[0].groupId);
                    }
                }
            } catch(error) {
                console.log('Fetchie Patchie Kuttie Wuttie:', error);
            }
        }
        fetchData();
    }, [currentUserData, usersData]);

    // Modal Groups
    const openModalGroups = () => {
        setShowModalGroups(true);
    };
    const closeModalGroups = () => {
        setShowModalGroups(false);
    }

    const handleGroupSelection = (group) => {
        setSelectedGroup(group);
        setShowModalGroups(false); // Close modal after selecting group
    };

    // Agenda
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
                await setDoc(agendaDocRef, { groupId, events: [] }); // Replace with the actual data structure
            }
        } catch (error) {
            console.log('Error creating agenda:', error);
        }
    };
    
    return (
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
                    <ItemCalendar group={selectedGroup} friendGroupsData={friendGroupsData}/>
                </View>

                <LayoutModal visible={showModalGroups}
                            handleIconLeft={closeModalGroups}
                            iconLeft={require('./../../assets/static/icons/icon_arrow_down_03.png')}>
                    <View className="">
                        <FlatList className=""
                                    data={friendGroupsData}
                                    keyExtractor={item => item.groupId}
                                    renderItem={({item}) => (
                                        <TouchableOpacity onPress={() => handleGroupSelection(item.groupId)} activeOpacity={opacity.opacity700}>
                                            <View className="flex-row justify-between items-center my-2">
                                                <View className="flex-row items-center gap-2">
                                                    <View className="rounded-full w-12 h-12 bg-gray"></View>
                                                    <Text className="text-base text-dark"  style={{ fontFamily: 'Raleway_600SemiBold' }}>{item.groupName}</Text>
                                                </View>

                                                <View className={`rounded-full w-5 h-5 ${ selectedGroup === item.groupId ? 'border-[6px] border-secondary bg-white' : 'border-2 border-dark opacity-70'}`}></View>
                                            </View>
                                        </TouchableOpacity>
                                    )}/>
                    </View>
                </LayoutModal>
            </LayoutBackgroundSmall>
        )}
        </>
    )
}
