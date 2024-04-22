import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { color } from '../../assets/styles/Styles';

import { auth } from '../../config/firebase';
// Components
import { BackButton } from '../../components/button/BackButton';
import { signOut } from 'firebase/auth';

export function Settings() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleLogout = async ()=>{
        await signOut(auth);
    }

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_01.png')}/>
            <View className="relative flex-row items-center w-full my-6 px-6">
                <BackButton />

                <View className="flex-[1] items-center">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.settings-header')}</Text>
                </View>
            </View>

            <View className="flex-[1] -mb-10 rounded-t-3xl px-6 h-full bg-white">
                <View className="my-6 flex-row items-center rounded-lg p-3 bg-gray">
                    <Image className="mr-4 w-5 h-5 opacity-50" source={require('./../../assets/static/icons/icon_search_01.png')}/>
                    <TextInput className="text-base bg-gray"
                                placeholder={t('components.search')}
                                style={{ fontFamily: 'Raleway_600SemiBold' }}/>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="mb-6">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.settings-subheader-account')}</Text>

                        <View className="my-2 rounded-xl py-2 bg-gray">
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('EditProfile')}>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_user_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.edit_profile-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_protect_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.password_and_security.password_and_security-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_lock_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.privacy.privacy-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_wallet_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.billing_and_subscriptions.billing_and_subscriptions-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View className="mb-6">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.settings-subheader-content')}</Text>

                        <View className="my-2 rounded-xl py-2 bg-gray">
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_preferences_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.activity_preferences.activity_preferences-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_notifications_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.notifications.notifications-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Language')}>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_language_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.language.language-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_accessibility_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.accessibility.accessibility-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    
                    <View className="mb-6">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.settings-subheader-support_and_information')}</Text>

                        <View className="my-2 rounded-xl py-2 bg-gray">
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_support_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.support.support-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_info_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.terms_and_conditions.terms_and_conditions-header')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View className="mb-32">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.settings-subheader-login')}</Text>

                        <View className="my-2 rounded-xl py-2 bg-gray">
                            <TouchableWithoutFeedback onPress={handleLogout}>
                                <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_logout_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.logout')}</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}