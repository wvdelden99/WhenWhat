import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { LayoutModal } from '../../../layout/_layoutModal';
import { ModalUsersList } from '../ModalUsersList';
import { ItemFriendRequest } from '../../item/friends/ItemFriendRequest';
import { InputSearch } from '../../../form/InputSearch';
import { ItemNoFriends } from '../../item/friends/ItemNoFriends';
import { ItemFriend } from '../../item/friends/ItemFriend';
import { LoadingAnimationPrimary } from '../../../animations/LoadingAnimationPrimary';


export function ModalFriendList({ currentUserData, usersData, friendRequestsData, setFriendRequestsData, friendsData, setFriendsData, showFriendList, setShowFriendList, openUsersList, showUsersList, setShowUsersList}) {
    const { t } = useTranslation();

    const [loadingData, setLoadingData] = useState(false);
    const [searchFriends, setSearchFriends] = useState('');

    const [friendRequestsList, setFriendRequestsList] = useState(true);
    
    const [filteredFriendsData, setFilteredFriendsData] = useState(friendsData);

    useEffect(() => {
        setLoadingData(true);
        setFilteredFriendsData(friendsData);
        setLoadingData(false);
    }, [friendsData]);

 
    // Modal Friend List
    const closeFriendList = () => {
        setShowFriendList(false);
    }

    // Friend Requests List
    const toggleFriendRequestsList = () => {
        setFriendRequestsList(!friendRequestsList);
    }

    // Search Friends
    const handleSearch = (query) => {
        setSearchFriends(query);
        if (query) {
            setFilteredFriendsData(friendsData.filter(friend => friend.username.toLowerCase().includes(query.toLowerCase())));
        } else {
            setFilteredFriendsData(friendsData);
        }
    }

    return (
        <LayoutModal modalHeader={t('friends.friends-header-friend_list')}
                    visible={showFriendList}
                    handleIconLeft={closeFriendList}
                    iconLeft={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}
                    handleIconRight={openUsersList}
                    iconRight={require('./../../../../assets/static/icons/icon_add_user_01.png')}
                    styleIconRight="w-6 h-6">
            {loadingData ? (
                <View className="justify-center items-center h-4/5">
                    <LoadingAnimationPrimary />
                </View>
            ) : (
                <>
                    {friendsData.length > 0 &&
                        <InputSearch focusArea={{}}
                                    value={searchFriends}
                                    onChangeText={handleSearch}
                                    placeholderText={t('components.search.search')}/>
                    }

                    {friendRequestsData.length > 0 &&
                        <View className="mt-4">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-requests')}</Text>

                                <View className="flex-row items-center gap-2">
                                    {!friendRequestsList &&
                                        <View className="flex-row items-center gap-1">
                                            <View className="rounded-full w-3 h-3 bg-primary"></View>
                                            <Text className="text-sm text-dark">{friendRequestsData.length > 99 ? '99+' : friendRequestsData.length}</Text>
                                        </View>
                                    }
                                    <TouchableOpacity onPress={toggleFriendRequestsList} activeOpacity={opacity.opacity600}>
                                        <Image className={`w-9 h-9 ${ friendRequestsList ? 'rotate-180' : '' }`} style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {friendRequestsList &&
                                <FlatList className="my-2"
                                            scrollEnabled={false}
                                            data={friendRequestsData}
                                            keyExtractor={(item) => item.userId}
                                            renderItem={({item}) => (
                                                <ItemFriendRequest item={item} username={item.username} currentUserData={currentUserData} setFriendRequests={setFriendRequestsData} setFriendsData={setFriendsData}/>
                                            )}/>
                            }
                        </View>
                    }
                                    
                    <View className="mt-4">
                        {friendRequestsData.length > 0 &&
                            <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-header-friend_list')}</Text>
                        }

                        {friendsData.length > 0 ? (
                            <>
                                {filteredFriendsData.length > 0 ? (
                                    <FlatList className="my-2"
                                            data={filteredFriendsData}
                                            keyExtractor={(item) => item.userId}
                                            renderItem={({item}) => (
                                                <ItemFriend item={item} username={item.username} currentUserData={currentUserData} setFriendsData={setFriendsData} friendList/>
                                            )}/>
                                    ) : ( 
                                        <View className="items-center my-12">
                                            <Text className="text-base text-dark-disabled" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('components.search.search-no_results')}</Text>
                                        </View>
                                    )}
                            </>
                        ) : (
                            <ItemNoFriends openUsersList={openUsersList}/>
                        )}
                    </View>
                </>
            )}

            <ModalUsersList currentUserData={currentUserData} usersData={usersData} friendRequestsData={friendRequestsData} setFriendRequestsData={setFriendRequestsData} showUsersList={showUsersList} setShowUsersList={setShowUsersList}/>
        </LayoutModal>
    )
}
