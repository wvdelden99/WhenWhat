import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { ItemProfileImage } from './ItemProfileImage';


export function ItemFriendRequest({ request, user, acceptRequest, declineRequest }) {
    const [senderUsername, setSenderUsername] = useState('');

    useEffect(() => {
        const fetchSenderUsername = async () => {
            try {
                const userDocRef = doc(db, 'users', request);
                const docSnap = await getDoc(userDocRef);

                const userData = docSnap.data();
                if (userData) {
                    setSenderUsername(userData.username);
                } else {
                    // Handle if user data or username is not available
                    setSenderUsername(null);
                }
            } catch (error) {
                console.error('Error fetching sender username:', error);
            }
        };
        fetchSenderUsername();
    }, [request]);

    // Accepet or Decline Friendrequest
    const handleFriendRequest = async (action) => {
        try {
            const userDocRef = doc(db, 'users', user.userId);
            const updatedFriendRequests = (user.friendRequests || []).filter(id => id !== request);
            console.log('user friendrequest:', user.friendRequests)

            const updateData = { friendRequests: updatedFriendRequests };
            if (action === 'accept') {
                updateData.friends = arrayUnion(request);
                acceptRequest(updatedFriendRequests);
            } else if (action === 'decline') {
                declineRequest(updatedFriendRequests);
            }

            await updateDoc(userDocRef, updateData);
        } catch (error) {
            console.error(`Error ${action === 'accept' ? 'accepting' : 'declining'} friend request:`, error);
        }
    };
    console.log('user:', user)
    console.log('user friendrequest:', user.friendRequests)


    return (
        <View className="flex-row justify-between items-center my-3">
            <View className="flex-row items-center gap-3">
                <View>
                    <ItemProfileImage />
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{senderUsername}</Text>
            </View>
            <View className="flex-row items-center gap-3 mr-1">
                <TouchableOpacity onPress={() => handleFriendRequest('accept')} activeOpacity={opacity.opacity600}>
                    <Image className="w-5 h-5" style={{ tintColor: color.darkColor }}  source={require('./../../assets/static/icons/icon_check_01.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFriendRequest('decline')}>
                    <Image className="w-7 h-7" style={{ tintColor: color.errorColor }}  source={require('./../../assets/static/icons/icon_cross_02.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
