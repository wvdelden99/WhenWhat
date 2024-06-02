import { useAuth } from '../../../config/auth/authContext';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
// Components
import { LayoutSettings } from '../../../components/layout/_layoutSettings';
import { InputSearch } from '../../../components/form/InputSearch'
import { ButtonNavigateSettings } from '../../../components/button/ButtonNavigateSetttings';


export function Settings() {
    const { t } = useTranslation();

    const {logout} = useAuth();
    const handleSignOut = async () => {
        await logout();
    }

    return (
        <LayoutSettings title={t('settings.settings-header')}>
            <View className="my-6">
                <InputSearch placeholderText={t('components.search.search')}/>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.settings-subheader-account')}</Text>

                    <View className="my-2 rounded-xl py-2 bg-gray">
                        <ButtonNavigateSettings navigateLocation="EditProfile" 
                                        buttonTextStart={t('settings.edit_profile.edit_profile-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_user_01.png')}
                                        buttonStyle/>
                        <ButtonNavigateSettings navigateLocation="PasswordAndSecurity" 
                                        buttonTextStart={t('settings.password_and_security.password_and_security-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_protect_01.png')}
                                        buttonStyle/>
                        <ButtonNavigateSettings navigateLocation="Privacy" 
                                        buttonTextStart={t('settings.privacy.privacy-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_lock_01.png')}
                                        buttonStyle/>
                        <ButtonNavigateSettings navigateLocation="BillingAndSubscriptions" 
                                        buttonTextStart={t('settings.billing_and_subscriptions.billing_and_subscriptions-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_wallet_01.png')}/>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.settings-subheader-content')}</Text>

                    <View className="my-2 rounded-xl py-2 bg-gray">
                        <ButtonNavigateSettings navigateLocation="ActivityPreferences" 
                                        buttonTextStart={t('settings.activity_preferences.activity_preferences-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_preferences_01.png')}
                                        buttonStyle/>
                        <ButtonNavigateSettings navigateLocation="Notifications" 
                                        buttonTextStart={t('settings.notifications.notifications-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_notifications_01.png')}
                                        buttonStyle/>
                        <ButtonNavigateSettings navigateLocation="Language" 
                                        buttonTextStart={t('settings.language.language-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_language_01.png')}
                                        buttonStyle/>
                        <ButtonNavigateSettings navigateLocation="Accessibility" 
                                        buttonTextStart={t('settings.accessibility.accessibility-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_accessibility_01.png')}/>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.settings-subheader-support_and_information')}</Text>

                    <View className="my-2 rounded-xl py-2 bg-gray">
                        <ButtonNavigateSettings navigateLocation="Support" 
                                        buttonTextStart={t('settings.support.support-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_support_01.png')}
                                        buttonStyle/>
                        <ButtonNavigateSettings navigateLocation="TermsAndConditions" 
                                        buttonTextStart={t('settings.terms_and_conditions.terms_and_conditions-header')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_info_01.png')}/>
                    </View>
                </View>

                <View className="mb-40">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.settings-subheader-login')}</Text>

                    <View className="my-2 rounded-xl py-2 bg-gray">
                        <ButtonNavigateSettings handleLogout={handleSignOut}
                                        buttonTextStart={t('settings.logout')} 
                                        buttonIcon={require('./../../../assets/static/icons/icon_logout_01.png')}/>
                    </View>
                </View>
            </ScrollView>
        </LayoutSettings>
    )
}
