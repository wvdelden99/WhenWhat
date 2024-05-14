import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, deleteUser,onAuthStateChanged, signInWithEmailAndPassword, updateEmail, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const { t } = useTranslation();

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthenticated(true);
                await updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    },[]);
    
    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({ ...user, username: data.username, userId: data.userId });
        } else {
            console.log("User data not found.");
        }
    }
    
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
            return {succes: true}
        } catch(error) {
            console.log('Logout error:', error.message);
            return {succes: false, msg: error.messsage, error: error}
        }
    }

    // Sign Up
    const signUp = async (username, email, password, passwordConfirmation) => {
        try {
            // Check if Username has enough characters
            if (username.length < 6) {
                throw new Error('Username too short');
            }

            // Check if the Username already exists
            const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
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
    
            await setDoc(doc(db, "users", response?.user?.uid), {
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

    // Update Email
    const updateUserEmail = async (newEmail) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }
    
            await updateEmail(user, newEmail);
    
            // Update the user's email in the database if needed
            const userDocRef = doc(db, 'users', user.uid);
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

            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, { username: newUsername }); 
            return { success: true };

        } catch (error) {
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

    // Delete Accounnt
    const deleteAccount = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }
            
            await deleteUser(user);
            return { success: true };

        } catch (error) {
            let errorCode = "";
            let errorMessage = (t('error.error-general'));
            console.log(error)
            return { success: false, errorCode, message: errorMessage };
        }
    };


    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signUp, logout, updateUserEmail, updateUsername, deleteAccount}}>
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
