import { Image, SafeAreaView, Text, View } from 'react-native';
import { color } from '../../assets/styles/Styles';
// Components
import { BackButton } from '../../components/button/BackButton';

export function Language() {
    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_01.png')}/>
            <View className="relative flex-row items-center w-full my-6 px-6">
                <BackButton />

                <View className="flex-[1] items-center">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Language</Text>
                </View>
            </View>

            <View className="rounded-t-3xl px-6 h-full bg-white">
                <View className="flex-row justify-between items-center my-8 rounded-lg p-5 bg-gray">
                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>App Langauage</Text>
                    <View className="flex-row items-center opacity-70">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>English</Text>
                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }}  source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}