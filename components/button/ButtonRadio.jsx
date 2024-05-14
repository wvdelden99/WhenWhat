import { Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../assets/styles/Styles';

export function ButtonRadio({handlePress, setLanguage, buttonText, buttonStyle}) {

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={opacity.opacity700}>
            <View className={`flex-row justify-between items-center py-4 pl-5 pr-8 ${ buttonStyle ? 'border-b-[1px] border-gray-dark' : '' }`}>
                <Text className={`text-base text-dark ${ setLanguage ? 'opacity-100' : 'opacity-70' }`} style={{ fontFamily: 'Raleway_600SemiBold' }}>{buttonText}</Text>
                <View className={`rounded-full w-5 h-5 ${ setLanguage ? 'border-[6px] border-secondary bg-white' : 'border-2 border-dark opacity-70'}`}></View>
            </View>
        </TouchableOpacity>
    )
}