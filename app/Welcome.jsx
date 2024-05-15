import { useTranslation } from 'react-i18next';
import { Image, Text, SafeAreaView, View } from 'react-native';
// Components
import { ButtonNavigate } from '../components/button/ButtonNavigate';


export function Welcome() {
    const { t } = useTranslation();

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <Image className="absolute w-full h-[480px] bg-contain" source={require('./../assets/static/images/image_friend_group_01.jpg')}/>

            <View className="flex-[1]">
                <View className="justify-center items-center h-1/2">
                    <Image className="" source={require('./../assets/static/logo/logo_when_&_what_01.png')}/>
                </View>
            </View>

            <View className="flex-[1] rounded-t-3xl px-6 bg-secondary-light">
                <Image className="absolute rounded-t-3xl bg-cover" source={require('./../assets/static/images/image_background_02.png')}/>

                <View className="my-8">
                    <View className="px-3">
                        <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.welcome-header')}</Text>
                        <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_500Medium' }}>{t('auth.welcome-subheader')}</Text>
                    </View>

                    <View className="items-center mt-10 mb-14">
                        <View className="w-[320px]">
                            <ButtonNavigate navigateLocation="SignIn"
                                            buttonText={t('auth.signin.signin-header')}
                                            buttonStyle/>
                            <ButtonNavigate navigateLocation="SignUp"
                                            buttonText={t('auth.signup.signup-header')}/>
                        </View>
                    </View>

                    <View className="items-center">
                        <Image className="w-[64px] h-[14px]" source={require('./../assets/static/logo/logo_wsly_01.png')}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
