import { useEffect, useState } from 'react';
import { useAuth } from '../../../config/auth/authContext';
import { userRef } from '../../../config/firebase';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../../assets/styles/Styles';
import activities from './../../../assets/data/activities.json';
// Components
import { LayoutSettings } from '../../../components/layout/_layoutSettings';
import { ButtonSubmit } from '../../../components/button/ButtonSubmit';
import { LoadingAnimationPrimary } from '../../../components/animations/LoadingAnimationPrimary';


export function ActivityPreferences() {
    const { t } = useTranslation();

    const [loadingData, setLoadingData] = useState(false);

    const { user, fetchCurrentUserData } = useAuth();
    const [currentUserData, setCurrentUserData] = useState(null);

    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedSubs, setSelectedSubs] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                setLoadingData(true);
                const currentUserFetchRef = await fetchCurrentUserData(user.userId);
                setCurrentUserData(currentUserFetchRef);
                setLoadingData(false);
            } catch(error) {
                console.log('Fetch Current Error', error);
                setLoadingData(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchUserInterests() {
            try {
                setLoadingData(true);
                const userDocRef = doc(userRef, currentUserData.userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setSelectedActivities(userData.interests.activities || []);
                    setSelectedSubs(userData.interests.subs || []);
                }
                setLoadingData(false);
            } catch (error) {
                console.log('Fetch User Interests Error:', error);
                setLoadingData(false);
            }
        }
        fetchUserInterests();
    }, [currentUserData]);

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

    // Function to handle saving interests to the database
    const saveInterests = async () => {
        try {
            const userDocRef = doc(userRef, currentUserData.userId);
            await updateDoc(userDocRef, {
                interests: {
                    activities: arrayUnion(...selectedActivities),
                    subs: arrayUnion(...selectedSubs)
                }
            });
            console.log('Interests updated successfully');
        } catch (error) {
            console.log('Save Interests Error:', error);
        }
    };


    return (
        <LayoutSettings title={t('settings.activity_preferences.activity_preferences-header')}>
            <View className="my-6">
                {loadingData ? (
                    <View className="items-center">
                        <LoadingAnimationPrimary />
                    </View>
                ) : (
                    <>
                    <View>
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Main Interests</Text>
                        
                        <FlatList className="my-2"
                                    scrollEnabled={false}
                                    data={activityCategories}
                                    numColumns={3}
                                    key={activityCategories.length}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => (
                                        <TouchableOpacity onPress={() => toggleSelectedActivity(item)}  activeOpacity={opacity.opacity900}>
                                            <View className={`m-1 border-2 border-primary rounded-md p-2 ${ selectedActivities.includes(item) ? 'bg-primary' : '' }`}>
                                                <Text className={`text-base text-dark`} style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}/>
                    </View>

                    <View>
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Sub Interests</Text>

                        <FlatList className="my-2"
                                    scrollEnabled={false}
                                    data={subCategories}
                                    numColumns={3}
                                    key={subCategories.length}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => (
                                        <TouchableOpacity onPress={() => toggleSelectedSub(item)}  activeOpacity={opacity.opacity900}>
                                            <View className={`m-1 border-2 border-secondary rounded-md p-2 ${ selectedSubs.includes(item) ? 'bg-secondary' : '' }`}>
                                                <Text className={`text-base ${ selectedSubs.includes(item) ? 'text-white' : 'text-dark' }`} style={{ fontFamily: 'Raleway_600SemiBold' }}>{item}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}/>
                    </View>

                    <View className="mt-32">
                        <ButtonSubmit buttonText="Save Interests"
                                        formValidValue={{}}
                                        handleSubmit={saveInterests}/>
                    </View>
                    </>
                )}
            </View>
        </LayoutSettings>
    )
}
