import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { db, userRef } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { FlatList, Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity, shadow } from '../../assets/styles/Styles';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';
import { ItemPoll } from '../../components/content/ItemPoll';
import { ItemFriendRequest}  from '../../components/content/ItemFriendRequest';
import { ItemFriend } from '../../components/content/ItemFriend';
import { ItemUser } from '../../components/content/ItemUser';
// import { ItemChat } from '../../components/content/chat/ItemChat';
import { ButtonModal } from '../../components/button/ButtonModal';
import { InputSearch } from '../../components/form/InputSearch';
import { LoadingAnimationPrimary } from './../../components/animations/LoadingAnimationPrimary'

// import { getRoomId } from '../../auth/common';


export function Friends() {
    const { t } = useTranslation();

    const { user } = useAuth();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            getUser(user.userId);
            getUsers();
            getFriendRequests();
        } else {
            console.log("User object available, but userId not present.");
        }
    }, [user]);

    const getUser = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const docSnap = await getDoc(userDocRef);

            const userData = docSnap.data();
            userData.friendRequests = userData.friendRequests || []; 
            setUserData(userData);
        } catch(error) {
            console.error("Error fetching user data:", error);
        }
    };

    // useEffect(() => {
    //     if (user) {
    //         getUser(user.userId);
    //         getUsers();
    //         getFriendRequests();
    //     } else {
    //         console.log("User object available, but userId not present.");
    //     }
    // }, [user]);

    // const getUser = async (userId) => {
    //     try {
    //         const userDocRef = doc(db, 'users', userId);
    //         const docSnap = await getDoc(userDocRef);

    //         const userData = docSnap.data();
    //         userData.friendRequests = userData.friendRequests || []; 
    //         setCurrentUser(userData);
    //     } catch(error) {
    //         console.error("Error fetching user data:", error);
    //     }
    // };

    const getUsers = async () => {
        if (!user) {
            console.log("User or userId not available.");
            return;
        }

        const q = query(userRef, where('userId', '!=', user.userId));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data()})
        });
        setUsers(data);
    }

    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (currentUser) {
            setFriends(currentUser.friends || []); // Set friends only if currentUser exists
        }
    }, [currentUser]);
    

    // Friend Request
    const [friendRequests, setFriendRequests] = useState([]); 
    const [showFriendRequestList, setShowFriendRequestList] = useState(false);

    const getFriendRequests = async () => {
        try {
            const q = query(collection(db, 'users'), where('userId', '==', user.userId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                const fetchedFriendRequests = userData.friendRequests || [];
                setFriendRequests(fetchedFriendRequests);
            }
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        }
    };
    

    const handleAcceptFriendRequest = (updatedFriendRequests) => {
        setFriendRequests(updatedFriendRequests);
    };

    // const handleDeclineFriendRequest = (updatedFriendRequests) => {
    //     setFriendRequests(updatedFriendRequests);
    // };

    const handleDeclineFriendRequest = async (requestId) => {
        try {
            const userDocRef = doc(db, 'users', user.userId);
            const updatedFriendRequests = friendRequests.filter(id => id !== requestId);
            await updateDoc(userDocRef, { friendRequests: updatedFriendRequests });
            console.log("Updated friend requests:", updatedFriendRequests);
            setFriendRequests(updatedFriendRequests);
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };
       
    

    const handleFriendRequestList = () => {
        setShowFriendRequestList(!showFriendRequestList);
    }

    // Modal Friend List
    const [showFriendList, setShowFriendList] = useState(false);

    const openFriendList = () => {
        setShowFriendList(true);
    }
    const closeFriendList = () => {
        setShowFriendList(false);
    }


    // Modal User List
    const [showUserList, setShowUserList] = useState(false);

    const openUserList = () => {
        setShowUserList(true);
    }
    const closeUserList = () => {
        setShowUserList(false);
    }


    const [users, setUsers] = useState([]);
  

    const [friends, setFriends] = useState([]);




    // Polls
    const activityData = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}];



    

    
    return (
        <LayoutBackgroundMedium>
            <View className="px-6">
                <View className="flex-row justify-between my-6">
                    <TouchableOpacity activeOpacity={opacity.opacity900}>
                        <View className="flex-row items-center rounded-lg py-3 px-4 bg-primary" style={{ ... shadow.shadowButton }}>
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
                             <Image className="w-9 h-9" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                        </TouchableOpacity>

                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-header-friend_list')}</Text>

                        <TouchableOpacity onPress={openUserList} activeOpacity={opacity.opacity600}>
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_add_user_01.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View className="px-6">
                        <InputSearch placeholderText={t('components.search')}/>

                        {friendRequests.length > 0 &&
                            <View className="mt-4">
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-request')}</Text>

                                    <View className="flex-row items-center">
                                        <View className={`flex-row items-center gap-1 mr-2 ${ showFriendRequestList ? '' : 'hidden' }`}>
                                            <Text className="text-sm text-dark opacity-80" style={{ fontFamily: 'Poppins_600SemiBold' }}>{friendRequests.length > 99 ? '99+' : friendRequests.length}</Text>
                                            <View className="rounded-full w-3 h-3 bg-primary"></View>
                                        </View>
                                        <TouchableOpacity onPress={handleFriendRequestList} activeOpacity={opacity.opacity600}>
                                            <Image className={`w-7 h-7 opacity-50 ${ showFriendRequestList ? '' : 'rotate-180'}`}  source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                        
                                <View className={`mt-1 ${showFriendRequestList ? 'hidden' : ''}`}>
                                    {/* <FlatList data={friendRequests}
                                            renderItem={({ item }) => ( 
                                            <ItemFriendRequest request={item} 
                                                                user={user} 
                                                                acceptRequest={handleAcceptFriendRequest} 
                                                                declineRequest={handleDeclineFriendRequest} />)}
                                            keyExtractor={(item) => item}
                                            scrollEnabled={false}/> */}
<FlatList
    data={friendRequests}
    renderItem={({ item }) => ( 
        <ItemFriendRequest 
            request={item} 
            user={user} 
            acceptRequest={handleAcceptFriendRequest} 
            declineRequest={handleDeclineFriendRequest} 
            userData={userData} // Pass userData to ItemFriendRequest
        />
    )}
    keyExtractor={(item) => item}
    scrollEnabled={false}
/>


                                </View>
                            </View>
                        }                        

                        <View className="my-4">
                            {friendRequests.length > 0 && 
                                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-header')}</Text>
                            }

                            {currentUser ? (
                                <>
                                    {currentUser.friends && currentUser.friends.length > 0 ? (
                                        <FlatList
                                            data={currentUser.friends}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (<ItemFriend friend={item} currentUser={currentUser} setFriends={setFriends}/>)}/>
                                    ) : (
                                        <Text>No friends available</Text>
                                    )}
                                </>
                            ) : (
                                <LoadingAnimationPrimary />
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
