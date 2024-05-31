import { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { Image, FlatList, Text, View, TouchableOpacity, TextInput, Modal, SafeAreaView } from 'react-native';
import { color, opacity, shadow } from '../../../assets/styles/Styles';
// Components
import { LayoutBackgroundMedium } from '../../../components/layout/_layoutBackgroundMedium';
import { ButtonBack } from './../../../components/button/ButtonBack';

import { db } from '../../../config/firebase';  // Adjust based on your setup

import { ItemProfileImage } from '../../../components/content/ItemProfileImage';


export function FriendGroup({route}) {
    const { t } = useTranslation();

    const { item } = route.params;

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const membersData = [];
            for (const userId of item.groupMembers) {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    membersData.push({ userId: userId, ...userDoc.data() });
                }
            }
            // Sort members so that admins appear first
            const sortedMembers = membersData.sort((a, b) => {
                const aIsAdmin = item.groupAdmins.includes(a.userId);
                const bIsAdmin = item.groupAdmins.includes(b.userId);
                return bIsAdmin - aIsAdmin; // This ensures that admins (true = 1) come before non-admins (false = 0)
            });

            setMembers(sortedMembers);
        };
        
        fetchMembers();
    }, [item.groupMembers]);

    const isAdmin = (userId) => {
        return item.groupAdmins.includes(userId);
    };


    const [showEditGroupName, setShowEditGroupName] = useState(false);
    const openEditGroupName = () => {
        setShowEditGroupName(true);
    }

    const closeEditGroupName = () => {
        setShowEditGroupName(false);
    }

    const [showMember, setShowMember] = useState(false);
    const openMember = () => {
        setShowMember(true);
    }

    const closeMember = () => {
        setShowMember(false);
    }


    return (
        <LayoutBackgroundMedium>
            {!showEditGroupName ? (
                <View className="flex-row justify-between items-center my-6 px-6">
                    <View className="-ml-6">
                        <ButtonBack />
                    </View>

                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item.groupName}</Text>

                    <TouchableOpacity onPress={openEditGroupName} activeOpacity={opacity.opacity900}>
                        <View className="rounded-md p-3 bg-white">
                            <Image className="w-5 h-5" source={require('./../../../assets/static/icons/icon_edit_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row justify-between my-6 px-6">
                    <View className="flex-[1] mr-3">
                        <TextInput className="rounded-lg pt-2 pb-3 px-4 text-base text-dark bg-white"
                                    value={item.groupName}
                                    placeholder='Group Name'/>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity900}>
                            <View className="rounded-md p-3 bg-white">
                                <Image className="w-5 h-5" source={require('./../../../assets/static/icons/icon_edit_01.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeEditGroupName} activeOpacity={opacity.opacity900}>
                            <View className="rounded-md p-1 bg-white">
                                <Image className="w-9 h-9" source={require('./../../../assets/static/icons/icon_cross_02.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View className="rounded-t-3xl pt-10 px-6 h-full bg-white">
                <View>
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Group Members</Text>

                    <FlatList className="my-2"
                                scrollEnabled={false}
                                data={members}
                                keyExtractor={(item) => item.groupMembers}
                                renderItem={({ item: member }) => (
                                    <View className="flex-row justify-between items-center my-2">
                                        <View className="flex-row items-center">
                                            <View className="mr-3">
                                                <ItemProfileImage username={member.username}/>
                                            </View>
                                            <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{member.username}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-3">
                                            {isAdmin(member.userId) &&
                                                <Image className="w-6 h-6" style={{ tintColor: color.primaryColor }} source={require('./../../../assets/static/icons/icon_crown_01.png')}/>
                                            }
                                            <TouchableOpacity onPress={openMember} activeOpacity={opacity.opacity600}>
                                                <Image className="-rotate-90 -mr-1 w-7 h-7" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_arrow_down_03.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}/>
                        <View className="mt-4">
                            <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity800}>
                                <View className="flex-row items-center justify-center border-2 border-secondary rounded-lg p-3">
                                    <Text className="text-base text-dark mr-2" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-group-add_members')}</Text>
                                    <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_plus_04.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                </View>

                <View className="mt-20">
                    <TouchableOpacity>
                        <View className="items-center mb-4 border-2 border-error rounded-lg p-3">
                            <Text className="text-base text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-group-leave_group')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity700}>
                        <View className="items-center rounded-lg p-3 bg-error">
                            <Text className="text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-group-delete_group')}</Text>
                        </View>
                    </TouchableOpacity>

                    <Modal visible={showMember}
                            transparent={true}
                            animationType='fade-up'>
                        <View className="flex-[1] justify-center items-center">
                            <View className="absolute border-[1px] border-gray-dark rounded-3xl pt-5 px-8 w-full h-1/3 bottom-0 bg-white" style={{ ... shadow.shadowItem }}>
                                <View className="flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <View className="rounded-full w-12 h-12 bg-secondary">

                                        </View>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Name</Text>
                                    </View>

                                    <TouchableOpacity onPress={closeMember} activeOpacity={opacity.opacity600}>
                                        <Image className="w-8 h-8" source={require('./../../../assets/static/icons/icon_cross_02.png')}/>
                                    </TouchableOpacity>
                                </View>
                                
                                <View className="my-4">
                                    <View className="flex-row justify-between items-center mb-4 rounded-md p-3 bg-gray">
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Make Admin</Text>
                                        <Image className="w-6 h-6 mr-2" source={require('./../../../assets/static/icons/icon_crown_01.png')}/>
                                    </View>
                                    <View className="flex-row justify-between items-center rounded-md p-3 bg-gray">
                                        <Text className="text-base text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>Delete Member</Text>
                                        <Image className="w-6 h-6 mr-2" source={require('./../../../assets/static/icons/icon_crown_01.png')}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </LayoutBackgroundMedium>
    )
}