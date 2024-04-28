import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { color, opacity } from '../../assets/styles/Styles';


export function ButtonNavigate({navigateLocation, handleLogout, buttonIcon, buttonText, buttonStyle}) {
    const navigation = useNavigation();

    const handlePress = async () => {
        // Navigation
        if (navigateLocation) {
            navigation.navigate(navigateLocation);
        // Logout
        } else if (handleLogout) {
            await handleLogout();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}  activeOpacity={opacity.opacity700}>
            <View className={`flex-row justify-between items-center py-4 pl-5 pr-4 ${ buttonStyle ? 'border-b-[1px] border-gray-dark' : '' }`}>
                <View className="flex-row items-center gap-4">
                    {buttonIcon && <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={buttonIcon}/>}
                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{buttonText}</Text>
                </View>
                <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')}/>
            </View>
        </TouchableOpacity>
    )
}