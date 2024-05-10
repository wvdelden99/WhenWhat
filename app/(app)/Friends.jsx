import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { db, userRef } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { FlatList, Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';
import { ItemPoll } from '../../components/content/ItemPoll';
// import { ItemChat } from '../../components/content/chat/ItemChat';
import { ItemFriendRequest}  from '../../components/content/ItemFriendRequest';
import { ItemFriend } from '../../components/content/ItemFriend';
import { ItemUser } from '../../components/content/ItemUser';
import { ButtonModal } from '../../components/button/ButtonModal';
import { InputSearch } from '../../components/form/InputSearch';

// import { getRoomId } from '../../auth/common';


// Import statements...

export function Friends() {
    const { t } = useTranslation();

    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (user && user.userId) {
            getUsers();
            getUserData(user.userId);
            getFriendRequests();
        } else {
            console.log("User object available, but userId not present.");
        }
    }, [user]);

    useEffect(() => {
        if (currentUser) {
            setFriends(currentUser.friends || []); // Set friends only if currentUser exists
        }
    }, [currentUser]);

    const getUsers = async () => {
        if (!user || !user.userId) {
            console.log("User or userId not available.");
            return;
        }

        const q = query(userRef, where('userId', '!=', user.userId));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data()})
        });
        console.log("Users:", data);
        setUsers(data);
    }

    const getUserData = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                // Ensure friendRequests and friends are present and initialized
                userData.friendRequests = userData.friendRequests || [];
                console.log("User data fetched:", userData);
                setCurrentUser(userData);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getFriendRequests = async () => {
        const q = query(collection(db, 'users'), where('userId', '==', user.userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setFriendRequests(userData.friendRequests || []);
        }
    };

    const handleAcceptFriendRequest = (updatedFriendRequests, acceptedFriendId) => {
        setFriendRequests(updatedFriendRequests);
    };

    const handleDeclineFriendRequest = (updatedFriendRequests) => {
        setFriendRequests(updatedFriendRequests);
    };

    const renderFriend = ({ item }) => <ItemFriend friend={item} />;

    // Polls
    const activityData = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}];

    // Modal Friend List
    const [showFriendList, setShowFriendList] = useState(false);
    const [friendRequest, setFriendRequest] = useState(true);
    const [showFriendRequestList, setShowFriendRequestList] = useState(false);

    const openFriendList = () => {
        setShowFriendList(true);
    }
    const closeFriendList = () => {
        setShowFriendList(false);
    }

    const handleFriendRequestList = () => {
        setShowFriendRequestList(!showFriendRequestList);
    }
    
    // Modal User List
    const [showUserList, setShowUserList] = useState(false);

    const openUserList = () => {
        setShowUserList(true);
    }
    const closeUserList = () => {
        setShowUserList(false);
    }
    
    // const renderFriend = ({ item }) => <ItemFriend friend={item} />;

    // Check if currentUser and friends are properly set
    console.log("currentUser:", currentUser);
    // console.log("friends:", friends);

    // Check if currentUser contains friends data
    // console.log("currentUser.friends:", currentUser.friends);
    
    return (
        <LayoutBackgroundMedium>
            <View className="px-6">
                <View className="flex-row justify-between my-6">
                    <TouchableOpacity activeOpacity={opacity.opacity900}>
                        <View className="flex-row items-center rounded-lg py-3 px-4 bg-primary">
                            <Image className="mr-1 w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_add_users_01.png')}/>
                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-create_group')}</Text>
                        </View>
                    </TouchableOpacity>

                    <ButtonModal buttonPress={openFriendList}
                                buttonIcon={require('./../../assets/static/icons/icon_users_01.png')}
                                buttonNotification/>
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
{/* 
                { users.length > 0 ? 
                    <FlatList className="flex-[1] -mr-4 h-full"
                            data={users}
                            // keyExtractor={item=> Math.random()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index})=> <ItemChat item={item} currentUser={user} index={index}/>}
                    />           
                    : 
                    <View className="items-center justify-center h-2/5">
                        <Text className="text-base text-dark opacity-50" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-no_friend_groups')}</Text>
                    </View>
                } */}
            </View>

            <Modal visible={showFriendList}
                    animationType="fade-up">
                <SafeAreaView className="flex-[1]">
                    <StatusBar barStyle="dark-content"/>

                    <View className="flex-row justify-between items-center my-4 px-6">
                        <TouchableOpacity onPress={closeFriendList} activeOpacity={opacity.opacity600}>
                             <Image className="w-9 h-9" source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                        </TouchableOpacity>

                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-header-friend_list')}</Text>

                        <TouchableOpacity onPress={openUserList} activeOpacity={opacity.opacity600}>
                            <Image className="w-6 h-6" source={require('./../../assets/static/icons/icon_add_user_01.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View className="px-6">
                        <InputSearch placeholderText={t('components.search')}/>

                        { friendRequest ?
                            <View className="mt-4">
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-request')}</Text>
                                    
                                    <View className="flex-row items-center">
                                        <View className={`flex-row items-center gap-1 mr-2 ${ showFriendRequestList ? '' : 'hidden' }`}>
                                            <Text className="text-sm text-dark opacity-80" style={{ fontFamily: 'Poppins_600SemiBold' }}>99+</Text>
                                            <View className="rounded-full w-3 h-3 bg-primary"></View>
                                        </View>
                                        <TouchableOpacity onPress={handleFriendRequestList} activeOpacity={opacity.opacity600}>
                                            <Image className={`w-7 h-7 opacity-50 ${ showFriendRequestList ? '' : 'rotate-180'}`}  source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                <View className={`mt-1 ${showFriendRequestList ? 'hidden' : ''}`}>
                                {friendRequests.length > 0 ? (
                                    <FlatList
                                        data={friendRequests}
                                        renderItem={({ item }) => ( 
                                        <ItemFriendRequest request={item} 
                                                            currentUser={currentUser} 
                                                            onDecline={handleDeclineFriendRequest} 
                                                            onAccept={handleAcceptFriendRequest} />)}
                                        keyExtractor={(item) => item}
                                    />
                                    ) : (
                                    <Text>No friend requests</Text>
                                )}
                                </View>
                            </View>
                            :
                            <></>
                        }

                        <View className="my-4">
                            { friendRequest ?
                                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-header')}</Text>
                                :
                                <></>
                            }
{currentUser ? (
    <View>
        {currentUser.friends && currentUser.friends.length > 0 ? (
            <View>
                <Text>Friends:</Text>
                <FlatList
                    data={currentUser.friends}
                    renderItem={renderFriend}
                    keyExtractor={(item) => item}
                />
            </View>
        ) : (
            <Text>No friends available</Text>
        )}
    </View>
) : (
    <Text>Loading...</Text>
)}


                        </View>
                    </View>
                </SafeAreaView>

                <Modal visible={showUserList}
                        animationType='fade-up'>
                    <SafeAreaView className="flex-[1]">
                        <View className="flex-row justify-between items-center my-4 px-6">
                            <TouchableOpacity onPress={closeUserList} activeOpacity={opacity.opacity600}>
                                <Image className="w-9 h-9" source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                            </TouchableOpacity>

                            <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-header-add_friends')}</Text>

                            <TouchableOpacity>
                                <Image />
                            </TouchableOpacity>
                        </View>

                        <View className="px-6">
                            <InputSearch placeholderText={t('components.search')}/>

                            <FlatList className="my-2"
                                    data={users}
                                    keyExtractor={(item) => item.userId}
                                    renderItem={({ item }) => (<ItemUser buttonPress={{}} item={item} currentUser={user}/>)}/>
                        </View>
                    </SafeAreaView>
                </Modal>
            </Modal>
        </LayoutBackgroundMedium>
    )
}
