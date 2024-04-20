import { Image, SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import { color } from '../assets/styles/Styles';

export function Planning() {
    return (
        <SafeAreaView className="bg-secondary-light">
        <View className="">
            <View className="px-6">
                <View className="flex-row items-center my-6 px-3">
                    <View className="flex-[2]">
                        <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Plan something with your Friends</Text>
                    </View>

                    <View className="flex-[1] items-center">
                        <Image className="rounded-lg w-[80px] h-[92px] bg-cover" source={require('./../assets/static/images/image_friend_group_02.jpg')} />
                    </View>
                </View>

                <View className="">
                    <TouchableHighlight className="rounded-2xl py-4 bg-primary">
                        <View className="flex-row justify-center items-center gap-2">
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../assets/static/icons/icon_calendar_01.png')} />
                            <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Make Plans</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

            <View className="mt-8 rounded-t-3xl px-6 h-full bg-white">
                <View className="flex-row justify-between items-center my-4">
                    <View className="">
                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Planned</Text>
                    </View>
                    
                    <View className="flex-row gap-1">
                        <View className="rounded-lg p-3 bg-gray">
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../assets/static/icons/icon_search_01.png')} />
                        </View>

                        <View className="rounded-lg p-3 bg-gray">
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../assets/static/icons/icon_filter_01.png')} />
                        </View>
                    </View>
                </View>

                <View className="">
                    <View className="">
                        <Text className="text-base text-dark opacity-70" style={{ fontFamily: 'Raleway_600SemiBold' }}>March</Text>
                    </View>

                    <View className="">
                        <View className="flex-row justify-between items-center border-2 border-gray rounded-3xl p-3">
                            <View className="items-center">
                                <View className="">
                                    <Text className="text-dark" style={{ fontFamily: 'Poppins_600SemiBold' }}>20</Text>
                                </View>

                                <View className="relative rounded-md w-9 h-9 bg-gray">
                                    <View className="rounded w-3 h-3 bg-primary"></View>
                                    <View className="rounded w-3 h-3 bg-secondary"></View>
                                    <View className="rounded w-3 h-3 bg-dark"></View>
                                </View>
                            </View>

                            <View className="">
                                <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Cinema</Text>
                                <Text className="-mt-[3px] text-sm text-dark opacity-60" style={{ fontFamily: 'Raleway_600SemiBold' }}>Rotterdam</Text>
                            </View>

                            <View className="flex-row items-center">
                                <View className="">
                                    <Image className="rounded-full w-10 h-10 bg-cover" source={require('./../assets/static/images/image_friend_group_01.jpg')}/>
                                </View>

                                <View className="">
                                    <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../assets/static/icons/icon_arrow_down_03.png')}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </SafeAreaView>
    )
}