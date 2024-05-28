import { Image, Text, TextInput, View } from 'react-native';
import { color } from '../../assets/styles/Styles';


export function InputCreate({valueText, onChangeText, placeholderText, errorForm, errorText}) {
    return (
        <View className="my-2">
            <TextInput className={`border-2 rounded-xl pt-2 pb-3 px-5 text-base text-dark bg-gray ${ errorForm ? 'border-error' : 'border-transparent'}`} style={{ fontFamily: 'Raleway_600SemiBold' }}
                        value={valueText}
                        onChangeText={onChangeText}
                        placeholder={placeholderText}
            />
            {(errorText) && 
                <View className="flex-row items-center mt-1 -mb-2 pr-1">
                    <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_info_01.png')} />
                    <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{errorText}</Text>
                </View>}
        </View>
    )
}
