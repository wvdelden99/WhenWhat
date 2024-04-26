import { useEffect, useRef, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { color, opacity } from '../../assets/styles/Styles';
// Component
import { BackButton } from '../../components/button/BackButton';


export function EditProfileUsername() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Textinput Pressable Area
    const inputRefs = useRef({});
    const focusInput = (inputName) => {
        inputRefs.current[inputName].focus();
    };

    // Update Username
    const [displayName, setDisplayName] = useState('')
    
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setDisplayName(user.displayName || '');
        }
    }, []);

    const [errors, setErrors] = useState({
        username: '',
        general: ''
    });

    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        setFormValid(!!displayName);
    });

    const handleUpdateUsername = async () => {
        setErrors({
            username: '',
            general: ''
        });
    
        if (displayName) {
            try {
                const user = auth.currentUser;

                if (displayName) {
                    await updateProfile(user, { displayName: displayName });
                }
                navigation.navigate('EditProfile');
            } catch (err) {
                switch (err.code) {
                    case 'auth/username-already-in-use':
                        setErrors({...errors, username: t('error.error-username_in_use')});
                        break;
                    default:
                        setErrors({...errors, general: t('error.error-general')});
                }
            }
        } else {
            setErrors({...errors, general: t('error.error-general_empty_fields')});
        }
    };
    
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
                <View className="mt-8 mb-2">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.username')}</Text>
                </View>

                <TouchableOpacity onPress={() => focusInput('username')} activeOpacity={opacity.opacity700}>
                    <View className={`flex-row mb-8 border-2 rounded-2xl pt-2 pb-4 px-5 min-h-[48px] bg-gray ${ errors.displayName || errors.general ? 'border-error' : 'border-transparent' }`}>
                        <TextInput className="pr-6 w-full text-base" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                    ref={(ref) => { inputRefs.current['username'] = ref; }}
                                    value={displayName}
                                    onChangeText={value => setDisplayName(value)}
                                    placeholder={t('settings.edit_profile.username')}/>
                        <TouchableOpacity onPress={() => setDisplayName('')} activeOpacity={opacity.opacity600}>
                            <View className="absolute w-full top-1 right-4">
                                <Image className="w-6 h-6 opacity-80" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_cross_02.png')}/>
                            </View>        
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                {(errors.displayName || errors.general) && 
                    <View className="flex-row items-center -mt-5 mb-5">
                        <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.displayName || errors.general}</Text>
                    </View>}

                <TouchableOpacity onPress={handleUpdateUsername} disabled={!formValid} activeOpacity={opacity.opacity900}>
                    <View className={`items-center rounded-2xl p-3 ${ formValid ? 'bg-primary' : 'bg-primary-disabled'}`}>
                        <Text className={`text-lg ${ formValid ? 'text-dark' : 'text-disabled opacity-70'}`} style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.save')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}