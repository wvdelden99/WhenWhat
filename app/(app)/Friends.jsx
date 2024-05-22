import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { arrayUnion, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { userRef } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';
import { ItemFriendRequest } from '../../components/content/item/friends/ItemFriendRequest';
import { ItemUser } from '../../components/content/item/ItemUser';
import { color, opacity } from '../../assets/styles/Styles';
import { InputSearch } from '../../components/form/InputSearch';
import { LoadingAnimationSecondary } from '../../components/animations/LoadingAnimationSecondary';
import { ItemPoll } from '../../components/content/ItemPoll';
import { ItemFriend } from '../../components/content/item/friends/ItemFriend';
import { ModalUsersList } from '../../components/content/modal/ModalUsersList';
import { ModalFriendList } from '../../components/content/modal/friends/ModalFriendList';


export function Friends() {
    const { t } = useTranslation();
    const { user, fetchCurrentUserData, fetchUsersData, fetchFriendRequests } = useAuth();

    const [loading, setLoading] = useState(false);

    const [currentUserData, setCurrentUserData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [usersListData, setUsersListData] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsData, setFriendsData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await fetchCurrentUserData(user.userId);
                setCurrentUserData(userData);
    
                const usersData = await fetchUsersData();
                setUsersData(usersData);
    
                // const friendData = await fetchFriend();
                // setFriendsData(friendData);

                // const friendRequestsData = await fetchFriendRequests();
                // setFriendRequests(friendRequests);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (usersData && currentUserData) {
            fetchUsersListData();
            // fetchFriendRequests();
            fetchFriends();
        }
    }, [usersData, currentUserData]);



    // Fetch List of Users
    const fetchUsersListData = async () => {
        try {
            let usersListData = usersData;

            if (currentUserData) {
                usersListData = usersListData.filter(userData => !currentUserData.friends.includes(userData.userId));
            }
            setUsersListData(usersListData);
        } catch(error) {
            console.log(error)
        }
    }


    const fetchFriends = async () => {
        try {
            const userFriends = currentUserData.friends;

            let friendUsername = [];
            for (const userId of userFriends) {
                const friendData = usersData.find(user => user.userId === userId);
                if (friendData) {
                    friendUsername.push(friendData.username);
                } else {
                    return null;
                }
                // console.log(friendData.username, 'fiendData:', friendData);
                setFriendsData(friendData);
            }
        } catch(error) {
            console.log(error);
        }
        // console.log('username', friendsData)
    }

    // Modal Friend List
    const [showFriendList, setShowFriendList] = useState(false);
    const openFriendList = () => {
        setShowFriendList(true);
    }

    // Polls
    const activityData = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}];


    return (
        <LayoutBackgroundMedium>
            <View className="my-6 px-6">
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity activeOpacity={opacity.opacity900}>
                        <View className="flex-row items-center rounded-lg py-3 px-4 bg-primary">
                            <Image className="mr-1 w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_add_users_01.png')}/>
                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-create_group')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={openFriendList} activeOpacity={opacity.opacity800}>
                        <View className="rounded-md p-3 bg-white">
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
            </View>

            <ModalFriendList showFriendList={showFriendList} 
                            setShowFriendList={setShowFriendList} 
                            usersListData={usersListData} 
                            currentUserData={currentUserData} 
                            userRef={userRef} 
                            user={user} 
                            usersData={usersData}
                            friendRequests={friendRequests}/>
        </LayoutBackgroundMedium>
    )
}
