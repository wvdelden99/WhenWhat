import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native';
// Components
import { ButtonBack } from '../button/ButtonBack';


export function LayoutSettings({title, children }) {
    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar barStyle="light-content"/>

            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_03.png')} />
            <View className="flex-row items-center my-6">
                <ButtonBack />

                <View className="flex-[1] items-center">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{title}</Text>
                </View>
            </View>

            <View className="rounded-t-3xl px-6 h-full bg-white">
                {children}
            </View>
        </SafeAreaView>
    );
}