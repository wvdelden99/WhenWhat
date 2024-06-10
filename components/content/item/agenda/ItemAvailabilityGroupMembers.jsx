import { Text, View } from 'react-native';


export function ItemAvailabilityGroupMembers({ username, startTime, endTime }) {

    // Format Time to Hours and Minutes
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View className="flex-row justify-between items-center mt-3 mb-1">
            <View className="flex-row items-center gap-2">
                <View className="rounded-full w-8 h-8 bg-secondary"></View>
                <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{username}</Text>
            </View>
            <View className="pr-2">
                <Text className="text-sm text-dark opacity-70">{formatTime(startTime)} - {formatTime(endTime)}</Text>
            </View>
        </View>
    )
}
