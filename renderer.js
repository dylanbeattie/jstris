import * as html from './html.js';

export default class Renderer {
    constructor(root) {
        this.root = root;
        this.spans = new Array();
        /*
        this.span = [
rowIndex >  [ span, span, span, span ]
                ^--- colIndex
            [ span, span, span, span ]
            [ span, span, span, span ]
            [ span, span, span, span ]
            [ span, span, span, span ]
            [ span, span, span, span ]
            [ span, span, span, span ]
            [ span, span, span, span ]
            [ span, span, span, span ]
        ]
        */
    }

    render(engine) {
        console.log('Drawing CSS link');
        this.root.appendChild(html.element('link', {
            rel: "stylesheet",
            href: "tetris.css",
            type: "text/css"
        }));
        let grid = html.element("div", { "class" : "tetris-grid" });
        for(let row = 0; row < engine.rows; row++) {
            let rowDiv = html.element('div');
            let rowSpans = new Array(); 
            for(let col = 0; col < engine.cols; col++) {
                let span = html.element('span');
                rowDiv.appendChild(span);
                rowSpans.push(span);
            }
            grid.appendChild(rowDiv);
            this.spans.push(rowSpans);
        }
        this.root.appendChild(grid);
    }
    update(engine) {
        // FIrst: reset all the cells
        let spans = this.root.querySelectorAll("div.tetris-grid div span");
        spans.forEach(span => span.className = null);
        // Then: highlight the cells with blocks in them
        engine.blocks.forEach(block => block.cells.forEach(cell => {    
            console.log(`Highlighting cell at ${cell.row} ${cell.col}`);
            this.spans[cell.row][cell.col].className = block.className;
        }));
    }
}