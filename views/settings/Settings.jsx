import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../assets/styles/Styles';
// Components
import { BackButton } from '../../components/button/BackButton';

export function Settings() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="relative flex-[1] bg-secondary-light">
            <Image className="absolute bg-cover" source={require('./../../assets/static/images/image_background_01.png')}/>
            <View className="relative flex-row items-center w-full my-6 px-6">
                <BackButton />

                <View className="flex-[1] items-center">
                    <Text className="text-2xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Settings</Text>
                </View>
            </View>

            <View className="flex-[1] -mb-10 rounded-t-3xl px-6 h-full bg-white">
                <View className="my-6 flex-row items-center rounded-lg p-3 bg-gray">
                    <Image className="mr-4 w-5 h-5 opacity-50" source={require('./../../assets/static/icons/icon_search_01.png')}/>
                    <TextInput className="text-base bg-gray"
                                placeholder="Search ..."
                                style={{ fontFamily: 'Raleway_600SemiBold' }}/>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="mb-6">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Account</Text>

                        <View className="my-2 rounded-xl py-2 bg-gray">
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_user_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Account</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_protect_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Password & Security</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_lock_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Privacy</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_wallet_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Billing & Subcriptions</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View className="mb-6">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Content</Text>

                        <View className="my-2 rounded-xl py-2 bg-gray">
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_preferences_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Acitvity Preference</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_notifications_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Notifications</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback  onPress={() => navigation.navigate('Language')}>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_language_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Language</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_accessibility_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Accessibility</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    
                    <View className="mb-6">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Support & Information</Text>

                        <View className="my-2 rounded-xl py-2 bg-gray">
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center border-b-[1px] border-gray-dark py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_support_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Support</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_info_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Terms & Conditions</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View className="mb-32">
                        <Text className="text-lg text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Login</Text>

                        <View className="my-2 rounded-xl py-2 bg-gray">
                            <TouchableWithoutFeedback>
                                <View className="flex-row justify-between items-center py-4 pl-5 pr-4">
                                    <View className="flex-row items-center gap-4">
                                        <Image className="w-6 h-6" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_logout_01.png')}/>
                                        <Text className="text-base text-dark" style={{ fontFamily: 'Raleway_600SemiBold' }}>Logout</Text>
                                    </View>
                                    <Image className="w-6 h-6 opacity-70" style={{ tintColor: color.darkColor }} source={require('./../../assets/static/icons/icon_arrow_right_03.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}