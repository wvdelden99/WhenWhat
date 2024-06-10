import { Text, View } from 'react-native';


export function ItemCalendarBlocks({ dateTimes }) {
    return (
        <>
            {dateTimes.length === 1 &&
                <>
                    <View className="rounded-sm mt-[9px] ml-[9px] w-3 h-3 bg-primary"></View>
                </>
            }
            {dateTimes.length === 2 &&
                <>
                    <View className="rounded-sm mt-[9px] ml-[9px] w-3 h-3 bg-primary"></View>
                    <View className="rounded-sm mt-[5px] ml-[9px] w-3 h-3 bg-secondary"></View>
                </>
            }
            {dateTimes.length === 3 &&
                <>
                    <View className="flex-row">
                        <View className="rounded-sm mt-[9px] ml-[9px] w-3 h-3 bg-primary"></View>
                        <View className="rounded-sm mt-[9px] ml-[5px] w-3 h-3 bg-dark"></View>
                    </View>
                    <View className="rounded-sm mt-[5px] ml-[9px] w-3 h-3 bg-secondary"></View>
                </>
            }
            {dateTimes.length === 4 &&
                <>
                    <View className="flex-row">
                        <View className="rounded-sm mt-[9px] ml-[9px] w-3 h-3 bg-primary"></View>
                        <View className="rounded-sm mt-[9px] ml-[5px] w-3 h-3 bg-dark"></View>
                    </View>
                    <View className="flex-row">
                        <View className="rounded-sm mt-[5px] ml-[9px] w-3 h-3 bg-secondary"></View>
                        <View className="rounded-sm mt-[5px] ml-[5px] w-3 h-3 bg-secondary-light"></View>
                    </View>
                </>
            }
            {dateTimes.length > 4 && 
                <>
                    <View className="flex-[1] justify-center items-center">
                        <View className="flex-row mt-4">
                            <View className="rounded-sm w-3 h-3 bg-primary z-40"></View>
                            <View className="rounded-sm -ml-[5px] w-3 h-3 bg-secondary z-30"></View>
                            <View className="rounded-sm -ml-[5px] w-3 h-3 bg-secondary-light z-20"></View>
                            <View className="rounded-sm -ml-[5px] w-3 h-3 bg-dark z-10"></View>
                            <View className="rounded-sm -ml-[5px] w-3 h-3 bg-white"></View>
                        </View>
                        <Text className="text-xs font-semibold text-dark">{dateTimes.length}</Text>
                    </View>
                </>
            }
        </>
    )
}
