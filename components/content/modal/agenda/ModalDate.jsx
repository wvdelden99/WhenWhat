import { useEffect, useState } from 'react';
import { agendaRef } from '../../../../config/firebase';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../../../assets/styles/Styles';
// Components
import { LayoutModal } from '../../../layout/_layoutModal';
import { ItemAvailabilityGroupMembers } from '../../item/agenda/ItemAvailabilityGroupMembers';
import { ItemAvailability } from '../../item/agenda/ItemAvailability';
import { LoadingAnimationPrimary } from '../../../animations/LoadingAnimationPrimary';
import { ItemAvailabilityBlocks } from '../../item/agenda/ItemAvailabilityBlocks';


export function ModalDate({ currentUserData, usersData, friendGroupsData, groupId, currentDay, currentMonth, currentYear, selectedDate, dateTimes, setDateTimes, showDateModal, setShowDateModal }) {

    const [loadingData, setLoadingData] = useState(false);

    const [startTimeData, setStartTimeData] = useState(new Date());
    const [endTimeData, setEndTimeData] = useState(new Date());

    const [showGroupAvailability, setShowGroupAvailability] = useState(false);
    const [showEditTime, setShowEditTime] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    // Fetch Set Times for Selected Date
    useEffect(() => {
        const fetchSetTimes = async () => {
            try {
                setLoadingData(true);
                const agendaDocRef = doc(agendaRef, groupId);
                const dateCollectionRef = collection(agendaDocRef, selectedDate);
                const querySnapshot = await getDocs(dateCollectionRef);
                const dateTimesData = [];
                querySnapshot.forEach((doc) => {
                    dateTimesData.push(doc.data());
                });

                setDateTimes(dateTimesData);
                setLoadingData(false);
            } catch (error) {
                console.log('Fetch Set Times Error:', error);
                setLoadingData(false);
            }
        };
        fetchSetTimes();
    }, [agendaRef, groupId, selectedDate]);

    // Get selected Group
    const selectedGroup = friendGroupsData.find((groupData) => groupData.groupId === groupId);

    // Set Availability
    const saveTimeData = async () => {
        try {
            const groupDocRef = doc(agendaRef, groupId);
            const dateCollectionRef = collection(groupDocRef, selectedDate);
            const updateData = {
                userId: currentUserData.userId,
                startTime: startTimeData.toISOString(),
                endTime: endTimeData.toISOString()
            };
            await setDoc(doc(dateCollectionRef, currentUserData.userId), updateData);

            setDateTimes(prevDateTimes => {
                const newDateTimes = prevDateTimes.filter(item => item.userId !== currentUserData.userId);
                newDateTimes.push(updateData);
                return newDateTimes;
            });

            closeEditTime();
        } catch(error) {
            console.log('Set Availability Error:', error);
        }
    };

    // Delete Availability
    const deleteTimeData = async () => {
        try {
            const groupDocRef = doc(agendaRef, groupId);
            const dateCollectionRef = collection(groupDocRef, selectedDate);
            await deleteDoc(doc(dateCollectionRef, currentUserData.userId));

            setDateTimes(prevDateTimes => prevDateTimes.filter(item => item.userId !== currentUserData.userId));
        } catch(error) {
            console.log('Delete Availabilty Error:', error);
        }
    };

    // Date Modal
    const closeDateModal = () => {
        setShowDateModal(false);
    };

    // Group Availibility
    const toggleGroupAvailibility = () => {
        setShowGroupAvailability(!showGroupAvailability);
    };

    // Edit Time
    const openEditTime = () => {
        setShowEditTime(true);
    };
    const closeEditTime = () => {
        setShowEditTime(false);
    };

    return (
        <LayoutModal visible={showDateModal}
                    handleIconRight={closeDateModal}
                    iconRight={require('./../../../../assets/static/icons/icon_cross_02.png')}
                    styleIconRight="w-9 h-9">
            <View className="">
                <View className="flex-row justify-between">
                    <View className="items-center -ml-3 w-2/5">
                        <Text className="mb-1 text-base font-semibold text-dark">{currentDay}</Text>
                        <View className="rounded-xl w-20 h-20 bg-gray">
                            <ItemAvailabilityBlocks dateTimes={dateTimes}/>
            
                        </View>
                    </View>

                    <View className="w-3/5">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{currentMonth} {currentYear}</Text>
                        <View className="self-start mt-3 mb-2 rounded-full py-1 px-4 bg-error">
                            <Text className="text-sm text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Not Planned</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <View className="rounded-full w-8 h-8 bg-gray"></View>
                            <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{selectedGroup && selectedGroup.groupName}</Text>
                        </View>
                    </View>
                </View>

                <View className="my-10 px-1">
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Availability</Text>

                    <View className="">
                        <Text className="text-base text-dark opacity-70" style={{ fontFamily: 'Raleway_600SemiBold' }}>Group Availability</Text>

                        {loadingData ? (
                            <View className="items-center">
                                <LoadingAnimationPrimary />
                            </View>
                        ) : (
                            <>
                            <View className="my-3 border-2 border-gray rounded-2xl py-3 px-4">
                                <View className="flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-3">
                                        <Image className="w-6 h-6" source={require('./../../../../assets/static/icons/icon_users_01.png')}/>
                                        <View className="">
                                            <FlatList className=""
                                                    data={dateTimes.filter(item => item.userId !== currentUserData.userId)}
                                                    keyExtractor={item => item.userId}
                                                    renderItem={({item}) => (
                                                        <View className="rounded-full w-8 h-8 bg-secondary"></View>
                                                    )}/>
                                        </View>
                                    </View>
                                        
                                    <View className="flex-row items-center">
                                        <View className="flex-row items-center gap-2 mr-1">
                                            <Image className="w-6 h-6 opacity-70" source={require('./../../../../assets/static/icons/icon_clock_02.png')}/>
                                            <Text className="text-sm text-dark opacity-70">{dateTimes.length > 0 ? '00:00 - 00:00' : '00:00 - 00:00'}</Text>
                                        </View>

                                        <TouchableOpacity onPress={toggleGroupAvailibility} activeOpacity={opacity.opacity600}>
                                            <Image className={`w-8 h-8 ${ showGroupAvailability ? 'rotate-180' : '' }`} source={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {showGroupAvailability &&
                                    <>
                                    {dateTimes.length > 0 ? (
                                        <FlatList className=""
                                                data={dateTimes.filter(item => item.userId !== currentUserData.userId)}
                                                keyExtractor={item => item.userId}
                                                renderItem={({item}) => {
                                                    const user = usersData.find(user => user.userId === item.userId);
                                                    return (
                                                        <ItemAvailabilityGroupMembers username={user.username} startTime={item.startTime} endTime={item.endTime}/>
                                                    );
                                                }}/>
                                    ) : (
                                        <View className="mt-5 mb-1">
                                            <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>No friends seem available</Text>
                                        </View>
                                    )}
                                    </>
                                }
                            </View>
                            </>
                        )}
                    </View>

                    <View className="my-2">
                        <Text className="text-base text-dark opacity-70" style={{ fontFamily: 'Raleway_600SemiBold' }}>My Availability</Text>

                        {loadingData ? (
                            <View className="items-center">
                                <LoadingAnimationPrimary />
                            </View>
                        ) : (
                            <View className="flex-row justify-between items-center my-3 border-2 border-gray rounded-2xl py-3 px-4">
                                {dateTimes.length > 0 ? (
                                    dateTimes.filter(item => item.userId === currentUserData.userId).map((item, index) => (
                                        <ItemAvailability key={index} startTime={item.startTime} endTime={item.endTime}
                                                        startTimeData={startTimeData} setStartTimeData={setStartTimeData} 
                                                        endTimeData={endTimeData} setEndTimeData={setEndTimeData}
                                                        editTimeData={saveTimeData} deleteTimeData={deleteTimeData}/>
                                    ))   
                                ) : (
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
                                            <TouchableOpacity onPress={saveTimeData} activeOpacity={opacity.opacity600}>
                                                <Image className="w-5 h-5" source={require('./../../../../assets/static/icons/icon_check_01.png')}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={closeEditTime} activeOpacity={opacity.opacity600}>
                                                <Image className="w-7 h-7" source={require('./../../../../assets/static/icons/icon_cross_02.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                        </>
                                    ) : (
                                        <>
                                        <View className="flex-row items-center gap-2">
                                            <View className="rounded-full w-8 h-8 bg-secondary"></View>
                                            <Text className="text-sm text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>No time set</Text>
                                        </View>

                                        <TouchableOpacity onPress={openEditTime} activeOpacity={opacity.opacity600}>
                                            <Image className="w-4 h-4" source={require('./../../../../assets/static/icons/icon_edit_01.png')}/>
                                        </TouchableOpacity>
                                        </>
                                    )}
                                    </>
                                )}
                            </View>
                        )} 
                    </View>
                </View>
            </View>
            
            <View className="absolute mb-28 mx-6 w-full bottom-0">
                    <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                        <View className="items-center rounded-lg p-3 bg-primary">
                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>Plan Activity</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </LayoutModal>
    )
}
