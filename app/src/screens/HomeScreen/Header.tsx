import React, { useState } from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { color1 } from '../../components/color'
import { useStock } from '../../context/stock'
import { BaseButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dialog from "react-native-dialog";
import { StackActions, useNavigation } from '@react-navigation/native'

const Header = () => {
    const { navigate } = useNavigation()
    const { stocks, index, onSetName } = useStock()
    const [nameVisible, setNameVisible] = useState(false)
    const [nameTemp, setNameTemp] = useState('')

    const changeName = () => {
        if (nameTemp == '') {
            ToastAndroid.show('이름은 한글자 이상이여야합니다.', ToastAndroid.SHORT)

        } else {
            onSetName(nameTemp)
        }
        setNameVisible(false)
    }

    return (
        <>
            <View style={styles.container} >
                <BaseButton style={styles.sideContainer}
                    onPress={() => navigate('StockList')}
                >
                    <Icon name='format-list-bulleted' size={20} color='#fff' />
                </BaseButton>
                <View style={styles.midContainer} >
                    <Text style={styles.headerText} numberOfLines={1} >{stocks[index].name}</Text>
                </View>
                <BaseButton
                    onPress={() => {
                        setNameTemp(stocks[index].name)
                        setNameVisible(true)
                    }}
                    style={styles.sideContainer}
                >
                    <Icon name='pencil' size={18} color='#fff' />
                </BaseButton>
            </View>

            <Dialog.Container
                visible={nameVisible}
            >
                <Dialog.Title>이름 변경</Dialog.Title>
                <Dialog.Input
                    style={{ borderBottomColor: '#777', borderBottomWidth: 1 }}
                    value={nameTemp}
                    onChangeText={t => setNameTemp(t)}
                />
                <Dialog.Button label="취소" onPress={() => setNameVisible(false)} />
                <Dialog.Button label="변경" onPress={changeName} />
            </Dialog.Container>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: color1,
        flexDirection: 'row'
    },
    sideContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    midContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 16,
        color: '#fff'
    }
})


export default Header
