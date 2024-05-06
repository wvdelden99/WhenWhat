import { ScrollView, Text, View } from "react-native";
import { MessageItem } from "./content/chat/ItemChatMessage";

export function MessageList({messages, currentUser, scrollViewRef}) {
    console.log(messages)

    return (
        <ScrollView ref={scrollViewRef}>
            {
                messages.map((message, index) => {
                    return (
                        <MessageItem message={message} key={index} currentUser={currentUser}/>
                    )
                })
            }
        </ScrollView>
    )
}