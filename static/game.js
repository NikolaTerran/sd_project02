var text_limit = 0;

var plot_point = 0;

var user_input = "";

var select_prompt = document.getElementById("prompt");

var get_input = document.getElementById("cmd");
get_input.addEventListener("keypress", return_input);
get_input.addEventListener("click", function() { get_input.value = ""; });

function return_input(event){
    var x = event.keyCode;
    //console.log(x);
    if(x == 13){
        //select_prompt.innerHTML = get_input.value;
        user_input = get_input.value;
        get_input.value = "";
        //select_prompt.innerHTML = "you walked toward west.";
        process_command();
    }
}

function process_command(){
    if(sp_event == 0){
        if (user_input == "w"){
            user_input = "west";
        }
        else if (user_input == "e"){
            user_input = "east";
        }
        else if (user_input == "s"){
            user_input = "south";
        }
        else if (user_input == "n"){
            user_input = "north";
        }
        movement_options = ["west", "east", "south", "north"];
        if(movement_options.includes(user_input)){
            print("you walked toward " + user_input + ".");
            x_offset = 0;
            y_offset = 0;
            if(user_input === "west"){
                y_offset = -1;
            }
            else if(user_input === "east"){
                y_offset = 1;
            }
            else if(user_input === "south"){
                x_offset = 1;
            }
            else if(user_input === "north"){
                x_offset = -1;
            }
            if(px + x_offset < 0 || px + x_offset >= max_x ||
                    py + y_offset < 0 || py + y_offset >= max_y ||
                    map[px + x_offset][py + y_offset] == 0){
                print("you bumped into a wall.");
            }
            // doors can only opened by kicking
            else if(map[px + x_offset][py + y_offset] == 2){
                print("you bumped into a door. (hint: try kicking)");
            }
            else{
                map[px][py] = cv;
                px += x_offset;
                py += y_offset;
                cv = map[px][py];
                map[px][py] = 1;
                clr_mist();
            }
        }
        else if(user_input === "kick"){
            print("which direction?");
            sp_event = 1;
            //open_d();
            //print("you kicked.");
            //plot("kick");
        }
        else{
            print("invalid command.");
        }
    }
    else if(sp_event == 1){
        open_d();
    }
}

//0 == normal
//1 == kick door

var sp_event = 0;

function open_d(x,y){
    pxc = px;
    pyc = py;
    try{
        if(user_input === "north"){pxc--; if(map[pxc][pyc] == 2){ map[pxc][pyc] = 3;print("door opens.");}else if(map[pxc][pyc] == 0){print("ouch, that hurts!");}else{print("you kicked at empty space.");} }
        else if(user_input === "south"){pxc++; if(map[pxc][pyc] == 2){ map[pxc][pyc] = 3; print("door opens.");}else if(map[pxc][pyc] == 0){print("ouch, that hurts!");}else{print("you kicked at empty space.");} }
        else if(user_input === "east"){pyc++; if(map[pxc][pyc] == 2){ map[pxc][pyc] = 3; print("door opens.");}else if(map[pxc][pyc] == 0){print("ouch, that hurts!");}else{print("you kicked at empty space.");} }
        else if(user_input === "west"){pyc--; if(map[pxc][pyc] == 2){ map[pxc][pyc] = 3; print("door opens.");}else if(map[pxc][pyc] == 0){print("ouch, that hurts!");}else{print("you kicked at empty space.");} }
        sp_event = 0;
        clr_mist();
    }
    catch{
        sp_event = 0;
        print("ouch, that hurts!");
    }
}


function print(say_what){
    if(text_limit == 10){
        var new_li = document.createElement("LI");
        var textnode = document.createTextNode(say_what);
        select_prompt.removeChild(select_prompt.childNodes[0]);
        new_li.appendChild(textnode);
        select_prompt.appendChild(new_li);
    }else{
        var new_li = document.createElement("LI");
        var textnode = document.createTextNode(say_what);
        new_li.appendChild(textnode);
        select_prompt.appendChild(new_li);
        text_limit++;
    }
}


var px = 4;
var py = 0;

var cv = 4;

var plot_check = 0;
function plot(input){
    var locale = plot_point;
    switch(locale){
        case 0: print("You descended into the dungeon, the first level is a tutorial level, where you'll get familiar with the game. There is an exit to the east, type \"east\" in the command prompt to get out of the room.");
                plot_point++;
        case 1: if(input === "east" && plot_check == 0){
                    print("There is a locked door preventing you exiting the room, maybe you can try to kick it really hard. Typing \"kick\" in the command prompt to kick.");
                    break;
                }
                else if(input === "west" ||
                        input === "north" ||
                        input === "south"){
                    print("Nothing interesting was found at this corner");break;
                }else if(input === "kick"){
                    print("Whammm! the door opens, you can proceed to the next room by type \"east\" again in the command prompt.");
                    open_d(1,4);
                    plot_check = 1;
                }else if(input === "east" && plot_check == 1){
                    //px++;
                    //cv = map[px][py];
                    //cx = px;
                    //cy = py;

                    print("There is an old man sitting against the northern wall, you can try to talk to him by type \"chat\" in the command prompt");
                    plot_check = 0;
                    plot_point++;
                }
                break;
        case 2: break;
        case 3: break;
        case 4: break;
    }
}



