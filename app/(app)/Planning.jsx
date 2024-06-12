
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/firebase';  // Import your Firestore configuration
import activities from './../../assets/data/activities.json';  // Import your activities JSON file
import { color, opacity } from './../../assets/styles/Styles';
import { LayoutBackgroundSmall } from '../../components/layout/_layoutBackgroundSmall';
import { ItemPlannedActivityTimeframe } from '../../components/content/ItemPlannedActivityTimeframe';

export function Planning() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [plannedActivities, setPlannedActivities] = useState([]);

    useEffect(() => {
        const fetchPlannedActivities = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'plans'));
                const activitiesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Map activity IDs to their names
                const activitiesWithNames = activitiesData.map(activity => {
                    const activityDetail = activities.find(act => act.id === activity.activityId);
                    return {
                        ...activity,
                        activityName: activityDetail ? activityDetail.name : 'Unknown Activity'
                    };
                });

                setPlannedActivities(activitiesWithNames);
            } catch (error) {
                console.error('Error fetching planned activities:', error);
            }
        };

        fetchPlannedActivities();
    }, []);

    return (
        <LayoutBackgroundSmall>
            <View className="px-6">
                <View className="flex-row items-center my-6 px-3">
                    <View className="flex-[2]">
                        <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('planning.planning-header')}</Text>
                    </View>

                    <View className="flex-[1] items-center">
                        <Image className="rounded-lg w-[80px] h-[92px] bg-cover" source={require('./../../assets/static/images/image_friend_group_02.jpg')} />
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Agenda')} activeOpacity={opacity.opacity900}>
                    <View className="flex-row justify-center items-center rounded-2xl py-4 bg-primary">
                        <Image className="mr-2 w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_calendar_01.png')} />
                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('planning.planning-button')}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View className="mt-8 rounded-t-3xl px-6 h-full bg-white">
                <View className="flex-row justify-between items-center my-4">
                    <View className="">
                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('planning.planning-subheader')}</Text>
                    </View>
                    
                    <View className="flex-row gap-1">
                        <View className="rounded-lg p-3 bg-gray">
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_search_01.png')} />
                        </View>

                        <View className="rounded-lg p-3 bg-gray">
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_filter_01.png')} />
                        </View>
                    </View>
                </View>

                <FlatList
                    data={plannedActivities}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ItemPlannedActivityTimeframe activity={item} />
                    )}
                />
            </View>
        </LayoutBackgroundSmall>
    )
}
