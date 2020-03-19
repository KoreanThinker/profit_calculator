import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import { BuyStockType, useStock } from '../../context/stock'
import BottomLineTextInput from '../Input/BottomLineTextInput'
import number2MoneyFormat from '../Generator/number2MoneyFormat'


const BuyCard: React.FC<BuyStockType> = ({ many, name, price, id }) => {

    const { onBuyPriceChange, onBuyRemove, onBuyManyChange } = useStock()
    return (
        <View style={styles.container} >
            <View style={{ ...styles.itemContainer, width: 60 }}>
                <Text style={{ width: '100%' }} numberOfLines={1} >{name}</Text>
            </View>
            <View style={styles.itemContainer}>
                <BottomLineTextInput
                    value={number2MoneyFormat(price)}
                    onChange={(t) => onBuyPriceChange(id, t)}
                    unit='원'
                />
            </View>

            <View style={styles.itemContainer}>
                <BottomLineTextInput
                    value={number2MoneyFormat(many)}
                    onChange={(t) => onBuyManyChange(id, t)}
                    unit='주'
                />
            </View>

            <TouchableWithoutFeedback
                onPress={() => onBuyRemove(id)}
            >
                <View style={styles.removeBtn} >
                    <Text>X</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        height: 40,
        marginBottom: 4
    },
    itemContainer: {
        width: 76,
        marginRight: 20
    },
    removeBtn: {
        position: 'absolute',
        right: 0
    }
})


export default BuyCard
