import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';


export function ButtonBack({positionAbsolute}) {
    const navigation = useNavigation();

    return (
        <View className={`ml-6 z-40 ${ positionAbsolute ? 'absolute' : ''}`}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={opacity.opacity900}>
                <View className="rounded-md p-1 bg-white">
                    <Image className="w-9 h-9" style={{ tintColor: color.darkColor }}  source={require('./../../assets/static/icons/icon_arrow_left_01.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}
