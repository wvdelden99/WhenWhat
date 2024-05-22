import { useTranslation } from 'react-i18next';
import { FlatList, Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../../assets/styles/Styles';
// Componetns
import { InputSearch } from '../../form/InputSearch';
import { ItemUser } from '../item/ItemUser';


export function ModalUsersList({showUsersList, setShowUsersList, usersListData, currentUserData, userRef, user, usersData}) {
    const { t } = useTranslation();

    const closeUsersList = () => {
        setShowUsersList(false);
    }

    return (
        <Modal visible={showUsersList}
                animationType='fade-up'>
            <SafeAreaView>
                <StatusBar barStyle="dark-content"/>

                <View className="flex-row justify-between items-center my-4 px-6">
                    <TouchableOpacity 
                            onPress={closeUsersList}
                            >
                        <Image className="w-10 h-10" style={{ tintColor: color.darkColor }} source={require('./../../../assets/static/icons/icon_arrow_down_03.png')}/>
                    </TouchableOpacity>

                    <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{t('friends.friends-header-add_friends')}</Text>

                    <View className="w-6 h-6"></View>
                </View>

                <View className="px-6">
                    <InputSearch placeholderText={t('components.search')}/>

                    <FlatList className="mt-4"
                                data={usersListData}
                                keyExtractor={(item => item.userId)}
                                renderItem={({ item }) => <ItemUser item={item} currentUserData={currentUserData} userRef={userRef} user={user} usersData={usersData}/>}/>
                </View>
            </SafeAreaView>
        </Modal>
    )
}
