import { useEffect, useRef, useState } from 'react';
import { updateEmail, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { color, opacity } from '../../assets/styles/Styles';
// Component
import { BackButton } from '../../components/button/BackButton';


export function EditProfileEmail() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Textinput Pressable Area
    const inputRefs = useRef({});
    const focusInput = (inputName) => {
        inputRefs.current[inputName].focus();
    };

    // Update Email
    const [email, setEmail] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(true);
    
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email || '');
            setIsEmailVerified(user.emailVerified);
        }
    }, []);

    const [errors, setErrors] = useState({
        email: '',
        general: ''
    });

    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        setFormValid(!!email);
    });

    const handleUpdateEmail = async () => {
        setErrors({
            email: '',
            general: ''
        });
    
        if (email) {
            try {
                const user = auth.currentUser;
    
                await updateEmail(user, email);
                console.log('E-mailadres bijgewerkt!');
    
                await sendEmailVerification(user);
                setIsEmailVerified(false);
                console.log('Please check your email for verification.');
                
                navigation.navigate('EditProfile');
            } catch (err) {
                switch (err.code) {
                    case 'auth/invalid-email':
                        setErrors({...errors, email: t('error.error-email_invalid')});
                        break;
                    case 'auth/email-already-in-use':
                        setErrors({...errors, email: t('error.error-email_in_use')});
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
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.email')}</Text>
                </View>

                <TouchableOpacity onPress={() => focusInput('email')} activeOpacity={opacity.opacity700}>
                    <View className={`flex-row mb-5 border-2 rounded-2xl pt-2 pb-4 px-5 min-h-[48px] bg-gray ${ errors.email || errors.general ? 'border-error' : 'border-transparent' }`}>
                        <TextInput className="pr-6 w-full text-base" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                    ref={(ref) => { inputRefs.current['email'] = ref; }}
                                    value={email}
                                    onChangeText={value => setEmail(value)}
                                    placeholder={t('settings.edit_profile.email')}/>
                        <TouchableOpacity onPress={() => setEmail('')} activeOpacity={opacity.opacity600}>
                            <View className="absolute w-full top-1 right-4">
                                <Image className="w-6 h-6 opacity-80" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_cross_02.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                {(errors.email || errors.general) && 
                    <View className="flex-row items-center -mt-2 mb-3">
                        <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.email || errors.general}</Text>
                    </View>}

                {!isEmailVerified && (
                    <View className="-mt-1 mb-8">
                        <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.email-verification_false')}</Text>
                    </View>)}

                <TouchableOpacity onPress={handleUpdateEmail} disabled={!formValid} activeOpacity={opacity.opacity900}>
                    <View className={`items-center rounded-2xl p-3 ${ formValid ? 'bg-primary' : 'bg-primary-disabled'}`}>
                        <Text className={`text-lg ${ formValid ? 'text-dark' : 'text-dark-disabled opacity-70'}`} style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.save')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
