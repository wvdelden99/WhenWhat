import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
import { doc, getDoc } from 'firebase/firestore';


export function ItemFriendRequest({item, currentUserData, usersData}) {


    // Accept Friend Request
    // const acceptRequest = async (username) => {
    //     const friendRequestData = usersData.find(user => user.username === username);
        
    //     const updatedFriends = arrayUnion(friendRequestData.userId);
    //     await updateDoc(doc(userRef, user.userId), { friends: updatedFriends });

    //     const updatedFriendRequests = currentUserData.friendRequests.filter(requestUsername => requestUsername !== username);
    //     await updateDoc(doc(userRef, user.userId), { friendRequests: updatedFriendRequests });

    //     // Update state to reflect changes
    //     setFriendRequests(updatedFriendRequests);
    //     setFriendsData(friendsData);
    // }


    // Decline Friend Request
    const declineRequest = async (username) => {
        const friendRequestData = usersData.find(user => user.username === username);
        const updatedFriendRequests = currentUserData.friendRequests.filter(userId => userId !== friendRequestData.userId);
        await updateDoc(doc(userRef, user.userId), { friendRequests: updatedFriendRequests });

        setFriendRequests(updatedFriendRequests);
    }

    return (
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row items-center gap-3">
                <View className="rounded-full w-12 h-12 bg-secondary">

                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
            </View>

            <View className="flex-row items-center gap-3">
                <TouchableOpacity onPress={() => declineRequest(item)} activeOpacity={opacity.opacity600}>
                    <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_check_01.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => acceptRequest(item)}>
                    <Image className="w-7 h-7" style={{ tintColor: color.errorColor }} source={require('./../../assets/static/icons/icon_cross_02.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
