import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';
// Components
import { LayoutModal } from '../../layout/_layoutModal';
import { InputSearch } from '../../form/InputSearch';
import { ItemUser } from '../item/ItemUser';
import { LoadingAnimationPrimary } from '../../animations/LoadingAnimationPrimary';


export function ModalUsersList({currentUserData, usersData, showUsersList, setShowUsersList, friendRequestsData, setFriendRequestsData}) {
    const { t } = useTranslation();

    const [loadingData, setLoadingData] = useState(false);
    const [searchUsers, setSearchUsers] = useState('');

    const [usersListData, setUsersListData] = useState([]);

    // Users List
    useEffect(() => {
        setLoadingData(true);
        if (currentUserData && usersData) {
            usersList();
        }
        setLoadingData(false);
    }, [currentUserData, usersData]);

    const usersList = () => {
        const friendsFilter = usersData
            .filter(user => 
                !currentUserData.friends.includes(user.userId) && 
                !currentUserData.friendRequests.includes(user.userId)
            )
            .sort((a, b) => a.username.localeCompare(b.username));
        setUsersListData(friendsFilter);
    };

    // Search Users
    const filteredUsersList = usersListData.filter(user =>
        user.username.toLowerCase().includes(searchUsers.toLowerCase())
    );

    useEffect(() => {
        setLoadingData(true);
        usersList();
        setLoadingData(false);
    }, [friendRequestsData]);
    
    // Modal User List
    const closeUsersList = () => {
        setShowUsersList(false);
    }

    return (
        <LayoutModal visible={showUsersList}
                    modalHeader={t('friends.friends-header-add_friends')}
                    handleIconLeft={closeUsersList}
                    iconLeft={require('./../.././../assets/static/icons/icon_arrow_down_03.png')}>
            {loadingData ? (
                <View className="justify-center items-center h-4/5">
                    <LoadingAnimationPrimary />
                </View>
            ) : (
                <>
                <InputSearch focusArea={searchUsers}
                            value={searchUsers}
                            onChangeText={setSearchUsers}
                            placeholderText={t('components.search.search')}/>

                {searchUsers.length > 0 &&
                    <>
                    {filteredUsersList.length > 0 ? (
                        <FlatList className="mt-4"
                                    data={filteredUsersList}
                                    keyExtractor={(item => item.userId)}
                                    renderItem={({ item }) => 
                                        <ItemUser item={item} username={item.username} currentUserData={currentUserData} friendRequestsData={friendRequestsData} setFriendRequestsData={setFriendRequestsData}/>
                                    }/>
                    ) : (
                        <View className="items-center my-12">
                            <Text className="text-base text-dark-disabled" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('components.search.search-no_results')}</Text>
                        </View>
                    )}
                    </>
                }
                </>
            )}
        </LayoutModal>
    )
}
