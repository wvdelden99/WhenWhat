import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { opacity, shadow } from '../../assets/styles/Styles';


export function ButtonSubmit({handleSubmit, buttonText, formValidValue}) {

    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        setFormValid(!!formValidValue);
    });

    return (
        <View className="w-full">
            <TouchableOpacity onPress={handleSubmit} disabled={!formValid} activeOpacity={opacity.opacity900}>
                <View className={`items-center rounded-2xl p-3 w-full ${ formValid ? 'bg-primary' : 'bg-primary-disabled' }`} style={{ ... shadow.shadowButton }}>
                    <Text className={`text-lg ${ formValid ? 'text-dark' : 'text-dark-disabled opacity-70' }`} style={{ fontFamily: 'Raleway_700Bold' }}>{buttonText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
