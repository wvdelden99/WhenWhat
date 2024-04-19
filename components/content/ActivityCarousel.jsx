import { Image, Text, TouchableHighlight, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../assets/styles/Styles';

export function ActivityCarousel() {
    return (
        <View className="relative mr-3 rounded-lg w-[140px] h-[180px] bg-dark">
            <Image className="rounded-lg w-full h-full bg-cover" source={require('./../../assets/static/images/image_cinema.jpg')} />
            <LinearGradient className="absolute rounded-lg w-full h-full" colors={['rgba(0,0,0,0)', colors.darkColor ]} locations={[0.45, 1]}/>

            <View className="absolute pt-3 pb-4 px-3 w-full h-full">
                <View className="flex-row justify-between items-center">
                    <View className="">
                        <TouchableHighlight className="rounded-md py-1 px-2 bg-secondary">
                            <Text className="text-xs text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Cinema</Text>
                        </TouchableHighlight>
                    </View>

                    <View className="">
                        <TouchableHighlight className="">
                            <Image className="w-6 h-6" style={{ tintColor: "white"}} source={require('./../../assets/static/icons/icon_heart_01.png')}/>
                        </TouchableHighlight>
                    </View>
                </View>

                <View className="flex-[1] justify-end">
                    <Text className="text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Pathé</Text>
                    <Text className="-mt-[3px] text-sm text-white opacity-80" style={{ fontFamily: 'Raleway_600SemiBold' }}>Rotterdam</Text>
                </View>
            </View>
        </View>
    )
}