import { Image, Text, TouchableOpacity, View } from 'react-native';
// Components
import { ItemProfileImage } from '../../ItemProfileImage';


export function ItemGroupMember({item, username, handleGroupMemberRemove}) {
    return (
        <View className="items-center mt-1 mr-2 w-16">
            <View className="absolute -top-1 right-0 z-10">
                <TouchableOpacity onPress={() => handleGroupMemberRemove(item)}>
                    <View className="border-[1px] border-dark rounded-full p-1 bg-white">
                        <Image className="w-4 h-4" source={require('./../../../../assets/static/icons/icon_cross_02.png')}/>
                    </View>
                </TouchableOpacity>
            </View>

            <ItemProfileImage username={username}/>
            <Text ellipsizeMode="tail" numberOfLines={1} className="w-14 text-xs text-center text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{username}</Text>
        </View>
    )
}
