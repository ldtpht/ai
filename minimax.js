var M = [
  [0,0,0],
  [0,1,0],
  [0,0,0]
];

function tick(n,row,col,m){
  if (m[row][col] === 0)
    m[row][col] = n;
  return m;
}

function countHor(row,col,m){
  var l = m.length;
  var c = m[row][col];
  for (var i = 1; i < 5 && col - i >= 0 && m[row][col - i] !== -m[row][col];i++){
    c += m[row][col - i];
  }
  for (i = 1; i < 5 && col + i < l && m[row][col + i] !== -m[row][col]; i++){
    c += m[row][col + i];
  }
  return c;
}

function countVer(row, col, m){
  var l = m.length;
  var c = m[row][col];
  for (var i = 1; i < 5 && row - i >= 0 && m[row - i][col] !== -m[row][col]; i++){
    c += m[row - i][col];
  }
  for (i = 1; i < 5 && row + i < l && m[row][col + i] !== -m[row][col]; i++){
    c += m[row + i][col];
  }
  return c;
}

function countCro(row, col, m){
  var l = m.length;
  var c = m[row][col];
  for (var i = 1; i < 5 && row - i >= 0 && col - i >= 0 && m[row - i][col] !== -m[row][col]; i++){
    c += m[row - i][col - i];
  }
  for (i = 1; i < 5 && row + i < l && col + i < l && m[row + i][col + i] !== -m[row][col]; i++){
    c += m[row + i][col + i];
  }
  return c;
}

function countCroRe(row, col, m){
  var l = m.length;
  var c = m[row][col];
  for (var i = 1; i < 5 && row + i >= 0 && col - i >= 0 && m[row - i][col] !== -m[row][col]; i++){
    c += m[row + i][col - i];
  }
  for (i = 1; i < 5 && row - i < l && col + i < l && m[row -i][col + i] !== -m[row][col]; i++){
    c += m[row - i][col + i];
  }
  return c;
}

function count(dir,row,col,m){
  var l = m.length;
  var c = m[row][col];
  var _col = 0;
  var _row = 0;
  switch (dir){
    case 'h':

      break;
    case 'v':
      break;
    case 'c':
      break;
    case '-c':
      break;
  }
}
