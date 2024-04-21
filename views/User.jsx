import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, Text, TouchableNativeFeedback, View } from 'react-native';
import { color } from './../assets/styles/Styles';

export function User() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../assets/static/images/image_background_01.png')}/>
            
            <View className="relative px-6">
                <View className="absolute mt-3 mr-6 right-0 z-10">
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Settings')}>
                        <View className="rounded-md p-3 bg-white">
                            <Image className="w-7 h-7" style={{ tintColor: color.darkColor }}  source={require('./../assets/static/icons/icon_settings_01.png')}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <View className="items-center my-8">
                    <View className="relative">
                        <Image className="my-2 rounded-full w-[112px] h-[112px] bg-cover" source={require('./../assets/static/images/image_user_01.jpg')} />
                        <View className="absolute mb-1 -mr-1 bottom-0 right-0">
                            <TouchableNativeFeedback>
                                <View className="rounded-full p-3 bg-white">
                                    <Image className="w-4 h-4" style={{ tintColor: color.darkColor }} source={require('./../assets/static/icons/icon_edit_01.png')} />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>John Doe</Text>
                    <Text className="-mt-[3px] text-base text-white opacity-90" style={{ fontFamily: 'Raleway_600SemiBold' }}>@johndoe</Text>
                </View>
            </View>


            <View className="rounded-t-3xl h-full bg-white">

            </View>
        </SafeAreaView>
    )
}