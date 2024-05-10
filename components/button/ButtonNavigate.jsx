import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../assets/styles/Styles';


export function ButtonNavigate({navigateLocation, buttonText, buttonStyle}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(navigateLocation)} activeOpacity={opacity.opacity900}>
            <View className={`items-center my-2 rounded-2xl p-3 ${ buttonStyle ? 'bg-primary' : 'bg-white' }`}>
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    )
}
