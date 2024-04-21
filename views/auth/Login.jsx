import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"

export function Login() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_03.png')} />

            <View className="items-center mt-20">
                <Image className="" source={require('./../../assets/static/logo/logo_when_&_what_02.png')} />
            </View>

            <View className="flex-[1] justify-center items-center">
                <View className="mb-8">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.login.login-header')}</Text>
                </View>

                <View className="w-[300px]">
                    <View className="flex-row mb-5 rounded-2xl p-4 bg-white">
                        <Image className="ml-1 mr-3 w-6 h-6 opacity-50" source={require('./../../assets/static/icons/icon_mail_03.png')}/>
                        <TextInput className="-mt-[6px] text-base"  style={{ fontFamily: 'Raleway_500Medium' }}
                                    placeholder={t('auth.input-email')}/>
                    </View>
                    <View className="flex-row justify-between mb-2 rounded-2xl p-4 bg-white">
                        <View className="flex-row">
                            <Image className="ml-1 mr-3 w-6 h-6 opacity-50" source={require('./../../assets/static/icons/icon_lock_02.png')}/>
                            <TextInput className="-mt-[6px] text-base"  style={{ fontFamily: 'Raleway_600SemiBold' }}
                                        placeholder={t('auth.input-password')}/>
                        </View>
                        <Image className="w-6 h-6 opacity-40" source={require('./../../assets/static/icons/icon_hide_01.png')}/>
                    </View>

                    <View className="items-end mb-5">
                        <TouchableWithoutFeedback>
                            <Text className="text-sm text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.login.forgot_password')}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    
                    <TouchableWithoutFeedback>
                        <View className="items-center rounded-2xl p-3 bg-primary">
                            <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.login.login-header')}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View className="items-center my-12">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.login.sign_in_with')}</Text>

                    <View className="flex-row mt-3">
                        <TouchableWithoutFeedback>
                            <Image className="mr-4 w-11 h-11" source={require('./../../assets/static/icons/icon_socials_google_01.png')}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <Image className="mr-4 w-11 h-11" source={require('./../../assets/static/icons/icon_socials_facebook_01.png')}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <Image className="w-11 h-11" style={{ tintColor: "white" }} source={require('./../../assets/static/icons/icon_socials_apple_01.png')}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View className="flex-row">
                    <Text className="text-base mr-1 text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.login.no_account')}</Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    )
}