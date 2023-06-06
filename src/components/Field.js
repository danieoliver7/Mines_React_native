import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'

export default props => {

    // Desestruturação das props recebidas
    const { mined, opened, nearMines, exploded, flagged } = props

    // Estilização do campo
    const styleField = [styles.field]
    if (opened) styleField.push(styles.opened)
    if (exploded) styleField.push(styles.exploded)
    if (flagged) styleField.push(styles.flagged)
    if (!opened && !exploded) styleField.push(styles.regular)

    let color = null

    // Determina a cor do texto com base no número de minas próximas
    if (nearMines > 0) {
        if (nearMines == 1) color = '#2A28D7'
        if (nearMines == 2) color = '#2B520f'
        if (nearMines > 2 && nearMines < 6) color = '#f9060a'
        if (nearMines >= 6) color = '#f221A9'
    }

    return (
        <TouchableWithoutFeedback onPress={props.onOpen} onLongPress={props.onSelect}>
            <View style={styleField}>
                {!mined && opened && nearMines > 0 ? (
                    <Text style={[styles.label, { color: color }]}>
                        {nearMines}
                    </Text>
                ) : (
                    false
                )}

                {mined && opened ? <Mine /> : false}
                {flagged && !opened ? <Flag /> : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red',
    }
})
