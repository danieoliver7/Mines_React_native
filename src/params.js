import { Dimensions } from 'react-native'

// Configurações do jogo
const params = {
    blockSize: 30, // Tamanho de cada bloco no jogo
    borderSize: 5, // Tamanho da borda ao redor de cada bloco
    fontSize: 15, // Tamanho da fonte a ser usada
    headerRatio: 0.15, // Proporção do painel superior na tela
    difficultLevel: 0.1, // Nível de dificuldade do jogo

    // Retorna o número de colunas com base na largura da janela e no tamanho do bloco
    getColumnsAmount() {
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },

    // Retorna o número de linhas com base na altura total da janela, altura do tabuleiro e tamanho do bloco
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}

export default params