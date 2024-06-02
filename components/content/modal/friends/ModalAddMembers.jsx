import { useState } from 'react';
import { groupRef, userRef } from '../../../../config/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { LayoutModal } from '../../../layout/_layoutModal';
import { InputSearch } from '../../../form/InputSearch';
import { ItemProfileImage } from '../../ItemProfileImage';
import { LoadingAnimationSecondary } from '../../../animations/LoadingAnimationSecondary';


export function ModalAddMembers({friendsData, groupId, groupMembers, currentUserIsAdmin, updateGroupMembersData, showModalAddMembers, setShowModalAddMembers}) {
    const { t } = useTranslation();

    const [loading, setLoading]= useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [filteredFriendsData, setFilteredFriendsData] = useState(friendsData);

    const addGroupMember = async (userId) => {
        try {
            setLoading(true);
            if (currentUserIsAdmin) {
                const groupDocRef = doc(groupRef, groupId);
                await updateDoc(groupDocRef, {
                    groupMembers: arrayUnion(userId)
                });

                const userDocRef = doc(userRef, userId);
                await updateDoc(userDocRef, {
                    groups: arrayUnion(groupId)
                });

                setFilteredFriendsData(filteredFriendsData.filter(friend => friend.userId !== userId));
                updateGroupMembersData(userId, 'addMember');
            };
            setLoading(false);
        } catch(error) {
            console.log('Group Member Add Error:', error);
            setLoading(false);
        }
    };

    // Search Friends
    const searchFriends = (query) => {
        setSearchQuery(query);
        const filteredData = friendsData.filter(friend => friend.username.toLowerCase().includes(query.toLowerCase()));
        setFilteredFriendsData(filteredData);
    };

    // Modal Add Members
    const closeModalAddMembers = () => {
        setShowModalAddMembers(false);
    };

    return (
        <LayoutModal modalHeader="Add Members"
                    visible={showModalAddMembers}
                    handleIconRight={closeModalAddMembers}
                    iconRight={require('./../../../../assets/static/icons/icon_cross_02.png')}
                    styleIconRight="w-9 h-9">
            <View className="">
                <InputSearch value={searchQuery}
                            onChangeText={searchFriends}
                            placeholderText={t('components.search.search')}/>

                <FlatList className="my-6 px-2"
                            data={filteredFriendsData}
                            keyExtractor={item => item.userId}
                            renderItem={({item}) => (
                                <View className="flex-row justify-between items-center my-2">
                                    <View className="flex-row items-center gap-3">
                                        <View>
                                            <ItemProfileImage username={item.username}/>
                                        </View>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item.username}</Text>
                                    </View>

                                    {loading ? (
                                        <View>
                                            <LoadingAnimationSecondary />
                                        </View>
                                    ) : (
                                        <TouchableOpacity onPress={() => addGroupMember(item.userId)} activeOpacity={opacity.opacity600}>
                                            <Image className="w-8 h-8" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_plus_03.png')}/>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}/>
            </View>
        </LayoutModal>
    )
}
