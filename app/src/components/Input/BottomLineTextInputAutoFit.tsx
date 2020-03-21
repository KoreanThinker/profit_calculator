import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

interface BottomLineTextInputAutoFitProps {
    value: string;
    onChange: (text: string) => void;
    unit: string;
    maxLength: number
}

const BottomLineTextInputAutoFit: React.FC<BottomLineTextInputAutoFitProps> = ({ value, onChange, unit, maxLength }) => {
    return (
        <View style={styles.container} >
            <TextInput
                value={value}
                onChangeText={onChange}
                textAlignVertical='center'
                maxLength={maxLength}
                style={{ padding: 0, minWidth: undefined }}
                keyboardType='number-pad'
            />
            <Text>{unit}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#777',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'transparent'
    }
})


export default BottomLineTextInputAutoFit
