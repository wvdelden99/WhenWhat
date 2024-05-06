import { Image, TouchableOpacity, View } from 'react-native';


export function ItemPoll() {
    return (
        <TouchableOpacity>
            <View className="mr-4 rounded-2xl p-2 w-[86px] h-[100px] bg-white">
                <View className="flex-[1] py-1">
                    <View className="mb-1 rounded-full w-1/3 h-3 bg-secondary-light"></View>
                    <View className="mb-1 rounded-full w-2/3 h-3 bg-primary"></View>
                    <View className="rounded-full w-full h-3 bg-secondary opacity-80"></View>
                </View>

                <View className="">
                    <Image className="rounded-full w-6 h-6 bg-gray" />
                </View>
            </View>
        </TouchableOpacity>
    )
}
