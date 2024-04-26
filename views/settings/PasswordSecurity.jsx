import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { color, opacity } from '../../assets/styles/Styles';
// Component
import { BackButton } from '../../components/button/BackButton';


export function PasswordSecurity() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_03.png')}/>
            <View className="relative flex-row items-center w-full my-6 px-6">
                <BackButton />

                <View className="flex-[1] items-center">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.password_and_security.password_and_security-header')}</Text>
                </View>
            </View>

            <View className="rounded-t-3xl h-full px-6 bg-white">
                <View className="my-6">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.password_and_security.password')}</Text>
                
                    <View className="my-2 rounded-xl py-2 bg-gray">
                        <TouchableOpacity activeOpacity={opacity.opacity700}>
                            <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.password_and_security.password')}</Text>
                                <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}