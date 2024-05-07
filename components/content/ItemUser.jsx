import { Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../assets/styles/Styles';

export function ItemUser({buttonPress, item}) {
    return (
        <View className="flex-row justify-between items-center my-3">
            <View className="flex-row items-center gap-3">
                <Image className="rounded-full w-12 h-12 bg-gray"/>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item.username}</Text>
            </View>

            <View className="pr-3">
                <TouchableOpacity onPress={buttonPress} activeOpacity={opacity.opacity600}>
                    <Image className="w-6 h-6 opacity-70" source={require('./../../assets/static/icons/icon_add_user_01.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
