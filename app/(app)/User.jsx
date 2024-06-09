import { useState } from 'react';
import { useAuth } from '../../config/auth/authContext';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Button, Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { color, opacity } from '../../assets/styles/Styles';
// Components
import { LayoutBackgroundMedium } from '../../components/layout/_layoutBackgroundMedium';


export function User() {
    const navigation = useNavigation();
    const { user } = useAuth();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    return (
        <LayoutBackgroundMedium>
            <View>
                <View className="px-6">
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')} activeOpacity={opacity.opacity800}>
                        <View className="self-end rounded-md p-3 bg-white">
                            <Image className="w-7 h-7" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_settings_01.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="items-center mb-6">
                    <View className="">
                        { image ? (
                            <Image className="rounded-full w-[112px] h-[112px]" source={{ uri: image }} />
                        ) :( 
                            <Image className="rounded-full w-[112px] h-[112px] bg-gray"/>
                        )}

                        <TouchableOpacity  onPress={pickImage} activeOpacity={opacity.opacity800}>
                            <View className="absolute rounded-full p-3 bg-white bottom-0 right-0">
                                <Image className="w-4 h-4" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_edit_01.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="my-2">
                        {/* <Text className="text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>@{user.username}</Text> */}
                        {user && user.username ? ( // Check if user and user.username exist
                            <Text className="text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>@{user.username}</Text>
                        ) : (
                            <Text className="text-base text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>@guest</Text> // Display a default value or handle appropriately
                        )}
                    </View>
                </View>
            </View>

            <View className="rounded-t-3xl h-full bg-white">
                <TouchableOpacity onPress={() => navigation.navigate('SignUpExtends')}>
                    <Text>Interest</Text>
                </TouchableOpacity>
            </View>
        </LayoutBackgroundMedium>
    )
}
