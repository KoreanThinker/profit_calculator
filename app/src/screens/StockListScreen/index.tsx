import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from './Header'
import Body from './Body'

const StockListScreen = () => {
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


export default StockListScreen
