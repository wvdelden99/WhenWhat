import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { color } from '../../assets/styles/Styles';
// Components
import { LayoutBackgroundBig } from '../../components/layout/_layoutBackgroundBig';


export function Home() {
    const { t } = useTranslation();

    return (
        <LayoutBackgroundBig>
            <View className="px-6">
                <View className="my-4">
                    <Image className="" source={require('./../../assets/static/logo/logo_when_&_what_02.png')}/>
                </View>

                <View className="my-6">
                    <Text className="text-3xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('home.home-header')}</Text>
                    <Text className="text-xl text-white opacity-70" style={{ fontFamily: 'Raleway_600SemiBold' }}>{t('home.home-subheader')}</Text>
                </View>
            </View>

            <View className="mt-[150px] rounded-t-3xl h-full bg-white">
                <View className="-mt-[150px] pl-6">
                    <View className="relative rounded-xl w-[290px] h-[220px] bg-dark">
                        <Image className="rounded-xl w-full h-full bg-cover" source={require('./../../assets/static/images/image_cinema.jpg')} />
                            {/* <LinearGradient className="absolute rounded-xl w-full h-full" colors={['rgba(0,0,0,0)', color.darkColor ]} locations={[0.60, 1]}/> */}
                            
                        <View className="absolute pt-3 pb-4 px-4 w-full h-full">
                            <View className="flex-row items-center">
                                <View class="">
                                    <Image className="rounded-full w-9 h-9 bg-cover" source={require('./../../assets/static/images/image_friend_group_01.jpg')} />
                                </View>

                                <View className="ml-2 border-[1px] border-white rounded-lg py-1 px-2">
                                    <Text className="text-xs text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Friend Group</Text>
                                </View>
                            </View>

                            <View className="flex-[1] justify-end">
                                <Text className="text-xl text-white" style={{ fontFamily: 'Raleway_600SemiBold' }}>Cinema</Text>
                                <Text className="-mt-[3px] text-sm text-white opacity-80" style={{ fontFamily: 'Raleway_600SemiBold' }}>Rotterdam</Text>
                            </View>
                        </View>

                        <View className="absolute justify-center items-end w-full h-full">
                            <View className="rotate-90 items-center -mr-[70px] rounded-lg py-1 w-[200px] bg-primary">
                                <Text className="text-base text-dark" style={{ fontFamily: 'Poppins_600SemiBold' }}>1d 12h 28m 30s</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </LayoutBackgroundBig>
    )
}
