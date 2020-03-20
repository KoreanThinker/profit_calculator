import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useStock } from '../../context/stock'
import BuyCard from '../../components/Card/BuyCard'
import Icon from 'react-native-vector-icons/AntDesign'
import { BaseButton } from 'react-native-gesture-handler'
import BuyInfoCard from '../../components/Card/BuyInfoCard'
import ttlBuyMany from '../../components/Calculator/ttlBuyMany'
import Number2MoneyFormat from '../../components/Generator/number2MoneyFormat'
import ttlBuys from '../../components/Calculator/ttlBuys'
import everageBuys from '../../components/Calculator/everageBuys'
import SellInfoCard from '../../components/Card/SellInfoCard'
import ResultInfoCard from '../../components/Card/ResultInfoCard'
import commission from '../../components/Calculator/commission'
import tax from '../../components/Calculator/tax'
import profitF from '../../components/Calculator/profit'
import profitPercentF from '../../components/Calculator/profitPercent'


const Body = () => {

    const { index, stocks, onBuyAdd, onSellCommissionChange, onSellPriceChange } = useStock()
    const profit = profitF(stocks[index])
    const profitPercent = profitPercentF(stocks[index])

    return (
        <ScrollView style={styles.contianer} >

            <View style={{ width: '100%', marginTop: 20 }} >
                {stocks[index].buys.map(item => <BuyCard key={item.id} {...item} />)}
            </View>

            <BaseButton
                onPress={() => onBuyAdd()}
                style={styles.buyAppendBtn}
            >
                <Icon name='plus' size={16} color='#555' />
                <Text style={{ fontSize: 12 }} >매수추가</Text>
            </BaseButton>

            <BuyInfoCard
                title='평균 매수단가'
                description={Number2MoneyFormat(everageBuys(stocks[index].buys)).toString() + '원'}
            />
            <BuyInfoCard
                title='총 매수금액'
                description={Number2MoneyFormat(ttlBuys(stocks[index].buys)).toString() + '원'}
            />
            <BuyInfoCard
                title='총 수량'
                description={Number2MoneyFormat(ttlBuyMany(stocks[index].buys)).toString() + '주'}
            />

            <SellInfoCard
                title='매도단가'
                onChange={onSellPriceChange}
                value={Number2MoneyFormat(stocks[index].sell.price)}
                unit='원'
                maxLength={14}
            />

            <SellInfoCard
                title='매매 수수료'
                onChange={onSellCommissionChange}
                value={stocks[index].sell.commission.toString()}
                unit='%'
                maxLength={14}
            />
            <View style={{ height: 10 }} />
            <ResultInfoCard
                title='총 손익'
                color={profit == 0 ? '#000' : profit > 0 ? 'red' : 'blue'}
                value={(profit == 0 ? '0' : profit > 0 ? `+${Number2MoneyFormat(profit)}` : `${Number2MoneyFormat(profit)}`) + '원'}
            />
            <ResultInfoCard
                title='수익률'
                color={profitPercent == 0 ? '#000' : profitPercent > 0 ? 'red' : 'blue'}
                value={(profitPercent == 0 ? '0' : profitPercent > 0 ? `+${Number2MoneyFormat(profitPercent)}` : `${Number2MoneyFormat(profitPercent)}`) + '%'}
            />
            <ResultInfoCard
                title={`수수료 (${stocks[index].sell.commission}%)`}
                color='#000'
                value={Number2MoneyFormat(commission(stocks[index])) + '원'}
            />
            <ResultInfoCard
                title='거래세 (0.3%)'
                color='#000'
                value={Number2MoneyFormat(tax(stocks[index])) + '원'}
            />
            <View style={{ height: 100 }} />

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
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'flex-start',
        paddingVertical: 10
    }
})


export default Body
