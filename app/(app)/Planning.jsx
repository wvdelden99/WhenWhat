import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { color } from './../../assets/styles/Styles';
// Components
import { LayoutBackgroundSmall } from '../../components/layout/_layoutBackgroundSmall';
import { ItemPlannedActivityTimeframe } from '../../components/content/ItemPlannedActivityTimeframe';


export function Planning() {
    const { t } = useTranslation();

    return (
        <LayoutBackgroundSmall>
             <View className="px-6">
                <View className="flex-row items-center my-6 px-3">
                    <View className="flex-[2]">
                        <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('planning.planning-header')}</Text>
                    </View>

                    <View className="flex-[1] items-center">
                        <Image className="rounded-lg w-[80px] h-[92px] bg-cover" source={require('./../../assets/static/images/image_friend_group_02.jpg')} />
                    </View>
                </View>

                <TouchableHighlight className="rounded-2xl py-4 bg-primary">
                    <View className="flex-row justify-center items-center gap-2">
                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_calendar_01.png')} />
                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('planning.planning-button')}</Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View className="mt-8 rounded-t-3xl px-6 h-full bg-white">
                <View className="flex-row justify-between items-center my-4">
                    <View className="">
                        <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('planning.planning-subheader')}</Text>
                    </View>
                    
                    <View className="flex-row gap-1">
                        <View className="rounded-lg p-3 bg-gray">
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_search_01.png')} />
                        </View>

                        <View className="rounded-lg p-3 bg-gray">
                            <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_filter_01.png')} />
                        </View>
                    </View>
                </View>

                <ScrollView className="-mr-6" showsVerticalScrollIndicator={false}>
                    <ItemPlannedActivityTimeframe />
                    <ItemPlannedActivityTimeframe />
                </ScrollView>
            </View>
        </LayoutBackgroundSmall>
    )
}
