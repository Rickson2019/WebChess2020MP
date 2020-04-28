//contains all the properties that a cell needs
class Linker{
    constructor(obj,html){
        this.obj = obj;
        this.html = html;
        this.html.obj = obj;
        this.obj.html = html;
        
    }

}
var avail;
class Cell {
    constructor(size, x_coor, y_coor, color, board) {
        //width of the square
        this.color = color;
        this.size = 80;
        this.x_coor = x_coor;
        this.y_coor = y_coor;
        this.id = [this.x_coor, this.y_coor];
        this.size = size;
        this.piece = null;
        this.html;
        this.board = board;
    }

    // returns the piece
    get_piece() {
        return this.piece;
    }

    //setter method to set the piece in a cell
    set_piece(piece) {
        this.piece = piece
    }

    //returns the x_coor
    get_x_coor() {
        return this.x_coor;
    }

    //returns the y_coor
    get_y_coor() {
        return this.y_coor;
    }

    /*the method takes in a cell and then renders the
      cell's html elements and add event listeners to it  
    */
    cell_render(cell) {
        let div = $("<div></div>");
        let linker = new Linker(cell,div);
        console.log("linker " + linker)
        $(div).css("display", "inline-block");
        $(div).css("width", cell.size);
        $(div).css("height", cell.size);
        $(div).css("background-color", cell.color);















        $(linker.html).mousedown( () => {
            $(div).css("background-color", "green")
            console.log(cell.get_x_coor() + " " + cell.get_y_coor());
            
            if (cell.piece != null && cell.board.prev_cell !== null) {
                avail = this.piece.move_pattern();
                console.log(cell.piece.piece_name)
               
                cell.board.prev_cell= cell;
                
                /*makes the cell the previous cell in the board,
                and get ready for reads in the next move*/
                if(cell.board.prev_cell.piece.selected){
                    cell.board.prev_cell.piece.selected = false;
                    cell.set_piece(cell.board.prev_cell.piece)
                    console.log("selected?" + cell.board.prev_cell.piece.selected )

                }

                else if(!cell.board.prev_cell.piece.selected){
                    cell.board.prev_cell= cell;
                    cell.board.prev_cell.piece.selected = true;
                    console.log("selected?" + cell.board.prev_cell.piece.selected )

                }
            } 
            else if (cell.piece == null || cell.board.prev_cell == null || cell.board.prev_cell == undefined){
                
                if(cell.board.prev_cell.piece.selected){
                    cell.board.prev_cell.piece.selected = false;
                    cell.set_piece(cell.board.prev_cell.piece)
                    console.log("selected?" + cell.board.prev_cell.piece.selected)
                    

                    for(let i = 0 ; i< avail.length; i++){
                        if(linker.html.obj == avail[i]){
                            cell.html.html(cell.board.prev_cell.piece.piece_render());
                            cell.board.prev_cell.html.html("<div style='background-color:"+cell.board.prev_cell.color+ "'"  + "> </div>");
                    }   else{}
                }
                    
                    
                    
                }

                else if(!cell.board.prev_cell.piece.selected){
                    cell.board.prev_cell= cell;
                    cell.board.prev_cell.piece.selected = true;
                    console.log("selected?" + cell.board.prev_cell.piece.selected)
                    

                }


                // if(cell.board.prev_cell.piece.selected && cell.piece == null || 
                //    cell.board.prev_cell.piece.selected && cell.piece == undefined){
                //        console.log("canmove? " + cell.board.prev_cell.piece.selected)
                //     cell.set_piece(cell.board.prev_cell.piece);
                //     cell.html = cell.piece.piece_render(cell.board.prev_cell.piece.color,cell.board.prev_cell.piece.get_x_coor(),cell.board.prev_cell.piece.get_y_coor());
                // }

                // if(cell.piece == null || 
                //    cell.piece == undefined){
                //         console.log("canmove? " + cell.board.prev_cell.piece.selected)
                //      cell.set_piece(cell.board.prev_cell.piece);
                //      cell.html = cell.piece.piece_render(cell.board.prev_cell.piece.color,cell.board.prev_cell.piece.get_x_coor(),cell.board.prev_cell.piece.get_y_coor());
                //  }
                
                
                // else{
                //     cell.piece.selected = true;
                //     cell.board.prev_cell = cell;
                // }

                cell.board.prev_cell = cell ;
                cell.board.cur_cell = this;
                // console.log(this.piece.piece_name)
            }
        })









        $(div).mouseup(() => {
            $(div).css("background-color", cell.color)

            // if(cell.board.cur_cell == cell){
            //     console.log("choose another place to move")
            // }
            // if(cell.board.cur_cell != cell){
            //    cell.set_piece(cell.board.cur_cell.get_piece())

            // }

        })



        $("#board_container").append(div);
        return div;
    }


    cell_render_available(cell) {
        let div = $("<div></div>");
        $(div).css("display", "inline-block");
        $(div).css("width", cell.size);
        $(div).css("height", cell.size);
        $(div).css("background-color", "blue");

        // $(div).on("mouseleave", () => {
        // 	console.log(cell.get_x_coor() + " " + cell.get_y_coor());
        // 	$(div).css("background-color","green")
        // })

        // $(window).mousedown("click", () => {
        //     //now the current cell is 
        //     cell.board.prev_cell;
        //     cell.board.prev_cell.get_piece();

        // })



        $(window).mouseup(() => {
            $(div).css("background-color", cell.color)
        })


        $(cell.html).html(div);
        return div;
    }


}



