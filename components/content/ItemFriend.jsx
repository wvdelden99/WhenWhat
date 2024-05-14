// import { useState, useEffect } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../config/firebase';
// import { Image, Text, TouchableOpacity, View } from 'react-native';
// import { opacity } from '../../assets/styles/Styles';
// // Components
// import { ItemProfileImage } from './ItemProfileImage';


// const fetchUserDataById = async (userId) => {
//     try {
//         const userDocRef = doc(db, 'users', userId);
//         const docSnap = await getDoc(userDocRef);
//         if (docSnap.exists()) {
//             return docSnap.data();
//         } else {
//             console.error('User document not found');
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         return null;
//     }
// };

// export function ItemFriend({ friend, currentUser }) {
//     const [friendData, setFriendData] = useState(null);

//     useEffect(() => {
//         const fetchFriendData = async () => {
//             const userData = await fetchUserDataById(friend);
//             setFriendData(userData);
//         };

//         fetchFriendData();
//     }, [friend]);

//     if (!friendData) {
//         return null; // or return a loading indicator
//     }

//     const handleFriendInteraction = () => {
//         // Handle interaction with friend
//     };

//     const isFriend = currentUser && currentUser.friends && currentUser.friends.includes(friend);

//     return (
//         <View className="flex-row justify-between items-center my-3">
//             <View className="flex-row items-center gap-3">
//                 <View>
//                     <ItemProfileImage username={friendData.username} />
//                 </View>
//                 <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{friendData.username}</Text>
//             </View>
//             <TouchableOpacity onPress={handleFriendInteraction} activeOpacity={opacity.opacity600}>
//                 <Image className="mr-2 w-6 h-6" source={require('./../../assets/static/icons/icon_dots_horizontal_01.png')}/>
//             </TouchableOpacity>
//         </View>
//     );
// }

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'; // Add arrayRemove
import { db } from '../../config/firebase';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../assets/styles/Styles';
import { ItemProfileImage } from './ItemProfileImage';

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

export function ItemFriend({ friend, currentUser, setFriends }) { // Add setFriends prop
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

    const handleFriendInteraction = async () => {
        console.log('press')
        try {
            const userDocRef = doc(db, 'users', currentUser.userId);
            await updateDoc(userDocRef, {
                friends: arrayRemove(friend) // Remove the friend from the friends array
            });
            setFriends(prevFriends => prevFriends.filter(f => f !== friend)); // Update state in the parent
            console.log('no friends')
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <View className="flex-row justify-between items-center my-3">
            <View className="flex-row items-center gap-3">
                <View>
                    <ItemProfileImage username={friendData.username} />
                </View>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{friendData.username}</Text>
            </View>
            <TouchableOpacity onPress={handleFriendInteraction} activeOpacity={opacity.opacity600}>
                <Image className="mr-2 w-6 h-6" source={require('./../../assets/static/icons/icon_dots_horizontal_01.png')}/>
            </TouchableOpacity>
        </View>
    );
}
