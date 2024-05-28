import { useState, useEffect } from 'react';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { groupRef, userRef } from '../../../../config/firebase';
import { useTranslation } from 'react-i18next';
import { Image, FlatList, Text, View } from 'react-native';
import { color } from '../../../../assets/styles/Styles';
// Components
import { LayoutModal } from '../../../layout/_layoutModal';
import { InputCreate } from '../../../form/InputCreate';
import { InputSearch } from '../../../form/InputSearch';
import { ItemSelectedGroupMember } from '../../item/friends/ItemSelectedGroupMember';
import { ItemFriend } from '../../item/friends/ItemFriend';
import { ItemNoFriends } from '../../item/friends/ItemNoFriends';
import { ButtonSubmit } from '../../../button/ButtonSubmit';
import { LoadingAnimationPrimary } from '../../../animations/LoadingAnimationPrimary';


export function ModalCreateGroup({ currentUserData, friendsData, updateFriendGroupsData, showCreateGroup, setShowCreateGroup }) {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [searchFriends, setSearchFriends] = useState('');

    const [friendListData, setFriendListData] = useState([]);
    const [filteredFriendListData, setFilteredFriendListData] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [groupName, setGroupName] = useState('');

    const [generalError, setGeneralError] = useState('');
    const [groupMembersError, setGroupMembersError] = useState('');

    // Friend List Data
    useEffect(() => {
        setLoadingData(true);
        setFriendListData(friendsData);
        setFilteredFriendListData(friendsData);
        setLoadingData(false);
    }, [friendsData]);

    // Add Friend Group Member
    const addFriendGroupMember = (user) => {
        setFriendListData(prevState => prevState.filter(friend => friend.userId !== user.userId));
        setFilteredFriendListData(prevState => prevState.filter(friend => friend.userId !== user.userId));
        setSelectedMembers(prevState => [...prevState, user]);
    };

    // Remove Friend Group Member
    const removeFriendGroupMember = (user) => {
        setSelectedMembers(prevState => prevState.filter(member => member.userId !== user.userId));
        setFriendListData(prevState => [...prevState, user]);
        setFilteredFriendListData(prevState => [...prevState, user]);
    };

    // Submit Friend Group
    const handleCreateFriendGroup = async () => {
        try {
            setLoading(true);
            setGeneralError('');
            setGroupMembersError('');

            // Check if Group Name field is empty
            if (!groupName) {
                setGeneralError(t('error.error-general_empty_field'));
                setLoading(false);
                return;
            }

            // Check if atleast one Friend is added to the Group
            if (selectedMembers.length === 0) {
                setGroupMembersError(t('error.error-no_group_members'));
                setLoading(false);
                return;
            }

            // Save Friend Group Data in Groups Database
            const friendGroupDocRef = doc(groupRef);
            const groupData = {
                groupId: friendGroupDocRef.id,
                groupName,
                groupAdmins: [currentUserData.userId],
                groupMembers: [...selectedMembers.map(member => member.userId), currentUserData.userId]
            };
            await setDoc(friendGroupDocRef, groupData);

            // Save Group ID to Users
            const allMembers = [...selectedMembers, currentUserData];
            const userUpdatePromises = allMembers.map(member => {
                const userDocRef = doc(userRef, member.userId);
                return updateDoc(userDocRef, {
                    groups: arrayUnion(friendGroupDocRef.id)
                });
            });
            await Promise.all(userUpdatePromises);

            setLoading(false);
            setGroupName('');
            setSelectedMembers([]);
            setFriendListData(friendsData);
            setFilteredFriendListData(friendsData);
            await updateFriendGroupsData();
            closeCreateGroupModal();
        } catch(error) {
            console.log('Create Group Error:', error);
            setLoading(false);
        }
    };

    // Search Friend List
    const handleSearch = (query) => {
        setSearchFriends(query);
        if (query === '') {
            setFilteredFriendListData(friendListData);
        } else {
            setFilteredFriendListData(
                friendListData.filter(friend => friend.username.toLowerCase().includes(query.toLowerCase()))
            );
        }
    };

    // Close Modal
    const closeCreateGroupModal = () => {
        setShowCreateGroup(false);
    };

    return (
        <LayoutModal modalHeader={t('friends.friends-header-create_group')}
                    visible={showCreateGroup}
                    handleIconRight={closeCreateGroupModal}
                    iconRight={require('./../../../../assets/static/icons/icon_cross_02.png')}
                    styleIconRight="w-9 h-9">
            {friendsData.length > 0 ? (
                <>
                    <View className="px-3">
                        <View className="mb-4">
                            <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-create_group-group_name')}</Text>
                            <InputCreate valueText={groupName}
                                        onChangeText={setGroupName}
                                        placeholderText={t('friends.friends-create_group-group_name')}
                                        errorForm={generalError}
                                        errorText={generalError}/>
                        </View>

                        {loadingData ? (
                            <View className="items-center">
                                <LoadingAnimationPrimary />
                            </View>
                        ) : (
                            <View className="">
                                <Text className="mb-2 text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-create_group-group_members')}</Text>
                                <InputSearch value={searchFriends}
                                            onChangeText={handleSearch}
                                            placeholderText={t('components.search.search')}/>

                                {selectedMembers.length > 0 &&
                                    <FlatList className={`mt-6 pb-4 ${ (friendListData.length > 0 && !groupMembersError) ? 'border-b-[1px] border-gray-dark' : ''}`}
                                            horizontal
                                            data={selectedMembers}
                                            keyExtractor={item => item.userId}
                                            renderItem={({ item }) => (
                                                <ItemSelectedGroupMember username={item.username} handlePress={() => removeFriendGroupMember(item)}/>
                                            )}/>
                                }
                                {groupMembersError && 
                                    <View className="flex-row items-center mt-6 border-b-[1px] border-gray-dark pb-6 pr-1">
                                        <Image className="mr-1 w-4 h-4" style={{ tintColor: color.errorColor }} source={require('./../../../../assets/static/icons/icon_info_01.png')} />
                                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>{groupMembersError}</Text>
                                    </View>
                                }
                                
                                {filteredFriendListData.length > 0 ? (
                                    <FlatList className="my-6"
                                                data={filteredFriendListData}
                                                keyExtractor={item => item.userId}
                                                renderItem={({ item }) => (
                                                    <ItemFriend username={item.username} handlePress={() => addFriendGroupMember(item)} friendListCreateGroup/>
                                                )}/>
                                ) : (
                                    <View className="items-center my-12">
                                        <Text className="text-base text-dark-disabled" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('components.search.search-no_results')}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                    <View className="">
                        {loading ? (
                            <View className="justify-center items-center">
                                <LoadingAnimationPrimary />
                            </View>
                        ) : (
                            <ButtonSubmit handleSubmit={handleCreateFriendGroup}
                                            buttonText={t('friends.friends-create_group')}
                                            formValidValue={{}}/>
                        )}
                    </View>
                </>
            ) : (
                <ItemNoFriends />
            )}
        </LayoutModal>
    );
}
