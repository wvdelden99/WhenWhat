import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { db, userRef } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { ButtonModal } from '../../components/button/ButtonModal';
import { InputSearch } from '../../components/form/InputSearch';
import { ItemPoll } from '../../components/content/ItemPoll';
import { ItemChat } from '../../components/content/chat/ItemChat';
import { getRoomId } from '../../auth/common';


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

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_01.png')}/>

            <View className="px-6">
                <View className="flex-row justify-between my-6">
                    <TouchableOpacity activeOpacity={opacity.opacity900}>
                        <View className="flex-row items-center rounded-lg py-3 px-4 bg-primary">
                            <Image className="mr-1 w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_add_users_01.png')}/>
                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-create_group')}</Text>
                        </View>
                    </TouchableOpacity>

                    <ButtonModal buttonIcon={require('./../../assets/static/icons/icon_users_01.png')}/>
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
                <Text className="mt-8 text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-subheader-recent_groups')}</Text>

                <View className="my-2">
                    <InputSearch placeholderText={t('components.search')}/>
                </View>

                { users.length > 0 ? (
                        <FlatList className="flex-[1] -mr-4 h-full"
                                data={users}
                                // keyExtractor={item=> Math.random()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item, index})=> <ItemChat item={item} currentUser={user} index={index}/>}
                        />           
                    ) : (
                        <View className="">
                            <Text>Fail</Text>
                        </View>
                )}
            </View>
        </SafeAreaView>
    )
}
