import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
import { ModalFriendGroup } from '../../modal/friends/ModalFriendGroup';
import { useState } from 'react';


export function ItemFriendGroup({item, groupName, currentUserData, usersData, friendsData, updateFriendGroupsData}) {
    const navigation = useNavigation();

    // Modal Friend Group
    const [showModalFriendGroup, setShowModalFriendGroup] = useState(false);
    const openModalFriendGroup = () => {
        setShowModalFriendGroup(true);
    }

    return (
        <>
        <View className="flex-row justify-between items-center mt-6 border-b-[1px] border-gray-dark pb-6">
            <TouchableOpacity onPress={openModalFriendGroup} activeOpacity={opacity.opacity600}>
                <View className="flex-row items-center gap-3">
                    <View className="rounded-full w-12 h-12 bg-gray">

                    </View>
                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{groupName}</Text>
                </View>
            </TouchableOpacity>
            <View className="flex-row items-center gap-3 mr-2">
                <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity600}>
                    <View className="absolute rounded-full w-4 h-4 -top-[6px] -right-[6px] bg-primary z-10"></View>
                    <Image className="w-7 h-7 opacity-90" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_poll_01.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity600}>
                    <View className="absolute rounded-full w-4 h-4 -top-[6px] -right-[6px] bg-primary z-10"></View>
                    <Image className="w-7 h-7 opacity-90" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_comment_03.png')}/>
                </TouchableOpacity>
            </View>
        </View>


        <ModalFriendGroup currentUserData={currentUserData} usersData={usersData} friendsData={friendsData}
                        groupId={item.groupId} groupName={groupName} groupMembers={item.groupMembers} groupAdmins={item.groupAdmins}
                        updateFriendGroupsData={updateFriendGroupsData} showModalFriendGroup={showModalFriendGroup} setShowModalFriendGroup={setShowModalFriendGroup}/>
        </>
    )
}
