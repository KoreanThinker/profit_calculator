import React from 'react'
import { View, Text } from 'react-native'
import BottomLineTextInputAutoFit from '../Input/BottomLineTextInputAutoFit'

interface SellInfoCardProps {
    title: string;
    value: string;
    onChange: (text: string) => void;
    unit: string;
    maxLength: number
}

const SellInfoCard: React.FC<SellInfoCardProps> = (props) => {
    return (
        <View style={{ marginTop: 20 }} >
            <Text>{props.title}</Text>
            <View style={{ width: '100%', alignItems: 'flex-start' }}>
                <BottomLineTextInputAutoFit
                    {...props}
                />
            </View>
        </View>
    )
}

export default SellInfoCard
