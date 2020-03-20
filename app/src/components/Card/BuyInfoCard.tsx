import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface BuyInfoCardProps {
    title: string;
    description: string;
}

const BuyInfoCard: React.FC<BuyInfoCardProps> = ({ title, description }) => {
    return (
        <View style={styles.container}  >
            <View style={{ width: 100 }} >
                <Text style={styles.text} >{title}</Text>
            </View>
            <Text style={styles.text} >{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 32,
        flexDirection: 'row'
    },
    text: {
        fontSize: 12
    }
})


export default BuyInfoCard
