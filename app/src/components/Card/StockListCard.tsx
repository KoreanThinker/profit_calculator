import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Stock, useStock } from '../../context/stock'
import number2MoneyFormat from '../Generator/number2MoneyFormat'
import ttlBuys from '../Calculator/ttlBuys'
import ttlBuyMany from '../Calculator/ttlBuyMany'
import { BaseButton } from 'react-native-gesture-handler'
import profitPercentF from '../../components/Calculator/profitPercent'
import { useNavigation } from '@react-navigation/native'
import Dialog from 'react-native-dialog'

const StockListCard: React.FC<Stock> = (stock) => {
    const { onSetIndex, onRemove } = useStock()
    const { goBack } = useNavigation()
    const profitPercent = profitPercentF(stock)
    const [removeVisible, setRemoveVisible] = useState(false)

    const onPress = () => {
        onSetIndex(stock.id)
        goBack()
    }
    const onStockRemove = () => {
        setRemoveVisible(false)
        onRemove(stock.id)
    }
    return (
        <>
            <TouchableWithoutFeedback
                onPress={onPress}
                onLongPress={() => setRemoveVisible(true)}
            >
                <BaseButton
                    style={styles.container}
                >
                    <View>
                        <Text style={{ marginBottom: 4 }} >{stock.name}</Text>
                        <View style={{ flexDirection: 'row' }}  >
                            <Text style={[styles.minText, { width: 80 }]}>총 매수금액</Text>
                            <Text style={styles.minText} >{`${number2MoneyFormat(ttlBuys(stock.buys))}원`}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}  >
                            <Text style={[styles.minText, { width: 80 }]}>총 수량</Text>
                            <Text style={styles.minText}  >{`${number2MoneyFormat(ttlBuyMany(stock.buys))}주`}</Text>
                        </View>
                    </View>

                    <View  >
                        <Text style={{ fontSize: 18, color: profitPercent == 0 ? '#000' : profitPercent > 0 ? 'red' : 'blue' }} >
                            {(profitPercent == 0 ? '0' : profitPercent > 0 ? `+${number2MoneyFormat(profitPercent)}` : `${number2MoneyFormat(profitPercent)}`) + '%'}
                        </Text>
                    </View>
                </BaseButton>
            </TouchableWithoutFeedback>
            <Dialog.Container
                visible={removeVisible}
            >
                <Dialog.Title>삭제하시겠습니까?</Dialog.Title>

                <Dialog.Button label="취소" onPress={() => setRemoveVisible(false)} />
                <Dialog.Button label="삭제" onPress={onStockRemove} />
            </Dialog.Container>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    minText: {
        fontSize: 12
    }
})


export default StockListCard