//col
class Board {
    constructor() {
        //the current chosen cell
        this.cur_cell;
        //the previously chosen cell
        this.prev_cell;
        //cells to hold all cells in this board
        this.cells = [];
    }

    create_board() {
        for (let j = 8; j >= 1; j--) {
            //row
            this.cells[j] = []
            for (let i = 1; i <= 8; i++) {
                //if even then white 
                if ((i + j) % 2 == 0) {
                    //the "this" creates a connection between the
                    //cell and the board.
                    var cell = new Cell(120, i, j, "black", this)
                } else {
                    var cell = new Cell(120, i, j, "darksalmon", this)
                }
                //put into the index i,j 
                this.cells[j][i] = cell;

                // cell.cell_render(cell);
                this.cells[j][i].html = cell.cell_render(cell);
            }

        }
    }

    //note that the x and y are in reversed position
    //in the return statement
    get_cell(x, y) {

        return this.cells[y][x];
    }


}




//Super Class for Pieces
class Piece {
    constructor(piece_name, board, x_coor, y_coor) {
        this.board = board;
        this.piece_name = piece_name;
        this.selected = false;
        this.img;
        this.cell = this.board.get_cell(x_coor, y_coor);
        this.cell.set_piece(this);
    }

    move(target_cell){
        this.board.prev_cell
    }

    piece_get_cell(){
        return this.cell;
    }

    piece_set_cell(){
        
    }

    //renders the piece to the board 
    piece_render(color, x_coor, y_coor) {
        console.log(x_coor);

        let this_cell = this.cell;
        this_cell.set_piece(this);

        console.log(this_cell.get_x_coor());
        console.log(this_cell.get_y_coor());

        console.log("before" + this_cell.html)
        let innerhtml= "<img class='piece_imgs' src=" + "'" + this.img + "'" + "></img>";
        $(this_cell.html).html(innerhtml);
        console.log("after" +  this_cell.html)
        //make the pictures impossible to drag by using prevent default
        $(this_cell.html).mousedown((e) => { e.preventDefault() })
        return innerhtml;

    }

    piece_reverse_render(x_coor, y_coor) {
        $(this_cell.html).html(this_cell.cell_render());
    }
}






class Pawn extends Piece {
    constructor(color, board, x_coor, y_coor) {
        super("pawn_white", board, x_coor, y_coor);



        this.board = board;
        this.color = color;
        this.x_coor = x_coor;
        this.y_coor = y_coor;
        super.piece_render(color, x_coor, y_coor)
        if (this.color == "white")
            this.img = "./img/pawn_white.png"
        else
            this.img = "./img/pawn_black.png"

        this.board.get_cell(x_coor, y_coor).set_piece(this);

        super.piece_render(color, x_coor, y_coor)

    }



    move_pattern(color) {
        let movable_squares = [];
        let forward = 0;
        if (color = "white")
            forward = +1;
        //move forward
        if (this.y_coor >= 1 && this.board.get_cell(this.x_coor, this.y_coor + 1).get_piece() == null) {
            movable_squares.push(this.board.get_cell(this.x_coor, this.y_coor + 1))
            let div = this.board.get_cell(this.x_coor, this.y_coor + 1);
            div.html = div.cell_render_available(div)
        }
        //two steps
        // if(this.y_coor == 1 && this.board.get_cell[x_coor][y_coor+1].get_piece == null )
        //    movable_squares.push(this.board.get_cell[x_coor][y_coor+2])			
        if (this.y_coor == 2 && this.board.get_cell(this.x_coor, this.y_coor + 2).get_piece() == null
            && this.board.get_cell(this.x_coor, this.y_coor + 1).get_piece() == null) {

            movable_squares.push(this.board.get_cell(this.x_coor, this.y_coor + 2))
            let div = this.board.get_cell(this.x_coor, this.y_coor + 1);
            div.html = div.cell_render_available(div);
            div = this.board.get_cell(this.x_coor, this.y_coor + 2);
            div.html = div.cell_render_available(div);
        }

        return movable_squares;
    }




}

//board creation
let board = new Board();
board.create_board();
// piece_render()
let pawn = new Pawn("white", board, 1, 2);
let pawn2 = new Pawn("white", board, 2, 3);
let pawn3 = new Pawn("white", board, 3, 2);
let pawn4 = new Pawn("white", board, 4, 2);
let pawn5 = new Pawn("white", board, 5, 2);
let pawn6 = new Pawn("white", board, 6, 2);
let pawn7 = new Pawn("white", board, 7, 2);
let pawn8 = new Pawn("white", board, 8, 3);



class Event_Listener {
    constructor(cell) {
        this.cell = cell;
        this.available;
    }
    static click() {
        let div = this.cell.html;
        $(div).on("click", () => {
            $(div).css("background-color", "green")
            console.log(cell.get_x_coor() + " " + cell.get_y_coor());
            if (this.cell.get_piece() != null) {
                this.cell.get_piece().move_pattern();
            }
        })
    }
}