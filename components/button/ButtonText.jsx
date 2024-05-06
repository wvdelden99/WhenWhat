import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import { opacity } from '../../assets/styles/Styles';


export function ButtonText({navigateLocation, buttonText, buttonStyle, buttonFontWeight}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(navigateLocation)} activeOpacity={opacity.opacity700}>
            <Text className={`${buttonStyle}`} style={{ fontFamily: buttonFontWeight ? 'Raleway_700Bold' : 'Raleway_600SemiBold'}}>{buttonText}</Text>
        </TouchableOpacity>
    )
}