window.onload = plot("hi");

//0 == space
//1 11== @;
//2 12== +;
//3 13== -;
//4 14== *;
//5 15== |;
//6 16== & helpful npc
//7 17== ! monster
//8 18== > stair down
//9 19== reserved
//10 20== reserved

/* tutuorial level layout
   0 *-*-*-*
   1   |   +
   2   *   >
   3   |
   4 @+@-*-*-*
   5     |
   6   *+*
   7
   8
   9
   */	

var map = [[14,13,14,13,14,13,14,0 ,0 ,0 ],
    [0 ,0 ,15,0 ,0 ,0 ,12,0 ,0 ,0 ],
    [0 ,0 ,14,0 ,0 ,0 ,18,0 ,0 ,0 ],
    [0 ,0 ,15,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [1 ,2 ,16,13,14,13,14,13,14,0 ],
    [0 ,0 ,0 ,0 ,0 ,0 ,15,0 ,0 ,0 ],
    [0 ,0 ,0 ,0 ,13,12,13,0 ,0 ,0 ],
    [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ]];


//max map dimension		   
var max_y = map.length;
var max_x = map[0].length;

//this is ugly
function clr_mist(){
    px_clone = px;
    py_clone = py;

    px_clone -= 1;

    if(px_clone >= 0){
        if(map[px_clone][py_clone] != 0){
            if(map[px_clone][py_clone] > 10){
                map[px_clone][py_clone] -= 10;

                if(map[px_clone][py_clone] != 2){
                    px_clone -= 1;
                    map[px_clone][py_clone] -= 10;
                }
            }else if(map[px_clone][py_clone] != 2){
                px_clone -= 1;
                if(map[px_clone][py_clone] > 10){
                    map[px_clone][py_clone] -= 10;
                }
            } 
        }
    }
    //console.log("debug0");
    px_clone = px;
    px_clone += 1;
    if(map[px_clone][py_clone] != 0){
        if(px_clone < max_x){
            if(map[px_clone][py_clone] > 10){
                map[px_clone][py_clone] -= 10;
                if(map[px_clone][py_clone] != 2){
                    px_clone += 1;
                    map[px_clone][py_clone] -= 10;
                }
            }else if(map[px_clone][py_clone] != 2){
                px_clone += 1;
                if(map[px_clone][py_clone] > 10){
                    map[px_clone][py_clone] -= 10;
                }
            }
        }
    }
    //console.log("debug1");
    px_clone = px;
    py_clone -= 1;

    if(map[px_clone][py_clone] != 0){
        if(py_clone >= 0){
            if(map[px_clone][py_clone] > 10){
                map[px_clone][py_clone] -= 10;

                if(map[px_clone][py_clone] != 2){
                    py_clone -= 1;
                    map[px_clone][py_clone] -= 10;
                }
            }else if(map[px_clone][py_clone] != 2){
                py_clone -= 1;
                if(map[px_clone][py_clone] > 10){
                    map[px_clone][py_clone] -= 10;
                }
            }
        }
    }

    py_clone = py;
    py_clone += 1;
    //console.log(map[px_clone][py_clone]);
    if(map[px_clone][py_clone] != 0){
        if(py_clone < max_y){													//console.log("run?1");
            if(map[px_clone][py_clone] > 10){
                map[px_clone][py_clone] -= 10;							//console.log("run?2");
                if(map[px_clone][py_clone] != 2){
                    py_clone += 1;
                    map[px_clone][py_clone] -= 10;
                }
            }else if(map[px_clone][py_clone] != 2){
                py_clone += 1;
                //console.log("run?3");
                if(map[px_clone][py_clone] > 10){
                    map[px_clone][py_clone] -= 10;
                }
            }
        }
    }


    clr_all();																			//console.log("dubug3");
    render_map();
}


//https://medium.freecodecamp.org/how-to-make-your-own-procedural-dungeon-map-generator-using-the-random-walk-algorithm-e0085c8aa9a	   

function clr_all(){
    var mx = 0;
    var li = document.getElementById("map_id");
    try{
        while(mx <= max_x){
            li.removeChild(li.childNodes[mx]);
        }
        mx++;
    }catch{

    }
}


function render_map(){
    var mx = 0;
    var my = 0;
    var li;
    //console.log("mx:" + mx);
    while(mx < max_x){
        //console.log("called" + mx);
        li = document.getElementById("map_id");
        var new_li = document.createElement("LI");
        li.appendChild(new_li);

        //console.log(li);
        //console.log(map[mx]);
        //console.log(map[4][0]);
        //console.log(mx);
        //console.log(map[mx][my]);
        //console.log(mx);
        while(my < max_y){
            //console.log(map[mx][my]);
            console.log(max_x);
            switch(map[mx][my]){
                case 1: var textnode = document.createTextNode("@");
                        new_li.appendChild(textnode);
                        break;
                case 2: var textnode = document.createTextNode("+");
                        new_li.appendChild(textnode);
                        break;
                case 3: var textnode = document.createTextNode("-");
                        new_li.appendChild(textnode);
                        break;
                case 4: var textnode = document.createTextNode("*");
                        new_li.appendChild(textnode);
                        break;
                case 5: var textnode = document.createTextNode("|");
                        new_li.appendChild(textnode);
                        break;
                case 6: var textnode = document.createTextNode("&");
                        new_li.appendChild(textnode);
                        break;
                case 7: var textnode = document.createTextNode("!");
                        new_li.appendChild(textnode);
                        break;
                case 8: var textnode = document.createTextNode(">");
                        new_li.appendChild(textnode);
                        break;
                default: var textnode = document.createTextNode('\xa0');
                         new_li.appendChild(textnode);
                         break;
            }
            my++;
        }
        my = 0;
        mx++;
    }
}

window.onload = render_map();

/*
   function api_request(){
   var 
   unirest.get("https://wordsapiv1.p.rapidapi.com/words/?random=true")
   .header("X-RapidAPI-Key", "H4M1sxY4O1msh9v8MrcQtN3bxkdXp123G2cjsnp44qxdKtuXnu")
   .end(function (result) {
   console.log(result.status, result.headers, result.body);
   });

   }
   */

/* emergency plan

   var cols, rows;
   var scl = 40;
   var grid = [];
   var stack = [];

   var active;
   var player;
   var finish;

   var highlightShow = true;

   function setup() {
   createCanvas(1000, 600);
   background(237, 34, 93);
   cols = floor(width/scl);
   rows = floor(height/scl);

   for (var j = 0; j < rows; j++) {
   for (var i = 0; i < cols; i++) {
   var cell = new Cell(i,j);
   grid.push(cell);
   }
   }
   active = grid[0];
   player = grid[0];
   finish = grid[index(14,14)];
   }	


   function index(i, j) {
   if (i < 0 || j < 0 || i > cols-1 || j > cols -1) {
   return -1;
   }
   return i + j * cols;
   }

   function draw() {
   for (var i = 0; i < grid.length; i++) {
   grid[i].show();
   }

   player.visible();
   finish.visible();


   active.checked = true;
   active.highlight();
   var next = active.checkN();
   if (next) {
   next.checked = true;
   removeLine(active,next);
   active = next;
   stack.push(active);
   }
   }

   function Cell(i,j) {
   this.i = i;
   this.j = j;
   this.walls = [true, true, true, true] // top right bottom left
   this.checked = false;

   this.show = function() {
   var x = this.i*scl;
   var y = this.j*scl;

   stroke(255);

   if (this.walls[0]) {line(x    ,y    ,x+scl,y    );} // top
if (this.walls[1]) {line(x+scl,y    ,x+scl,y+scl);} // right
if (this.walls[2]) {line(x    ,y+scl,x+scl,y+scl);} // bottom
if (this.walls[3]) {line(x    ,y    ,x    ,y+scl);} // left

if (this.checked) {
    noStroke();
    fill(60, 50, 170);
    rect(x,y,scl,scl);
}
}

this.checkN = function() {
    var n = []

        var top    = grid[index(i  , j-1)];
    var right  = grid[index(i+1, j  )];
    var bottom = grid[index(i  , j+1)];
    var left   = grid[index(i-1, j  )];

    if (top && !top.checked      ) {n.push(top   );}
    if (right && !right.checked  ) {n.push(right );}
    if (bottom && !bottom.checked) {n.push(bottom);}
    if (left && !left.checked    ) {n.push(left  );}

    if (n.length > 0) {
        var r = floor(random(0,n.length));
        return n[r];
    }else{
        back();
    }
}

this.highlight = function() {
    if (highlightShow) {
        var x = this.i*scl;
        var y = this.j*scl;

        noStroke();  
        fill(20, 240, 30,100);
        rect(x,y,scl,scl);
    }
}

this.visible = function() {
    if (allChecked()) {
        var x = this.i*scl;
        var y = this.j*scl;

        noStroke();
        fill(20, 240, 30);
        rect(x+5,y+5,scl-10,scl-10);
    }
}
}

back = function() {
    if (!allChecked()) {
        stack.pop();
        active = stack[stack.length-1];
    }else{
        highlightShow = false;
    }
}

allChecked = function() {
    var finished = true;
    for (var i = 0; i < grid.length-1; i++) {
        if (!grid[i].checked) {
            finished = false;
        }
    }
    if (finished) {return true;}else{return false;}
}

removeLine = function(a, n) {
    var x = a.i - n.i;
    var y = a.j - n.j;
    console.log (x + "  " + y);
    if (y === 1) {a.walls[0] = false; n.walls[2] = false;}else // top
        if (x === -1 ) {a.walls[1] = false; n.walls[3] = false;}else // right
            if (y === -1 ) {a.walls[2] = false; n.walls[0] = false;}else // bottom
                if (x === 1) {a.walls[3] = false; n.walls[1] = false;}     // left
}


reset = function() {
    grid = []
        background(237, 34, 93);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }

    active = grid[0];
    player = grid[0];
    finish = grid[index(14,14)];
}

window.onload = setup();

*/
