import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../config/auth/authContext';
import { useTranslation } from 'react-i18next';
import { Image, FlatList, Modal, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { LoadingAnimationSecondary } from '../../../animations/LoadingAnimationSecondary';
import { ModalUsersList } from '../ModalUsersList';
import { ItemFriendRequest } from '../../item/friends/ItemFriendRequest';
import { ItemFriend } from '../../item/friends/ItemFriend';
import { InputSearch } from '../../../form/InputSearch';


export function ModalFriendList({userRef, user, currentUserData, usersData, usersListData, showFriendList, setShowFriendList}) {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);

    const { fetchFriendRequests, fetchFriend } = useAuth();
    const [friendRequestsList, setFriendRequestsList] = useState(true);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsData, setFriendsData] = useState([]);

    // Fetch
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            if (currentUserData && usersData) {
                const friendRequestsData = await fetchFriendRequests();
                setFriendRequests(friendRequestsData);
                const friendData = await fetchFriend();
                setFriendsData(friendData);
            }
        }
        fetchData();
        setLoading(false);
    }, [currentUserData, usersData])

    // Friend Requests List
    const toggleFriendRequestsList = () => {
        setFriendRequestsList(!friendRequestsList);
    }

    // Modal Friend List
    const closeFriendList = () => {
        setShowFriendList(false);
    }

    // Modal Users List
    const [showUsersList, setShowUsersList] = useState(false);
    const openUsersList = () => {
        setShowUsersList(true);
    }

    return (
        <Modal visible={showFriendList}
                animationType='fade-up'>
            <SafeAreaView>
                <StatusBar barStyle="dark-content"/>

                <View className="flex-row justify-between items-center my-4 px-6">
                    <TouchableOpacity onPress={closeFriendList} activeOpacity={opacity.opacity600}>
                        <Image className="w-10 h-10" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}/>
                    </TouchableOpacity>

                    <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-header-friend_list')}</Text>

                        <TouchableOpacity onPress={openUsersList} activeOpacity={opacity.opacity600}>
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_add_user_01.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View className="px-6">
                        {loading ? (
                            <View>
                                <LoadingAnimationSecondary />
                            </View>
                        ) : (
                            <React.Fragment>
                                {friendsData.length > 0 &&
                                    // <InputSearch placeholderText={t('components.search')}/>
                                    <TextInput className="p-3 bg-gray"
                                                placeholder={t('components.search')}/>
                                }

                                {friendRequests.length > 0 &&
                                <View className="mt-4">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-requests')}</Text>
                                        <View className="flex-row items-center gap-2">
                                            {!friendRequestsList &&
                                            <View className="flex-row items-center gap-1">
                                                <Text className="text-sm text-dark">{friendRequests.length > 99 ? '99+' : friendRequests.length}</Text>
                                                <View className="rounded-full w-3 h-3 bg-primary"></View>
                                            </View>
                                            }
                                            <TouchableOpacity onPress={toggleFriendRequestsList}>
                                                <Image className={`w-9 h-9 ${ friendRequestsList ? 'rotate-180' : '' }`} style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {friendRequestsList &&
                                    <FlatList className="my-2"
                                                scrollEnabled={false}
                                                data={friendRequests}
                                                keyExtractor={(item) => item}
                                                renderItem={({item}) => (
                                                    <ItemFriendRequest item={item} userRef={userRef} currentUserData={currentUserData} usersData={usersData} setFriendRequests={setFriendRequests} setFriendsData={setFriendsData}/>
                                                )}
                                    />
                                    }
                                </View>
                                }
                            
                                <View className="mt-4">
                                    {friendRequests.length > 0 &&
                                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-header-friend_list')}</Text>
                                    }

                                    {friendsData.length > 0 ? (
                                        <FlatList className="my-2"
                                                    data={friendsData}
                                                    keyExtractor={(item) => item}
                                                    renderItem={({item}) => (
                                                        <ItemFriend item={item} userRef={userRef} currentUserData={currentUserData} usersData={usersData} setFriendsData={setFriendsData}/>
                                                    )}/>
                                    ) : (
                                        <View className="justify-center items-center my-12 mx-auto max-w-[80%]">
                                            <View className="">
                                                <Text className="mb-6 text-base text-center text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-no_friends')}</Text>
                                                <TouchableOpacity onPress={openUsersList} activeOpacity={opacity.opacity600}>
                                                    <View className="items-center rounded-lg py-3 bg-primary">
                                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-find_friends')}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <Text className="my-3 text-base text-center text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-no_friends_or')}</Text>
                                                <TouchableOpacity activeOpacity={opacity.opacity800}>
                                                    <View className="items-center rounded-lg py-3 bg-secondary">
                                                        <Text className="text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-invite_friends')}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </React.Fragment>
                        )}
                    </View>
                </SafeAreaView>

                <ModalUsersList userRef={userRef} user={user} currentUserData={currentUserData} usersData={usersData} usersListData={usersListData} showUsersList={showUsersList} setShowUsersList={setShowUsersList}/>
        </Modal>
    )
}
