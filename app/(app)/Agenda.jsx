import { Image, Text, TouchableOpacity, View } from 'react-native';
import { opacity } from './../../assets/styles/Styles';
// Components
import { LayoutBackgroundSmall } from './../../components/layout/_layoutBackgroundSmall';
import { ItemCalendar } from '../../components/content/item/agenda/ItemCalendar';



export function Agenda() {
    return (
        <LayoutBackgroundSmall>
            <View className="flex-row justify-between items-center my-4 px-4">
                <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity600}>
                    <View className="flex-row items-center rounded-lg py-3 pl-4 pr-3 bg-white">
                        <View className="flex-row items-center gap-2">
                            <View className="rounded-full w-7 h-7 bg-gray"></View>
                            <Text className="text-sm text-dark">Group Name</Text>
                        </View>
                        <Image className="ml-2 w-6 h-6" source={require('./../../assets/static/icons/icon_arrow_down_03.png')}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={{}} activeOpacity={opacity.opacity600}>
                    <View className="rounded-md p-3 bg-white">
                        <Image className="w-6 h-6" source={require('./../../assets/static/icons/icon_users_01.png')}/>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <ItemCalendar />
            </View>
        </LayoutBackgroundSmall>
    )
}
