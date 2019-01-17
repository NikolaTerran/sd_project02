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

//movement variables
var px = 4;
var py = 0;
var cv = 4;

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
                
                //engage combat
                if(map[px][py] != "7"){
                    cv = map[px][py];
                    map[px][py] = 1;
                    clr_mist();
                }
                else{
                    cv = mon_search();
                    map[px][py] = 9;
                    clr_mist();
                    sp_event = 2;
			
var dict = (function (){
var url = "https://wordsapiv1.p.rapidapi.com/words/?lettersMin=1&lettersMax=13&hasDetails=definitions&random=true";
var dict = [];
$.ajax({
  async: false,
  global: false,
  url: url,
  method: 'GET',
  dataType: 'JSON',
   headers: {           //hard code api key
    "X-RapidAPI-Key": rapidapikey
  },
  success: function(data) {
    console.log(data);
    dict[0] = data.word.toString();
    dict[1] = data.results[0].definition.toString();
  },
  error: function(err) {
    console.log('error:' + err)
  }
})
	return dict;
})();

ans_s = dict[0];
str = [];
ans = [];

	for (var count = 0; count < ans_s.length; count++) {
    str[count] = ans_s.substring(count, count + 1);
    ans[count] = str[count];
    }
	
	//console.log(str);

			print("fight!");
			print("what is the word?");
			print("definition " + dict[1]);
			render_combat();
		}
            }
        }
        else if(user_input === "kick"){
            print("which direction?");
            sp_event = 1;
            //open_d();
            //print("you kicked.");
            //plot("kick");
        }
        else if(user_input === "down"){
        	if(cv == 8){
        		print("you walked down stairs.");	
        		ran_gen();
        	}else{
        		print("you can't go down from here!");
        	}

}

//console.log(str);

print("fight! guess the word!");
print("DEFINITION:::");
print(dict[1]);
render_combat();
}
}
}
else if(user_input === "kick"){
    print("which direction?");
    sp_event = 1;
    //open_d();
    //print("you kicked.");
    //plot("kick");
}
else if(user_input === "down"){
    if(cv == 8){
        ran_gen();
    }else{
        print("you can't go down from here!");
    }
}
else{
    print("invalid command.");
}
}
else if(sp_event == 1){
    open_d();
}else if(sp_event == 2){

    var win_check = 0;
    var count = str.length;
    var hit = 0;
    while(count >= 0){
        if(str[count] === "$" || str[count] === " " || str[count] === "-" || str[count] === "\'"){
            win_check ++;
            console.log("str.len: " + str.length);
        }
        if(user_input === str[count]){
            //win_cond--;
            str[count] = "$";
            render_combat();
            console.log("win_c: " + win_check);
            count--;
            hit = 1;
        }else{
            count--;
        }
    }
    if(hit == 0){
        hp--;
        print("ahh! Your hp is now at (" + hp + "/" + hp_max + ")");
    }
    if(win_check == str.length - 1){
        print("you win!");
        clear_combat();
        hp = hp_max;
        sp_event = 0;
    }
    if(hp == 0){
        print("the answer is: " + ans_s);
        print("game over! type \"restart\" to continue...");
        sp_event = 4;
    }
}else if(sp_event == 4){
    if(user_input === "restart"){
        window.location.reload(false); 
    }

}
}

//wisdom: https://stackoverflow.com/questions/28933486/javascript-array-undefined-error
//https://www.w3schools.com/js/js_mistakes.asp

var str = [];
var ans = [];
var ans_s = "";

//wisdom: https://stackoverflow.com/questions/10262356/jquery-return-from-function
//https://stackoverflow.com/questions/45261255/how-to-use-an-api-key-for-an-ajax-call
//https://stackoverflow.com/questions/2177548/load-json-into-variable

function clear_combat(){
    var combat_screen = document.getElementById("combat");
    combat_screen.innerHTML = '';
}

function render_combat(){
    var combat_screen = document.getElementById("combat");
    combat_screen.innerHTML = '';
    var word = document.createElement("p");
    combat_screen.append(word);
    word.className = "terminal";
    hint = ""
    for (var count = 0; count < str.length; count++){
        if (str[count] === " "){
            hint += "\xa0\xa0";
        }
        else if(str[count] === "\'"){
            hint += "\'\xa0";
        }
        else if(str[count] === "-"){
            hint += "-\xa0";
        }
        else if(str[count] === "$"){
            hint += ans[count] + "\xa0";
        }
        else{
            hint += "_\xa0";
        }
    }
    word.textContent = hint;
}

