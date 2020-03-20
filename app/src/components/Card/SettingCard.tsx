import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { setting } from '../../screens/SettingScreen/Body'
import { BaseButton } from 'react-native-gesture-handler'

const SettingCard: React.FC<setting> = ({ icon, onPress, text }) => {
    return (
        <BaseButton
            style={styles.container}
            onPress={onPress}
        >
            {icon}
            <Text style={styles.text} >{text}</Text>
        </BaseButton>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 20
    }
})


export default SettingCard
