import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
// Components
import { LayoutModal } from '../../layout/_layoutModal';
import { InputSearch } from '../../form/InputSearch';
import { ItemUser } from '../item/ItemUser';


export function ModalUsersList({userRef, user, currentUserData, usersData, usersListData, showUsersList, setShowUsersList}) {
    const { t } = useTranslation();

    // const [searchUsers, setSearchUsers] = useState('');

    // Search Friends
    // const filteredUsers = usersListData.filter(user => 
    //     user.username.toLowerCase().includes(searchUsers.toLowerCase())
    // );
    
    // Modal User List
    const closeUsersList = () => {
        setShowUsersList(false);
    }

    return (
        <LayoutModal visible={showUsersList}
                    modalHeader={t('friends.friends-header-add_friends')}
                    handleIconLeft={closeUsersList}
                    iconLeft={require('./../.././../assets/static/icons/icon_arrow_down_03.png')}>
            <InputSearch // focusArea={searchUsers}
                        // value={searchUsers}
                        // onChangeText={setSearchUsers}
                        placeholderText={t('components.search')}/>

            <FlatList className="mt-4"
                        data={usersListData}
                        keyExtractor={(item => item.userId)}
                        renderItem={({ item }) => <ItemUser item={item} userRef={userRef} user={user} currentUserData={currentUserData} usersData={usersData}/>}/>
        </LayoutModal>
    )
}
