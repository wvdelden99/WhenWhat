import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../config/auth/authContext';
import { chatRef } from '../../../config/firebase';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Image, Keyboard, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../assets/styles/Styles';
// Components
import { KeyboardScroll } from '../../../components/utility/KeyboardScroll';
import { ItemChatMessageList } from '../../../components/content/item/friends/ItemChatMessageList';

export function Chat({ route }) {
    const navigation = useNavigation();

    const { groupId, groupName, groupMembers } = route.params;
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const chatId = groupId; 
        createChatIfNotExists(chatId);
        
        const docRef = doc(chatRef, chatId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        const unsub = onSnapshot(q, (snapshot) => {
            const allMessages = snapshot.docs.map(doc => doc.data());
            setMessages(allMessages);
        });

        const KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', updateScrollView);

        return () => {
            unsub();
            KeyboardDidShowListener.remove();
        }
    }, []);

    useEffect(() => {
        updateScrollView();
    }, [messages]);

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: false });
        }, 100);
    };

    const createChatIfNotExists = async (chatId) => {
        await setDoc(doc(chatRef, chatId), {
            chatId,
            createdAt: Timestamp.fromDate(new Date()),
        });
    };

    const handleSendMessage = async () => {
        const message = textRef.current.trim();
        if (!message || !user || !user.userId) return;

        const chatId = groupId;
        const docRef = doc(chatRef, chatId);
        const messageRef = collection(docRef, "messages");
        textRef.current = '';
        inputRef.current?.clear();

        await addDoc(messageRef, {
            userId: user.userId,
            text: message,
            senderName: user.username,
            createdAt: Timestamp.fromDate(new Date()),
        });
    };

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar barStyle="dark-content"/>
            <Image className="absolute w-full bg-cover" source={require('./../../../assets/static/images/image_background_01.png')}/>

            <View className="absolute flex-row justify-between items-center rounded-b-3xl pt-16 pb-6 px-4 w-full bg-white z-10">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={opacity.opacity600}>
                        <Image className="w-10 h-10" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_arrow_left_01.png')}/>
                    </TouchableOpacity>

                    <View className="flex-row items-center">
                        <View className="rounded-full w-10 h-10 bg-gray"></View>
                        <Text className="px-2 text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{groupName}</Text>
                    </View>
                </View>

                <View className="flex-row items-center gap-4 pr-1">
                    <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity600}>
                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_users_02.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity600}>
                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_dots_vertical_01.png')}/>
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardScroll>
                <View className="flex-[1] mt-20 pt-2">
                    <ItemChatMessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} groupMembers={groupMembers}/>
                </View>

                <View className="flex-row justify-between items-center my-2 mx-3 rounded-2xl bg-white">
                    <TextInput className="flex-[1] pb-2 pl-5 pr-3 min-h-[48px] text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}
                                ref={inputRef}
                                onChangeText={value => textRef.current = value}
                                placeholder="Type Message ..."/>

                    <TouchableOpacity onPress={handleSendMessage} activeOpacity={opacity.opacity700}>
                        <View className="items-center justify-center rounded-l-xl rounded-r-2xl p-3 bg-secondary">
                            <Image className="w-6 h-6" style={{ tintColor: color.whiteColor }} source={require('./../../../assets/static/icons/icon_paper_plane_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardScroll>
        </SafeAreaView>
    )
}
