import { Image, SafeAreaView, StatusBar } from 'react-native';


export function LayoutBackgroundSmall({children}) {
    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar barStyle="light-content"/>
            <Image className="absolute bg-cover w-full" source={require('./../../assets/static/images/image_background_03.png')}/>

            {children}
        </SafeAreaView>
    )
}
