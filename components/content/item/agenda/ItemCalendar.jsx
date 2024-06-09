import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { opacity } from "../../../../assets/styles/Styles";
// Components
import { LayoutModal } from './../../../layout/_layoutModal';

export function ItemCalendar({group, friendGroupsData}) {
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const [currentYear, setCurrentYear] = useState('');

    const [showDateModal, setShowDateModal] = useState(false);
    const [showEditTime, setShowEditTime] = useState(false);
    const [showGroupAvailabillity, setShowGroupAvailabillity] = useState(false);

    const [availability, setAvailability] = useState([]);
    const [editingTime, setEditingTime] = useState('');

    const handleMonthChange = (month) => {
        const date = new Date(month.dateString);
        const monthName = date.toLocaleString('default', { month: 'long' });
        setCurrentMonth(monthName);
    };

    const handleDayPress = (day) => {
        const date = new Date(day.dateString);
        const dayOfMonth = date.toLocaleString('default', { day: 'numeric' });
        setCurrentDay(dayOfMonth);
        openDateModal();
    };

    useEffect(() => {
        const today = new Date();
        const monthName = today.toLocaleString('default', { month: 'long' });
        setCurrentMonth(monthName);

        const dayOfMonth = today.toLocaleString('default', { day: 'numeric' });
        setCurrentDay(dayOfMonth);

        const year = today.getFullYear();
        setCurrentYear(year);
    }, []);

    const openDateModal = () => {
        setShowDateModal(true);
    };

    const closeDateModal = () => {
        setShowDateModal(false);
    };

    const openEditTime = () => {
        setShowEditTime(true);
    };

    const closeEditTime = () => {
        setShowEditTime(false);
        setEditingTime('');
    };

    const toggleGroupAvailabillity = () => {
        setShowGroupAvailabillity(!showGroupAvailabillity);
    };

    const handleSaveTime = () => {
        setAvailability([...availability, editingTime]);
        closeEditTime();
    };

    const handleDeleteTime = (index) => {
        const updatedAvailability = availability.filter((_, i) => i !== index);
        setAvailability(updatedAvailability);
    };

    const selectedGroup = friendGroupsData.find((groupData) => groupData.groupId === group);

    return (
        <>
        <View className="pb-8 bg-white">
            <Calendar 
                onMonthChange={handleMonthChange}
                onDayPress={handleDayPress}
                firstDay={1}
                renderHeader={() => {
                    return (
                        <View className="my-2">
                            <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{currentMonth}</Text>
                        </View>
                    )
                }}
                dayComponent={({ date, state }) => {
                    const dayName = new Date(date.dateString).toLocaleString('default', { weekday: 'long' });
                    return (
                        <View>
                            <Text className={`text-sm font-semibold text-center ${ state === 'disabled' ? 'text-gray-dark' : 'text-dark'  }`}>
                                {date.day}
                            </Text>

                            <TouchableOpacity onPress={() => handleDayPress(date)}>
                                <View className="rounded-lg w-12 h-12 bg-gray"></View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>

        <LayoutModal 
            visible={showDateModal}
            handleIconRight={closeDateModal}
            iconRight={require('./../../../../assets/static/icons/icon_cross_02.png')}
            styleIconRight="w-9 h-9"
        >
            <View className="flex-row justify-between">
                <View className="items-center -ml-3 w-2/5">
                    <Text className="text-base font-semibold text-dark">{currentDay}</Text>
                    <View className="rounded-xl w-20 h-20 bg-gray"></View>
                </View>

                <View className="w-3/5">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{currentMonth} {currentYear}</Text>
                    <View className="self-start mt-3 mb-2 rounded-full py-1 px-4 bg-error">
                        <Text className="text-sm text-center text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Not Planned</Text>
                    </View>

                    <View className="flex-row items-center gap-1">
                        <View className="rounded-full w-10 h-10 bg-gray"></View>
                        <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{selectedGroup ? selectedGroup.groupName : 'Group Name'}</Text>
                    </View>
                </View>
            </View>

            <View className="my-10">
                <View>
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Available</Text>
                    <Text className="text-base text-dark opacity-60" style={{ fontFamily: 'Raleway_600SemiBold' }}>Group Availability</Text>

                    <View className="flex-row justify-between item-center my-2 pl-1 pr-2">
                        <View className="flex-row items-center gap-3">
                            <Image className="w-6 h-6" source={require('./../../../../assets/static/icons/icon_users_01.png')}/>
                            <View className="rounded-full w-10 h-10 bg-gray"></View>
                        </View>

                        <View className="flex-row items-center">
                            <View className="flex-row items-center gap-2">
                                <Image className="w-5 h-5 opacity-50" source={require('./../../../../assets/static/icons/icon_clock_02.png')}/>
                                <Text className="text-sm text-dark opacity-50">20:00 - 23:00</Text>
                            </View>

                            <TouchableOpacity onPress={toggleGroupAvailabillity} activeOpacity={opacity.opacity600}>
                                <Image className={`ml-3 w-8 h-8 ${ showGroupAvailabillity ? 'rotate-180' : ''}`} source={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {showGroupAvailabillity && 
                        <View>
                            <View className="flex-row justify-between items-center mr-6">
                                <View className="flex-row items-center gap-2">
                                    <View className="rounded-full w-10 h-10 bg-gray"></View>
                                    <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Name</Text>
                                </View>
                                <Text className="text-sm text-dark opacity-50">20:00 - 23:00</Text>
                            </View>
                        </View>
                    }
                </View>

                <View className="my-4">
                    <Text className="text-base text-dark opacity-60" style={{ fontFamily: 'Raleway_600SemiBold' }}>My Availability</Text>

                    {availability.map((time, index) => (
                        <View key={index} className="flex-row justify-between items-center my-3 pl-1 pr-2">
                            <View className="flex-row items-center gap-4">
                                <View className="rounded-full w-10 h-10 bg-gray"></View>
                                <Text className="text-sm text-dark opacity-50">{time}</Text>
                            </View>
                            <View className="flex-row items-center gap-3">
                                <TouchableOpacity onPress={() => openEditTime()} activeOpacity={opacity.opacity600}>
                                    <Image className="w-5 h-5" source={require('./../../../../assets/static/icons/icon_edit_01.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteTime(index)} activeOpacity={opacity.opacity600}>
                                    <Image className="w-5 h-5" source={require('./../../../../assets/static/icons/icon_trash_01.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {showEditTime && (
                        <View className="flex-row justify-between items-center my-3 pl-1 pr-2">
                            <View className="flex-1 mr-5">
                                <TextInput
                                    className="rounded-md p-3 w-full bg-gray"
                                    value={editingTime}
                                    onChangeText={setEditingTime}
                                    placeholder="HH:MM - HH:MM"
                                />
                            </View>
                            <View className="flex-row items-center gap-2">
                                <TouchableOpacity onPress={handleSaveTime} activeOpacity={opacity.opacity600}>
                                    <Image className="w-5 h-5" source={require('./../../../../assets/static/icons/icon_check_01.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={closeEditTime} activeOpacity={opacity.opacity600}>
                                    <Image className="w-7 h-7" source={require('./../../../../assets/static/icons/icon_cross_02.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {!showEditTime && (
                        <TouchableOpacity onPress={openEditTime} activeOpacity={opacity.opacity600}>
                            <Text className="text-sm text-dark opacity-50">+ Add Availability</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View className="absolute mb-28 mx-6 w-full bottom-0">
                <TouchableOpacity onPress={() => {}} activeOpacity={opacity.opacity900}>
                    <View className="items-center rounded-lg p-3 bg-primary">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Plan Activity</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </LayoutModal>
        </>
    );
}
