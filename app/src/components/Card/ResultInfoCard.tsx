import React from 'react'
import { View, Text } from 'react-native'

interface ResultInfoCardProps {
    title: string;
    value: string;
    color: string;
}

const ResultInfoCard: React.FC<ResultInfoCardProps> = ({ color, title, value }) => {
    return (
        <View style={{ width: '100%', alignItems: 'center', marginTop: 16 }} >
            <Text  >{title}</Text>
            <Text style={{ marginTop: 8, fontSize: 20, color }} >{value}</Text>
        </View>
    )
}

export default ResultInfoCard
