import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { opacity } from '../assets/styles/Styles';
import activities from '../assets/data/activities.json';
// Components
import { LayoutAuth } from '../components/layout/_layoutAuth';
import { InputAuth } from '../components/form/InputAuth';
import { ButtonSubmit } from '../components/button/ButtonSubmit';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { userRef } from '../config/firebase';
import { useAuth } from '../config/auth/authContext';


export function SignUpInterests() {
    const navigation = useNavigation();

    const { user, fetchCurrentUserData } = useAuth();
    const [currentUserData, setCurrentUserData] = useState(null);

    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedSubs, setSelectedSubs] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const currentUserFetchRef = await fetchCurrentUserData(user.userId);
                setCurrentUserData(currentUserFetchRef);
            } catch(error) {
                console.log('Fetch Error:', error);
            }
        }
        fetchData();
    }, []);

    // Activity and Sub Categories
    const activityCategories = [...new Set(activities.flatMap(item => item.categories.activity))].sort();
    const subCategories = [...new Set(activities.flatMap(item => item.categories.sub))].sort();

    // Toggle Activity Tags
    const toggleSelectedActivity = (item) => {
        setSelectedActivities(prevSelected => 
            prevSelected.includes(item) 
                ? prevSelected.filter(i => i !== item) 
                : [...prevSelected, item]
        );
    };

    // Toggle Sub Tags
    const toggleSelectedSub = (item) => {
        setSelectedSubs(prevSelected => 
            prevSelected.includes(item) 
                ? prevSelected.filter(i => i !== item) 
                : [...prevSelected, item]
        );
    };

    // Save User Interests
    const userInterests = async () => {
        try {
            const userDocRef = doc(userRef, currentUserData.userId);
            await updateDoc(userDocRef, {
                interests: {
                    activities: arrayUnion(...selectedActivities),
                    subs: arrayUnion(...selectedSubs)
                }
            });
            
            navigation.navigate('SignUpFriends');
        } catch(error) {
            console.log('Save Interests Error:', error);
        }
    };

    return (
        <LayoutAuth>
            <View className="justify-center mx-auto w-[300px] h-full">
                {/* <View className="">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Name</Text>

                    <InputAuth inputIcon={require('./../assets/static/icons/icon_user_02.png')}
                                placeholderText="Name"/>
                </View> */}

                <View className="my-4">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>Your Interests</Text>

                    <View className="my-1">
                        <Text className="text-base text-white" style={{ fontFamily: 'Raleway_700Bold' }}>Activity Categories</Text>

                        <FlatList className="my-1 -mx-1"
                                    scrollEnabled={false}
                                    data={activityCategories}
                                    numColumns={3}
                                    key={activityCategories.length}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => toggleSelectedActivity(item)}  activeOpacity={opacity.opacity900}>
                                            <View className={`m-1 border-2 border-primary rounded-md p-2 ${ selectedActivities.includes(item) ? 'bg-primary' : '' }`}>
                                                <Text className={`text-base ${ selectedActivities.includes(item) ? 'text-dark' : 'text-primary'}`} style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}/>
                    </View>

                    <View className="mt-1 mb-6">
                        <Text className="text-base text-white" style={{ fontFamily: 'Raleway_700Bold' }}>Sub Categories</Text>

                        <FlatList className="my-1 -mx-1"
                                    scrollEnabled={false}
                                    data={subCategories}
                                    numColumns={3}
                                    key={subCategories.length}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => toggleSelectedSub(item)}  activeOpacity={opacity.opacity900}>
                                            <View className={`m-1 border-2 border-white rounded-md p-2 ${ selectedSubs.includes(item) ? 'bg-white' : '' }`}>
                                                <Text className={`text-base ${ selectedSubs.includes(item) ? 'text-dark' : 'text-white' }`} style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}/>
                    </View>
                </View>

                <View className="items-center">
                    <ButtonSubmit buttonText="Submit"
                                    handleSubmit={userInterests}
                                    formValidValue={{}}/>

                    <View className="my-4">
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpFriends')} activeOpacity={opacity.opacity900}>
                            <Text className="text-base text-white" style={{ fontFamily: 'Raleway_700Bold' }}>Skip for now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LayoutAuth>
    );
};
