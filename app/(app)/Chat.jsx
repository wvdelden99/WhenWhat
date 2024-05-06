import { useEffect, useRef, useState } from 'react';
import { useAuth } from "../../config/auth/authContext";
import { db } from "../../config/firebase";
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { getRoomId } from "../../auth/common";
import { useNavigation } from '@react-navigation/native';
import { Image, Keyboard, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { KeyboardScroll } from '../../components/utility/KeyboardScroll';
import { ButtonBack } from "../../components/button/ButtonBack";
import { MessageList } from "../../components/MessageList";
import { StackActions } from '@react-navigation/native';


export function ChatRoom({ route }) {
    const navigation = useNavigation();

    const { username, userId } = route.params;
    const {user} = useAuth();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId, userId);
        const docRef = doc(db, 'rooms', roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setMessages([...allMessages]);

        });

        const KeyboardDidShowListener = Keyboard.addListener(
            'KeyboardDidShow', updateScrollView
        )

        return () => {
            unsub();
            KeyboardDidShowListener.remove();
        }
    }, []);

    useEffect(() => {
        updateScrollView();
    }, [messages])

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: false})
        }, 100)
    }

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.userId, userId);

        await setDoc(doc(db, 'rooms', roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    // const handleSendMessage = async () => {
    //     let message = textRef.current.trim();
    //     if(!message) return;
    //     try {
    //         let roomId = getRoomId(user?.userId, userId);
    //         const docRef = doc(db, 'rooms', roomId);
    //         const messageRef = collection(docRef, "messages");
    //         textRef.current = '';
    //         if (inputRef) inputRef?.current?.clear();

    //         const newDoc = await addDoc(messageRef, {
    //             userId: user?.userId,
    //             text: message,
    //             senderName: user?.username,
    //             createdAt: Timestamp.fromDate(new Date())
    //         })
    //     } catch(error) {
    //         console.log('shit went wack', error)
    //     }
    // }

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if (!message || !user || !user.userId) return; // Add a check for user and userId
        try {
            let roomId = getRoomId(user?.userId, userId);
            const docRef = doc(db, 'rooms', roomId);
            const messageRef = collection(docRef, "messages");
            textRef.current = '';
            if (inputRef) inputRef?.current?.clear();
    
            const newDoc = await addDoc(messageRef, {
                userId: user.userId, // Ensure user.userId is defined
                text: message,
                senderName: user.username,
                createdAt: Timestamp.fromDate(new Date())
            });
        } catch(error) {
            console.log('shit went wack', error)
        }
    }
    

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar barStyle="dark-content"/>
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_02.png')}/>

            <View className="absolute flex-row justify-between items-center rounded-b-3xl pt-16 pb-6 px-4 w-full bg-white z-10">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={opacity.opacity600}>
                        <Image className="w-10 h-10" style={{ tintColor: color.darkColor }}  source={require('./../../assets/static/icons/icon_arrow_left_01.png')}/>
                    </TouchableOpacity>

                    <View className="flex-row items-center">
                        <Image className="rounded-full w-10 h-10 bg-gray"/>

                        <View className="mt-1 px-2">
                            <Text className="flex-[1] text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{username}</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-row items-center gap-4 pr-1">
                    <TouchableOpacity activeOpacity={opacity.opacity600}>
                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }}  source={require('./../../assets/static/icons/icon_users_02.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={opacity.opacity600}>
                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }}  source={require('./../../assets/static/icons/icon_dots_vertical_01.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardScroll>
                <View className="flex-[1] mt-20 pt-2">
                    <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
                </View>

                <View className="flex-row justify-between items-center my-2 mx-3 rounded-2xl bg-white">
                    <TextInput className="flex-[1] pb-2 pl-5 pr-3 min-h-[48px] text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                ref={inputRef}
                                onChangeText={value=> textRef.current = value}
                                placeholder="Type message ..."/>

                    <TouchableOpacity onPress={handleSendMessage} activeOpacity={opacity.opacity700}>
                        <View className="items-center justify-center rounded-l-xl rounded-r-2xl p-3 bg-secondary">
                            <Image className="w-6 h-6" style={{ tintColor: color.whiteColor }} source={require('./../../assets/static/icons/icon_paper_plane_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardScroll>
        </SafeAreaView>
    );
}
