import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { groupRef, userRef } from '../../config/firebase';
import { arrayRemove, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';
import { ModalCreateGroup } from '../../components/content/modal/friends/ModalCreateGroup';
import { ModalFriendList } from '../../components/content/modal/friends/ModalFriendList';
import { ItemPoll } from '../../components/content/ItemPoll';
import { InputSearch } from '../../components/form/InputSearch';
import { ItemFriendGroup } from '../../components/content/item/friends/ItemFriendGroup';
import { LoadingAnimationPrimary } from '../../components/animations/LoadingAnimationPrimary';


export function Friends() {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const { user, fetchCurrentUserData, fetchUsersData, fetchFriendRequests, fetchFriends, fetchFriendGroups } = useAuth();
    const [currentUserData, setCurrentUserData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [friendRequestsData, setFriendRequestsData] = useState([]);
    const [friendsData, setFriendsData] = useState([]);
    const [friendGroupsData, setFriendGroupsData] = useState([]);

    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showFriendList, setShowFriendList] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const currentUserFetchRef = await fetchCurrentUserData(user.userId);
                setCurrentUserData(currentUserFetchRef);
    
                const usersFetchRef = await fetchUsersData();
                setUsersData(usersFetchRef);
                setLoading(false);
            } catch(error) {
                console.log('Fetch Error: ', error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setLoadingData(true);

                if (currentUserData && usersData) {
                    const friendRequestsFetchRef = await fetchFriendRequests();
                    setFriendRequestsData(friendRequestsFetchRef);

                    const friendsFetchRef = await fetchFriends();
                    setFriendsData(friendsFetchRef);

                    const friendGroupsFetchRef = await fetchFriendGroups();
                    setFriendGroupsData(friendGroupsFetchRef);
                }
                setLoading(false);
                setLoadingData(false);
            } catch(error) {
                console.log('Fetch Error: ', error);
            }
        }
        fetchData();
    }, [currentUserData, usersData]);


    // Modal Create Group
    const openModalCreateGroup = () => {
        setShowCreateGroup(true);
    }

    // Modal Friend List
    const openModalFriendList = () => {
        setShowFriendList(true);
    }

    const updateFriendGroupsData = async () => {
        try {
            setLoading(true);
            setLoadingData(true);
            const friendGroupsFetchRef = await fetchFriendGroups();
            setFriendGroupsData(friendGroupsFetchRef);
            setLoading(false);
            setLoadingData(false);
        } catch (error) {
            console.log('Update Friend Groups Data Error:', error);
            setLoading(false);
        }
    };
    

    // Remove Group
    const removeGroup = async (groupId) => {
        try {
            setLoading(true);
            // Get the group document
            const groupDocRef = doc(groupRef, groupId);
            const groupDocSnap = await getDoc(groupDocRef);
            if (!groupDocSnap.exists()) {
                console.error("Group does not exist!");
                setLoading(false);
                return;
            }
            const groupData = groupDocSnap.data();

            // Remove the group document
            await deleteDoc(groupDocRef);

            // Remove the group ID from each member's document
            const userUpdatePromises = groupData.members.map(userId => {
                const userDocRef = doc(userRef, userId);
                return updateDoc(userDocRef, {
                    groups: arrayRemove(groupId)
                });
            });

            // Wait for all updates to complete
            await Promise.all(userUpdatePromises);

            // Update the local state to reflect the change
            setFriendGroupsData(prevState => prevState.filter(group => group.groupId !== groupId));

            console.log('Group and User Documents Updated');
            setLoading(false);
        } catch (error) {
            console.log('Remove Group Error:', error);
            setLoading(false);
        }
    };

    // Polls
    const activityData = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}];

    return (
        <LayoutBackgroundMedium>
            <View className="my-6 px-6">
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity onPress={openModalCreateGroup} activeOpacity={opacity.opacity900}>
                        <View className="flex-row items-center rounded-lg py-3 px-4 bg-primary">
                            <Image className="mr-1 w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_add_users_01.png')}/>
                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-create_group')}</Text>
                        </View>
                    </TouchableOpacity>
                        
                    <TouchableOpacity onPress={openModalFriendList} activeOpacity={opacity.opacity800}>
                        <View className="rounded-md p-3 bg-white">
                            {friendRequestsData.length > 0 &&
                                <View className="absolute rounded-full w-5 h-5 -top-[5px] -right-[5px] bg-primary"></View>
                            }
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_users_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-recent_polls')}</Text>

                    <FlatList className="mt-3 -mr-6"
                            data={activityData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <ItemPoll post={item} />}
                            showsHorizontalScrollIndicator={false}
                            horizontal />
                </View>
            </View>

            <View className="flex-[1] -mb-10 rounded-t-3xl pt-8 px-6 h-full bg-white">
                <Text className="mb-2 text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-recent_groups')}</Text>

                {loadingData ? (
                    <View className="justify-center items-center h-1/2">
                        <LoadingAnimationPrimary />
                    </View>
                ) : (
                    <>
                    <InputSearch placeholderText={t('components.search.search')}/>

                    <FlatList className=""
                                data={friendGroupsData}
                                keyExtractor={item => item.groupId} 
                                renderItem={({ item }) => 
                                    <ItemFriendGroup item={item} groupName={item.groupName} removeGroup={() => removeGroup(item.groupId)}/>
                                }/>
                    </>
                )}
            </View>

            <ModalCreateGroup currentUserData={currentUserData} friendsData={friendsData} updateFriendGroupsData={updateFriendGroupsData} showCreateGroup={showCreateGroup} setShowCreateGroup={setShowCreateGroup}/>
            <ModalFriendList currentUserData={currentUserData} usersData={usersData} friendRequestsData={friendRequestsData} setFriendRequestsData={setFriendRequestsData} 
                            friendsData={friendsData} setFriendsData={setFriendsData} showFriendList={showFriendList} setShowFriendList={setShowFriendList}/>
        </LayoutBackgroundMedium>
    )
}
