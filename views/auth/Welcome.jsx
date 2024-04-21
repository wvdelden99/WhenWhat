import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TouchableWithoutFeedback, View } from "react-native"

export function Welcome() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_03.png')} />

            <View className="absolute items-center w-full mt-40">
                <Image source={require('./../../assets/static/logo/logo_when_&_what_02.png')}/>
            </View>

            <View className="flex-[1] justify-center items-center">
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                    <View className="items-center mb-5 rounded-2xl p-3 w-[280px] bg-primary">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.login.login-header')}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <View className="items-center rounded-2xl p-3 w-[280px] bg-white">
                        <Text className="text-lg text-darl" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}