import { useState } from 'react';
import { userRef } from '../../../../config/firebase';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { ItemProfileImage } from '../../ItemProfileImage';
import { LoadingAnimationSecondary } from '../../../animations/LoadingAnimationSecondary';


export function ItemFriend({item, username, currentUserData, setFriendsData, handlePress, friendListCreateGroup, friendList}) {

    const [loading, setLoading] = useState(false);

    // Remove Friend
    const removeFriend = async () => {
        try {
            setLoading(true);
            const userDocRef = doc(userRef, currentUserData.userId);
            const friendDocRef = doc(userRef, item.userId);

            await updateDoc(userDocRef, {
                friends: arrayRemove(item.userId)
            });
            await updateDoc(friendDocRef, {
                friends: arrayRemove(currentUserData.userId)
            });

            setFriendsData(prevFriends => prevFriends.filter(friend => friend.userId !== item.userId));
            setLoading(false);   
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row items-center gap-3">
                <View>
                    <ItemProfileImage username={username}/>
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{username}</Text>
            </View>

            {loading ? (
                <View>
                    <LoadingAnimationSecondary />
                </View>
            ) : (
                <>
                {friendListCreateGroup &&
                    <TouchableOpacity onPress={handlePress} activeOpacity={opacity.opacity600}>
                        <Image className="mr-2 w-7 h-7" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_plus_04.png')}/>
                    </TouchableOpacity>
                }
                {friendList &&
                    <TouchableOpacity onPress={removeFriend}>
                        <Text className="text-sm text-error" style={{ fontFamily: 'Raleway_600SemiBold' }}>Remove Friend</Text>
                    </TouchableOpacity>
                }
                </>
            )}
        </View>
    )
}
