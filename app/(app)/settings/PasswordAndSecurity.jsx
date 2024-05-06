import { useState } from 'react';
import { auth } from '../../../config/firebase';
import { updatePassword } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
// Component
import { LayoutSettings } from '../../../components/layout/_layoutSettings';
import { ButtonNavigateSettings } from '../../../components/button/ButtonNavigateSetttings';
import { ButtonSubmit } from '../../../components/button/ButtonSubmit';
import { InputUpdate } from '../../../components/form/InputUpdate';


export function PasswordAndSecurityPassword() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Update Password
    // const [passwordCurrent, setPasswordCurrent] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [errors, setErrors] = useState({
        // passwordCurrent: '',
        passwordNew: '',
        passwordConfirm: '',
        general: ''
    });

    const handleSubmit = async () => {
        setErrors({
            // passwordCurrent: '',
            passwordNew: '',
            passwordConfirm: '',
            general: ''
        });

        if (passwordNew && passwordConfirm) {
            if (passwordNew !== passwordConfirm) {
                setErrors({...errors, passwordConfirm: t('error.error-password_not_match')});
                return;
            }
            try {
                const user = auth.currentUser;

                await updatePassword(user, passwordNew);
                console.log('Password updated!');

                navigation.navigate('PasswordAndSecurity');
            } catch(err) {
                switch (err.code) {
                    case 'auth/weak-password':
                        setErrors({...errors, passwordNew: t('error.error-password_weak')});
                        break;
                    default:
                        setErrors({...errors, general: t('error.error-general')});
                        console.log(err)
                }
            }
        } else {
            setErrors({...errors, general: t('error.error-general_empty_fields')});
        }
    }

    return (
        <LayoutSettings title={t('settings.password_and_security.password_and_security-header')}>
            <View className="my-8">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.password_and_security.change_password')}</Text>

                <View className="my-6">
                    {/* <View className="mb-4">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.password_and_security.password_current')}</Text>
                        <InputUpdate focusArea="password_current"
                                    visibilityIcon
                                    onChangeText={setPasswordCurrent}
                                    placeholderText={t('settings.password_and_security.password_current')}
                                    error={errors.passwordCurrent || errors.general}/>
                    </View> */}
                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('settings.password_and_security.password_new')}</Text>
                    <InputUpdate focusArea="password_new"
                                visibilityIcon
                                onChangeText={setPasswordNew}
                                placeholderText={t('settings.password_and_security.password_new')}
                                error={errors.passwordNew || errors.general}/>
                    <InputUpdate focusArea="password_confirmation"
                                visibilityIcon
                                onChangeText={setPasswordConfirm}
                                placeholderText={t('settings.password_and_security.password_confirmation')}
                                error={errors.passwordConfirm || errors.general}/>
                </View>
                <ButtonSubmit buttonText={t('components.button.update.save')} 
                                handleUpdate={handleSubmit}
                                formValidValue={passwordNew}/>
            </View>
        </LayoutSettings>
    )
}

export function PasswordAndSecurity() {
    const { t } = useTranslation();

    return (
        <LayoutSettings title={t('settings.password_and_security.password_and_security-header')}>
            <View className="my-8">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('settings.password_and_security.password')}</Text>

                <View className="my-2 rounded-2xl py-2 bg-gray">
                    <ButtonNavigateSettings navigateLocation="Password"
                                    buttonTextStart={t('settings.password_and_security.password')}/>
                </View>
            </View>
        </LayoutSettings>
    )
}