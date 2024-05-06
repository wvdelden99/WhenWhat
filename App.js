import i18next from './localization/i18next';
// Fonts
import { useFonts, Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold, } from '@expo-google-fonts/raleway';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, } from '@expo-google-fonts/poppins';
// Components
import { Navigation } from './components/navigation/Navigation';
import { AuthContextProvider } from './config/auth/authContext';


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
        <AuthContextProvider>
            <Navigation />
        </AuthContextProvider>
    );
}
