import { useAuth } from '../../config/auth/authContext';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';


export function User() {
    const navigation = useNavigation();
    const { user } = useAuth();

    return (
        <LayoutBackgroundMedium>
            <View>
                <View className="px-6">
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')} activeOpacity={opacity.opacity800}>
                        <View className="self-end rounded-md p-3 bg-white">
                            <Image className="w-7 h-7" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_settings_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="items-center mb-6">
                    <View className="">
                        <Image className="rounded-full w-[112px] h-[112px] bg-gray"/>
                        <TouchableOpacity activeOpacity={opacity.opacity800}>
                            <View className="absolute rounded-full p-3 bg-white bottom-0 right-0">
                                <Image className="w-4 h-4" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_edit_01.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="my-2">
                        <Text className="text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>@{user.username}</Text>
                    </View>
                </View>
            </View>

            <View className="rounded-t-3xl h-full bg-white">

            </View>
        </LayoutBackgroundMedium>
    )
}
