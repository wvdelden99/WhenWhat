import { Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { color, opacity } from "../../assets/styles/Styles";
import { ButtonSubmit } from "../button/ButtonSubmit";


export function LayoutModal({children, visible, modalHeader, handleIconLeft, handleIconRight, iconLeft, iconRight, styleIconLeft, styleIconRight}) {
    return (
        <Modal visible={visible}
                animationType="fade-up">
            <SafeAreaView className="flex-[1]">
                <StatusBar barStyle="dark-content"/>

                <View className="flex-row justify-between items-center my-4 px-6">
                    <TouchableOpacity onPress={handleIconLeft} activeOpacity={opacity.opacity600}>
                        <Image className="w-10 h-10" style={{ tintColor: color.darkColor }} source={iconLeft}/>
                    </TouchableOpacity>

                    <Text className="text-xl text-dark" style={{ fontFamily: 'Raleway_700Bold' }}>{modalHeader}</Text>

                    <TouchableOpacity onPress={handleIconRight} activeOpacity={opacity.opacity600}>
                        <Image className={styleIconRight} style={{ tintColor: color.darkColor }} source={iconRight}/>
                    </TouchableOpacity>
                </View>

                <View className="px-6 h-full">
                    {children}
                </View>
            </SafeAreaView>
        </Modal>
    )
}
