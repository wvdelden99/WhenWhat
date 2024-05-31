import { Image, TouchableOpacity, View } from 'react-native'

export function ButonOtherAuth() {
    return (
        <View className="flex-row gap-6 mt-1">
            <TouchableOpacity>
                <Image className="w-11 h-11" source={require('./../../assets/static/icons/icon_socials_google_01.png')}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image className="w-11 h-11" source={require('./../../assets/static/icons/icon_socials_facebook_01.png')}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image className="w-11 h-11" style={{ tintColor: "white" }} source={require('./../../assets/static/icons/icon_socials_apple_01.png')}/>
            </TouchableOpacity>
        </View>
    )
}