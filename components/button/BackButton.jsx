import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function BackButton() {
    const navigation = useNavigation();

    return (
        <View className="absolute ml-6 z-10">
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View className="rounded-md p-1 bg-white">
                    <Image className="w-9 h-9" source={require('./../../assets/static/icons/icon_arrow_left_01.png')}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}