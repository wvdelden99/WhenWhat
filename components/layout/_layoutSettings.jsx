import { Image, Text, SafeAreaView, StatusBar, View } from 'react-native';


export function LayoutSettings({title, children}) {
    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar barStyle="light-content"/>
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_03.png')}/>

            <View className="flex-row items-center my-6">
                <Text className="text-xl text-dark">{title}</Text>
            </View>

            <View className="rounded-3xl px-6 h-full bg-white">
                {children}
            </View>
        </SafeAreaView>
    )
}
