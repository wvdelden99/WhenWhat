import { Image, Text, View } from "react-native";
import { blur } from "../../../assets/styles/Styles";

export function MessageItem({currentUser, message}) {
    console.log(message)

    if (currentUser?.userId===message?.userId) {
        return (
            // <View className="justify-end">
                <View className="self-end mr-4 mt-2 rounded-l-2xl rounded-tr-xl py-2 px-4 bg-white">
                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{message?.text}</Text>
                </View>
            // </View>
        )
    } else {
        return (
            <View className="flex-row gap-2 mt-1 ml-1">
                <Image className="self-end rounded-full w-5 h-5 bg-gray" />
                <View className="self-start rounded-r-2xl rounded-tl-xl py-2 px-4 blur-lg" style={{ backgroundColor: blur.blurBackground }}>
                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{message?.text}</Text>
                </View>
            </View>
        )
    }
}