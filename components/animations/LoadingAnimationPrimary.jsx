import LottieView from 'lottie-react-native';


export function LoadingAnimationPrimary() {
    return (
        <>
            <LottieView source={require('./../../assets/static/animations/loading_animation_02.json')}
                    style={{ width: 90, height: 90 }} 
                    autoPlay
                    loop />
        </>
    )
}