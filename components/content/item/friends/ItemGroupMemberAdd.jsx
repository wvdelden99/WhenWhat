import { Image, Text, TouchableOpacity, View } from 'react-native';
import { color, opacity } from '../../../../assets/styles/Styles';
// Components
import { ItemProfileImage } from '../../ItemProfileImage';


export function ItemGroupMemberAdd({item, username, handleGroupMemberAdd}) {
    return (
        <View className="flex-row justify-between items-center my-3">
            <View className="flex-row items-center gap-2 ml-1">
                <ItemProfileImage username={username}/>
                <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{username}</Text>
            </View>

            <TouchableOpacity  onPress={() => handleGroupMemberAdd(item)} activeOpacity={opacity.opacity600}>
                <Image className="mr-2 w-7 h-7" style={{ tintColor: color.darkColor }} source={require('./../../../../assets/static/icons/icon_plus_04.png')}/>
            </TouchableOpacity>
        </View>
    )
}
