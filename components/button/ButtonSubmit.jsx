import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../assets/styles/Styles';


export function ButtonSubmit({handleUpdate, buttonText, formValidValue}) {

    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        setFormValid(!!formValidValue);
    });

    return (
        <TouchableOpacity onPress={handleUpdate} disabled={!formValid} activeOpacity={opacity.opacity900}>
            <View className={`items-center rounded-2xl p-3 ${ formValid ? 'bg-primary' : 'bg-primary-disabled' }`}>
                <Text className={`text-lg ${ formValid ? 'text-dark' : 'text-dark-disabled opacity-70' }`} style={{ fontFamily: 'Raleway_700Bold' }}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    )
}