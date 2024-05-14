import { Image, Text, View } from 'react-native';


export function ItemProfileImage({profileImage, username}) {
    const firstLetter = username ? username.charAt(0).toUpperCase() : '';

    return (
        <>
            { profileImage ? (
                <Image className="rounded-full w-12 h-12 bg-gray"/>
                ) : (
                <View className="justify-center items-center rounded-full w-12 h-12 bg-secondary">
                    <Text className="text-lg text-white" style={{ fontFamily: 'Raleway_700Bold' }}>{firstLetter}</Text>
                </View>
            )}
        </>
    )
}
