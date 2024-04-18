import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView } from 'react-native';
// Fonts
import { useFonts, Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold, } from '@expo-google-fonts/raleway';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, } from '@expo-google-fonts/poppins';

export default function App() {

    // Fonts
    let [fontsLoaded] = useFonts({
        // Raleway
        Raleway_400Regular,
        Raleway_500Medium,
        Raleway_600SemiBold,
        Raleway_700Bold,

        // Poppins
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
            <StatusBar style="auto" />

            <Text className="" style={{ fontFamily: 'Poppins_600SemiBold'}}>Open up App.js to start working on your app!</Text> 
        </SafeAreaView>
    );
}