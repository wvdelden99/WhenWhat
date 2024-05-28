import { Text, View } from 'react-native';
// Components
import { LayoutBackgroundMedium } from '../../../components/layout/_layoutBackgroundMedium';
import { ButtonBack } from './../../../components/button/ButtonBack';
import { useEffect } from 'react';


export function FriendGroup() {

    return (
        <LayoutBackgroundMedium>
            <View className="my-6 px-6">
                <ButtonBack />
                <View className="">
                    <Text></Text>
                </View>
            </View>
        </LayoutBackgroundMedium>
    )
}
