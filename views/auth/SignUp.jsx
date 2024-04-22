import { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { color } from '../../assets/styles/Styles';


export function SignUp() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Textinput Pressable Area
    const inputRefs = useRef({});
    const focusInput = (inputName) => {
        inputRefs.current[inputName].focus();
    };

    // Password Visibility
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };
    const togglePasswordConfirmVisibility = () => {
        setHidePasswordConfirm(!hidePasswordConfirm);
    };

    // Submit Sign Up
    // const [fullName, setFullName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        general: ''
    });

    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        setFormValid(!!displayName && !!email && !!password && !!passwordConfirm);
    });

    const handleSubmit = async () => {
        setErrors({
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            general: ''
        });

        if (displayName && email && password && passwordConfirm) {
            if (password !== passwordConfirm) {
                setErrors({...errors, passwordConfirm: t('error.error-password_not_match')});
                return;
            }
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredentials.user;
                await updateProfile(user, { displayName: displayName });
            } catch(err) {
                switch (err.code) {
                    case 'auth/username-already-in-use':
                        setErrors({...errors, username: t('error.error-username_in_use')});
                        break;
                    case 'auth/invalid-email':
                        setErrors({...errors, email: t('error.error-email_invalid')});
                        break;
                    case 'auth/email-already-in-use':
                        setErrors({...errors, email: t('error.error-email_in_use')});
                        break;
                    case 'auth/weak-password':
                        setErrors({...errors, password: t('error.error-password_weak')});
                        break;
                    default:
                        setErrors({...errors, general: t('error.error-general')});
                }
            }
        } else {
            setErrors({...errors, general: t('error.error-general_empty_fields')});
        }
    }

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_02.png')} />

            <View className="flex-[1] justify-center items-center">
                <View className="items-center">
                    <Image className="my-6" source={require('./../../assets/static/logo/logo_when_&_what_02.png')} />
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
                </View>

                <View className="mt-6 w-[300px]">
                    {errors.general && 
                        <View className="flex-row items-center -mt-1 mb-2">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                            <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.general}</Text>
                        </View>}

                    {/* Name /*}
                    {/* <TouchableWithoutFeedback onPress={() => focusInput('fullname')}>
                        <View className="flex-row mb-5 rounded-2xl p-4 bg-white">
                            <Image className="ml-1 mr-3 w-6 h-6 opacity-50" source={require('./../../assets/static/icons/icon_user_02.png')}/>
                            <TextInput className="-mt-[6px] text-base"  style={{ fontFamily: 'Raleway_500Medium' }}
                                        ref={(ref) => { inputRefs.current['fullname'] = ref; }}
                                        value={fullName}
                                        onChangeText={value=> setFullName(value)}
                                        placeholder={t('auth.input-name')}/>
                        </View>
                    </TouchableWithoutFeedback> */}

                    {/* Username */}
                    <TouchableWithoutFeedback onPress={() => focusInput('username')}>
                        <View className={`flex-row mb-5 rounded-2xl pt-2 pb-4 px-4 min-h-[48px] bg-white ${ errors.username || errors.general ? 'border-2 border-error' : 'border-2 border-transparent'}`}>
                            <Image className={`mt-2 ml-1 mr-3 w-6 h-6 ${ errors.username || errors.general ? 'opacity-80' : 'opacity-50' }`} style={{ tintColor: errors.username || errors.general ? color.errorColor : color.darkColor }} source={require('./../../assets/static/icons/icon_user_02.png')}/>
                            <TextInput className="pr-9 text-base"  style={{ fontFamily: 'Raleway_500Medium' }}
                                        ref={(ref) => { inputRefs.current['username'] = ref; }}
                                        value={displayName}
                                        onChangeText={value=> setDisplayName(value)}
                                        placeholder={t('auth.input-username')}/>
                        </View>
                    </TouchableWithoutFeedback>
                    {errors.username && 
                        <View className="flex-row items-center -mt-4 mb-3">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                            <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.username}</Text>
                        </View>}

                    {/* Email */}
                    <TouchableWithoutFeedback onPress={() => focusInput('email')}>
                        <View className={`flex-row mb-5 rounded-2xl pt-2 pb-4 px-4 min-h-[48px] bg-white ${ errors.email || errors.general ? 'border-2 border-error' : 'border-2 border-transparent'}`}>
                            <Image className={`mt-2 ml-1 mr-3 w-6 h-6 ${ errors.email || errors.general ? 'opacity-80' : 'opacity-50' }`} style={{ tintColor: errors.email || errors.general ? color.errorColor : color.darkColor }} source={require('./../../assets/static/icons/icon_mail_03.png')}/>
                            <TextInput className="pr-9 text-base" style={{ fontFamily: 'Raleway_500Medium' }}
                                        ref={(ref) => { inputRefs.current['email'] = ref; }}
                                        value={email}
                                        onChangeText={value=> setEmail(value)}
                                        placeholder={t('auth.input-email')}/>
                        </View>
                    </TouchableWithoutFeedback>
                    {errors.email && 
                        <View className="flex-row items-center -mt-4 mb-3">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                            <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.email}</Text>
                        </View>}

                    {/* Password */}
                    <TouchableWithoutFeedback onPress={() => focusInput('password')}>
                        <View className={`flex-row justify-between mb-5 rounded-2xl pt-2 pb-4 px-4 min-h-[48px] bg-white ${ errors.password || errors.general ? 'border-2 border-error' : 'border-2 border-transparent'}`}>
                            <View className="flex-row">
                                <Image className={`mt-2 ml-1 mr-3 w-6 h-6 ${ errors.password || errors.general ? 'opacity-80' : 'opacity-50' }`} style={{ tintColor: errors.password || errors.general ? color.errorColor : color.darkColor }} source={require('./../../assets/static/icons/icon_lock_02.png')}/>
                                <TextInput className="text-base" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                            ref={(ref) => { inputRefs.current['password'] = ref; }}
                                            secureTextEntry={hidePassword}
                                            value={password}
                                            onChangeText={value=> setPassword(value)}
                                            placeholder={t('auth.input-password')}/>
                            </View>
                            <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                                <View className="absolute top-4 right-4">
                                    <Image className={`w-6 h-6 ${ errors.password || errors.general ? 'opacity-70' : 'opacity-40' }`} style={{ tintColor: errors.password || errors.general ? color.errorColor : color.darkColor }} source={require('./../../assets/static/icons/icon_hide_01.png')}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                    {errors.password && 
                        <View className="flex-row -mt-4 mb-3 max-w-[300px] pr-2">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                            <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.password}</Text>
                        </View>}

                    {/* Password Confirmation */}
                    <TouchableWithoutFeedback onPress={() => focusInput('passwordConfirm')}>
                        <View className={`flex-row justify-between mb-5 rounded-2xl pt-2 pb-4 px-4 min-h-[48px] bg-white ${ errors.passwordConfirm || errors.general ? 'border-2 border-error' : 'border-2 border-transparent'}`}>
                            <View className="flex-row">
                                <Image className={`mt-2 ml-1 mr-3 w-6 h-6 ${ errors.passwordConfirm || errors.general ? 'opacity-80' : 'opacity-50' }`} style={{ tintColor: errors.passwordConfirm || errors.general ? color.errorColor : color.darkColor }}source={require('./../../assets/static/icons/icon_lock_02.png')}/>
                                <TextInput className="pr-9 text-base"  style={{ fontFamily: 'Raleway_600SemiBold' }}
                                            ref={(ref) => { inputRefs.current['passwordConfirm'] = ref; }}
                                            secureTextEntry={hidePasswordConfirm}
                                            value={passwordConfirm}
                                            onChangeText={value=> setPasswordConfirm(value)}
                                            placeholder={t('auth.input-password_confirm')}/>
                            </View>
                            <TouchableWithoutFeedback onPress={togglePasswordConfirmVisibility}>
                                <View className="absolute top-4 right-4">
                                    <Image className={`w-6 h-6 ${ errors.passwordConfirm || errors.general ? 'opacity-70' : 'opacity-40' }`} style={{ tintColor: errors.passwordConfirm || errors.general ? color.errorColor : color.darkColor }}  source={require('./../../assets/static/icons/icon_hide_01.png')}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                    {errors.passwordConfirm && 
                        <View className="flex-row -mt-4 mb-3 max-w-[300px] pr-2">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                            <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.passwordConfirm}</Text>
                        </View>}

                    <TouchableWithoutFeedback onPress={handleSubmit} disabled={!formValid}>
                        <View className={`items-center mt-3 rounded-2xl p-3 ${ formValid ? 'bg-primary' : 'bg-primary-disabled'}`}>
                            <Text className={`text-lg ${ formValid ? 'text-dark' : 'text-dark-disabled opacity-70'}`} style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
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
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('SignIn')}>
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signin.signin-header-alt')}</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    )
}