// Components
import { AuthContextProvider } from "./config/auth/authContext";
import { Navigation } from "./components/navigation/Navigation";


export default function App() {
    return (
        <AuthContextProvider>
            <Navigation />
        </AuthContextProvider>
    );
}
