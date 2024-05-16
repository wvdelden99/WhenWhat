import { Image, Text, View } from 'react-native';
// Components
import { ItemPlannedActivity } from './ItemPlannedActivity';

export function ItemPlannedActivityTimeframe() {
    return (
        <View className="mb-1">
            <Text className="text-base text-dark opacity-70" style={{ fontFamily: 'Raleway_600SemiBold' }}>March</Text>

            <View className="my-1">
                <ItemPlannedActivity />
                <ItemPlannedActivity />
            </View>
        </View>
    )
}