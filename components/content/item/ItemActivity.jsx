import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color, opacity } from '../../../assets/styles/Styles';
// Components
import { ModalActivity } from '../modal/ModalActivity';


export function ItemActivity({groupId, currentDay, currentMonth, currentYear, currentUserData, selectedDate, activityId, activityName, location, image, category, categoriesActivity, categoriesSub, liked, toggleLike}) { 

    const [showModalActivity, setShowModalActivity] = useState(false);

    // Modal Activity
    const openModalAcitivity = () => {
        setShowModalActivity(true);
    };

    return (
        <>
        <TouchableOpacity onPress={openModalAcitivity}>
            <View className="rounded-lg mr-3 w-[120px] h-[160px] bg-gray">
                <Image className="absolute rounded-lg w-full h-full bg-cover bg-center" source={{ uri: image }}/>
                <LinearGradient className="absolute rounded-lg w-full h-full" colors={['rgba(0,0,0,0)', color.darkColor ]} locations={[0.45, 1]}/>

                <View className="absolute p-3 w-full h-full">
                    <View className="flex-row justify-between items-center -mr-[3px] z-10">
                        <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                            <View className="rounded-md py-1 px-[5px] max-w-[72px] bg-secondary">
                                <Text className="text-sm text-white" ellipsizeMode="tail" numberOfLines={1} style={{ fontFamily: 'Raleway_600SemiBold' }}>{category}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => toggleLike(activityId)} activeOpacity={opacity.opacity600}>
                            <Image className="w-6 h-6" style={{ tintColor: liked ? color.errorColor : 'white'}} source={require('./../../../assets/static/icons/icon_heart_01.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-[1] justify-end">
                        <Text className="max-w-[108px] text-base text-white" ellipsizeMode="tail" numberOfLines={1} style={{ fontFamily: 'Raleway_600SemiBold' }}>{activityName}</Text>
                        <Text className="-mt-[3px] text-sm text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{location}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

        <ModalActivity image={image} activityName={activityName} location={location} categoriesActivity={categoriesActivity} categoriesSub={categoriesSub} showModalActivity={showModalActivity} setShowModalActivity={setShowModalActivity}
                        groupId={groupId} currentDay={currentDay} currentMonth={currentMonth} currentYear={currentYear}
                        currentUserData={currentUserData} activityId={activityId} selectedDate={selectedDate}
                        />
        </>
    )
}
