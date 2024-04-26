import { useTranslation } from 'react-i18next';
import i18n from './../../localization/i18next';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
// Components
import { BackButton } from '../../components/button/BackButton';

export function LanguageApp() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const selectedLanguage = (lng) => {
        return i18n.language === lng;
    };

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_03.png')}/>
            <View className="relative flex-row items-center w-full my-6 px-6">
                <BackButton />

                <View className="flex-[1] items-center">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.language.language-header')}</Text>
                </View>
            </View>

            <View className="rounded-t-3xl px-6 h-full bg-white">
                <View className="my-8 rounded-lg py-2 bg-gray">
                    <TouchableOpacity onPress={() => changeLanguage('en')} activeOpacity={0.7}>
                        <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-8">
                            <Text className={`text-base text-dark ${ selectedLanguage('en') ? 'opacity-100' : 'opacity-70'}`} style={{ fontFamily: 'Raleway_600SemiBold' }}>English</Text>
                            <View className={`rounded-full w-5 h-5 ${ selectedLanguage('en') ? 'border-[6px] border-secondary bg-white' : 'border-2 border-dark opacity-70'}`}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => changeLanguage('nl')} activeOpacity={0.7}>
                        <View className="flex-row justify-between items-center py-4 pl-5 pr-8">
                            <Text className={`text-base text-dark ${ selectedLanguage('nl') ? 'opacity-100' : 'opacity-70'}`} style={{ fontFamily: 'Raleway_600SemiBold' }}>Nederlands</Text>
                            <View className={`rounded-full w-5 h-5 ${ selectedLanguage('nl') ? 'border-[6px] border-secondary bg-white' : 'border-2 border-dark opacity-70'}`}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}