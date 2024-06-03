import { ScrollView, Text, View } from "react-native";
import { ItemChatMessage } from './ItemChatMessage';

export function ItemChatMessageList({messages, currentUser, scrollViewRef, groupMembers}) {

    return (
        <ScrollView ref={scrollViewRef}>
            {
                messages.map((message, index) => {
                    return (
                        <ItemChatMessage message={message} key={index} currentUser={currentUser} groupMembers={groupMembers}/>
                    )
                })
            }
        </ScrollView>
    )
}