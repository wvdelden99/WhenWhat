import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';


export function ItemFriend() {
    return (
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row items-center gap-3">
                <Image className="rounded-full w-12 h-12 bg-gray"/>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Username</Text>
            </View>

            <View className="pr-2">
                <TouchableOpacity activeOpacity={opacity.opacity600}>
                    <Image className="w-5 h-5 opacity-50" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_dots_horizontal_01.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
