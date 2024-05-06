import { Image, SafeAreaView, View } from 'react-native';
import { KeyboardScroll } from '../utility/KeyboardScroll';


export function LayoutAuth({children, imageLogo}) {
    return (    
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_02.png')}/>
                    
            <View className="flex-[1] justify-center">
                {imageLogo && 
                    <View className="items-center justify-center mb-12">
                        <Image className="" source={require('./../../assets/static/logo/logo_when_&_what_02.png')}/>
                    </View>
                }
                {/* <KeyboardScroll> */}
                <View className="items-center">
                    {children}
                </View>
                {/* </KeyboardScroll> */}
            </View>
        </SafeAreaView>
    )
}
