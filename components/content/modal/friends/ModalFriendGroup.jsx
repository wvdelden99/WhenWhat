import { useEffect, useState } from 'react';
import { groupRef, userRef } from '../../../../config/firebase';
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { ModalAddMembers } from './ModalAddMembers';
import { InputUpdate } from './../../../form/InputUpdate';
import { ItemFriendGroupMember } from '../../item/friends/ItemFriendGroupMember';
import { LoadingAnimationPrimary } from '../../../animations/LoadingAnimationPrimary';


export function ModalFriendGroup({currentUserData, usersData, friendsData, groupId, groupName, groupMembers, groupAdmins, updateFriendGroupsData, showModalFriendGroup, setShowModalFriendGroup}) {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [groupMembersData, setGroupMembersData] = useState([]);
    const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
    const [groupNameData, setGroupNameData] = useState(groupName);
    const [newGroupName, setNewGroupName] = useState('');

    const [showEditGroupName, setShowEditGroupName] = useState(false);
    const [showModalAddMembers, setShowModalAddMembers] = useState(false);

    // Friend Group Member Data
    useEffect(() => {
        if(currentUserData && usersData) {
            fetchGroupMembers();
            currentUserAdmin();
        }
    }, [currentUserData, usersData]);
    const fetchGroupMembers = async () => {
        try {
            setLoadingData(true);

            const groupMembersDataRef = [];

            // Current User
            groupMembersDataRef.push({ 
                userId: currentUserData.userId, 
                username: currentUserData.username,
                admin: groupAdmins.includes(currentUserData.userId)
            });

            // Group Members
            for (const userId of groupMembers) {
                const groupMemberDataRef = usersData.find((user) => user.userId === userId);
                if (groupMemberDataRef) {
                    groupMembersDataRef.push({ 
                        userId: groupMemberDataRef.userId, 
                        username: groupMemberDataRef.username,
                        admin: groupAdmins.includes(groupMemberDataRef.userId)
                    });
                }
            };

            setGroupMembersData(groupMembersDataRef);
            setLoadingData(false);
        } catch(error) {
            console.log('Group Fetch Error:', error);
            setLoadingData(false);
        }
    };

    // Current User Admin Check
    const currentUserAdmin = async () => {
        setCurrentUserIsAdmin(groupAdmins.includes(currentUserData.userId));
    };

    // Update Group Name
    const updateGroupName = async () => {
        try {
            if (currentUserIsAdmin) {
                const groupDocRef = doc(groupRef, groupId);
                await updateDoc(groupDocRef, {
                    groupName: newGroupName
                });
            };
            setGroupNameData(newGroupName);
            await updateFriendGroupsData();
            closeEditGroupName();
        } catch(error) {
            console.log('Update Group Name Error:', error);
        }
    };

    // Leave Group
    const leaveGroup = async () => {
        try {
            setLoading(true);

            // Remove Group Id from Current User
            const userDocRef = doc(userRef, currentUserData.userId);
            await updateDoc(userDocRef, {
                groups: arrayRemove(groupId)
            });

            const groupDocRef = doc(groupRef, groupId);
            const updatedGroupDoc = await getDoc(groupDocRef);
            const updatedGroupData = updatedGroupDoc.data();

            // Check if Current User is Admin
            if (updatedGroupData.groupAdmins.includes(currentUserData.userId)) {
                // Remove Current User from Admin
                await updateDoc(groupDocRef, {
                    groupAdmins: arrayRemove(currentUserData.userId)
                });

                // Give Admin to random User if there are no Admins
                if (updatedGroupData.groupMembers.length > 0) {
                    const remainingAdmins = updatedGroupData.groupAdmins.filter(admin => admin !== currentUserData.userId);
                    if (remainingAdmins.length === 0) {
                        const remainingMembers = updatedGroupData.groupMembers.filter(member => member !== currentUserData.userId);
                        const randomIndex = Math.floor(Math.random() * remainingMembers.length);
                        const newAdminId = remainingMembers[randomIndex];

                        await updateDoc(groupDocRef, {
                            groupAdmins: arrayUnion(newAdminId)
                        });
                    }
                }
            }

            // Remove Current User from Group Members
            await updateDoc(groupDocRef, {
                groupMembers: arrayRemove(currentUserData.userId)
            });

            // Delete Group if 0 Group Members
            if (updatedGroupData.groupMembers.length === 0) {
                await deleteDoc(groupDocRef);
            };
            
            await updateFriendGroupsData();
            setLoading(false);
            closeModalFriendGroup();
        } catch(error) {
            console.log('Leave Group Error:', error);
            setLoading(false);
        }
    };

    // Delete Group
    const deleteGroup = async () => {
        try {
            setLoading(true);

            if (currentUserIsAdmin) {
                for (const userId of groupMembers) {
                    const userDocRef = doc(userRef, userId);
                    await updateDoc(userDocRef, {
                        groups: arrayRemove(groupId)
                    });
                }

                // Delete Group
                const groupDocRef = doc(groupRef, groupId);
                await deleteDoc(groupDocRef);
            };

            await updateFriendGroupsData();
            setLoading(false);
            closeModalFriendGroup();
        } catch(error) {
            console.log('Delete Group Error:', error);
            setLoading(false);
        }
    };

    // Update Group Members Data
    const updateGroupMembersData = (userId, action) => {
        setGroupMembersData((prevMembers) => {
            switch(action) {
                case 'remove':
                    return prevMembers.filter((member) => member.userId !== userId);
                case 'addAdmin':
                    return prevMembers.map((member) => 
                        member.userId === userId ? { ...member, admin: true } : member
                    );
                 case 'addMember':
                // Add the new member to the group members data
                const newMember = usersData.find((user) => user.userId === userId);
                if (newMember) {
                    return [...prevMembers, { userId: newMember.userId, username: newMember.username, admin: false }];
                } else {
                    return prevMembers; // Return previous state if new member not found
                }
                default:
                    return prevMembers;
            }
        });
    };

    // Group Name Area
    const openEditGroupName = () => {
        setNewGroupName(groupNameData);
        setShowEditGroupName(true);
    };
    const closeEditGroupName = () => {
        setShowEditGroupName(false);
    };

    // Modal Add Members
    const openModalAddMembers = () => {
        setShowModalAddMembers(true);
    }

    // Modal Friend Group
    const closeModalFriendGroup = () => {
        setShowModalFriendGroup(false);
    };


    return (
        <Modal visible={showModalFriendGroup}
                animationType='fade-up'>
            <SafeAreaView>
                <StatusBar barStyle="dark-content"/>

                {showEditGroupName ? (
                    <View className="flex-row justify-between items-center mt-1 px-6">
                        <View className="flex-[1] mr-5">
                            <InputUpdate valueText={newGroupName}
                                        onChangeText={setNewGroupName}
                                        placeholderText={t('friends.friends-group-group_name')}/>
                        </View>

                        <View className="flex-row items-center gap-3">
                            <TouchableOpacity onPress={updateGroupName} activeOpacity={opacity.opacity600}>
                                <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_edit_01.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeEditGroupName} activeOpacity={opacity.opacity600}>
                                <Image className="w-8 h-8" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_cross_02.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View className="flex-row justify-between items-center my-4 px-6">
                        <TouchableOpacity onPress={closeModalFriendGroup} activeOpacity={opacity.opacity600}>
                            <Image className="w-10 h-10" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_arrow_down_03.png')}/>
                        </TouchableOpacity>

                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{groupNameData}</Text>

                        {currentUserIsAdmin ? (
                            <TouchableOpacity onPress={openEditGroupName} activeOpacity={opacity.opacity600}>
                                <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_edit_01.png')}/>
                            </TouchableOpacity>
                        ) : (
                            <View className="w-5 h-5"></View>
                        )}
                    </View>
                )}

                <View className="px-6">
                    <View className="">
                        <View className="flex-row justify-between items-center my-6">
                            <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-group-group_members')}</Text>

                            {currentUserIsAdmin &&
                                <TouchableOpacity onPress={openModalAddMembers} activeOpacity={opacity.opacity600}>
                                    <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_add_user_01.png')}/>
                                </TouchableOpacity>
                            }
                        </View>

                        {loadingData ? (
                            <View className="items-center">
                                <LoadingAnimationPrimary />
                            </View>
                        ) : (
                            <FlatList className=""
                                    scrollEnabled={false}
                                    data={groupMembersData}
                                    keyExtractor={item => item.userId}
                                    renderItem={({ item }) => (
                                                <ItemFriendGroupMember userId={item.userId} username={item.username} currentUserData={currentUserData} currentUserIsAdmin={currentUserIsAdmin} admin={item.admin}
                                                                        groupId={groupId} updateGroupMembersData={updateGroupMembersData}/>
                                    )}/>
                        )}
                    </View>

                    <View className="my-16">
                        <TouchableOpacity onPress={leaveGroup} activeOpacity={opacity.opacity600}>
                            <View className="mb-4 border-2 border-error rounded-lg p-3">
                                <Text className="text-base text-center text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-group-leave_group')}</Text>
                            </View>
                        </TouchableOpacity>
                        {currentUserIsAdmin &&
                            <>
                            {loading ? (
                                <View className="items-center">
                                    <LoadingAnimationPrimary />
                                </View>
                            ) : (
                                <TouchableOpacity onPress={deleteGroup} activeOpacity={opacity.opacity700}>
                                    <View className="rounded-lg p-3 bg-error">
                                        <Text className="text-base text-center text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-group-delete_group')}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            </>
                        }
                    </View>
                </View>

                <ModalAddMembers friendsData={friendsData} groupId={groupId} currentUserIsAdmin={currentUserIsAdmin} groupMembers={groupMembers}
                                updateGroupMembersData={updateGroupMembersData} showModalAddMembers={showModalAddMembers} setShowModalAddMembers={setShowModalAddMembers}/>
            </SafeAreaView>
        </Modal>
    )
}
