import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { color, opacity } from "../../../assets/styles/Styles";
import { useEffect, useState } from 'react';
import { formatDate, getRoomId } from '../../../auth/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../config/firebase';


export function ItemChat({item, currentUser}) {
    const navigation = useNavigation();

    const [lastMessage, setLastMessage] = useState(undefined);
    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setLastMessage(allMessages[0]? allMessages[0]: null);

        });
    }, []);
    // console.log('last message:', lastMessage);

    const goToChatRoom = (username, userId) => {
        navigation.navigate("ChatRoom", { username, userId });
    };

    const renderTime = () => {
        if (lastMessage) {
            let date = lastMessage?.createdAt;
            return formatDate(new Date(date?.seconds * 1000));
        }
    }

    const renderLastMessage = () => {
        if (typeof lastMessage == 'undefined') return 'Loading ...';
        if (lastMessage) {
            if(currentUser?.userId == lastMessage?.userId) return "You: "+lastMessage?.text;
            return lastMessage?.text;
        } else {
            return 'Say Hi';
        }
    }

    return (
        <View className={`flex-row justify-between items-center mt-6 mr-5 border-b-[1px] border-gray-dark pb-6`}>
            <View className="flex-row items-center gap-3">
                <View className="">
                    <Image className="rounded-full w-[56px] h-[56px] bg-gray" />
                </View>

                <View className="">
                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item?.username}</Text>
                    <View className="flex-row items-center">
                        <Text className="text-sm text-dark opacity-50" style={{ fontFamily: 'Raleway_500Medium' }}>{renderLastMessage()}</Text>
                        <Text className="text-sm text-dark opacity-60" style={{ fontFamily: 'Poppins_600SemiBold' }}>{renderTime()}</Text>
                    </View>
                </View>
            </View>
 
            <View className="flex-row gap-3">
                <TouchableOpacity activeOpacity={opacity.opacity600}>
                    <Image className="w-7 h-7 opacity-90" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_poll_01.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToChatRoom(item.username, item.userId)} activeOpacity={opacity.opacity600}>
                    <Image className="w-7 h-7 opacity-90" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_comment_03.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}