import { useTranslation } from 'react-i18next';
import i18n from '../../../localization/i18next';
import { View } from 'react-native';
// Components
import { LayoutSettings } from '../../../components/layout/_layoutSettings';
import { ButtonNavigateSettings } from '../../../components/button/ButtonNavigateSetttings';
import { ButtonRadio } from '../../../components/button/ButtonRadio';


export function LanguageApp() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const selectedLanguage = (lng) => {
        return i18n.language === lng;
    };

    return (
        <LayoutSettings title={t('settings.language.language-header')}>
            <View className="my-8">
                <View className="my-2 rounded-2xl py-2 bg-gray">
                    <ButtonRadio handlePress={() => changeLanguage('en')}
                                setLanguage={selectedLanguage('en')}
                                buttonText="English"
                                buttonStyle/>
                    <ButtonRadio handlePress={() => changeLanguage('nl')}
                                setLanguage={selectedLanguage('nl')}
                                buttonText="Nederlands"/>
                </View>
            </View>
        </LayoutSettings>
    )
}

export function Language() {
    const { t } = useTranslation();

    return (
        <LayoutSettings title={t('settings.language.language-header')}>
            <View className="my-8">
                <View className="my-2 rounded-2xl py-2 bg-gray">
                    <ButtonNavigateSettings navigateLocation="AppLanguage"
                                    buttonTextStart={t('settings.language.app_language')}
                                    buttonTextEnd={t('Language')}/>
                </View>
            </View>
        </LayoutSettings>
    )
}