import LottieView from 'lottie-react-native';


export function LoadingAnimationPrimary() {
    return (
        <>
            <LottieView source={require('./../../assets/static/animations/loading/loading_animation_01_primary.json')}
                    style={{ width: 90, height: 90 }} 
                    autoPlay
                    loop />
        </>
    )
}
