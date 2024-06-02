import { Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../../assets/styles/Styles';


export function ItemInterestTag({stylePrimary, styleSecondary, tagText}) {
    return (
        <View className="m-1">
            <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                <View className={`rounded-md py-1 px-3 ${ stylePrimary ? 'bg-primary' : 'bg-secondary'}`}>
                    <Text className={`text-base ${ stylePrimary ? 'text-dark' : 'text-white'}`} style={{ fontFamily: 'Raleway_600SemiBold' }}>{tagText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
