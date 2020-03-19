import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color1 } from '../../components/color'

const Header = () => {
    return (
        <View style={styles.container} >
            <View style={styles.sideContainer} />
            <View style={styles.midContainer} >
                <Text style={styles.headerText} >주식 수익률 계산기</Text>
            </View>
            <View style={styles.sideContainer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: color1,
        flexDirection: 'row'
    },
    sideContainer: {
        width: 50,
        height: 50,
        alignItems: 'center'
    },
    midContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 14,
        color: '#fff'
    }
})


export default Header
