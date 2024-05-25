import { useEffect, useState } from 'react';
import { useAuth } from '../../../../config/auth/authContext';
import { groupRef } from '../../../../config/firebase';
import { useTranslation } from 'react-i18next';
import { FlatList, TextInput, View, Text, TouchableOpacity } from 'react-native';
// Components
import { LayoutModal } from '../../../layout/_layoutModal';
import { ItemGroupMemberAdd } from '../../item/friends/ItemGroupMemberAdd';
import { ItemGroupMember } from '../../item/friends/ItemGroupMember';
import { InputSearch } from '../../../form/InputSearch';
import { ButtonSubmit } from './../../../button/ButtonSubmit';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';

export function ModalCreateGroup({ userRef, user, currentUserData, usersData, showCreateGroup, setShowCreateGroup }) {
    const { t } = useTranslation();

    const { fetchFriend } = useAuth();

    const [loading, setLoading] = useState(true);
    const [friendsData, setFriendsData] = useState([]);
    const [friendListData, setFriendListData] = useState([]);
    const [searchFriends, setSearchFriends] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [friendListId, setFriendListId] = useState([]);

    // Fetch Friends Data
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            if (currentUserData && usersData) {
                const friendData = await fetchFriend();
                setFriendsData(friendData);
                fetchFriendListData(friendData);
            }
            setLoading(false);
        }
        fetchData();
    }, [currentUserData, usersData]);

    // Close Modal
    const closeCreateGroupModal = () => {
        setShowCreateGroup(false);
    };

    // Friend List Add
    const fetchFriendListData = async (friendData) => {
        try {
            const friendDataRef = currentUserData.friends;
    
            const combinedData = friendData.map((username, index) => ({
                id: friendDataRef[index], // Assuming friendId and friendData have the same length
                username: username
            }));
    
            setFriendListData(combinedData); 
        } catch (error) {
            console.log(error);
        }
    }


    const handleAddMember = (member) => {
        // Ensure member object is properly defined
        if (member && member.username) {
            setSelectedMembers(prevSelected => [...prevSelected, { id: member.id, username: member.username }]);
            setFriendListData(prevFriendList => prevFriendList.filter(item => item.id !== member.id));
        } else {
            console.error("Member or username is undefined:", member);
        }
    };
        
    const handleRemoveMember = (member) => {
        setSelectedMembers(prevSelected => prevSelected.filter(m => m.id !== member.id));
        setFriendListData(prevFriendList => [...prevFriendList, { id: member.id, username: member.username }]);
    };
    

    const handleSubmit = async () => {
        try {
            if (!groupName) {
                console.error('Group name is missing.');
                return;
            }
    
            // Add the current user to selectedMembers
            const currentUser = { id: currentUserData.userId, username: currentUserData.username };
            const updatedSelectedMembers = [...selectedMembers, currentUser];
    
            // Add group to Firestore
            const groupDocRef = doc(groupRef);
            const groupData = {
                groupName: groupName,
                members: updatedSelectedMembers.map(member => member.id), // Save member IDs
            };
            await setDoc(groupDocRef, groupData);
    
            // Get the ID of the newly created group
            const groupId = groupDocRef.id;
            await updateDoc(groupDocRef, {
                groupId: groupId,
            });
    
            // Update the current user's document with the group ID
            const userDocRef = doc(userRef, currentUserData.userId);
            await updateDoc(userDocRef, {
                groups: arrayUnion(groupId), // Assuming 'groups' is an array in currentUserData
            });

            // Update other users groups array
            for (const member of updatedSelectedMembers) {
                const memberDocRef = doc(userRef, member.id);
                await updateDoc(memberDocRef, {
                    groups: arrayUnion(groupId), // Assuming 'groups' is an array in each member's data
                });
            }
    

            console.log('success');
            // Close the modal after submission
            closeCreateGroupModal();
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };
    


    // Generate unique key
    const getKey = (item, index) => (item.id ? item.id.toString() : index.toString());

    return (
        <LayoutModal modalHeader={t('friends.friends-header-create_group')}
                    visible={showCreateGroup}
                    handleIconRight={closeCreateGroupModal}
                    iconRight={require('./../../../../assets/static/icons/icon_cross_02.png')}
                    styleIconRight="w-9 h-9">

            <View className="px-3 h-full">
                <View className="mb-6">
                    <Text className="mb-2 text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Group Name</Text>
                    <TextInput className="rounded-lg pt-1 pb-2 px-4 min-h-[52px] text-base text-dark bg-gray" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                value={groupName}
                                onChangeText={setGroupName}
                                placeholder='Group Name'/>
                </View>

                <View className="mb-6">
                    <Text className="mb-2 text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Group Members</Text>
                    <InputSearch placeholderText={t('components.search')} />

                    {selectedMembers.length > 0 &&
                    <FlatList className="mt-6 border-b-[1px] border-gray pb-4"
                                data={selectedMembers}
                                keyExtractor={(item, index) => getKey(item, index)}
                                renderItem={({ item }) => (
                                    <ItemGroupMember item={item} username={item.username} handleGroupMemberRemove={() => handleRemoveMember(item)}/>)}
                                horizontal/>
                    }

                    <FlatList className="my-6"
                                data={friendListData}
                                keyExtractor={(item, index) => getKey(item, index)}
                                renderItem={({ item }) => (
                                    <ItemGroupMemberAdd item={item} username={item.username} handleGroupMemberAdd={() => handleAddMember(item)}/>
                                )}/>
                </View>
                <View className="">
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text className="bg-primary">Create Group</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LayoutModal>
    );
}
