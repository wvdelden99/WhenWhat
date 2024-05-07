import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';


export function ItemFriendRequest({buttonStyle}) {
    return (
        <View className={`flex-row justify-between items-center my-2 ${ buttonStyle ? 'border-b-[1px] border-gray-dark' : '' }`}>
            <View className="flex-row items-center gap-3">
                <Image className="rounded-full w-12 h-12 bg-gray"/>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Username</Text>
            </View>

            <View className="flex-row items-center gap-2 pr-2">
                <TouchableOpacity activeOpacity={opacity.opacity600}>
                    <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_check_01.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={opacity.opacity600}>
                    <Image className="w-7 h-7" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_cross_02.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
