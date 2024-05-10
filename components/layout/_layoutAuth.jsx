import { Image, SafeAreaView, StatusBar, View } from 'react-native';


export function LayoutAuth({children, imageLogo}) {
    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar barStyle="light-content"/>
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_01.png')}/>

            <View className="flex-[1] justify-center">
                {imageLogo &&
                    <View className="justify-center items-center mb-12">
                        <Image className="" source={require('./../../assets/static/logo/logo_when_&_what_01.png')}/>
                    </View>
                }

                <View className="items-center">
                    {children}
                </View>
            </View>
        </SafeAreaView>
    )
}
