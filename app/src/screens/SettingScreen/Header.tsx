import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'



const Header = () => {
    const { goBack } = useNavigation()
    return (
        <>
            <View style={styles.container} >
                <BaseButton
                    onPress={goBack}
                    style={styles.goBackBtn}
                >
                    <Icon name='arrow-left' color='#555' size={20} />
                </BaseButton>

            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row'
    },
    goBackBtn: {
        paddingLeft: 16,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})


export default Header
