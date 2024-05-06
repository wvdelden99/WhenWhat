import { useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';


export function InputAuth({focusArea, onChangeText, placeholderText, inputIcon, visibleIcon, visibleValue, setVisibleValue, errorForm, errorText}) {

    // Textinput Pressable Area
    const inputRefs = useRef({});
    const focusInput = (inputName) => {
        inputRefs.current[inputName].focus();
    };

    // Toggle Visiblity SecureTextEntry
    const [toggleVisibility, setToggleVisibility] = useState(() => {
        if (visibleIcon) {
            return !visibleValue;
        } else {
            return visibleValue;
        }
    });

    const toggleSecureTextEntry = () => {
        setToggleVisibility(!toggleVisibility);
        if (setVisibleValue) {
            setVisibleValue(!toggleVisibility);
        }
    };

    return (
        <View className="my-2">
            <TouchableOpacity onPress={() => focusInput({focusArea})} activeOpacity={opacity.opacity900}>
                <View className={`flex-row items-center rounded-2xl py-4 px-4 bg-white ${ errorForm ? 'border-2 border-error' : ''}`}>
                    <Image className={`ml-1 mr-3 w-6 h-6 ${ errorForm ? 'opacity-80' : 'opacity-50' }`} style={{ tintColor: errorForm ? color.errorColor : color.darkColor }} source={inputIcon} />
                    <TextInput className={`flex-[1] -mt-1 min-h-[32px] text-base text-dark ${  visibleIcon ? 'pr-3' : '' }`} style={{ fontFamily: 'Raleway_600SemiBold' }}
                                ref={(ref) => { inputRefs.current[{focusArea}] = ref; }}
                                secureTextEntry={toggleVisibility}
                                onChangeText={onChangeText}
                                placeholder={placeholderText}
                                placeholderTextColor={color.grayDarkColor}/>
                    {visibleIcon && 
                        <TouchableOpacity onPress={toggleSecureTextEntry} activeOpacity={opacity.opacity600}>
                            <View className="mr-1">
                                <Image className={`w-6 h-6 ${ errorForm ? 'opacity-70' : 'opacity-40' }`} style={{ tintColor: errorForm ? color.errorColor : color.darkColor }} source={require('./../../assets/static/icons/icon_hide_01.png')}/>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </TouchableOpacity>

            {errorText && 
                <View className="flex-row items-center mt-1 -mb-2 pr-1">
                    <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorDarkColor }} source={require('./../../assets/static/icons/icon_info_01.png')}/>
                    <Text className="text-sm text-error-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errorText}</Text>
                </View>
            }
        </View>
    )
}
