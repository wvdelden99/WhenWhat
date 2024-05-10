import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../assets/styles/Styles';

const fetchUserDataById = async (userId) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.error('User document not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export function ItemFriend({ friend, currentUser }) {
    const [friendData, setFriendData] = useState(null);

    useEffect(() => {
        const fetchFriendData = async () => {
            const userData = await fetchUserDataById(friend);
            setFriendData(userData);
        };

        fetchFriendData();
    }, [friend]);

    if (!friendData) {
        return null; // or return a loading indicator
    }

    const handleFriendInteraction = () => {
        // Handle interaction with friend
    };

    const isFriend = currentUser && currentUser.friends && currentUser.friends.includes(friend);

    return (
        <View className="flex-row justify-between items-center my-3">
            <View className="flex-row items-center gap-3">
                <Image className="rounded-full w-12 h-12 bg-gray"/>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{friendData.username}</Text>
            </View>
            <TouchableOpacity onPress={handleFriendInteraction} activeOpacity={opacity.opacity600}>
                <Text>{isFriend ? 'Friend' : 'Add Friend'}</Text>
            </TouchableOpacity>
        </View>
    );
}
