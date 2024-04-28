import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { updateEmail, updateProfile, deleteUser } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { LayoutSettings } from '../../components/layout/LayoutSettings';
import { ButtonNavigate } from '../../components/button/ButtonNavigate';
import { ButtonSubmit } from '../../components/button/ButtonSubmit';
import { InputUpdate } from '../../components/form/InputUpdate';


export function EditProfileUsername() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Update Username
    const [displayName, setDisplayName] = useState('');

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
                        console.log(err)
                }
            }
        } else {
            setErrors({...errors, general: t('error.error-general_empty_fields')});
        }
    };

    return (
        <LayoutSettings title="Edit Profile">
            <View className="my-6">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.username')}</Text>

                <View className="mb-6">
                    <InputUpdate focusArea='username'
                                valueText={displayName} 
                                onChangeText={setDisplayName}
                                placeholderText={t('settings.edit_profile.username')}
                                clearInput={setDisplayName}
                                error={errors.username || errors.general}/>
                </View>
                <ButtonSubmit buttonText={t('components.update.save')}
                                handleUpdate={handleUpdateUsername} 
                                formValidValue={displayName}/>
            </View>
        </LayoutSettings>
    );
}

export function EditProfileEmail() {
    const { t } = useTranslation();
    const navigation = useNavigation();

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
        <LayoutSettings title="Edit Profile">
            <View className="my-6">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.email')}</Text>

                <View className="mb-6">
                    <InputUpdate focusArea='email'
                                valueText={email} 
                                onChangeText={setEmail}
                                placeholderText={t('settings.edit_profile.email')}
                                clearInput={setEmail}
                                error={errors.email || errors.general}/>

                    {!isEmailVerified && (
                        <View className="my-2">
                            <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.email-verification_false')}</Text>
                        </View>)}
                </View>
                <ButtonSubmit buttonText={t('components.update.save')}
                                handleUpdate={handleUpdateEmail} 
                                formValidValue={email}/>
            </View>
        </LayoutSettings>
    );
}

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
        <LayoutSettings title="Edit Profile">
            <View className="my-6">
                <View className="mb-8">
                    <Text className="mb-2 text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.delete_account.delete_account-header')}</Text>
                    <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_500Medium' }}>{t('settings.edit_profile.delete_account.delete_account-text')}</Text>
                </View>

                <TouchableOpacity onPress={handleDeleteAccount} activeOpacity={opacity.opacity900}>
                    <View className="items-center rounded-xl p-4 bg-error">
                        <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.edit_profile.delete_account.delete_account-header')}</Text>
                    </View>
                </TouchableOpacity>

                {(errors.general) && 
                    <View className="flex-row items-center my-3">
                        <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errors.general}</Text>
                    </View>}
            </View>
        </LayoutSettings>
    );
}

export function EditProfile() {
    const { t } = useTranslation();

    return (
        <LayoutSettings title="Edit Profile">
            <View className="my-6">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.edit_profile-subheader-user_data')}</Text>

                <View className="my-2 rounded-xl py-2 bg-gray">
                    <ButtonNavigate navigateLocation="Username" 
                                    buttonText={t('settings.edit_profile.username')}
                                    buttonStyle/>
                    <ButtonNavigate navigateLocation="Email" 
                                    buttonText={t('settings.edit_profile.email')}
                                    buttonStyle/>
                    <ButtonNavigate navigateLocation="Name" 
                                    buttonText={t('settings.edit_profile.name')}/>
                </View>
            </View>

            <View className="mb-6">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.edit_profile.edit_profile-subheader-delete_account')}</Text>

                <View className="my-2 rounded-xl py-2 bg-gray">
                    <ButtonNavigate navigateLocation="DeleteAccount" 
                                    buttonText={t('settings.edit_profile.delete_account.delete_account-header')}/>
                </View>
            </View>
        </LayoutSettings>
    )
}