import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fadeIn = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
        });

        const fadeOut = Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
        });

        Animated.sequence([fadeIn, Animated.delay(700), fadeOut]).start(() => {
            console.log('Navigating to LoginScreen');
            navigation.replace('Login');
        });
    }, [fadeAnim, navigation]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
                <Image
                    source={require('../../assets/img/ezo-logo.png')}
                    style={styles.image}
                />
            </Animated.View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383184'
    },
    imageContainer: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.5,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
