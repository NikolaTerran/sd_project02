/PythonScript
#Tianrun Liu, Brian Lee, Tim Marder, Bo Hui Lu
#Softdev1 pd6
#Project 2 - The End
*/

var createMap = function(num, size){
    var array = [];
    for (var col = 0; col < size; col++){
	array[i] = [];

	for(var row = 0; row < size; row++){
	    array[col][row] = num;
	}
    }

    return array;
}

var printMap = function(arr){
    var array = arr;
    for (var col = 0; col<array.length()-1; col++){
	for(var row = 0; row<array.length()-1; row++){
	    console.log(array[col][row]);
	}
    }
    
console.log(createMap(1,15));
    
