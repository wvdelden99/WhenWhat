import { Image, SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import { color } from '../../assets/styles/Styles';

export function PlannedActivity() {
    return (
        <View className="flex-row justify-between items-center my-2 ml-7 -mr-6 border-2 border-gray rounded-l-[30px] py-2 px-3">
            <View className="flex-[1] items-center -ml-1">
                <View className="mb-1">
                    <Text className="text-sm text-dark" style={{ fontFamily: 'Poppins_600SemiBold' }}>20</Text>
                </View>

                <View className="relative rounded-md w-9 h-9 bg-gray">
                    <View className="rounded w-3 h-3 bg-primary"></View>
                    <View className="rounded w-3 h-3 bg-secondary"></View>
                    <View className="rounded w-3 h-3 bg-dark"></View>
                </View>
            </View>

            <View className="flex-[2]">
                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Cinema</Text>
                <Text className="-mt-[3px] text-sm text-dark opacity-60" style={{ fontFamily: 'Raleway_600SemiBold' }}>Rotterdam</Text>
            </View>

            <View className="flex-[1] flex-row items-center gap-2 mr-6">
                <View className="">
                    <Image className="rounded-full w-10 h-10 bg-cover" source={require('./../../assets/static/images/image_friend_group_01.jpg')}/>
                </View>

                <View className="">
                    <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                </View>
            </View>
        </View>
    )
}