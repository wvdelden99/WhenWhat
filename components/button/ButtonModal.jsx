import { Image, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';


export function ButtonModal({buttonPress, buttonIcon, buttonNotification}) {
    return (
        <TouchableOpacity onPress={buttonPress} activeOpacity={opacity.opacity800}>
            <View className="rounded-md p-3 bg-white">
                <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={buttonIcon}/>
                <View className={`absolute top-2 right-2 rounded-full w-3 h-3 bg-primary ${ buttonNotification ? '' : 'hidden' }`}></View>
            </View>
        </TouchableOpacity>
    )
}
