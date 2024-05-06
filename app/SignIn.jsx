import { useRef, useState } from 'react';
import { useAuth } from '../config/auth/authContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../assets/styles/Styles';
// Components
import { LayoutAuth } from "../components/layout/_layoutAuth";
import { ButtonSubmit } from "../components/button/ButtonSubmit";
import { ButonOtherAuth } from '../components/button/ButtonAuthOther';
import { InputAuth } from "../components/form/InputAuth";
import { LoadingAnimationPrimary } from '../components/animations/LoadingAnimationPrimary';


export function SignIn() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Sign In User
    const { signIn } = useAuth();

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const [loginError, setLoginError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        setLoginError("");
        setGeneralError("");

        // Check if fields are empty
        if (!emailRef.current || !passwordRef.current) {
            setGeneralError(t('error.error-general_empty_fields'));
            setLoading(false);
            return;
        }

        const response = await signIn(emailRef.current, passwordRef.current);

        // Error Messages
        if (!response.succes) {
            switch(response.errorCode) {
                case "signin_failed":
                    setLoginError(response.message);
                    break;
                default:
                    setGeneralError(response.message);
            }
            setLoading(false);
            return;
        }
    };
    //     if (!response || !response.success) {
    //         if (response.errorCode === 'signin_failed') {
    //             setLoginError(response.msg);
    //         } else {
    //             setGeneralError(response.msg || t('error.error-general'));
    //         }
    //         setLoading(false);
    //         return;
    //     }
    // };

    return (
        <LayoutAuth imageLogo>
            <View className="w-[300px] items-center">
                <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signin.signin-header')}</Text>

                <View className="mt-5 mb-6 w-full">
                    <InputAuth focusArea={emailRef}
                                onChangeText={value=> emailRef.current=value}
                                placeholderText={t('components.form.auth.email')}
                                inputIcon={require('./../assets/static/icons/icon_mail_03.png')}
                                errorForm={loginError || generalError}/>
                    <InputAuth focusArea={passwordRef}
                                onChangeText={value=> passwordRef.current=value}
                                placeholderText={t('components.form.auth.password')}
                                inputIcon={require('./../assets/static/icons/icon_lock_02.png')}
                                visibleIcon
                                errorForm={loginError || generalError}/>

                    {(loginError || generalError) &&
                        <View className="flex-row items-center">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../assets/static/icons/icon_info_01.png')}/>
                            <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{loginError || generalError}</Text>
                        </View>
                    }

                    <View className="items-end">
                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} activeOpacity={opacity.opacity900}>
                            <Text className="text-sm text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.signin.forgot_password')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                { loading ? 
                    <View className="-mt-5 -mb-5">
                        <LoadingAnimationPrimary />
                    </View>
                    :
                    <ButtonSubmit handleSubmit={handleSignIn}
                                buttonText={t('auth.signin.signin-header-alt')}
                                formValidValue={{}}
                                disabled={loading}/>
                }

                <View className="items-center my-7">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signin.sign_in_with')}</Text>
                    <ButonOtherAuth />
                </View>

                <View className="flex-row justify-center">
                    <Text className="mr-1 text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('auth.signin.no_account')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")} activeOpacity={opacity.opacity700}>
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('auth.signup.signup-header')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LayoutAuth>
    )
}
