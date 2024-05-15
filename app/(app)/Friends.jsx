import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { arrayUnion, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { userRef } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';
import { ItemFriendRequest } from '../../components/content/ItemFriendRequest';
import { ItemUser } from '../../components/content/ItemUser';
import { color, opacity } from '../../assets/styles/Styles';
import { InputSearch } from '../../components/form/InputSearch';
import { LoadingAnimationSecondary } from '../../components/animations/LoadingAnimationSecondary';


export function Friends() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const [currentUserData, setCurrentUserData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [usersListData, setUsersListData] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsData, setFriendsData] = useState([]);

    useEffect(() => {
        fetchCurrentUserData(user.userId);
        fetchUsersData();
    }, []);

    useEffect(() => {
        if (usersData && currentUserData) {
            fetchUsersListData();
            fetchFriendRequests();
            fetchFriend();
        }
    }, [usersData, currentUserData]);

    // Fecth Current User
    const fetchCurrentUserData = async (userId) => {
        const userDocRef = doc(userRef, userId);
        const docSnap = await getDoc(userDocRef);
        const userData = docSnap.data();
        setCurrentUserData(userData);
    };


    // Fetch Users
    const fetchUsersData = async () => {
        const q = query(userRef, where('userId', '!=', user.userId));
        const querySnapshot = await getDocs(q);
     
        let usersData = [];
        querySnapshot.forEach(doc => {
            usersData.push({...doc.data()})
        });
        setUsersData(usersData);
    }


    // Fetch List of Users
    const fetchUsersListData = async () => {
        let usersListData = usersData;

        if (currentUserData) {
            usersListData = usersListData.filter(userData => !currentUserData.friends.includes(userData.userId));
        }
        setUsersListData(usersListData);
    }

    // Fetch Friend Requests
    const fetchFriendRequests = async (username) => {
        const userfriendRequests = currentUserData.friendRequests;
        const friendRequestUsername = [];

        for (const userId of userfriendRequests) {
            const friendRequestData = usersData.find(user => user.userId === userId);
            if (currentUserData) {
                friendRequestUsername.push(friendRequestData.username);
            }
        }
        setFriendRequests(friendRequestUsername);
    }


    // Fetch Friends
    const fetchFriend = async () => {
        const userFriends = currentUserData.friends;
        const friendUsername = [];

        for (const userId of userFriends) {
            const friendData = usersData.find(user => user.userId === userId);
            if (friendData) {
                friendUsername.push(friendData.username);
            }
        }
        setFriendsData(friendUsername);
    }

    // Remove Friend
// Remove Friend
const removeFriend = async (username) => {
    const friendData = usersData.find(user => user.username === username);
    const updatedFriends = currentUserData.friends.filter(userId => userId !== friendData.userId);

    try {
        await updateDoc(doc(userRef, currentUserData.userId), { friends: updatedFriends });
        await fetchUsersData(); // Update usersData after removing friend
        setFriendsData(updatedFriends.map(userId => usersData.find(user => user.userId === userId).username));
    } catch (error) {
        console.log(error);
    }
}



    // Accept Friend Request
    const acceptRequest = async (username) => {
        try {
            setLoading(true);
            const friendData = usersData.find(user => user.username === username);
            const updatedFriendRequests = currentUserData.friendRequests.filter(userId => userId !== friendData.userId);
            const updatedFriends = arrayUnion(friendData.userId);
    
            await Promise.all([
                updateDoc(doc(userRef, currentUserData.userId), { friendRequests: updatedFriendRequests }),
                updateDoc(doc(userRef, currentUserData.userId), { friends: updatedFriends })
            ]);
    
            setFriendRequests(updatedFriendRequests.map(userId => usersData.find(user => user.userId === userId).username));
            setFriendsData([...friendsData, username]);
            setLoading(false);
        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    }


    // Decline Friend Request
    const declineRequest = async (username) => {
        const friendData = usersData.find(user => user.username === username);
        const updatedFriendRequests = currentUserData.friendRequests.filter(userId => userId !== friendData.userId);

        await updateDoc(doc(userRef, currentUserData.userId), { friendRequests: updatedFriendRequests });

        setFriendRequests(updatedFriendRequests.map(userId => usersData.find(user => user.userId === userId).username));
    }


    // Modal Friend List
    const [showFriendList, setShowFriendList] = useState(false);
    const openFriendList = () => {
        setShowFriendList(true);
    }
    const closeFriendList = () => {
        setShowFriendList(false);
    }

    // Modal Users List
    const [showUsersList, setShowUsersList] = useState(false);
    const openUsersList = () => {
        setShowUsersList(true);
    }
    const closeUsersList = () => {
        setShowUsersList(false);
    }


    return (
        <LayoutBackgroundMedium>
            <View className="my-6 px-6">
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={openFriendList} activeOpacity={opacity.opacity800}>
                        <View className="rounded-md p-3 bg-white">
                            <Image className="w-6 h-6" source={require('./../../assets/static/icons/icon_users_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={showFriendList}
                    animationType="fade-up">
                <SafeAreaView>
                    <StatusBar barStyle="dark-content"/>
                    <View className="flex-row justify-between items-center my-4 px-6">
                        <TouchableOpacity onPress={closeFriendList} activeOpacity={opacity.opacity600}>
                            <Image className="w-10 h-10" source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                        </TouchableOpacity>

                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-header-friend_list')}</Text>

                        <TouchableOpacity onPress={openUsersList} activeOpacity={opacity.opacity600}>
                            <Image className="w-6 h-6" source={require('./../../assets/static/icons/icon_add_user_01.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View className="px-6">
                        <InputSearch placeholderText={t('components.search')}/>

                        {friendRequests.length > 0 &&
                        <View className="mt-4">
                            <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-requests')}</Text>

                            <FlatList className="my-2"
                                        scrollEnabled={false}
                                        data={friendRequests}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <View className="flex-row justify-between items-center my-2">
                                                <View className="flex-row items-center gap-3">
                                                    <View className="rounded-full w-12 h-12 bg-secondary">

                                                    </View>
                                                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
                                                </View>

                                                <View className="flex-row items-center gap-3 mr-1">
                                                    { loading ? (
                                                        <LoadingAnimationSecondary />
                                                    ) : (
                                                        <>
                                                            <TouchableOpacity onPress={() => acceptRequest(item)} activeOpacity={opacity.opacity600}>
                                                                <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_check_01.png')}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => declineRequest(item)} activeOpacity={opacity.opacity700}>
                                                                <Image className="w-7 h-7" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_cross_02.png')}/>
                                                            </TouchableOpacity>
                                                        </>
                                                    )}
                                                </View>
                                            </View>
                                        )}
                            />
                        </View>
                        }

                        <View className="mt-4">
                            {friendRequests.length > 0 &&
                                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Friends</Text>
                            }

                            <FlatList className="my-2"
                                        data={friendsData}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <View className="flex-row justify-between items-center my-2">
                                                <View className="flex-row items-center gap-3">
                                                    <View className="rounded-full w-12 h-12 bg-secondary">

                                                    </View>
                                                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
                                                </View>

                                                <View>
                                                    <TouchableOpacity onPress={() => removeFriend(item)}>
                                                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>Remove Friend</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                            />
                        </View>
                    </View>
                </SafeAreaView>

                
                <Modal visible={showUsersList}
                        animationType="fade-up">
                    <SafeAreaView>
                        <StatusBar barStyle="dark-content"/>

                        <View className="flex-row justify-between items-center my-4 px-6">
                            <TouchableOpacity onPress={closeUsersList}>
                                <Image className="w-10 h-10" source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                            </TouchableOpacity>

                            <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Add Friends</Text>

                            <View className="w-6 h-6"></View>
                        </View>

                        <View className="px-6">
                            <InputSearch placeholderText={t('components.search')}/>

                            <FlatList className="mt-4"
                                    data={usersListData}
                                    keyExtractor={(item => item.userId)}
                                    renderItem={({ item }) => <ItemUser item={item} currentUserData={currentUserData} userRef={userRef} user={user} usersData={usersData}/>}/> 
                        </View>
                    </SafeAreaView>
                </Modal>
            </Modal>
        </LayoutBackgroundMedium>
    )
}
