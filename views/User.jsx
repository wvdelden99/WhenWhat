import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function User() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <View className="justify-center items-center h-full">
                <Text>User</Text>

                <TouchableHighlight className="bg-primary p-3" onPress={() => navigation.navigate('Settings')}>
                    <Text>Settings</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}