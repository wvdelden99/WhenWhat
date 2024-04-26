import { useState } from "react";
import { deleteUser } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { color, opacity } from '../../assets/styles/Styles';
// Component
import { BackButton } from '../../components/button/BackButton';


export function EditProfileDeleteAccount() {
    const { t } = useTranslation();

    // Delete User
    const [errors, setErrors] = useState('');

    const handleDeleteAccount = () => {
        const user = auth.currentUser;

        if (!user) {
            return;
        }

        deleteUser(user)
            .then(() => {})
            .catch((error) => {
                console.error("Error deleting account:", error);
                setErrors(t('error.error-general'));
            });
    }
    
    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_03.png')}/>
            <View className="relative flex-row items-center w-full my-6 px-6">
                <BackButton />

                <View className="flex-[1] items-center">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.edit_profile-header')}</Text>
                </View>
            </View>

            <View className="rounded-t-3xl px-6 h-full bg-white">
                <View className="my-8">
                    <Text className="mb-2 text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.edit_profile-subheader-delete_account')}</Text>
                    <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_500Medium' }}>{t('settings.edit_profile.delete_account.delete_account-text')}</Text>
                </View>

                <TouchableOpacity onPress={handleDeleteAccount} activeOpacity={opacity.opacity900}>
                    <View className="items-center rounded-xl py-5 bg-error">
                        <Text className="text-base text-white" style={{ fontFamily: 'Raleway_700Bold' }}>Delete Account</Text>
                    </View>
                </TouchableOpacity>

                {(errors.general) && 
                    <View className="flex-row items-center my-3">
                        <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.general}</Text>
                    </View>}
            </View>
        </SafeAreaView>
    );
}