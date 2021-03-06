import React, { createContext, Dispatch, useReducer, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { uuid } from 'short-uuid'
import { ToastAndroid } from 'react-native';

export type BuyStockType = {
    name: string,
    id: string,
    price: number,
    many: number,
}
export type SellType = {
    price: number,
    commission: string,
}

export type Stock = {
    name: string,
    id: string,
    buys: BuyStockType[],
    sell: SellType
}

export type StockState = {
    stocks: Stock[],
    index: number
}

type Action =
    | { type: 'INIT'; state: StockState }
    | { type: 'REMOVE', id: string }
    | { type: 'BUYPRICE', id: string, text: string }
    | { type: 'BUYMANY', id: string, text: string }
    | { type: 'BUYADD' }
    | { type: 'BUYREMOVE', id: string }
    | { type: 'SELLPRICE', text: string }
    | { type: 'SELLCOMMISSION', text: string }
    | { type: 'SETNAME', name: string }
    | { type: 'SETINDEX', id: string }
    | { type: 'STOCKADD', name: string, id: string }


const UserStateContext = createContext<StockState | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);



const userReducer = (state: StockState, action: Action): StockState => {
    let st = state.stocks.filter(() => true)
    switch (action.type) {
        case 'INIT':
            return action.state;
        case 'REMOVE':
            if (state.stocks.length == 1) {
                ToastAndroid.show('최소 1개의 데이터는 있어야합니다', ToastAndroid.SHORT)
                return state
            }
            return { ...state, stocks: st.filter(i => i.id != action.id), index: 0 }
        case 'BUYPRICE':
            for (let i = 0; i < st[state.index].buys.length; i++) {
                if (st[state.index].buys[i].id == action.id) {
                    st[state.index].buys[i].price = action.text == '' ? 0 : parseInt(action.text.replace(/[^0-9]/g, ''))
                    break
                }
            }
            return { ...state, stocks: st }
        case 'BUYMANY':
            for (let i = 0; i < st[state.index].buys.length; i++) {
                if (st[state.index].buys[i].id == action.id) {
                    st[state.index].buys[i].many = action.text == '' ? 0 : parseInt(action.text.replace(/[^0-9]/g, ''))
                    break
                }
            }
            return { ...state, stocks: st }
        case 'BUYREMOVE':
            st[state.index].buys = st[state.index].buys.filter(i => i.id != action.id)
            return { ...state, stocks: st }
        case 'BUYADD':
            const st2 = st[state.index].buys.filter(() => true)
            let name: string = '매수1'
            try {
                if (st2.length > 0) {
                    name = '매수' + (Math.max(...st2.map(i => parseInt(i.name.slice(2)))) + 1).toString()
                }
            } catch (error) {
                console.log(error)
            }

            st2.push({ id: uuid(), name, many: 0, price: 0 })
            st[state.index].buys = st2
            return { ...state, stocks: st }
        case 'SELLPRICE':
            st[state.index].sell.price = action.text == '' ? 0 : parseInt(action.text.replace(/[^0-9]/g, ''))
            return { ...state, stocks: st }
        case 'SELLCOMMISSION':

            st[state.index].sell.commission = action.text == '' ? '0' : action.text.replace(/[^\.0-9]/g, '')
            return { ...state, stocks: st }
        case 'SETNAME':
            st[state.index].name = action.name
            return { ...state, stocks: st }
        case 'SETINDEX':
            for (let i = 0; i < st.length; i++) {
                if (st[i].id == action.id) {
                    return { ...state, index: i }
                }
            }
            return { ...state, index: 0 }
        case 'STOCKADD':
            st.push({
                id: action.id,
                name: action.name,
                sell: {
                    commission: '0.015',
                    price: 0
                },
                buys: [
                    {
                        id: uuid(),
                        name: '매수1',
                        many: 0,
                        price: 0
                    }
                ]
            })
            return { ...state, stocks: st }
        default:
            return state
    }
}



const initState: StockState = {
    index: 0,
    stocks: [
        {
            buys: [
                {
                    id: '123',
                    name: '매수1',
                    many: 0,
                    price: 0
                }
            ],
            id: '456',
            name: '내 주식1',
            sell: {
                commission: '0.015',
                price: 0
            }
        }
    ]
}

export const StockContextProvider: React.FC = ({ children }) => {

    const [stock, dispatch] = useReducer(userReducer, initState);

    const useridInit = async () => {
        const value = await AsyncStorage.getItem('@Stock')
        if (!value) {
            dispatch({
                type: 'INIT',
                state: initState
            })
        } else {
            dispatch({ type: "INIT", state: JSON.parse(value) })
        }
    }

    useEffect(() => {
        useridInit()
    }, [])

    useEffect(() => {
        if (stock == initState) return
        AsyncStorage.setItem('@Stock', JSON.stringify(stock))
    }, [stock])

    return (
        <UserStateContext.Provider value={stock} >
            <UserDispatchContext.Provider value={dispatch} >
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}

export const useStock = () => {
    const state = useContext(UserStateContext);
    const dispatch = useContext(UserDispatchContext);
    if (!state || !dispatch) throw console.error('Use Context Error')

    const onInit = (state: StockState) => dispatch({ type: 'INIT', state })
    const onRemove = (id: string) => dispatch({ type: 'REMOVE', id })
    const onBuyPriceChange = (id: string, text: string) => dispatch({ type: 'BUYPRICE', id, text })
    const onBuyManyChange = (id: string, text: string) => dispatch({ type: 'BUYMANY', id, text })
    const onBuyRemove = (id: string) => dispatch({ type: 'BUYREMOVE', id })
    const onBuyAdd = () => dispatch({ type: 'BUYADD' })
    const onSellPriceChange = (text: string) => dispatch({ type: 'SELLPRICE', text })
    const onSellCommissionChange = (text: string) => dispatch({ type: 'SELLCOMMISSION', text })
    const onSetName = (name: string) => dispatch({ type: 'SETNAME', name })
    const onSetIndex = (id: string) => dispatch({ type: 'SETINDEX', id })
    const onAddStock = (id: string, name: string) => dispatch({ type: 'STOCKADD', name, id })

    return {
        ...state,
        onInit,
        onRemove,
        onBuyPriceChange,
        onBuyManyChange,
        onBuyAdd,
        onBuyRemove,
        onSellPriceChange,
        onSellCommissionChange,
        onSetName,
        onSetIndex,
        onAddStock
    };
}