// import { Image, Text, View } from 'react-native';
// // Components
// import { ItemPlannedActivity } from './ItemPlannedActivity';

// export function ItemPlannedActivityTimeframe() {
//     return (
//         <View className="mb-1">
//             <Text className="text-base text-dark opacity-70" style={{ fontFamily: 'Raleway_600SemiBold' }}>March</Text>

//             <View className="my-1">
//                 <ItemPlannedActivity />
//                 <ItemPlannedActivity />
//             </View>
//         </View>
//     )
// }

// ItemPlannedActivityTimeframe.js
import React from 'react';
import { View, Text } from 'react-native';

export function ItemPlannedActivityTimeframe({ activity }) {
    return (
        <View className="mb-4 p-4 bg-gray-100 rounded-lg">
            <Text className="text-lg font-semibold">{activity.activityName}</Text>
            <Text className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</Text>
            {/* Add more details as needed */}
        </View>
    );
}
