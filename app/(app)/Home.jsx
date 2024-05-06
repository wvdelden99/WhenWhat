import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../config/auth/authContext";

export function HomeTest() {
    const {logout} = useAuth();
    const handleLogout = async () => {
        await logout();
    }

    return (
        <SafeAreaView className="flex-[1] bg-secondary-light">
        <View className="flex-[1] justify-center items-center">
           {/* <ActivityIndicator size="large" color="gray"/> */}
           <Text>Home</Text>

           <TouchableOpacity onPress={handleLogout}>
                <Text className="p-3 bg-primary">Logout</Text>
           </TouchableOpacity>
        </View>
        </SafeAreaView>

        //18:31~
        //24:24~ auth
    )
}