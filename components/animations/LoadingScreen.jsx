import { Text, SafeAreaView, StatusBar, View } from 'react-native';
// Components
import { LoadingAnimationPrimary } from './LoadingAnimationPrimary';


export function LoadingScreen() {
    return (
        <SafeAreaView className="bg-white">
            <StatusBar barStyle="dark-content"/>
            <View className="justify-center items-center h-full">
                <LoadingAnimationPrimary />
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Content Loading ...</Text>
            </View>
        </SafeAreaView>
    )
}
