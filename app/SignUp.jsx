import { useRef, useState } from 'react';
import { useAuth } from '../config/auth/authContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../assets/styles/Styles';
// Components
import { LayoutAuth } from "../components/layout/_layoutAuth";
import { ButtonSubmit } from '../components/button/ButtonSubmit';
import { ButonOtherAuth } from '../components/button/ButtonAuthOther';
import { InputAuth } from '../components/form/InputAuth';
import { LoadingAnimationPrimary } from '../components/animations/LoadingAnimationPrimary';


export function SignUp() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Sign Up User
    const { signUp } = useAuth();

    const usernameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmationRef = useRef("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
    const [generalError, setGeneralError] = useState("");
    
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true);
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setPasswordConfirmationError("");
        setGeneralError("");
    
        // Check if empty fields
        if (!usernameRef.current || !emailRef.current || !passwordRef.current || !passwordConfirmationRef.current) {
            setGeneralError(t('error.error-general_empty_fields'));
            setLoading(false);
            return;
        }

        // Check if password field is equal to password confirmation field
        if (passwordRef.current !== passwordConfirmationRef.current) {
            setPasswordConfirmationError(t('error.error-password_not_match'));
            setLoading(false);
            return;
        }
        
        const response = await signUp(usernameRef.current, emailRef.current, passwordRef.current, passwordConfirmationRef.current);
        
        // Error Messages
        if (!response.success) {
            switch (response.errorCode) {
                case "username_in_use":
                case "username_too_short":
                    setUsernameError(response.message);
                    break;
                case "email_invalid":
                case "email_in_use":
                    setEmailError(response.message);
                    break;
                case "password_weak":
                    setPasswordError(response.message);
                    break;
                default:
                    setGeneralError(response.message);
            }
            setLoading(false);
            return;
        }
    };

    return (
        <LayoutAuth imageLogo>
            <View className="w-[300px] items-center">
                <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>

                <View className="mt-5 mb-6 w-full">
                    <InputAuth focusArea={usernameRef}
                                onChangeText={value => usernameRef.current = value}
                                placeholderText={t('components.form.auth.username')}
                                inputIcon={require('./../assets/static/icons/icon_user_02.png')}
                                errorForm={usernameError || generalError}
                                errorText={usernameError}/>
                    <InputAuth focusArea={emailRef}
                                onChangeText={value => emailRef.current = value}
                                placeholderText={t('components.form.auth.email')}
                                inputIcon={require('./../assets/static/icons/icon_mail_03.png')}
                                errorForm={emailError || generalError}
                                errorText={emailError}/>
                    <InputAuth focusArea={passwordRef}
                                onChangeText={value => passwordRef.current = value}
                                placeholderText={t('components.form.auth.password')}
                                inputIcon={require('./../assets/static/icons/icon_lock_02.png')}
                                visibleIcon
                                errorForm={passwordError || passwordConfirmationError || generalError}
                                errorText={passwordError}/>
                    <InputAuth focusArea={passwordConfirmationRef}
                                onChangeText={value => passwordConfirmationRef.current = value}
                                placeholderText={t('components.form.auth.password-confirmation')}
                                inputIcon={require('./../assets/static/icons/icon_lock_02.png')}
                                visibleIcon
                                errorForm={passwordConfirmationError || generalError}
                                errorText={passwordConfirmationError}/>

                    {generalError &&
                        <View className="flex-row items-center pr-1">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../assets/static/icons/icon_info_01.png')}/>
                            <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{generalError}</Text>
                        </View>
                    }
                </View>

                { loading ?
                    <View className="-mt-5 -mb-5">
                        <LoadingAnimationPrimary />
                    </View>
                    : 
                    <ButtonSubmit handleSubmit={handleSignUp}
                                buttonText={t('auth.signup.signup-header')}
                                formValidValue={{}}
                                disabled={loading} />
                }

                <View className="items-center my-7">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.sign_up_with')}</Text>
                    <ButonOtherAuth />
                </View>

                <View className="flex-row justify-center">
                    <Text className="mr-1 text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.signup.have_account')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")} activeOpacity={opacity.opacity700}>
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signin.signin-header-alt')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LayoutAuth>
    )
}
