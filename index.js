window.addEventListener("DOMContentLoaded", () => {
  let field = document.querySelector("#field");
  let startButton = document.querySelector("#start-game");
  let timerOutput = document.querySelector("#timer");
  let size = 2;
  let timerCounter = 0;
  let timerInterval = null;
  
  function start(size) {
    activate(build(field, prepare(size)), size);
  }

  function build(field, arr) {
    field.textContent = '';
    let rows = arr.length;
    let cells = [];
    for(let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for(let j = 0; j < arr[0].length; j++) {
            let td = document.createElement('td');
            td.textContent = arr[i][j];
            cells.push(td);
            tr.appendChild(td);
        }
        field.appendChild(tr);
    }

    return cells;
  }

  function prepare(size) {
    let arr = [];

    arr = range(size * size);
    arr = shuffle(arr);
    arr = chunk(arr, size);

    return arr;
  }

  function range(count) {
    let arr = [];

    for (let i = 1; i <= count; i++) {
      arr.push(i);
    }

    return arr;
  }

  //Тасование Фишера-Йетса
  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  function chunk(arr, n) {
    let result = [];

    for(let i = 0; i < arr.length; i += n) {
        result.push(arr.slice(i, i + n));
    }

    return result;
  }

  function activate(cells, size) {
    let counter = 1;
    let last = size * size;

    for(let cell of cells) {
        cell.addEventListener('click', (e) => {
            let target = e.target;
            if(counter == last) {
                showLevelResult(timerOutput, timerInterval);
                setTimeout(() => {
                    timerOutput.parentNode.style.display = 'none';
                }, 800)
                timerCounter = 0;
                start(++size);
            }
            if(target.textContent == counter) {
                target.classList.add('active');
                counter++;
            } else {
                return;
            }
        })
    }
  }


  function startTimer() {
    timerInterval = setInterval(() => timerCounter++, 1000);
  }

  function showLevelResult(output) {
    output.textContent = timerCounter;
    output.parentNode.style.display = 'block';
  }

  startButton.addEventListener('click', function startgame() {
    start(size);
    startTimer();
    startButton.removeEventListener('click', startgame);
  })
});