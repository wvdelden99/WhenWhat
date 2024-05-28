import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { opacity } from '../../../../assets/styles/Styles';


export function ItemNoFriends({handlePress}) {
    const { t } = useTranslation();

    return (
        <View className="justify-center items-center my-12 mx-auto max-w-[80%]">
            <View className="">
                <Text className="mb-6 text-base text-center text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-no_friends')}</Text>
                <TouchableOpacity onPress={handlePress} activeOpacity={opacity.opacity600}>
                    <View className="items-center rounded-lg py-3 bg-primary">
                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-find_friends')}</Text>
                    </View>
                </TouchableOpacity>
                <Text className="my-3 text-base text-center text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-no_friends_or')}</Text>
                <TouchableOpacity activeOpacity={opacity.opacity800}>
                    <View className="items-center rounded-lg py-3 bg-secondary">
                        <Text className="text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('friends.friends-invite_friends')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
