import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { color } from '../../assets/styles/Styles';

export function BackButton() {
    const navigation = useNavigation();

    return (
        <View className="absolute ml-6 z-10">
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.9}>
                <View className="rounded-md p-1 bg-white">
                    <Image className="w-9 h-9" style={{ tintColor: color.darkColor }}  source={require('./../../assets/static/icons/icon_arrow_left_01.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}