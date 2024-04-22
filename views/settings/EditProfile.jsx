import { deleteUser } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TouchableWithoutFeedback, View } from "react-native";
// Component
import { BackButton } from '../../components/button/BackButton';

export function EditProfile() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const user = auth.currentUser;

    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
    
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }

    const handleDeleteAccount = () => {
        console.log('press')
        console.log('User to delete:', user); // Check if user is correctly retrieved
        if (!user) {
            console.error('User not found');
            return;
        }

        deleteUser(user)
            .then(() => {
                // User deleted.
                console.log('Account deleted');
            })
            .catch((error) => {
                console.error("Error deleting account:", error);
                Alert.alert(t('common.error'), t('settings.edit_profile.delete_error_message'));
            });
    }

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_01.png')}/>
            <View className="relative flex-row items-center w-full my-6 px-6">
                <BackButton />

                <View className="flex-[1] items-center">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.edit_profile-header')}</Text>
                </View>
            </View>

            <View className="rounded-t-3xl px-6 h-full bg-white">

                <Text>{user.email}</Text>

                <TouchableWithoutFeedback onPress={handleDeleteAccount}>
                    <View className="my-8 border-2 border-error rounded-lg p-5">
                        <Text className="text-base text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>Delete Account</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}