import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ToastAndroid, BackHandler, Alert, Linking } from 'react-native'
import Header from './Header'
import Body from './Body'
import { InterstitialAd } from '@react-native-firebase/admob';
import { ADMOBEXIT } from '../../../secret';
import AsyncStorage from '@react-native-community/async-storage';

const ANDROIDSTORE = 'https://play.google.com/store/apps/details?id=com.koreanthinker.stockcalculator';

const exitIntersitial = InterstitialAd.createForAdRequest(ADMOBEXIT, {
    requestNonPersonalizedAdsOnly: false,
});

const HomeScreen = (props: any) => {

    useEffect(() => {
        //전면 광고
        exitIntersitial.load()

        const backAction = () => {
            if (!props.navigation.isFocused()) return false

            ToastAndroid.show("다시 한번 누르면 종료합니다", ToastAndroid.SHORT)
            const backHandler2 = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    BackHandler.exitApp()
                    return true
                }
            )
            setTimeout(() => {
                backHandler2.remove()
            }, 5000);

            exitIntersitial.loaded && exitIntersitial.show()

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        // 평점유도
        rate()

        return () => {
            backHandler.remove();
        };
    }, [])

    const rate = async () => {
        let load = await AsyncStorage.getItem('LOAD')
        if (load === 'FALSE') return
        if (load === null) load = '1'
        AsyncStorage.setItem('LOAD', (parseInt(load) + 1).toString())
        if (parseInt(load) % 30 === 0) {
            Alert.alert(
                '앱을 평가해주세요!',
                '평점은 개발자에게 힘이 됩니다!',
                [
                    {
                        text: "취소",
                        style: 'cancel'
                    },
                    {
                        text: "평가하러 가기",
                        onPress: () => {
                            AsyncStorage.setItem('LOAD', 'FALSE')
                            Linking.openURL(ANDROIDSTORE)
                        }
                    }

                ],
                { cancelable: false }
            )
        }

    }

    return (
        <View style={styles.container} >
            <Header />
            <Body />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})


export default HomeScreen
