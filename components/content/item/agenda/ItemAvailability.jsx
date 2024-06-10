import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../../../assets/styles/Styles';


export function ItemAvailability({ editTimeData, deleteTimeData, startTime, endTime, startTimeData, setStartTimeData, endTimeData, setEndTimeData}) {

    const [showEditTime, setShowEditTime] = useState(false);

    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    // Format Time to Hours and Minutes
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Edit Time
    const openEditTime = () => {
        setShowEditTime(true);
    };
    const closeEditTime = () => {
        setShowEditTime(false);
    };

    return (
        <>
            {showEditTime ? (
                <>
                <View className="flex-row items-center">
                    <View className="rounded-full w-8 h-8 bg-secondary"></View>
                    <View className="flex-row items-center">
                        <DateTimePicker
                            value={startTimeData}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, date) => {
                                setShowStartTimePicker(false);
                                if (date) setStartTimeData(date);
                            }}/>
                        <Text className="-mr-2 text-sm text-dark"> - </Text>
                        <DateTimePicker
                            value={endTimeData}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, date) => {
                                setShowEndTimePicker(false);
                                if (date) setEndTimeData(date);
                            }}/>
                    </View>
                </View>

                <View className="flex-row items-center gap-2">
                    <TouchableOpacity onPress={editTimeData} activeOpacity={opacity.opacity600}>
                        <Image className="w-5 h-5" source={require('./../../../../assets/static/icons/icon_check_01.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closeEditTime} activeOpacity={opacity.opacity600}>
                        <Image className="w-6 h-6" source={require('./../../../../assets/static/icons/icon_cross_02.png')}/>
                    </TouchableOpacity>
                </View>
                </>
            ) : (
                <>
                <View className="flex-row items-center gap-2">
                    <View className="rounded-full w-8 h-8 bg-secondary"></View>
                    <Text className="text-sm text-dark opacity-70">{formatTime(startTime)} - {formatTime(endTime)}</Text>
                </View>

                <View className="flex-row items-center gap-3">
                    <TouchableOpacity onPress={openEditTime} activeOpacity={opacity.opacity600}>
                        <Image className="w-5 h-5" source={require('./../../../../assets/static/icons/icon_edit_01.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteTimeData} activeOpacity={opacity.opacity600}>
                        <Image className="w-5 h-5" source={require('./../../../../assets/static/icons/icon_trash_01.png')}/>
                    </TouchableOpacity>
                </View>
                </>
            )}
        </>
    )
}
