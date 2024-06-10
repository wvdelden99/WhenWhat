import { Text, View } from 'react-native';

export function ItemAvailabilityBlocks({dateTimes}) {
    return (
        <>
            {dateTimes.length === 1 && 
                <>
                    <View className="rounded-md mt-4 ml-4 w-5 h-5 bg-primary"></View>
                </>
            }
            {dateTimes.length === 2 && 
                <>
                    <View className="rounded-md mt-4 ml-4 w-5 h-5 bg-primary"></View>
                    <View className="rounded-md mt-2 ml-4 w-5 h-5 bg-secondary"></View>
                </>
            }
            {dateTimes.length === 3 && 
                <>
                    <View className="flex-row ">
                        <View className="rounded-md mt-4 ml-4 w-5 h-5 bg-primary"></View>
                        <View className="rounded-md mt-4 ml-2 w-5 h-5 bg-dark"></View>
                    </View>
                    <View className="rounded-md mt-2 ml-4 w-5 h-5 bg-secondary"></View>
                </>
            }
            {dateTimes.length === 4 && 
                <>
                    <View className="flex-row ">
                        <View className="rounded-md mt-4 ml-4 w-5 h-5 bg-primary"></View>
                        <View className="rounded-md mt-4 ml-2 w-5 h-5 bg-dark"></View>
                    </View>
                    <View className="flex-row">
                        <View className="rounded-md mt-2 ml-4 w-5 h-5 bg-secondary"></View>
                        <View className="rounded-md mt-2 ml-2 w-5 h-5 bg-secondary-light"></View>
                    </View>
                </>
            }
            {dateTimes.length > 4 && 
                <>
                    <View className="flex-[1] justify-center items-center">
                        <View className="flex-row mt-4 mb-1">
                            <View className="rounded-md w-5 h-5 bg-primary z-40"></View>
                            <View className="rounded-md -ml-3 w-5 h-5 bg-secondary z-30"></View>
                            <View className="rounded-md -ml-3 w-5 h-5 bg-secondary-light z-20"></View>
                            <View className="rounded-md -ml-3 w-5 h-5 bg-dark z-10"></View>
                            <View className="rounded-md -ml-3 w-5 h-5 bg-white"></View>
                        </View>
                        <Text className="text-sm font-semibold text-dark">{dateTimes.length}</Text>
                    </View>
                </>
            }
        </>
    )
}
