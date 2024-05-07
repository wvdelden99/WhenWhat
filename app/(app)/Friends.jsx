import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { db, userRef } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { FlatList, Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { blur, color, opacity } from '../../assets/styles/Styles';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';
import { ButtonModal } from '../../components/button/ButtonModal';
import { InputSearch } from '../../components/form/InputSearch';
import { ItemPoll } from '../../components/content/ItemPoll';
import { ItemChat } from '../../components/content/chat/ItemChat';
import { getRoomId } from '../../auth/common';
import { ItemFriendRequest } from '../../components/content/ItemFriendRequest';
import { ItemFriend } from '../../components/content/ItemFriend';
import { ItemUser } from '../../components/content/ItemUser';


export function Friends() {
    const { t } = useTranslation();

    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user && user.userId) {
            getUsers();
        } else {
            console.log("User object available, but userId not present.");
        }
    }, [user]);

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
        setUsers(data);
    }

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
                }
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
                                    <ItemFriendRequest />
                                    <ItemFriendRequest />
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

                           <ItemFriend />
                           <ItemFriend />
                           <ItemFriend />
                           <ItemFriend />
                           <ItemFriend />
                           <ItemFriend />
                           <ItemFriend />
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
                                    renderItem={({ item }) => (<ItemUser buttonPress={{}} item={item} users={users}/>)}/>
                        </View>
                    </SafeAreaView>
                </Modal>
            </Modal>
        </LayoutBackgroundMedium>
    )
}
