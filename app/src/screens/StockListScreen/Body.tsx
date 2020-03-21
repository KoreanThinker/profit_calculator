import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { useStock, Stock } from '../../context/stock'
import StockListCard from '../../components/Card/StockListCard'

const Body = () => {
    const { stocks } = useStock()

    return (
        <View>
            <FlatList
                data={stocks}
                renderItem={({ item }) => <StockListCard {...item} />}
                ListFooterComponent={<View style={{ height: 100 }} />}
            />
        </View>
    )
}

export default Body
