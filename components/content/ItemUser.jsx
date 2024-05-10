
import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';

export function ItemUser({ item, currentUser }) {
    const [requestStatus, setRequestStatus] = useState('Send Request');

    useEffect(() => {
        const isRequested = currentUser && currentUser.friendRequests && currentUser.friendRequests.includes(item.userId);
        if (isRequested) {
            setRequestStatus('Waiting');
        } else {
            setRequestStatus('Send Request');
        }
    }, [currentUser, item]);

    const sendFriendRequest = async () => {
        try {
            const userDocRef = doc(db, 'users', item.userId);
            await updateDoc(userDocRef, {
                friendRequests: arrayUnion(currentUser.userId)
            });
            setRequestStatus('Waiting');
            console.log('Friend request sent to', item.username);
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray' }} />
                <Text style={{ fontSize: 16, fontFamily: 'Raleway_600SemiBold' }}>{item.username}</Text>
            </View>
            <TouchableOpacity onPress={sendFriendRequest}>
                <Text style={{ fontSize: 16, fontFamily: 'Raleway_600SemiBold', color: '#007bff' }}>{requestStatus}</Text>
            </TouchableOpacity>
        </View>
    );
}


