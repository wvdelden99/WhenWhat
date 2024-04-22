import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TouchableWithoutFeedback, View } from "react-native"


export function Welcome() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute w-full h-[480px] bg-contain" source={require('./../../assets/static/images/image_friend_group_01.jpg')}/>

            <View className="flex-[1]">
                <View className="items-center justify-center h-1/2">
                    <Image source={require('./../../assets/static/logo/logo_when_&_what_02.png')}/>
                </View>
            </View>

            <View className="relative flex-[1] rounded-t-3xl px-6 bg-secondary-light">
                <Image className="absolute rounded-t-3xl bg-cover" source={require('./../../assets/static/images/image_background_01.png')} />

                <View className="my-8">
                    <View className="px-3">
                        <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.welcome-header')}</Text>
                        <Text className="text-xl text-white opacity-80" style={{ fontFamily: 'Raleway_500Medium' }}>{t('auth.welcome-subheader')}</Text>
                    </View>

                    <View className="items-center mt-14 mb-10">
                        <View className="w-[300px]">
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('SignIn')}>
                                <View className="items-center mb-5 rounded-2xl p-3 bg-primary">
                                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signin.signin-header')}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback  onPress={() => navigation.navigate('SignUp')}>
                                <View className="items-center rounded-2xl p-3 bg-white">
                                    <Text className="text-lg text-darl" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View className="items-center">
                        <Image className="w-[64px] h-[14px]" source={require('./../../assets/static/logo/logo_wsly_01.png')}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}