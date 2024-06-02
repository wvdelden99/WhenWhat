import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';

// Components
import { LayoutSettings } from '../../../components/layout/_layoutSettings';
import { ItemInterestTag } from '../../../components/content/item/ItemInterestTag';


export function ActivityPreferences() {
    const { t } = useTranslation();

    const mainInterests = [{id: 1, text: 'Indoor'},{id: 2, text: 'Outdoor'},{id: 3, text: 'Eating & Drinking'}, {id: 4, text: 'Active'},{id: 5, text: 'Chill'}];
    const subInterests = [{id: 1, text: 'Cinema'},{id: 2, text: 'Bowling'},{id: 3, text: 'Sport'}, {id: 4, text: 'Clubbing'},{id: 5, text: 'Karaoke'}];


    return (
        <LayoutSettings title={t('settings.activity_preferences.activity_preferences-header')}>
            <View className="my-6">
                <View>
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Main Interests</Text>
                    
                    <FlatList className="my-2"
                                scrollEnabled={false}
                                data={mainInterests}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => (
                                    <ItemInterestTag tagText={item.text} stylePrimary/>
                                )}
                                numColumns={3}/>
                </View>

                <View>
                    <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Sub Interests</Text>

                    <FlatList className="my-2"
                                scrollEnabled={false}
                                data={subInterests}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => (
                                    <ItemInterestTag tagText={item.text}/>
                                )}
                                numColumns={4}/>
                </View>
            </View>
        </LayoutSettings>
    )
}
