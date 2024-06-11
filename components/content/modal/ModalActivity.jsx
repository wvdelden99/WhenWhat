import { View } from 'react-native';
import { LayoutModal } from '../../layout/_layoutModal';


export function ModalActivity({showModalActivity, setShowModalActivity}) {

    // Modal Activity
    const closeModalActivity = () => {
        setShowModalActivity(false);
    };

    return (
        <LayoutModal visible={showModalActivity}
                    handleIconLeft={closeModalActivity}
                    iconLeft={require('./../../../assets/static/icons/icon_arrow_down_03.png')}>
            <View>

            </View>
        </LayoutModal>
    )
}
