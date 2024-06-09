import { useEffect, useState } from 'react';
import { useAuth } from '../config/auth/authContext';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View, FlatList, Image } from 'react-native';
import { opacity } from '../assets/styles/Styles';
// Components
import { LayoutAuth } from './../components/layout/_layoutAuth';
import { InputSearch } from './../components/form/InputSearch';
import { ItemProfileImage } from '../components/content/ItemProfileImage';


export function SignUpFriends() {
    const navigation = useNavigation();

    const { user, fetchUsersData } = useAuth();
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersFetchRef = await fetchUsersData();
                setUsersData(usersFetchRef);
            } catch(error) {
                console.log('Users Fetch Error:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <LayoutAuth>
            <View className="justify-center mx-auto w-[300px] h-full">
                <View className="">
                    <View className="mb-4">
                        <Text className="mb-2 text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>Friends</Text>

                        <InputSearch placeholderText="Search ..."/>
                    </View>

                    <View className="rounded-md p-2 h-3/4 bg-white">
                        <FlatList className=""
                                    data={usersData}
                                    keyExtractor={item => item.userId}
                                    renderItem={({item}) => (
                                        <View className="flex-row justify-between items-center m-2">
                                            <View className="flex-row items-center gap-2">
                                                <ItemProfileImage username={item.username}/>
                                                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{item.username}</Text>
                                            </View>
                                            <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity600}>
                                                <Image className="w-6 h-6" source={require('./../assets/static/icons/icon_add_user_01.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                    )}/>
                    </View>
                </View>

                <View className="items-center -mt-8">
                    <TouchableOpacity onPress={() => navigation.navigate('Navbar')} activeOpacity={opacity.opacity900}>
                        <Text className="text-base text-white" style={{ fontFamily: 'Raleway_700Bold' }}>Skip For Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LayoutAuth>
    )
};
