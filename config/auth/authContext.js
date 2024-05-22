import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, userRef } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateEmail, signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const { t } = useTranslation();

    const [user, setUser] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsData, setFriendsData] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthenticated(true);
                await fetchCurrentUserData(user.uid);
                await fetchUsersData();
                await fetchFriendRequests();
                await fetchFriend();
                await updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    },[]);


    // Fetch
    // Fetch Current User
    const fetchCurrentUserData = async (userId) => {
        try {
            const userDocRef = doc(userRef, userId);
            const docSnap = await getDoc(userDocRef);
            const currentUserData = { ...docSnap.data(), userId };

            setUser(currentUserData);
            return currentUserData;
        } catch(error) {
            return null;
        }
    };

    // Fetch Users
    const fetchUsersData = async () => {
        try {
            const q = query(userRef, where('userId', '!=', user.userId));
            const querySnapshot = await getDocs(q);
        
            let usersData = [];
            querySnapshot.forEach((doc) => {
            usersData.push({ ...doc.data() });
            });

            setUsersData(usersData);
            return usersData;
        } catch(error) {
            return;
        }
    };

    // Fetch Friend Requests
    const fetchFriendRequests = async () => {
        try {
            const userFriendRequests = user?.friendRequests;
            const friendRequestUsername = [];
            
            for (const userId of userFriendRequests) {
                const friendRequestData = usersData.find(user => user.userId === userId);
                if (friendRequestData) {
                    friendRequestUsername.push(friendRequestData.username);
                }
            }
            setFriendRequests(friendRequestUsername);
            return friendRequestUsername;
        } catch(error) {
            console.log('Friend Request Fetch Error:', error)
        }
    };

    // Fetch Friends
    const fetchFriend = async () => {
        try {
            const userFriends = user?.friends || [];
            const friendUsername = [];
    
            for (const userId of userFriends) {
                const friendData = usersData.find(user => user.userId === userId);
                if (friendData) {
                    friendUsername.push(friendData.username);
                }
            }
            setFriendsData(friendUsername);
            return(friendUsername);
        } catch(error) {
            console.log(error);
            return;
        }
    };


    // Sign Up, Sign In, Sign Out
    // Sign Up
    const signUp = async (username, email, password, passwordConfirmation) => {
        try {
            // Check if Username has enough characters
            if (username.length < 6) {
                throw new Error('Username too short');
            }

            // Check if the Username already exists
            const usernameQuery = query(collection(userRef), where('username', '==', username));
            const usernameQuerySnapshot = await getDocs(usernameQuery);
            if (!usernameQuerySnapshot.empty) {
                throw new Error('Username already in use');
            }

            // Password Confirmation
            if (password !== passwordConfirmation) {
                throw new Error('Passwords do not match');
            }    
    
            // Register user
            const response = await createUserWithEmailAndPassword(auth, email, password);
    
            await setDoc(doc(userRef, response?.user?.uid), {
                username,
                userId: response?.user?.uid
            });
            return { success: true, data: response?.user };
    
        } catch(error) {
            let errorCode = "";
            let errorMessage = (t('error.error-general'));
    
            if (error.message === 'Username already in use') {
                errorCode = "username_in_use";
                errorMessage = (t('error.error-username_in_use'));
            } else if (error.message === 'Username too short') {
                errorCode = "username_too_short";
                errorMessage = (t('error.error-username_too_short'));
            } else if (error.code === "auth/invalid-email") {
                errorCode = "email_invalid";
                errorMessage = (t('error.error-email_invalid'));
            } else if (error.code === "auth/email-already-in-use") {
                errorCode = "email_in_use";
                errorMessage = (t('error.error-email_in_use'));
            } else if (error.code === "auth/weak-password") {
                errorCode = "password_weak";
                errorMessage = (t('error.error-password_weak'));
            } else if (error.message === 'Passwords do not match') {
                errorMessage = (t('error.error-password_not_match'));
            }
            return { success: false, errorCode, message: errorMessage };            
        }
    };

    // Sign In
    const signIn = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, data: response.user };

        } catch(error) {
            let errorCode = "";
            let errorMessage = t('error.error-general');

            if (error.code === 'auth/invalid-email' ||
                error.code === 'auth/user-not-found' ||
                error.code === 'auth/wrong-password' || 
                error.code === 'auth/invalid-credential') {
                errorCode = "signin_failed";
                errorMessage = (t('error.error-signin_failed'));
            }
            return { success: false, errorCode, message: errorMessage };
        }
    };

    // Sign Out
    const logout = async () => {
        try {
            await signOut(auth);
            setIsAuthenticated(false); 
            setUser(null);
            return {succes: true}
        } catch(error) {
            console.log('Logout error:', error.message);
            return {succes: false, msg: error.messsage, error: error}
        }
    }


    // Update
    // Update User
    const updateUserData = async (userId) => {
        const docRef = doc(userRef, userId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({ ...user, username: data.username, userId: data.userId });
        } else {
            console.log("User data not found.");
        }
    }

    // Update Email
    const updateUserEmail = async (newEmail) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }
    
            await updateEmail(user, newEmail);
    
            // Update the user's email in the database if needed
            const userDocRef = doc(userRef, user.uid);
            await updateDoc(userDocRef, { email: newEmail });
            return { success: true };

        } catch (error) {
            let errorCode = "";
            let errorMessage = (t('error.error-general'));

            if (error.code === "auth/invalid-email") {
                errorCode = "email_invalid";
                errorMessage = (t('error.error-email_invalid'));
            } else if (error.code === "auth/email-already-in-use") {
                errorCode = "email_in_use";
                errorMessage = (t('error.error-email_in_use'));
            }
            return { success: false, errorCode, message: error.message };
        }
    };

    // Update Username
    const updateUsername = async (newUsername) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not auth')
            }

            // Check if Username has enough characters
            if (newUsername.length < 6) {
                throw new Error('Username too short');
            }

            // Check if Username already in use
            const usernameQuery = query(collection(db, 'users'), where('username', '==', newUsername));
            const usernameQuerySnapshot = await getDocs(usernameQuery);
            if (!usernameQuerySnapshot.empty) {
                throw new Error('Username already in use');
            }

            const userDocRef = doc(userRef, user.uid);
            await updateDoc(userDocRef, { username: newUsername }); 
            return { success: true, updateUsername: newUsername };

        } catch (error) {
            console.log(error)
            let errorCode = "";
            let errorMessage = (t('error.error-general'));
    
            if (error.message === 'Username already in use') {
                errorCode = "username_in_use";
                errorMessage = (t('error.error-username_in_use'));
            } else if (error.message === 'Username too short') {
                errorCode = "username_too_short";
                errorMessage = (t('error.error-username_too_short'));
            }
            return { success: false, errorCode, message: errorMessage };
        }
    };


    // Delete
    // Delete Account
    const deleteAccount = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }
    
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);
            await deleteDoc(userDocRef);
            await deleteUser(user);
    
            return { success: true };
        } catch (error) {
            console.log("Error deleting account:", error);
            let errorCode = "";
            let errorMessage = t('error.error-general');

            return { success: false, errorCode, message: errorMessage };
        }
    };
    

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signUp, logout, 
                                    updateUserEmail, updateUsername, deleteAccount, 
                                    fetchCurrentUserData, fetchUsersData, fetchFriendRequests, fetchFriend}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider')
    }
    return value;
}
