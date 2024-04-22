import { useEffect, useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { color } from '../../assets/styles/Styles';


export function SignIn() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Textinput Pressable Area
    const inputRefs = useRef({});
    const focusInput = (inputName) => {
        inputRefs.current[inputName].focus();
    };

    // Password Visibility
    const [hidePassword, setHidePassword] = useState(true);
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    // Submit Sign In
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        login: ''
    });

    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        setFormValid(!!email && !!password);
    });

    const handleSubmit = async () => {
        setErrors({
            login: ''
        });

        if (email && password) {
            console.log('test')
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch(err) {
                setErrors({...errors, login: t('error.error-login')});
            }
        }
    }

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_02.png')} />

            <View className="items-center mt-20">
                <Image className="" source={require('./../../assets/static/logo/logo_when_&_what_02.png')} />
            </View>

            <View className="flex-[1] justify-center items-center">
                <View className="mb-8">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signin.signin-header')}</Text>
                </View>

                <View className="w-[300px]">
                    {errors.login && 
                        <View className="flex-row items-center -mt-1 mb-2">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                            <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.login}</Text>
                        </View>}

                    <TouchableWithoutFeedback onPress={() => focusInput('email')}>
                        <View className={`flex-row mb-5 rounded-2xl pt-2 pb-4 px-4 min-h-[48px] bg-white ${ errors.login ? 'border-2 border-error' : 'border-2 border-transparent'}`}>
                            <Image className={`mt-2 ml-1 mr-3 w-6 h-6 ${ errors.login ? 'opacity-80' : 'opacity-50' }`} style={{ tintColor: errors.login ? color.errorColor : color.darkColor }} source={require('./../../assets/static/icons/icon_mail_03.png')} />
                            <TextInput className="pr-9 text-base bg-white" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                        ref={(ref) => { inputRefs.current['email'] = ref; }}
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder={t('auth.input-email')}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => focusInput('password')}>
                        <View className={`flex-row mb-2 rounded-2xl pt-2 pb-4 px-4 min-h-[48px] bg-white ${ errors.login ? 'border-2 border-error' : 'border-2 border-transparent'}`}>
                            <View className="flex-row pr-28">
                                <Image className={`mt-2 ml-1 mr-3 w-6 h-6 ${ errors.login ? 'opacity-80' : 'opacity-50' }`} style={{ tintColor: errors.login ? color.errorColor : color.darkColor }} source={require('./../../assets/static/icons/icon_lock_02.png')}/>
                                <TextInput className="text-base" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                            ref={(ref) => { inputRefs.current['password'] = ref; }}
                                            secureTextEntry={hidePassword}
                                            value={password}
                                            onChangeText={value=> setPassword(value)}
                                            placeholder={t('auth.input-password')}/>
                            </View>
                            <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                                <View className="absolute top-4 right-4">
                                    <Image className={`w-6 h-6 ${ errors.login ? 'opacity-70' : 'opacity-40' }`} style={{ tintColor: errors.login ? color.errorColor : color.darkColor }} source={require('./../../assets/static/icons/icon_hide_01.png')}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>

                    <View className="items-end mb-5">
                        <TouchableWithoutFeedback>
                            <Text className="text-sm text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.signin.forgot_password')}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    
                    <TouchableWithoutFeedback onPress={handleSubmit} disabled={!formValid}>
                        <View className={`items-center mt-3 rounded-2xl p-3 ${ formValid ? 'bg-primary' : 'bg-primary-disabled'}`}>
                            <Text className={`text-lg ${ formValid ? 'text-dark' : 'text-dark-disabled opacity-70'}`} style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signin.signin-header')}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View className="items-center my-12">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signin.sign_in_with')}</Text>

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
                    <Text className="text-base mr-1 text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.signin.no_account')}</Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUp')}>
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    )
}