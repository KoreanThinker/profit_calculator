import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Dialog from 'react-native-dialog'
import { useStock } from '../../context/stock'
import { uuid } from 'short-uuid'

const Header = () => {
    const { goBack, navigate } = useNavigation()
    const { stocks, onAddStock, onSetIndex } = useStock()
    const [nameVisible, setNameVisible] = useState(false)
    const [nameTemp, setNameTemp] = useState('')

    const addStock = () => {
        setNameVisible(false)
        const id = uuid()
        onAddStock(id, nameTemp)
        onSetIndex(id)
        goBack()
    }

    return (
        <>
            <View style={styles.container} >
                <BaseButton
                    onPress={goBack}
                    style={styles.goBackBtn}
                >
                    <Icon name='arrow-left' color='#555' size={20} />
                </BaseButton>

                <BaseButton
                    onPress={() => navigate('Setting')}
                    style={styles.plusBtn}
                >
                    <Icon name='settings' color='#777' size={16} />
                </BaseButton>
                <BaseButton
                    onPress={() => {
                        setNameTemp(`내 주식${stocks.length + 1}`)
                        setNameVisible(true)
                    }}
                    style={styles.plusBtn}
                >
                    <Icon name='plus' color='#555' size={20} />
                </BaseButton>
            </View>

            <Dialog.Container
                visible={nameVisible}
            >
                <Dialog.Title>주식 이름</Dialog.Title>
                <Dialog.Input
                    style={{ borderBottomColor: '#777', borderBottomWidth: 1 }}
                    value={nameTemp}
                    onChangeText={t => setNameTemp(t)}
                />
                <Dialog.Button label="취소" onPress={() => setNameVisible(false)} />
                <Dialog.Button label="추가" onPress={addStock} />
            </Dialog.Container>
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
    },
    plusBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Header
