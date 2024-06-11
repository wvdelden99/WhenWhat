import { FlatList, Image, TouchableOpacity, Text, ScrollView, View } from 'react-native';

import activities from './../../assets/data/activities.json';
// Components
import { LayoutBackgroundSmall } from './../../components/layout/_layoutBackgroundSmall';
import { ButtonBack } from '../../components/button/ButtonBack';
import { opacity } from '../../assets/styles/Styles';
import { InputSearch } from '../../components/form/InputSearch';
import { ItemActivity } from '../../components/content/item/ItemActivity';
import { useEffect, useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { userRef } from '../../config/firebase';

export function PlanActivity() {

    const { user, fetchCurrentUserData } = useAuth();
    const [currentUserData, setCurrentUserData] = useState(null);
    const [likedActivities, setLikedActivities] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const currentUserFetchRef = await fetchCurrentUserData(user.userId);
                setCurrentUserData(currentUserFetchRef);

                if (currentUserFetchRef.likedActivities) {
                    const initialLikedActivities = {};
                    currentUserFetchRef.likedActivities.forEach(id => {
                        initialLikedActivities[id] = true;
                    });
                    setLikedActivities(initialLikedActivities);
                }
            } catch (error) {
                console.log('Fetch Error: ', error);
            }
        }
        fetchData();
    }, [user]);


    const saveLike = async (id, isLiked) => {
        try {
            const userDocRef = doc(userRef, currentUserData.userId);
            await updateDoc(userDocRef, {
                likedActivities: isLiked ? arrayUnion(id) : arrayRemove(id)
            });
        } catch (error) {
            console.log('Store Like Error:', error);
        }
    }

    const toggleLike = (id) => {
        const newLikedStatus = !likedActivities[id];
        setLikedActivities(prevLikedActivities => ({
            ...prevLikedActivities,
            [id]: newLikedStatus
        }));
        // Perform the Firestore update asynchronously
        saveLike(id, newLikedStatus);
    };

    return (
        <LayoutBackgroundSmall>
            <View className="flex-row justify-between items-center my-4 px-6">
                <View className="-ml-6">
                    <ButtonBack />
                </View>

                <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                    <View className="flex-row items-center rounded-md py-2 px-3 bg-white">
                        <View className="flex-row items-center gap-1">
                            <View className="rounded-full w-8 h-8 bg-gray"></View>
                            <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Group Name</Text>
                        </View>

                        <Image className="ml-1 w-6 h-6" source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                    </View>
                </TouchableOpacity>
            </View>

            <View className="rounded-3xl pt-6 px-6 h-full bg-white">
                <View className="flex-row justify-between items-center gap-3">
                    <View className="flex-[1]">
                        <InputSearch placeholderText="Search ..."/>
                    </View>

                    <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity800}>
                        <View className="rounded-md p-3 bg-gray">
                            <Image className="w-6 h-6" source={require('./../../assets/static/icons/icon_filter_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="flex-row">
                    <FlatList className="mt-3 mb-2 -mr-6"
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={activities}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                                        <View className="mr-2 border-2 border-secondary rounded-lg p-1">
                                            <Text className="text-sm text-secondary" style={{ fontFamily: 'Raleway_700Bold' }}>{item.categories.activity[0]}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}/>
                </View>

                <ScrollView className="-mr-6"
                            showsVerticalScrollIndicator={false}>
                    <View className="mt-3 mb-1">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Activities You Liked</Text>

                        <FlatList className="my-2 -mr-6"
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={activities}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => (
                                        <ItemActivity activityId={item.id} activityName={item.name} location={item.location} image={item.image} category={item.categories.activity[0]}
                                                    liked={!!likedActivities[item.id]} toggleLike={toggleLike}/>
                                    )}/>
                    </View>

                    <View className="my-1">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Your Interests</Text>

                        <FlatList className="my-2 -mr-6"
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={activities}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => (
                                        <ItemActivity activityId={item.id} activityName={item.name} location={item.location} image={item.image} category={item.categories.activity[0]}
                                                    liked={!!likedActivities[item.id]} toggleLike={toggleLike}/>
                                    )}/>
                    </View>

                    <View className="my-1">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Your Friend Groups Interests</Text>

                        <FlatList className="my-2 -mr-6"
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={activities}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => (
                                        <ItemActivity activityId={item.id} activityName={item.name} location={item.location} image={item.image} category={item.categories.activity[0]}
                                                    liked={!!likedActivities[item.id]} toggleLike={toggleLike}/>
                                    )}/>
                    </View>

                    <View className="my-1">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Close to You</Text>

                        <FlatList className="my-2 -mr-6"
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={activities}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => (
                                        <ItemActivity activityId={item.id} activityName={item.name} location={item.location} image={item.image} category={item.categories.activity[0]}
                                                    liked={!!likedActivities[item.id]} toggleLike={toggleLike}/>
                                    )}/>
                    </View>

                    <View className="my-1">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Done Before</Text>

                        <FlatList className="my-2 -mr-6"
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={activities}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => (
                                        <ItemActivity activityId={item.id} activityName={item.name} location={item.location} image={item.image} category={item.categories.activity[0]}
                                                liked={!!likedActivities[item.id]} toggleLike={toggleLike}/>
                                    )}/>
                    </View>

                    <View className="mt-12 mb-40 mr-6">
                        <TouchableOpacity>
                            <View className="items-center rounded-md p-3 bg-primary">
                                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Suprise Me!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </LayoutBackgroundSmall>
    )
};
