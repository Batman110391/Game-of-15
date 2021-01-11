window.onload = function() {
  var box = document.getElementById('box');
 
  document.getElementById('clock').addEventListener('click', reload);

  var matrix = getMatrix();

  function getMatrix() {
    box.innerHTML = "";
    var matrix = initializeMatrix();
    matrix = shuffleCaselle(matrix);
    initializeButtons(document.getElementsByTagName('button'));
    return matrix;
  }
 
  function initializeMatrix(){
    var matrix = [];

    for (let i = 0; i<4; i++){
      matrix[i] = [];
      for (let j = 0; j< 4; j++){
        var value = (j + 1) + (i * 4);
        if(i == 3 && j == 3){
          matrix[i][j] = 0;
          box.innerHTML += '<button class="x3 y3 last"></button>';
        } else {
          matrix[i][j] = value;
          box.innerHTML += '<button class="x'+i+' y'+j+'">'+value+'</button>';
        }
      }
    }
    return matrix;
  }

  function initializeButtons(butt) {
    for (let i = 0; i<butt.length; i++){
      butt[i].addEventListener('click', move);
    }
  }
 
  function shuffleCaselle(matrix){

    for (let i = 0; i<4; i++){
      var x = Math.floor(Math.random() * (4));
      var y = Math.floor(Math.random() * (4));
      for (let j = 0; j < 4; j++){
        if (matrix[x][y] != 0 && matrix [i][j] != 0){
          var tmp = matrix[i][j];
          matrix[i][j] = matrix [x][y];
          matrix[x][y] = tmp;
          var  boxSwap  = document.querySelectorAll(".x"+i +".y"+j);
          var  boxSwap1  = document.querySelectorAll(".x"+x +".y"+y);
          tmp = boxSwap[0].textContent;
          boxSwap[0].textContent = boxSwap1[0].textContent;
          boxSwap1[0].textContent = tmp;
        }
      }
    }
    return matrix;
  }

  function move(event){
    if (elapsedTime == 0) start();

    var x = event.target.classList[0];
    var y = event.target.classList[1];

    if (y === undefined){
      y = x;
    }
    x = x.charAt(1);
    y = y.charAt(1);
    x = parseInt(x);
    y = parseInt(y);

    var tmp = this.textContent;

    var emptyBox = getemptyBox(x, y);

    if (emptyBox != null){
      var emptyBoxX = emptyBox[0];
      var emptyBoxY = emptyBox[1];

      matrix[emptyBoxX][emptyBoxY] = tmp;
      matrix[x][y] = 0;

      this.classList.add("last");

      var  boxSwap  = document.querySelectorAll(".x"+emptyBoxX +".y"+emptyBoxY);

      this.textContent = null;
      boxSwap[0].classList.remove("last");
      boxSwap[0].textContent = tmp;

    }

    check();
  }

  function check(){
    var butt = document.getElementsByTagName('button');
    for (let i = 0; i<butt.length-1; i++){
      if (parseInt(butt[i].textContent) != i+1){
        break;
      }
      if (i == 14){
        alert("you won");
        stop();
      }
    }
  }

  function getemptyBox(x, y) {
    var up, down, right, left;
    // Check up
    if (x != 0) {
      up = matrix[x - 1][y];
    }
    // Check down
    if (x != 3) {
      down = matrix[x + 1][y];
    }
    // Check right
    if (y != 0) {
      left = matrix[x][y - 1];
    }
    // Check left
    if (y != 3) {
      right = matrix[x][y + 1];
    }

    if (right == 0) return [x, y + 1];
    else if (left == 0) return [x, y - 1];
    else if (up == 0) return [x - 1, y];
    else if (down == 0) return [x + 1, y];
    else return null;
  }

  //STOPWATCH

  let startTime;
  let elapsedTime = 0;
  let timerInterval;

  let clock = document.getElementById('watch');

  function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    clock.textContent = formattedMM+":"+formattedSS+":"+formattedMS;
  }

  function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      timeToString(elapsedTime);
    }, 10);
  }

  function stop() {
    clearInterval(timerInterval);
  }


  function reload(){
    clearInterval(timerInterval);
    clock.textContent = "00:00:00";
    cont = 0;
    elapsedTime = 0;
    matrix = getMatrix();
  }
}