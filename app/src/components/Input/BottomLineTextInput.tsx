import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

interface BottomLineTextInputProps {
    value: string;
    onChange: (text: string) => void;
    unit: string;
}

const BottomLineTextInput: React.FC<BottomLineTextInputProps> = ({ value, onChange, unit }) => {
    return (
        <View style={styles.container} >
            <TextInput
                value={value}
                onChangeText={onChange}
                textAlignVertical='center'
                style={{ flex: 1, textAlign: 'right', padding: 0 }}
            />
            <Text>{unit}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomColor: '#777',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'transparent'
    }
})


export default BottomLineTextInput
