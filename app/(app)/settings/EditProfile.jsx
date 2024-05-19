import React, { useEffect, useState } from 'react';
import { auth } from '../../../config/firebase';
import { useAuth } from '../../../config/auth/authContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { blur, color, opacity, shadow } from '../../../assets/styles/Styles';
// Components
import { LayoutSettings } from '../../../components/layout/_layoutSettings';
import { ButtonNavigateSettings } from '../../../components/button/ButtonNavigateSetttings';
import { ButtonSubmit } from '../../../components/button/ButtonSubmit';
import { InputUpdate } from '../../../components/form/InputUpdate';
import { LoadingAnimationPrimary } from '../../../components/animations/LoadingAnimationPrimary';


export function EditProfileUsername() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Update User
    const { fetchCurrentUserData, updateUsername, user } = useAuth();
    const [username, setUsername] = useState(user ? user.username : '');

    const [usernameError, setUsernameError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user]);

    const handleUpdateUsername = async () => {
        setLoading(true);
        setUsernameError('');
        setGeneralError('');

        // Check if field is empty
        if (!username) {
            setGeneralError(t('error.error-general_empty_field'));
            setLoading(false);
            return;
        }

        const response = await updateUsername(username);

        // Error Messages
        if (!response.success) {
            switch(response.errorCode) {
                case "username_in_use":
                case "username_too_short":
                    setUsernameError(response.message);
                    break;
                default:
                    setGeneralError(response.message);
            }
            setLoading(false);
            return;
        }
        await fetchCurrentUserData(user.userId); 
        navigation.navigate('EditProfile');
        setLoading(false);
    };

    return (
        <LayoutSettings title={t('settings.edit_profile.edit_profile-header')}>
            <View className="my-8">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.username')}</Text>

                <View className="mb-6">
                    <InputUpdate focusArea={username}
                                valueText={username} 
                                onChangeText={setUsername}
                                placeholderText={t('settings.edit_profile.username')}
                                clearInput={setUsername}
                                errorForm={usernameError || generalError}
                                errorText={usernameError}/>

                    {generalError &&
                        <View className="flex-row items-center pr-1">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../../assets/static/icons/icon_info_01.png')}/>
                            <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{generalError}</Text>
                        </View>
                    }
                </View>

                {loading ? 
                    <View className="items-center -mt-5 -mb-5">
                        <LoadingAnimationPrimary />
                    </View>
                    :
                    <ButtonSubmit buttonText={t('components.button.update.save')}
                                handleSubmit={handleUpdateUsername}
                                formValidValue={username}
                                disabled={loading}/>
                }
            </View>
        </LayoutSettings>
    );
}


export function EditProfileEmail() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Update Email
    const { updateUserEmail } = useAuth();
    const [email, setEmail] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(true);

    const [emailError, setEmailError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCurrentUserEmail = async () => {
            const currentUserEmail = auth.currentUser.email;
            setEmail(currentUserEmail);
            setIsEmailVerified(auth.currentUser.emailVerified);
        };

        fetchCurrentUserEmail();
    }, []);

    const handleUpdateEmail = async () => {
        setLoading(true);
        setEmailError('');
        setGeneralError('');

        // Check if field is empty
        if (!email) {
            setGeneralError(t('error.error-general_empty_field'));
            setLoading(false);
            return;
        }

        const response = await updateUserEmail(email);

        // Error Messages
        if (!response.succes) {
            switch(response.errorCode) {
                case "email_invalid":
                case "email_in_use":
                    setEmailError(response.message);
                    break;
                default:
                    setGeneralError(response.message);
            }
            setLoading(false)
            return;
        }
        navigation.navigate('EditProfile');
    };

    return (
        <LayoutSettings title={t('settings.edit_profile.edit_profile-header')}>
            <View className="my-8">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.email')}</Text>

                <View className="mb-6">
                    <InputUpdate focusArea={email}
                                valueText={email}
                                onChangeText={setEmail}
                                placeholderText={t('settings.edit_profile.email')}
                                clearInput={setEmail}
                                errorForm={emailError || generalError}
                                errorText={emailError} />
                    
                    {generalError &&
                        <View className="flex-row items-center">
                            <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../../assets/static/icons/icon_info_01.png')}/>
                            <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{generalError}</Text>
                        </View>
                    }

                    {!isEmailVerified && (
                        <View className="my-2">
                            <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.email-verification_false')}</Text>
                        </View>)}
                </View>
    
                {loading ? 
                        <View className="items-center -mt-5 -mb-5">
                            <LoadingAnimationPrimary />
                        </View>
                    :
                        <ButtonSubmit buttonText={t('components.button.update.save')}
                                    handleSubmit={handleUpdateEmail} 
                                    formValidValue={email}
                                    disabled={loading}/>
                }
            </View>
        </LayoutSettings>
    );
}


