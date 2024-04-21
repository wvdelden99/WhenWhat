import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"

export function Register() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_03.png')} />

            <View className="flex-[1] items-center">
                <View className="items-center">
                    <Image className="my-6" source={require('./../../assets/static/logo/logo_when_&_what_02.png')} />
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
                </View>

                <View className="mt-6 w-[300px]">
                    <View className="flex-row mb-5 rounded-2xl p-4 bg-white">
                        <Image className="ml-1 mr-3 w-6 h-6 opacity-50" source={require('./../../assets/static/icons/icon_user_02.png')}/>
                        <TextInput className="-mt-[6px] text-base"  style={{ fontFamily: 'Raleway_500Medium' }}
                                    placeholder={t('auth.input-name')}/>
                    </View>
                    <View className="flex-row mb-5 rounded-2xl p-4 bg-white">
                        <Image className="ml-1 mr-3 w-6 h-6 opacity-50" source={require('./../../assets/static/icons/icon_user_02.png')}/>
                        <TextInput className="-mt-[6px] text-base"  style={{ fontFamily: 'Raleway_500Medium' }}
                                    placeholder={t('auth.input-username')}/>
                    </View>
                    <View className="flex-row mb-5 rounded-2xl p-4 bg-white">
                        <Image className="ml-1 mr-3 w-6 h-6 opacity-50" source={require('./../../assets/static/icons/icon_mail_03.png')}/>
                        <TextInput className="-mt-[6px] text-base"  style={{ fontFamily: 'Raleway_500Medium' }}
                                    placeholder={t('auth.input-email')}/>
                    </View>
                    <View className="flex-row justify-between mb-5 rounded-2xl p-4 bg-white">
                        <View className="flex-row">
                            <Image className="ml-1 mr-3 w-6 h-6 opacity-50" source={require('./../../assets/static/icons/icon_lock_02.png')}/>
                            <TextInput className="-mt-[6px] text-base"  style={{ fontFamily: 'Raleway_600SemiBold' }}
                                        placeholder={t('auth.input-password')}/>
                        </View>
                        <Image className="w-6 h-6 opacity-40" source={require('./../../assets/static/icons/icon_hide_01.png')}/>
                    </View>
                    <View className="flex-row justify-between mb-5 rounded-2xl p-4 bg-white">
                        <View className="flex-row">
                            <Image className="ml-1 mr-3 w-6 h-6 opacity-50" source={require('./../../assets/static/icons/icon_lock_02.png')}/>
                            <TextInput className="-mt-[6px] text-base"  style={{ fontFamily: 'Raleway_600SemiBold' }}
                                        placeholder={t('auth.input-password_confirm')}/>
                        </View>
                        <Image className="w-6 h-6 opacity-40" source={require('./../../assets/static/icons/icon_hide_01.png')}/>
                    </View>

                    <TouchableWithoutFeedback>
                        <View className="items-center mt-3 rounded-2xl p-3 bg-primary">
                            <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View className="items-center my-6">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.sign_up_with')}</Text>

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
                    <Text className="text-base mr-1 text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.signup.have_account')}</Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.login.login-header-alt')}</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    )
}