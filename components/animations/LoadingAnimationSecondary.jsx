import LottieView from 'lottie-react-native';


export function LoadingAnimationSecondary() {
    return (
        <>
            <LottieView source={require('../../assets/static/animations/loading/loading_animation_01_secondary.json')}
                    style={{ width: 40, height: 40 }} 
                    autoPlay
                    loop />
        </>
    )
}