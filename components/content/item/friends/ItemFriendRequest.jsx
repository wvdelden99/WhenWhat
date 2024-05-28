import { useState } from 'react';
import { userRef } from '../../../../config/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { ItemProfileImage } from '../../ItemProfileImage';
import { LoadingAnimationSecondary } from '../../../animations/LoadingAnimationSecondary';


export function ItemFriendRequest({item, username, currentUserData, setFriendRequests, setFriendsData}) {

    const [loading, setLoading] = useState(false);

    // Accept Friend Request
    const acceptRequest = async () => {
        try {
            setLoading(true);
            const userDocRef = doc(userRef, currentUserData.userId);
            const friendDocRef = doc(userRef, item.userId);

            await updateDoc(userDocRef, {
                friendRequests: arrayRemove(item.userId),
                friends: arrayUnion(item.userId)
            });
            await updateDoc(friendDocRef, {
                friends: arrayUnion(currentUserData.userId)
            });

            setFriendRequests(prevRequests => prevRequests.filter(request => request.userId !== item.userId));
            setFriendsData(prevFriends => [...prevFriends, item]);
            setLoading(false);
        } catch (error) {
            console.log('Accept Error', error);
            setLoading(false);
        }
    };

    // Decline Friend Request
    const declineRequest = async () => {
        try {
            setLoading(true);
            const userDocRef = doc(userRef, currentUserData.userId);
            await updateDoc(userDocRef, {
                friendRequests: arrayRemove(item.userId)
            });

            setFriendRequests(prevRequests => prevRequests.filter(request => request.userId !== item.userId));
            setLoading(false);           
        } catch (error) {
            console.log('Decline Error:', error);
            setLoading(false);
        }
    };

    return (
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row items-center gap-3">
                <View className="rounded-full w-12 h-12 bg-secondary">
                    <ItemProfileImage username={username}/>
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{username}</Text>
            </View>

            <View className="flex-row items-center gap-3">
                {loading ? (
                    <View>
                        <LoadingAnimationSecondary />
                    </View>
                ) : (
                    <>
                    <TouchableOpacity onPress={acceptRequest} activeOpacity={opacity.opacity600}>
                        <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_check_01.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={declineRequest} activeOpacity={opacity.opacity700}>
                        <Image className="w-7 h-7" style={{ tintColor: color.errorColor }} source={require('./../../../../assets/static/icons/icon_cross_02.png')}/>
                    </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    )
}
