import { Image, SafeAreaView, Text, View } from 'react-native';

export function Agenda() {
    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../assets/static/images/image_background_01.png')}/>
        </SafeAreaView>
    )
}