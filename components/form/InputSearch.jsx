import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { color, opacity } from "../../assets/styles/Styles";


export function InputSearch({placeholderText}) {
    return (
        <TouchableOpacity activeOpacity={opacity.opacity800}>
            <View className="flex-row items-center rounded-lg py-2 px-4 bg-gray">
                <Image className="mr-3 w-5 h-5 opacity-30" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_search_01.png')}/>
                <TextInput className="-mt-1 min-h-[32px] text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}
                            placeholder={placeholderText}/>
            </View>
        </TouchableOpacity>
    )
}
