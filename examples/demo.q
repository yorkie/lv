
function ReadFile(path) {
  /* [Native Code] */
}

function ReadDir() {
  /* [Native Code] */
}

function AsyncFunc() {
  
  // series
  var txt1 = *ReadFile('1.txt');
  var txt2 = *ReadFile('2.txt');

  // parallel
  var ptxt3 = &ReadFile('3.txt');
  var ptxt4 = &ReadFile('4.txt');
  var txt34 = *[ptxt3, ptxt4];

  // more flexible
  var ptxt5 = &ReadFile('5.txt');
  var txt6 = *ReadFile('6.txt');
  var ptxt7 = &ReadFile('7.txt');
  var txt57 = *[ptxt5, ptxt7];

  // fp style
  var fpval = &(function() {
    return *ReadFile('10');
  })();

  return *fpval;
}

function NormalFunc() {
  
  var a = 10;
  var b = 12; 

  var tmp = *ReadDir;  // equal to `ReadDir()`, returns undefined
  var dir = *(&ReadDir()); // get directory data;

  return *(function() {
    return 20;
  })
}