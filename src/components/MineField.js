import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Field from './Field'

export default props => {
    // Mapeia as linhas do tabuleiro
    const rows = props.board.map((row, r) => {
        // Mapeia as colunas de cada linha
        const columns = row.map((field, c) => {
            // Renderiza o componente Field para cada campo
            return (
                <Field
                    {...field}
                    key={c}
                    onOpen={() => props.onOpenField(r, c)}
                    onSelect={e => props.onSelectField(r, c)}
                />
            )
        })

        // Retorna a linha com as colunas renderizadas
        return (
            <View key={r} style={{ flexDirection: 'row' }}>
                {columns}
            </View>
        )
    })

    // Retorna a estrutura completa do tabuleiro
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
    }
})
