import { useState } from 'react';
import { groupRef, userRef } from '../../../../config/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { ItemProfileImage } from '../../ItemProfileImage';


export function ItemFriendGroupMember({userId, username, currentUserData, groupId, currentUserIsAdmin, admin, updateGroupMembersData}) {
    const { t } = useTranslation();

    // Make Group Member Admin
    const addAdminToGroupMember = async () => {
        try {
            if (currentUserIsAdmin) {
                const groupDocRef = doc(groupRef, groupId);
                await updateDoc(groupDocRef, {
                    groupAdmins: arrayUnion(userId)
                });
            };

            updateGroupMembersData(userId, 'addAdmin');
            closeGroupMember();
        } catch(error) {
            console.log('Add Admin to User Error:', error);
        }
    };

    // Remove Group Member
    const removeGroupMember = async () => {
        try {
            if (currentUserIsAdmin) {
                // Remove Group Id from User
                const userDocRef = doc(userRef, userId);
                await updateDoc(userDocRef, {
                    groups: arrayRemove(groupId)
                });

                // Remove User from Group
                const groupDocRef = doc(groupRef, groupId);
                await updateDoc(groupDocRef, {
                    groupMembers: arrayRemove(userId)
                });
            };

            updateGroupMembersData(userId, 'remove');
            closeGroupMember();
        } catch(error) {
            console.log('Remove Group Member Error:', error);
        }
    };

    // Change Current User Username to You
    const displayName = userId === currentUserData.userId ? t('friends.friends-you') : username;

    // Modal Group Member
    const [showGroupMember, setShowGroupMember] = useState(false);
    const openGroupMember = () => {
        setShowGroupMember(true);
    };
    const closeGroupMember = () => {
        setShowGroupMember(false);
    };

    return (
        <>
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row items-center">
                <View className="mr-3">
                    <ItemProfileImage username={username}/>
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{displayName}</Text>
            </View>
            <View className="flex-row items-center gap-3">
                {admin ? (
                    <Image className="w-6 h-6 mr-2" style={{ tintColor: color.primaryColor }} source={require('./../../../../assets/static/icons/icon_crown_01.png')}/>
                ) : (
                <>
                    {currentUserIsAdmin &&
                        <TouchableOpacity onPress={openGroupMember} activeOpacity={opacity.opacity600}>
                            <Image className="-rotate-90 -mr-1 w-7 h-7" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}/>
                        </TouchableOpacity>
                    }
                    </>
                )}
            </View>
        </View>

        <Modal visible={showGroupMember}
                transparent={true}
                animationType='fade-up'>
            <View className="flex-[1] justify-center items-center">
                <View className="absolute border-[1px] border-gray-dark rounded-3xl pt-6 px-8 w-full h-1/3 bottom-0 bg-white">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-3">
                            <View>
                                <ItemProfileImage username={username}/>
                            </View>
                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{displayName}</Text>
                        </View>

                        <TouchableOpacity onPress={closeGroupMember} activeOpacity={opacity.opacity600}>
                            <Image className="w-8 h-8" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_cross_02.png')}/>
                        </TouchableOpacity>
                    </View>
                                
                    <View className="my-6">
                        <TouchableOpacity onPress={addAdminToGroupMember} activeOpacity={opacity.opacity800}>
                            <View className="flex-row justify-between items-center mb-4 rounded-md py-3 pl-5 pr-3 bg-gray">
                                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-group-make_admin')}</Text>
                                <Image className="w-6 h-6 mr-2" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_crown_03.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={removeGroupMember} activeOpacity={opacity.opacity800}>
                            <View className="flex-row justify-between items-center rounded-md py-3 pl-5 pr-3 bg-gray">
                                <Text className="text-base text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-group-remove_member')}</Text>
                                <Image className="w-6 h-6 mr-2" style={{ tintColor: color.errorColor }} source={require('./../../../../assets/static/icons/icon_remove_01.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        </>
    )
}
