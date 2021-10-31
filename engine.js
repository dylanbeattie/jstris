class Cell {
    constructor(row, col, engine) {
        this.row = row;
        this.col = col;
        this.engine = engine;
    }

    okToFall() {
        return this.engine.canWeMoveIntoCell(this.row + 1, this.col);
    }
    fall() {
        let ok = this.okToFall();
        if (ok) this.row++;
        return (ok);
    }
    okToMoveLeft() {
        return this.engine.canWeMoveIntoCell(this.row, this.col - 1);
    }
    okToMoveRight() {
        return this.engine.canWeMoveIntoCell(this.row, this.col + 1);
    }

    moveLeft() {
        let ok = this.okToMoveLeft();
        if (ok) this.col--;
        return ok;
    }

    moveRight() {
        let ok = this.okToMoveRight;
        if(ok) this.col++;
        return ok;
    }
}

class Block {
    constructor(engine) {
        this.cells = new Array();
    }
    fall() {
        if (this.cells.every(cell => cell.okToFall())) {
            this.cells.forEach(cell => cell.fall());
            return true;
        }
        return false;
    }
    isOccupyingCell(row, col) {
        return this.cells.some(c => c.row == row && c.col == col);
    }

    moveLeft() {
        if (this.cells.every(cell => cell.okToMoveLeft())) {
            this.cells.forEach(cell => cell.moveLeft());
        }    
    }

    moveRight() {
        if(this.cells.every(cell => cell.okToMoveRight())) {
            this.cells.forEach(cell => cell.moveRight());
        }
    }

    clearRow(row) {
        this.cells = this.cells.filter(c => c.row != row);
    }
}


class TallBlock extends Block {
    constructor(row, col, engine) {
        super(engine);
        this.className = "tall-block";
        this.cells.push(new Cell(row, col,engine));
        this.cells.push(new Cell(row + 1, col,engine));
    }
}

class WideBlock extends Block {
    constructor(row, col, engine) {
        super(engine);
        this.className = "wide-block";
        this.cells.push(new Cell(row, col,engine));
        this.cells.push(new Cell(row, col + 1,engine));
    }
}

export default class TetrisEngine {
    constructor(rows, cols) {
        this.rows = parseInt(rows) || 20;
        this.cols = parseInt(cols) || 10;
        this.fallingBlock = null;
        this.settledBlocks = new Array();
    }

    get blocks() {
        return this.settledBlocks.concat(this.fallingBlock);
    }

    addBlock() {
        var which = Math.floor((Math.random() * 2) % 2);
        switch (which) {
            case 0:
                this.fallingBlock = new WideBlock(0, Math.ceil(this.cols / 2), this);
                return;
            case 1:
                this.fallingBlock = new TallBlock(0, Math.ceil(this.cols / 2), this);
                return;
        }
    }

    fall() {
        if (this.fallingBlock.fall()) return (true);
        for (var row = this.rows - 1; row >= 0; row--) {
            while (this.clearRow(row));
        }
        this.settledBlocks.push(this.fallingBlock);
        this.addBlock();
    }
    moveLeft() {
        this.fallingBlock.moveLeft();
    }

    moveRight() {
        this.fallingBlock.moveRight();
    }

    clearRow(row) {
        for (var col = 0; col < this.cols; col++) {
            if (!this.blocks.some(block => block.isOccupyingCell(row, col))) return (false);
        }
        this.blocks.forEach(block => block.clearRow(row));
        this.blocks.forEach(block => block.fall());
    }

    canWeMoveIntoCell(row, col) {
        if (row < 0) return false;
        if (col < 0) return (false);
        if (row >= this.rows) return (false);
        if (col >= this.cols) return (false);
        if (this.settledBlocks.some(block => block.isOccupyingCell(row, col))) return (false);
        return (true);
    }
}