import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../../../assets/styles/Styles';
// Components
import { LayoutModal } from '../../../layout/_layoutModal';
import { InputSearch } from '../../../form/InputSearch';


export function ModalGroups({ friendGroupsData, selectedGroup, toggleGroupSelection, showModalGroups, setShowModalGroups }) {

    // Modal Groups
    const closeModalGroups = () => {
        setShowModalGroups(false);
    };

    return (
        <LayoutModal modalHeader="Friend Groups"
                    visible={showModalGroups}
                    handleIconLeft={closeModalGroups}
                    iconLeft={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}
                    styleIconLeft="w-9 h-9">
            <View className="">
                <InputSearch placeholderText="Search ..."/>

                <View className="my-6">
                    <FlatList className="px-2" 
                            data={friendGroupsData}
                            keyExtractor={item => item.groupId}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => toggleGroupSelection(item.groupId)} activeOpacity={opacity.opacity800}>
                                    <View className="flex-row justify-between items-center my-2">
                                        <View className="flex-row items-center gap-2">
                                            <View className="rounded-full w-12 h-12 bg-gray"></View>
                                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item.groupName}</Text>
                                        </View>

                                        <View className="mr-2">
                                            <View className={`rounded-full w-5 h-5 ${ selectedGroup === item.groupId ? 'border-[6px] border-secondary bg-white' : 'border-2 border-dark opacity-70'}`}></View>
                                        </View>
                                    </View>
                                </TouchableOpacity> 
                            )}/>
                </View>
            </View>
        </LayoutModal>
    )
}
