import { Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../../assets/styles/Styles';


export function ItemActivity({activityName, location, image, category}) {
    return (
        <View className="rounded-lg mr-3 w-[120px] h-[160px] bg-gray">
            <Image className="absolute rounded-lg w-full h-full bg-cover bg-center" source={{ uri: image }}/>

            <View className="absolute p-3 w-full h-full">
                <View className="flex-row justify-between items-center -mr-[3px]">
                    <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                        <View className="rounded-md py-1 px-[5px] max-w-[72px] bg-secondary">
                            <Text className="text-sm text-white" ellipsizeMode="tail" numberOfLines={1} style={{ fontFamily: 'Raleway_600SemiBold' }}>{category}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                        <Image className="w-6 h-6" style={{ tintColor: "white"}} source={require('./../../../assets/static/icons/icon_heart_01.png')}/>
                    </TouchableOpacity>
                </View>

                <View className="flex-[1] justify-end">
                    <Text className="max-w-[108px] text-base text-white" ellipsizeMode="tail" numberOfLines={1} style={{ fontFamily: 'Raleway_600SemiBold' }}>{activityName}</Text>
                    <Text className="-mt-[3px] text-sm text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{location}</Text>
                </View>
            </View>
        </View>
    )
}
