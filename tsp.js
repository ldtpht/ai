function randomSingle (limit) {
  return Math.floor(Math.random()*limit);
}

function isExist (matrix, start, stop, value) {
  for (var i = start ; i <= stop; i++) {
    if (matrix[i] == value)
      return true;
  }
  return false;
}

function randomMatrix (size,limit){
  var temp = new Array(size);
  for (var i = 0; i < size; i++) {
    temp[i] = new Array(size);
    for (var j = 0; j < size; j++) {
      var random = randomSingle(limit);
      if (i == j)
        temp[i][j] = 0;
      else if (!isExist(temp[i], 0, j-1,random))  
        temp[i][j] = random;
      else
        j--;
    }
  }
  return temp;
}

function showMatrix (matrix) {
  var l = matrix.length;
  var str = "[";
  for (var i = 0; i < l; i++) {
    str += "[";
    for (var j = 0; j < l; j++){
      str += matrix[i][j];
      if (j < l - 1)
        str += ",";
    }
    str += "]";
    if (i < l - 1)
      str += ",";
    str += "\n";
  }
  str += "]";
  return str;
}

function getSingleLocation (size){
  var temp = new Array(size);
  for (var i = 0; i < size; i++){
    var random = randomSingle(size);
    if (!isExist(temp, 0, i-1,random))  
      temp[i] = random;
    else
      i--;
  }
  return temp;
}

function isSame (locationA, locationB){
  var l = locationA.length;
  for (var i = 0; i < l; i++){
    if (locationA[i] != locationB[i])
      return false;
  }
  return true;
}

function isExistLocation (list,l,location) {
  for (var i = 0; i < l; i++){
    if (isSame(list[i],location))
      return true;
  }
  return false;
}

function getMultiLocation (limit, size){
  var temp = new Array(limit);
  for (var i = 0; i < limit; i++){
    temp[i] = new Array(size);
    var randomLocation = getSingleLocation(size);
    if (!isExistLocation(temp,i,randomLocation))
      temp[i] = randomLocation;
    else
      i--;
  }
  return temp;
}

function getLocationValue (matrix, location){
  var row,col,value;
  value = 0;
  var l = matrix.length;
  for (var i = 1; i < l; i++){
    row = location[i-1];
    col = location[i];
    value+=matrix[row][col];
  }
  return value;
}

function getBestLocation (matrix, list){
  var l =  list.length;
  var temp = new Array(matrix.length);
  var min = Number.MAX_VALUE;
  for (var i = 0; i < l; i++){
    var value = getLocationValue(matrix,list[i]);
    if (value<min){
      min = value;
      temp = list[i];
    }
  }
  return temp;
}

function getChild (location) {
  var l = location.length;
  var temp = new Array(l);
  var start,stop,random;
  do{
    start = randomSingle(l);
    stop = randomSingle(l);
    if (start > stop){
      var t = start;
      start = stop;
      stop = t;
    }
  } while (stop - start > l - 2);
  for (var i = 0; i < l; i++){
    if (i >= start && i <= stop)
      temp[i] = location[i];
    else if (i<start){
      do{
        random  = randomSingle(l);
      }while (isExist(location,start,stop,random)||isExist(temp,0,i-1,random));
      temp[i] = random;
    }
    else if (i > stop){
      do{
        random  = randomSingle(l);
      }while (isExist(temp,0,i-1,random));
      temp[i] = random;
    }
  }
  return temp;
}

function getWorstLocation (matrix,list){
  var l =  list.length;
  var temp = new Array(matrix.length);
  var max = Number.MIN_VALUE;
  for (var i = 0; i < l; i++){
    var value = getLocationValue(matrix,list[i]);
    if (value>max){
      max = value;
      temp = i;
    }
  }
  return temp;
}

function tsp (matrix,size,loop){
  var start = new Date().getTime();
  var l = matrix.length;
  var list = getMultiLocation(size,l);
  var best = getBestLocation(matrix,list);
  for (var i = 0; i < loop; i++){
    var child = getChild(best);
    var worst = getWorstLocation(matrix,list);
    if (getLocationValue(matrix,child) < getLocationValue(matrix,list[worst])){
      list[worst] = child;
      best = getBestLocation(matrix,list);
      console.log(best + ": " + getLocationValue(matrix,best));
    }
  }
  var end = new Date().getTime();
  alert('Execution time: ' + (end - start));
  return best;
}

var matrix = [
  [0, 29, 82, 46, 68, 52, 72, 42, 51, 55, 29, 74, 23, 72, 46],
  [29, 0, 55, 46, 42, 43, 43, 23, 23, 31, 41, 51, 11, 52, 21],
  [82, 55, 0, 68, 46, 55, 23, 43, 41, 29, 79, 21, 64, 31, 51],
  [46, 46, 68, 0, 82, 15, 72, 31, 62, 42, 21, 51, 51, 43, 64],
  [68, 42, 46, 82, 0, 74, 23, 52, 21, 46, 82, 58, 46, 65, 23],
  [52, 43, 55, 15, 74, 0, 61, 23, 55, 31, 33, 37, 51, 29, 59],
  [72, 43, 23, 72, 23, 61, 0, 42, 23, 31, 77, 37, 51, 46, 33],
  [42, 23, 43, 31, 52, 23, 42, 0, 33, 15, 37, 33, 33, 31, 37],
  [51, 23, 41, 62, 21, 55, 23, 33, 0, 29, 62, 46, 29, 51, 11],
  [55, 31, 29, 42, 46, 31, 31, 15, 29, 0, 51, 21, 41, 23, 37],
  [29, 41, 79, 21, 82, 33, 77, 37, 62, 51, 0, 65, 42, 59, 61],
  [74, 51, 21, 51, 58, 37, 37, 33, 46, 21, 65, 0, 61, 11, 55],
  [23, 11, 64, 51, 46, 51, 51, 33, 29, 41, 42, 61, 0, 62, 23],
  [72, 52, 31, 43, 65, 29, 46, 31, 51, 23, 59, 11, 62, 0, 59],
  [46, 21, 51, 64, 23, 59, 33, 37, 11, 37, 61, 55, 23, 59, 0]];
tsp(matrix,15,300000);
