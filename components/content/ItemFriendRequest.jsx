import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';

export function ItemFriendRequest({ request, currentUser, onDecline, onAccept }) {
    const [senderUsername, setSenderUsername] = useState('');

    useEffect(() => {
        const fetchSenderUsername = async () => {
            try {
                if (!request || !currentUser) {
                    console.error('Request or current user not available');
                    return;
                }

                const userDocRef = doc(db, 'users', request);
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setSenderUsername(userData.username);
                } else {
                    console.error('Sender user document not found');
                }
            } catch (error) {
                console.error('Error fetching sender username:', error);
            }
        };

        fetchSenderUsername();
    }, [request, currentUser]);

    const declineFriendRequest = async () => {
        try {
            if (!currentUser || !currentUser.userId || !Array.isArray(currentUser.friendRequests)) {
                console.error('Current user or friend requests not available or invalid');
                return;
            }

            const userDocRef = doc(db, 'users', currentUser.userId);
            const updatedFriendRequests = currentUser.friendRequests.filter(id => id !== request);
            await updateDoc(userDocRef, {
                friendRequests: updatedFriendRequests
            });
            console.log('Friend request declined from', senderUsername);

            // Call the callback to update the state in the parent component
            onDecline(updatedFriendRequests);
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };

    const acceptFriendRequest = async () => {
        try {
            if (!currentUser || !currentUser.userId || !Array.isArray(currentUser.friendRequests)) {
                console.error('Current user or friend requests not available or invalid');
                return;
            }

            const userDocRef = doc(db, 'users', currentUser.userId);
            const updatedFriendRequests = currentUser.friendRequests.filter(id => id !== request);

            // Add sender to the current user's friend list
            await updateDoc(userDocRef, {
                friendRequests: updatedFriendRequests,
                friends: arrayUnion(request)
            });
            console.log('Friend request accepted from', senderUsername);

            // Call the callback to update the state in the parent component
            onAccept(updatedFriendRequests);
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
            <View style={{ alignItems: 'center', gap: 10 }}>
                <Image style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray' }} />
                <Text style={{ fontSize: 16, fontFamily: 'Raleway_600SemiBold' }}>Friend Request from {senderUsername || 'Unknown User'}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={declineFriendRequest}>
                    <Text>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={acceptFriendRequest}>
                    <Text>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
