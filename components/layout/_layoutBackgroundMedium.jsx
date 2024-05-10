import { Image, SafeAreaView, StatusBar} from 'react-native';


export function LayoutBackgroundMedium({children}) {
    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar barStyle="light-content"/>
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_02.png')}/>

            {children}
        </SafeAreaView>
    )
}
