import React, { ReactNode } from 'react'
import { View, Text, FlatList, Linking, Share, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SettingCard from '../../components/Card/SettingCard';

const ANDROIDSTORE = 'https://play.google.com/store/apps/details?id=com.koreanthinker.stockcalculator';
const EMAIL = 'mailto:coderhyun@gmail.com'

export interface setting {
    text: string;
    onPress: () => void;
    icon: ReactNode
}



const Body = () => {

    const data: setting[] = [
        {
            text: '별점 주기',
            onPress: () => Linking.openURL(ANDROIDSTORE),
            icon: <Icon name='star' color='#555' size={16} />
        },
        {
            text: '계산기 공유하기',
            onPress: () => Share.share({ message: ANDROIDSTORE }),
            icon: <Icon name='share-variant' color='#555' size={16} />
        },
        {
            text: '기능 건의',
            onPress: () => Linking.openURL(EMAIL),
            icon: <Icon name='android-messages' color='#555' size={16} />
        },
        {
            text: '광고 문의',
            onPress: () => Linking.openURL(EMAIL),
            icon: <Icon name='email' color='#555' size={16} />
        }
    ]

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) =>
                    <SettingCard {...item} />
                }
            />
        </View>
    )
}




export default Body
