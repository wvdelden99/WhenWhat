import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { groupRef, userRef } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';
import { ModalFriendList } from '../../components/content/modal/friends/ModalFriendList';
import { ItemPoll } from '../../components/content/ItemPoll';
import { InputSearch } from '../../components/form/InputSearch';
import { ModalCreateGroup } from '../../components/content/modal/friends/ModalCreateGroup';
import { deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';


export function Friends() {
    const { t } = useTranslation();

    const { user, fetchCurrentUserData, fetchUsersData } = useAuth();
    const [currentUserData, setCurrentUserData] = useState(null);
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const currentUserFetchRef = await fetchCurrentUserData(user.userId);
                setCurrentUserData(currentUserFetchRef);
    
                const usersFetchRef = await fetchUsersData();
                setUsersData(usersFetchRef);
            } catch(error) {
                console.log('Fetch Error: ', error);
            }
        }
        fetchData();
        fetchGroups();
    }, []);

    // Modal Create Group
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const openCreateGroupModal = () => {
        setShowCreateGroup(true);
    }

    // Modal Friend List
    const [showFriendList, setShowFriendList] = useState(false);
    const openFriendList = () => {
        setShowFriendList(true);
    }

    // Fetch Groups
    const [friendGroupList, setFriendGroupList] = useState([]);
    const fetchGroups = async () => {
        try {
            const querySnapshot = await getDocs(groupRef); // Assuming groupRef is a Collection Reference
            const groupsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (currentUserData && currentUserData.groups && Array.isArray(currentUserData.groups)) {
                // Filter groups based on currentUserData.groups
                const userGroups = groupsData.filter(group => currentUserData.groups.includes(group.id));
                setFriendGroupList(userGroups);
            } else {
                setFriendGroupList([]);
            }
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };
    
    const removeFriendGroup = async (groupId) => {
        try {
            const groupDoc = doc(groupRef, groupId);
            const groupData = (await getDoc(groupDoc)).data();
            const groupMembers = groupData.members;

            // Remove the group ID from each member's user document
            await Promise.all(
                groupMembers.map(async (memberId) => {
                    const userDoc = doc(userRef, memberId);
                    const userDocData = (await getDoc(userDoc)).data();
                    const updatedGroups = userDocData.groups.filter(id => id !== groupId);
                    await updateDoc(userDoc, { groups: updatedGroups });
                })
            );

            // Delete the group document
            await deleteDoc(groupDoc);

            // Update the state to reflect the removed group
            setFriendGroupList(friendGroupList.filter(group => group.id !== groupId));
        } catch (error) {
            console.error('Error removing group:', error);
        }
    };

    if (!currentUserData) {
        return <Text>Loading...</Text>;
    }
    

    // Polls
    const activityData = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}];


    return (
        <LayoutBackgroundMedium>
            <View className="my-6 px-6">
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity onPress={openCreateGroupModal} activeOpacity={opacity.opacity900}>
                        <View className="flex-row items-center rounded-lg py-3 px-4 bg-primary">
                            <Image className="mr-1 w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_add_users_01.png')}/>
                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-create_group')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={openFriendList} activeOpacity={opacity.opacity800}>
                        <View className="rounded-md p-3 bg-white">
                            {/* {friendRequests.length > 0 &&
                                <View className="absolute rounded-full w-4 h-4 top-[6px] right-[6px] bg-primary z-10"></View>
                            } */}
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_users_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="mb-6">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-recent_polls')}</Text>

                    <FlatList className="mt-3 -mr-6"
                            data={activityData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <ItemPoll post={item} />}
                            showsHorizontalScrollIndicator={false}
                            horizontal />
                </View>
            </View>

            <View className="flex-[1] -mb-10 rounded-t-3xl px-6 h-full bg-white">
                <View className="mt-8 mb-2">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-recent_groups')}</Text>
                </View>

                <InputSearch placeholderText={t('components.search')}/>

                <FlatList className=""
                            data={friendGroupList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => 
                                <View className="flex-row justify-between items-center my-4">
                                    <Text>{item.groupName}</Text>
                                    <TouchableOpacity onPress={() => removeFriendGroup(item.id)}>
                                        <Text className="text-error">Remove Group</Text>
                                    </TouchableOpacity>
                                </View>
                            }/>
            </View>

            <ModalCreateGroup userRef={userRef} user={user} currentUserData={currentUserData} usersData={usersData} showCreateGroup={showCreateGroup} setShowCreateGroup={setShowCreateGroup}/>
            <ModalFriendList userRef={userRef} user={user} currentUserData={currentUserData} usersData={usersData} showFriendList={showFriendList} setShowFriendList={setShowFriendList}/>
        </LayoutBackgroundMedium>
    )
}
