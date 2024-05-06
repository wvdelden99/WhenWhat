import { Image, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';


export function ButtonModal({buttonIcon}) {
    return (
        <TouchableOpacity activeOpacity={opacity.opacity800}>
            <View className="rounded-md p-3 bg-white">
                <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={buttonIcon}/>
            </View>
        </TouchableOpacity>
    )
}
