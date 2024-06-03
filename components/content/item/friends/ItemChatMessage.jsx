import { Image, Text, View } from "react-native";
import { blur } from "../../../../assets/styles/Styles";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../config/auth/authContext";

export function ItemChatMessage({ currentUser, message, groupMembers, usersData }) {

    if (currentUser?.userId === message?.userId) {
        return (
            <View className="self-end mr-4 mt-2 rounded-l-2xl rounded-tr-xl py-2 px-4 bg-white">
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{message?.text}</Text>
            </View>
        )
    } else {
        return (
            <View className="flex-row gap-2 mt-1 ml-1">
                {/* User Initial */}
                <View className="self-end rounded-full w-6 h-6 bg-white flex items-center justify-center">
                    {/* <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{senderName}</Text> */}
                </View>
                <View className="self-start rounded-r-2xl rounded-tl-xl py-2 px-4 blur-lg" style={{ backgroundColor: blur.blurBackground }}>
                    <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{message?.text}</Text>
                </View>
            </View>
        )
    }
}