export function EditProfileDeleteAccount() {
    const { t } = useTranslation();
    
    // Delete User
    const { deleteAccount } = useAuth();

    const [generalError, setGeneralError] = useState('');

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirmDelete = () => {
        setShowConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleDeleteAccount = async () => {
        setLoading(true);
        setGeneralError('');

        const response = await deleteAccount();
        if (!response.succes) {
            switch(response.errorCode) {
                default:
                    setGeneralError(response.message);
            };
            setLoading(false);
            return;
        }
    };


    return (
        <LayoutSettings title={t('settings.edit_profile.edit_profile-header')}>
            <View className="my-8">
                <View className="mb-8">
                    <Text className="mb-2 text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.delete_account.delete_account-header')}</Text>
                    <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_500Medium' }}>{t('settings.edit_profile.delete_account.delete_account-text')}</Text>
                </View>

                {loading ? (
                    <View className="items-center -mt-5 -mb-5">
                        <LoadingAnimationPrimary />
                    </View>
                ) : ( 
                    <TouchableOpacity onPress={handleConfirmDelete} disabled={loading} activeOpacity={opacity.opacity900}>
                        <View className="items-center rounded-xl p-4 bg-error">
                            <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.delete_account.delete_account-header')}</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {generalError && 
                    <View className="flex-row items-center my-3">
                        <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../../assets/static/icons/icon_info_01.png')} />
                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{generalError}</Text>
                    </View>
                }

                <Modal visible={showConfirmation}
                        transparent={true}
                        animationType="fade">
                    <TouchableOpacity  onPress={handleCancelDelete} className="flex-[1] justify-center items-center" style={{ backgroundColor: blur.blurBackground }}>
                        <View className="justify-center items-center rounded-xl w-4/5 bg-white" style={{ ...shadow.shadowNavbar }}>
                            <View className="py-6 px-4">
                                <Text className="text-base text-center text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Are you sure you want delete your account?</Text>
                            </View>

                            <View className="flex-row border-t-[1px] border-gray-dark w-full">
                                <TouchableOpacity onPress={handleCancelDelete} className="flex-[1]" activeOpacity={opacity.opacity600}>
                                    <View className="items-center border-r-[1px] border-gray-dark py-4">
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDeleteAccount} className="flex-[1]" activeOpacity={opacity.opacity600}>
                                    <View className="items-center py-4">
                                        <Text className="text-base text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>Delete</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </LayoutSettings>
    );
}


export function EditProfile() {
    const { t } = useTranslation();

    return (
        <LayoutSettings title={t('settings.edit_profile.edit_profile-header')}>
            <View className="my-8">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.edit_profile-subheader-user_data')}</Text>

                <View className="my-2 rounded-xl py-2 bg-gray">
                    <ButtonNavigateSettings navigateLocation="Username" 
                                            buttonTextStart={t('settings.edit_profile.username')}
                                            buttonStyle/>
                    <ButtonNavigateSettings navigateLocation="Email" 
                                            buttonTextStart={t('settings.edit_profile.email')}
                                            buttonStyle/>
                    <ButtonNavigateSettings navigateLocation="Name" 
                                            buttonTextStart={t('settings.edit_profile.name')}/>
                </View>
            </View>

            <View className="mb-6">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.edit_profile-subheader-delete_account')}</Text>

                <View className="my-2 rounded-xl py-2 bg-gray">
                    <ButtonNavigateSettings navigateLocation="DeleteAccount" 
                                            buttonTextStart={t('settings.edit_profile.delete_account.delete_account-header')}/>
                </View>
            </View>
        </LayoutSettings>
    )
}
