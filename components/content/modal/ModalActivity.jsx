import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LayoutModal } from '../../layout/_layoutModal';
import { opacity } from '../../../assets/styles/Styles';
import { agendaRef, pollRef } from '../../../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';


export function ModalActivity({ selectedDate, groupId, currentDay, currentMonth, currentYear, currentUserData, activityId, image, activityName, location, categoriesActivity, categoriesSub, showModalActivity, setShowModalActivity}) {
    const navigation = useNavigation();

    // Modal Activity
    const closeModalActivity = () => {
        setShowModalActivity(false);
    };


    const pollActivity = async () => {
        try {
            const pollDocRef = doc(pollRef, groupId);
            const dateCollectionRef = collection(pollDocRef, selectedDate);

            const pollId = `${activityId}_${currentUserData.userId}`;
            const pollData = {
                pollId,
                activityId,
                groupId,
                userId: currentUserData.userId,
                date: selectedDate
            };

            await setDoc(doc(dateCollectionRef, pollId), pollData);
            closeModalActivity();
            navigation.navigate('FriendsContent');
        } catch (error) {
            console.log('Poll Activity Error:', error);
        }
    };
    return (
        <LayoutModal visible={showModalActivity}
                    handleIconLeft={closeModalActivity}
                    iconLeft={require('./../../../assets/static/icons/icon_arrow_down_03.png')}>
            <View className="flex-row">
                <View className="w-2/5">
                    <View className="rounded-lg w-[120px] h-[160px]">
                        <Image className="rounded-lg w-full h-full" source={{ uri: image }}/>
                    </View>
                </View>

                <View className="w-3/5">
                    <View className="">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{activityName}</Text>
                        <Text className="-mt-1 text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{location}</Text>
                    </View>
                    <View className="my-2">
                        <FlatList className="my-2"
                                data={categoriesActivity}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => (
                                    <View className="self-start rounded-md py-1 px-2 bg-primary">
                                        <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
                                    </View>
                                )}/>
                        <FlatList className="-mx-1 flex-row"
                                numColumns={2}
                                data={categoriesSub}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => (
                                    <View className="self-start m-1 rounded-md py-1 px-2 bg-secondary">
                                        <Text className="text-sm text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
                                    </View>
                                )}/>
                    </View>
                </View>
            </View>

            <View className="my-6 pl-12">
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                    mollit anim id est laborum.</Text>
            </View>

            <View className="absolute mb-28 mx-6 w-full bottom-0">
                <TouchableOpacity onPress={pollActivity} activeOpacity={opacity.opacity900}>
                    <View className="rounded-md p-3 bg-primary">
                        <Text className="text-base text-center text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Poll Acivity</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </LayoutModal>
    )
}
