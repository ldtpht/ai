var MATRIX = [
  [1 ,2 ,3],
  [4 ,5 ,6],
  [7 ,8 ,0]
];

var M = [
  [0, 1, 2],
  [5, 6, 3],
  [4, 7, 8]
];

function convert(matrix){
  var l = matrix.length;
  var temp = [];
  for (var i = 0; i < l; i++){
    for (var j = 0; j < l; j++){
      temp.push(matrix[i][j]);
    }
  }
  return temp;
}

function getinversions(matrix){
  var temp = convert(matrix);
  var l = temp.length;
  var count = 0;
  for (var i = 0; i < l - 1; i++){
    for (var j = i + 1; j < l; j++){
      if (temp[j] < temp[i])
        count++;
    }
  }
  return count;
}

function isSoluble(matrix){
  return !(Boolean(getinversions(matrix)%2));
}

function find(matrix){
  var l = matrix.length;
  for (var i = 0;i<3;i++){
    for (var j = 0; j < 3; j++){
      if (!matrix[i][j])
        return [i,j];
    }
  }
  return -1;
}

function clone(base) {
  var newArray = [];
  for(var i = 0; i < base.length; i++) {
  if(base[i] instanceof Array)
      newArray[i] = clone(base[i]);
    else
      newArray[i] = base[i];
  }
  return newArray;
}

function move(direction,m){
  var matrix = clone(m);
  var cusor = find(matrix);
  if (cusor!=-1){
    var l = matrix.length;
    var row = cusor[0];
    var col = cusor[1];
    var _row = row;
    var _col = col;
    var temp = matrix[row][col];
    switch (direction){
      // up
      case 0:
        if (row !== 0)
          _row = row - 1;
        break;
      // down
      case 1:
        if (row !== l - 1)
          _row = row + 1;
        break;
      // left
      case 2:
        if (col !== 0)
          _col = col - 1;
        break;
      // right
      case 3:
        if (col !== l - 1)
          _col = col + 1;
        break;
    }
    matrix[row][col] = matrix[_row][_col];
    matrix[_row][_col] = temp;
  }
  return matrix;
}

function check(a,b){
  var l = a.length;
  for (var i = 0;i<l;i++){
    for (var j = 0;j<l;j++){
      if (a[i][j]!==b[i][j])
        return false;
    }
  }
  return true;
}

function isExist(matrix,list){
  var l = list.length;
  for (var i = 0; i < l; i++){
    if (check(matrix,list[i].matrix))
      return true;
  }
  return false;
}

function getList(matrix){
  if (!isSoluble(matrix))
    return false;
  if (check(matrix,MATRIX))
    return true;
  var obj = {
    "matrix": matrix,
    "father": -1,
    "pStep": -1,
  };
  var list = [];
  list.push(obj);
  for (var i = 0; i < list.length; i++){
    for (var j = 0; j < 4; j++){
      var temp;
      if (list[i].pStep !== j){
        temp = move(j, list[i].matrix);
        if (!isExist(temp,list)){
          var pStep = -1;
          switch (j){
            case 0:
            case 2:
              pStep = j + 1;
              break;
            case 1:
            case 3:
              pStep = j - 1;
              break;
          }
          obj = {
            "matrix": temp,
            "father": i,
            "pStep": pStep,
          };
          list.push(obj);
          if (check(temp,MATRIX))
            return list;
        }
      }
    }
  }
  return false;
}

function printSingle(matrix){
  var l = matrix.length;
  var str = "";
  str += "=====\n";
  for (var i = 0; i < l; i++){
    for (var j = 0; j < l; j++){
      str += (matrix[i][j] + " ");
    }
    str += "\n";
  }
  str += "=====\n";
  console.log(str);
}

function printList(list,index){
  if (list[index].father != -1)
    printList(list,list[index].father);
  printSingle(list[index].matrix);
}

function tacanh(matrix){
  var list = getList(matrix);
  if (list === false)
    console.log("Bai toan roi vao truong hop khong the giai duoc");
  else if (list === true)
    console.log("Khong can di them buoc nao nua");
  else {
    console.log("Cac buoc thuc hien");
    printList(list,list.length - 1);
  }
  return;
}
