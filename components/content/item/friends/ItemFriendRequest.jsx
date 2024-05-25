import { useState } from 'react';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { LoadingAnimationSecondary } from '../../../animations/LoadingAnimationSecondary';
import { ItemProfileImage } from '../../ItemProfileImage';


export function ItemFriendRequest({item, userRef, currentUserData, usersData, setFriendRequests, setFriendsData}) {

    const [loading, setLoading] = useState(false);

    // Accept Friend Request
    const acceptRequest = async (username) => {
        try {
            setLoading(true);
            const friendData = usersData.find(user => user.username === username);
            const userDocRef = doc(userRef, currentUserData.userId);
            const friendDocRef = doc(userRef, friendData.userId);

            await updateDoc(userDocRef, {
                friendRequests: arrayRemove(friendData.userId),
                friends: arrayUnion(friendData.userId)
            });
            await updateDoc(friendDocRef, {
                friends: arrayUnion(currentUserData.userId)
            });

            setFriendRequests(prevRequests => prevRequests.filter(request => request !== username));
            setFriendsData(prevFriends => [...prevFriends, username]);
            setLoading(false);
        } catch(error) {
            console.log('Accept Error', error);
            setLoading(false);
        }
    }

    // Decline Friend Request
    const declineRequest = async (username) => {
        try {
            setLoading(true);
            const friendData = usersData.find(user => user.username === username);
            const userDocRef = doc(userRef, currentUserData.userId);
            await updateDoc(userDocRef, {
                friendRequests: arrayRemove(friendData.userId)
            });

            setFriendRequests(prevRequests => prevRequests.filter(request => request !== username));
            setLoading(false);           
        } catch(error) {
            console.log('Decline Error:', error);
            setLoading(false);
        }
    };

    return (
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row items-center gap-3">
                <View className="rounded-full w-12 h-12 bg-secondary">
                    <ItemProfileImage username={item}/>
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
            </View>

            <View className="flex-row items-center gap-3">
                {loading ? (
                    <View>
                        <LoadingAnimationSecondary />
                    </View>
                ) : (
                <>
                    <TouchableOpacity onPress={() => acceptRequest(item)} activeOpacity={opacity.opacity600}>
                        <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_check_01.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => declineRequest(item)}>
                        <Image className="w-7 h-7" style={{ tintColor: color.errorColor }} source={require('./../../../../assets/static/icons/icon_cross_02.png')}/>
                    </TouchableOpacity>
                </>
                )}
            </View>
        </View>
    )
}
