import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useStock } from '../../context/stock'
import BuyCard from '../../components/Card/BuyCard'

const Body = () => {

    const { index, stocks, onBuyAdd } = useStock()

    return (
        <ScrollView style={styles.contianer} >
            <View style={styles.myStockContainer} >
                <Text style={{ fontSize: 20 }} >{stocks[index].name}</Text>
            </View>
            <View style={{ width: '100%' }} >
                {stocks[index].buys.map(item => <BuyCard key={item.id} {...item} />)}
            </View>

            <TouchableWithoutFeedback
                onPress={() => onBuyAdd()}
            >
                <View style={styles.buyAppendBtn} >
                    <Text style={{ fontSize: 12 }} >매수추가</Text>
                </View>
            </TouchableWithoutFeedback>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        paddingHorizontal: 20
    },
    myStockContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buyAppendBtn: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30
    }
})


export default Body
