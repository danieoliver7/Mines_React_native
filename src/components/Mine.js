import React from 'react'
import { View, StyleSheet } from 'react-native'

export default props => {
    return (
        <View style={styles.container}>
            {/* Núcleo da mina */}
            <View style={styles.coreMine} />

            {/* Linha reta */}
            <View style={styles.Line} />

            {/* Linha inclinada em 45 graus */}
            <View style={[styles.Line, { transform: [{ rotate: '45deg' }] }]} />

            {/* Linha vertical */}
            <View style={[styles.Line, { transform: [{ rotate: '90deg' }] }]} />

            {/* Linha inclinada em 135 graus */}
            <View style={[styles.Line, { transform: [{ rotate: '135deg' }] }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    coreMine: {
        height: 14,
        width: 14,
        borderRadius: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Line: {
        position: 'absolute',
        height: 3,
        width: 20,
        borderRadius: 3,
        backgroundColor: 'black',
    }
})
