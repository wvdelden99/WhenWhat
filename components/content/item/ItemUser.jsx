import { useEffect, useState } from 'react';
import { userRef } from '../../../config/firebase';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../assets/styles/Styles';
// Components
import { LoadingAnimationSecondary } from '../../animations/LoadingAnimationSecondary';
import { ItemProfileImage } from '../ItemProfileImage';


export function ItemUser({item, username, currentUserData}) {
    const [loading, setLoading] = useState(false);
    const [requestSend, setRequestSend] = useState(false);

    // Check if friend request has already been sent
    useEffect(() => {
        const checkFriendRequestStatus = async () => {
            try {
                const userDocRef = doc(userRef, item.userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists() && userDoc.data().friendRequests.includes(currentUserData.userId)) {
                    setRequestSend(true);
                }
            } catch (error) {
                console.log('Check Friend Request Status Error:', error);
            }
        };

        checkFriendRequestStatus();
    }, [item.userId, currentUserData.userId]);

    // Send Friend Request
    const sendFriendRequest = async () => {
        try {
            setLoading(true);
            const userDocRef = doc(userRef, item.userId);
            await updateDoc(userDocRef, {
                friendRequests: arrayUnion(currentUserData.userId)
            });
            setRequestSent(true);
            setLoading(false);
        } catch (error) {
            console.log('Send Friend Request Error:', error);
            setLoading(false);
        }
    };

    return (
        <View className="flex-row justify-between items-center my-3">
            <View className="flex-row items-center gap-3">
                <View className="">
                    <ItemProfileImage username={username}/>
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{username}</Text>
            </View>

            <View className="mr-3">
                { loading ? (
                    <View className="-mr-2">
                        <LoadingAnimationSecondary />
                    </View>
                ) : (
                    <TouchableOpacity onPress={sendFriendRequest} disabled={requestSend} activeOpacity={opacity.opacity600}>
                    {requestSend ? (
                         <Image className="w-5 h-5 opacity-50" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_hourglass_01.png')}/>
                    ) : (
                        <Image className="w-5 h-5" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_add_user_01.png')}/>
                    )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
