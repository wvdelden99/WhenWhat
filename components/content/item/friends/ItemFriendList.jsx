import { useState } from 'react';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { Text, TouchableOpacity, View } from 'react-native';
// Component
import { LoadingAnimationSecondary } from '../../../animations/LoadingAnimationSecondary';
import { ItemProfileImage } from '../../ItemProfileImage';


export function ItemFriendList({item, userRef, currentUserData, usersData, setFriendsData}) {

    const [loading, setLoading] = useState(false);

    // Remove Friend
    const removeFriend = async (username) => {
        try {
            setLoading(true);
            const friendData = usersData.find(user => user.username === username);
            const userDocRef = doc(userRef, currentUserData.userId);
            const friendDocRef = doc(userRef, friendData.userId);

            await updateDoc(userDocRef, {
                friends: arrayRemove(friendData.userId)
            });
            await updateDoc(friendDocRef, {
                friends: arrayRemove(currentUserData.userId)
            });

            setFriendsData(prevRequests => prevRequests.filter(request => request !== username));
            setLoading(false);   
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    
    return (
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row items-center gap-3">
                <View className="rounded-full w-12 h-12 bg-secondary">
                    <ItemProfileImage username={item} />
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
            </View>

            <View>
                {loading ? (
                    <View>
                        <LoadingAnimationSecondary />
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => removeFriend(item)}>
                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>Remove Friend</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
