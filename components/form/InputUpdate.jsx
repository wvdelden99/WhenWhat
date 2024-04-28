import { useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';


export function InputUpdate({focusArea, valueText, onChangeText, placeholderText, clearInput, error}) {

    // Textinput Pressable Area
    const inputRefs = useRef({});
    const focusInput = (inputName) => {
        inputRefs.current[inputName].focus();
    };

    return (
        <View className="my-2">
            <TouchableOpacity onPress={() => focusInput({focusArea})} activeOpacity={opacity.opacity700}>
                <View className={`flex-row border-2 rounded-2xl pt-2 pb-4 px-5 min-h-[48px] bg-gray ${ error ? 'border-error' : 'border-transparent' }`}>
                    <TextInput className="w-full text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                ref={(ref) => { inputRefs.current[{focusArea}] = ref; }}
                                value={valueText}
                                onChangeText={onChangeText}
                                placeholder={placeholderText}/>
                    <TouchableOpacity onPress={() => {clearInput('')}} activeOpacity={opacity.opacity600}>
                        <View className="absolute top-1 right-0">
                            <Image className="w-6 h-6 opacity-80" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_cross_02.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {(error) && 
                    <View className="flex-row items-center my-2">
                        <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{error}</Text>
                    </View>}
        </View>
    )
}