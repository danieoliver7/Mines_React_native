const createBoard = (rows, columns) => {
    // Cria uma matriz representando o tabuleiro com as linhas e colunas especificadas
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    // Espalha as minas aleatoriamente pelo tabuleiro
    const rows = board.length
    const columns = board[0].length
    let minesPlated = 0

    while (minesPlated < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlated++
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    // Cria um tabuleiro com as minas espalhadas
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard = board => {
    // Cria uma cópia do tabuleiro
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board, row, column) => {
    // Obtém os vizinhos de um campo específico no tabuleiro
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]

    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length

            if (different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })

    return neighbors
}

const safeNeighborhood = (board, row, column) => {
    // Verifica se a vizinhança de um campo é segura (sem minas)
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
    // Abre um campo no tabuleiro e realiza as ações necessárias
    const field = board[row][column]

    if (!field.opened) {
        field.opened = true

        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board)

const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0

const pending = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(pending).length === 0

const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    // Inverte a bandeira de um campo no tabuleiro
    const field = board[row][column]
    field.flagged = !field.flagged
}

const flagsUsed = board => fields(board).filter(field => field.flagged).length

export {
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}