function mon_search(){
    var count = 0;

    while(mon[count][0] != px && mon[count][1] != py){
        count ++;
    }

    return mon[count][2];
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

var hp_max = 6;
var hp = 6;

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

function mp_clr(){
    var mx = 0;
    var my = 0;
    while(mx < max_x){


        while(my < max_y){
            map[mx][my] = 0;
            console.log("[mx]: " + mx + " [my]: " + my);
            my++;
        }
        my = 0;
        mx++;
    }
}

function ran_gen(){
<<<<<<< HEAD
	mp_clr();
	cv = 4;
	px = Math.floor(Math.random() * max_x);
	py = Math.floor(Math.random() * max_y);
	var pxc = px;
	var pyc = py;
	map[px][py] = 1;
	
	
	
	var vt = 1;
	
	var step = 1;
	var cd = 0;
	
	var ray = [];
						ray[0] = 0;
						ray[1] = 0;
						ray[2] = 0;
						ray[3] = 0;
					
					if((pxc + 1) > (max_x - 1) && map[pxc + 1][pyc] != 0){
						ray[0] = 1;
					}
					
					if((pxc - 1) < 0 && map[pxc - 1][pyc] != 0){
						ray[1] = 1;
					}
					
					if((pyc + 1) > (max_y - 1) && map[pxc][pyc + 1] != 0){
						ray[1] = 1;
					}
					
					if((pyc - 1) < 0 && map[pxc][pyc - 1] != 0){
						ray[1] = 1;
					}
					
	go(pxc,pyc,ray[0],ray[1],ray[2],ray[3],step,vt);
		
	render_map();
	
	

	
	
}

function go(x,y,e,w,s,n,step,vt){

		dir = ran_dir();
		switch(dir){
				case 0: if(n != 1){pxc--;} break;  
				case 1: if(s != 1){pxc++;} break;
				case 2: if(w != 1){pyc--; vt = 0;} break;
				case 3: if(e != 1){pyc++; vt = 0;} break;
		}
	
		if(map[pxc][pyc] == 0){
		if(step == 0){
			map[pxc][pyc] = 14;
		}else if(vt == 0){
			map[pxc][pyc] = 13;
		}else if(vt == 1){
			map[pxc][pyc] = 15;
			}
		}
	
					var fail = [];
						fail[0] = 0;
						fail[1] = 0;
						fail[2] = 0;
						fail[3] = 0;
					
					if((pxc + 1) < max_x && map[pxc + 1][pyc] != 0){
						fail[0] = 1;
					}
					
					if((pxc - 1) >= 0 && map[pxc - 1][pyc] != 0){
						fail[1] = 1;
					}
					
					if((pyc + 1) < max_y && map[pxc][pyc + 1] != 0){
						fail[1] = 1;
					}
					
					if((pyc - 1) >= 0 && map[pxc][pyc - 1] != 0){
						fail[1] = 1;
					}
	
		if(fail > 3){
			
		}else{
			go(pxc,pyc,fail[0],fail[1],fail[2],fail[3]);
		}
    mp_clr();
    cv = 4;
    px = Math.floor(Math.random() * max_x);
    py = Math.floor(Math.random() * max_y);
    map[px][py] = 1;

    dir = ran_dir();
    switch(dir){
        case 0:  
        case 1:
        case 2:
        case 3:
    }	
}

function ran_dir(){
    var dir = Math.floor(Math.random() * 4);
    return dir;
}

function ran_mon(){

}

//0 == space
//1 11== @;
//2 12== +;
//3 13== -;
//4 14== *;
//5 15== |;
//6 16== & helpful npc
//7 17== ! monster
//8 18== > stair down
//9 19== x combat
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
           [0 ,0 ,15,0 ,0 ,0 ,15,0 ,0 ,0 ],
           [0 ,0 ,14,0 ,0 ,0 ,18,0 ,0 ,0 ],
           [0 ,0 ,15,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
           [1 ,2 ,16,13,14,13,17,13,14,0 ],
           [15 ,0 ,0 ,0 ,0 ,0 ,15,0 ,0 ,0 ],
           [18,0 ,0 ,0 ,17,12,14,0 ,0 ,0 ],
           [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
           [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
           [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ]];

var mon = [[0,0,4],
		   [0,4,4],
		   [4,6,4],
		   [6,2,4]];

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
                case 9: var textnode = document.createTextNode("x");
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
