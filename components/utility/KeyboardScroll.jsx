import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const ios = Platform.OS == 'ios'; 
export function KeyboardScroll({ children, inChat, scrollAuth }) {
    let kavConfig = {};
    if (inChat) {
        kavConfig = { keyboardVerticalOffset: 90 };
    }

    return (
        <KeyboardAvoidingView 
            behavior={ios ? 'padding' : 'height'} 
            style={{ flex: 1 }}>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{ flex: 1}}
                // contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                bounces={false}
                showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
