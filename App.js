import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text } from 'react-native';

export default function App() {
    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar style="auto" />

            <Text className="">Open up App.js to start working on your app!</Text> 
        </SafeAreaView>
    );
}