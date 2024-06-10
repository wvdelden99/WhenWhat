import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Text, TouchableOpacity, View } from "react-native";
// Components
import { ModalDate } from "../../modal/agenda/ModalDate";
import { ItemCalendarBlocks } from "./ItemCalendarBlocks";


export function ItemCalendar({ currentUserData, usersData, friendGroupsData, group }) {

    const [currentDay, setCurrentDay] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentYear, setCurrentYear] = useState('');

    const [selectedDate, setSelectedDate] = useState('');
    const [dateTimes, setDateTimes] = useState([]);

    const [allDateTimes, setAllDateTimes] = useState({});

    const [showDateModal, setShowDateModal] = useState(false);

    // Get Dates for Calendar
    useEffect(() => {
        const today = new Date();
        const dayOfMonth = today.toLocaleString('default', { day: 'numeric' });
        setCurrentDay(dayOfMonth);

        const monthName = today.toLocaleString('default', { month: 'long' });
        setCurrentMonth(monthName);

        const year = today.getFullYear();
        setCurrentYear(year);
    }, []);
    
    // Change Month in Calendar
    const handleMonthChange = (month) => {
        const date = new Date(month.dateString);
        const monthName = date.toLocaleString('default', { month: 'long' });
        setCurrentMonth(monthName);
    };

    // Day
    const handleDayPress = async (day) => {
        try {
            // Get pressed Day Date
            const date = new Date(day.dateString);
            const dayOfMonth = date.toLocaleString('default', { day: 'numeric' });
            setCurrentDay(dayOfMonth);
            setSelectedDate(day.dateString);

            openDateModal();
        } catch(error) {
            console.log('Day Error:', error);
        }
    };

    // Date Modal
    const openDateModal = () => {
        setShowDateModal(true);
    };

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
                            return (
                                <View>
                                    <Text className={`text-sm font-semibold text-center ${ state === 'disabled' ? 'text-gray-dark' : 'text-dark'  }`}>
                                        {date.day}
                                    </Text>

                                    <TouchableOpacity onPress={() => handleDayPress(date)}>
                                        <View className="rounded-lg w-12 h-12 bg-gray">
                                            <ItemCalendarBlocks dateTimes={dateTimes}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        theme={{
                            arrowColor: '#212427',
                        }}/>
            </View>

            <ModalDate currentUserData={currentUserData} usersData={usersData} friendGroupsData={friendGroupsData} groupId={group} 
                        selectedDate={selectedDate} dateTimes={dateTimes} setDateTimes={setDateTimes}
                        currentDay={currentDay} currentMonth={currentMonth} currentYear={currentYear}
                        showDateModal={showDateModal} setShowDateModal={setShowDateModal}/>
        </>
    );
}
