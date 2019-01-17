var rapidapikey;

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

function open_d(){
    pxc = px;
    pyc = py;
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
    var new_li = document.createElement("LI");
    var textnode = document.createTextNode(say_what);
    new_li.appendChild(textnode);
    select_prompt.appendChild(new_li);
	var prompt_wrapper = document.getElementById("prompt_wrapper");
	prompt_wrapper.scrollTop = prompt_wrapper.scrollHeight - prompt_wrapper.clientHeight;
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
   0 !-*-!-*
   1   |   +
   2   *   >
   3   |
   4 @+&-*-!-*
   5     |
   6   !+*
   7
   8
   9
   */	


var map = [[17,13,14,13,17,13,14,0 ,0 ,0 ],
           [0 ,0 ,15,0 ,0 ,0 ,12,0 ,0 ,0 ],
           [0 ,0 ,14,0 ,0 ,0 ,18,0 ,0 ,0 ],
           [0 ,0 ,15,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
           [1 ,2 ,16,13,14,13,17,13,14,0 ],
           [0 ,0 ,0 ,0 ,0 ,0 ,15,0 ,0 ,0 ],
           [0 ,0 ,0 ,0 ,17,12,14,0 ,0 ,0 ],
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

    if(px_clone > 0){
        if(map[px_clone][py_clone] != 0){
            if(map[px_clone][py_clone] > 10){
                map[px_clone][py_clone] -= 10;

                if(map[px_clone][py_clone] != 2){
                    px_clone -= 1;
                    map[px_clone][py_clone] -= 10;
                }
            }else if(map[px_clone][py_clone] != 2){
                px_clone -= 1;						console.log("px = " + px);
                							console.log("pxc = " + px_clone);
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


var wd = [];

//wisdom: https://stackoverflow.com/questions/10262356/jquery-return-from-function
//https://stackoverflow.com/questions/45261255/how-to-use-an-api-key-for-an-ajax-call

function get_word(){
var url = "https://wordsapiv1.p.rapidapi.com/words/?lettersMin=1&lettersMax=13&hasDetails=definitions&random=true";
$.ajax({
  url: url,
  method: 'GET',
  dataType: 'JSON',
   headers: {
    "X-RapidAPI-Key": rapidapikey
  },
  success: function(data) {
    //console.log(data);
    wd.push(data.word);
    wd.push(data.results[0].definition);

  },
  error: function(err) {
    console.log('error:' + err)
  }
})
	console.log(wd);
}

function load_key() {
    var req = new XMLHttpRequest();
    req.open("GET", "static/rapidapikey");
    req.onreadystatechange = function ()
    {
        if (req.readyState === 4)
        {
            if (req.status === 200)
            {
                rapidapikey = req.responseText.trim();
            }
        }
    }
    req.send();
}

load_key();
