import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
// Components
import { LayoutSettings } from '../../components/layout/LayoutSettings';
import { ButtonNavigate } from '../../components/button/ButtonNavigate';


export function Settings() {
    const { t } = useTranslation();

    return (
        <LayoutSettings title={t('settings.settings-header')}>
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
                        <ButtonNavigate navigateLocation="EditProfile" 
                                        buttonText={t('settings.edit_profile.edit_profile-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_user_01.png')}
                                        buttonStyle/>
                        <ButtonNavigate navigateLocation="PasswordAndSecurity" 
                                        buttonText={t('settings.password_and_security.password_and_security-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_protect_01.png')}
                                        buttonStyle/>
                        <ButtonNavigate navigateLocation="Privacy" 
                                        buttonText={t('settings.privacy.privacy-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_lock_01.png')}
                                        buttonStyle/>
                        <ButtonNavigate navigateLocation="BillingAndSubscriptions" 
                                        buttonText={t('settings.billing_and_subscriptions.billing_and_subscriptions-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_wallet_01.png')}/>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.settings-subheader-content')}</Text>

                    <View className="my-2 rounded-xl py-2 bg-gray">
                        <ButtonNavigate navigateLocation="ActivityPreferences" 
                                        buttonText={t('settings.activity_preferences.activity_preferences-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_preferences_01.png')}
                                        buttonStyle/>
                        <ButtonNavigate navigateLocation="Notifications" 
                                        buttonText={t('settings.notifications.notifications-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_notifications_01.png')}
                                        buttonStyle/>
                        <ButtonNavigate navigateLocation="Language" 
                                        buttonText={t('settings.language.language-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_language_01.png')}
                                        buttonStyle/>
                        <ButtonNavigate navigateLocation="Accessibility" 
                                        buttonText={t('settings.accessibility.accessibility-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_accessibility_01.png')}/>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.settings-subheader-support_and_information')}</Text>

                    <View className="my-2 rounded-xl py-2 bg-gray">
                        <ButtonNavigate navigateLocation="Support" 
                                        buttonText={t('settings.support.support-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_support_01.png')}
                                        buttonStyle/>
                        <ButtonNavigate navigateLocation="TermsAndConditions" 
                                        buttonText={t('settings.terms_and_conditions.terms_and_conditions-header')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_info_01.png')}/>
                    </View>
                </View>

                <View className="mb-40">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.settings-subheader-login')}</Text>

                    <View className="my-2 rounded-xl py-2 bg-gray">
                        <ButtonNavigate handleLogout={async () => await signOut(auth)}
                                        buttonText={t('settings.logout')} 
                                        buttonIcon={require('./../../assets/static/icons/icon_logout_01.png')}/>
                    </View>
                </View>
            </ScrollView>
        </LayoutSettings>
    )
}