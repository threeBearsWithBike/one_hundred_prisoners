function getFirstSetup() {
    let data = [];
    for (let i = 0; i < 100; i++) {
        let number = Math.floor(Math.random() * 100 + 1);
        if (data.includes(number)) {
            i -= 1;
            continue;
        } else {
            data.push(number);
        }
    }
    return data;
}

function renderBoxes(data) {
    data.forEach((item,i) => {
        let box = document.createElement('div');
        box.setAttribute('data-number-box', i + 1);
        box.setAttribute('data-number-prisoner', item);
        box.innerText = i + 1;
        box.classList.add('room__box_closed');
        room.append(box);
    })
}

function renderStatistics() {
    counts[0].innerText = arrPrisoners.length;
    counts[1].innerText = arrPrisonersFreedom.length;
    counts[2].innerText = arrBoxesOpen.length;
    counts[3].innerText = currentPrisoner;
}

function renderStaticsGlobal(fail = 0,success = 0) {
    counts[4].innerText = fail;
    counts[5].innerText = success;
}

function getCurrentPrisoner(data) {
    return data.pop();
}

function openBox(box,prisoner) {
    let numberBox = box.getAttribute('data-number-box');
    let numberPrisoner = box.getAttribute('data-number-prisoner');
    if (arrBoxesOpen.length == 0 && numberBox != prisoner || arrBoxesOpen.length != 0 && numberBox != arrBoxesOpen[arrBoxesOpen.length-1]) {
        return;
    } else {
        arrBoxesOpen.push(numberPrisoner);
        box.classList.add('room__box_open');
        box.innerText = numberPrisoner;
    }
    if (arrBoxesOpen.length <= 50 && numberPrisoner == prisoner) {
        nextPrisoner();
    }
    if (arrBoxesOpen.length == 50 && !arrBoxesOpen.includes(prisoner)) {
        renderStaticsGlobal(+counts[4].innerText + 1, +counts[5].innerText);
        gameOver();
    }
    if (arrPrisoners.length == 0 && numberPrisoner == prisoner) {
        renderStaticsGlobal(+counts[4].innerText, +counts[5].innerText + 1);
        gameOver();
    }
    renderStatistics();
    if (modeGame.checked) {
        let currentBox = arrBoxesOpen.length == 0 ? room.querySelector(`[data-number-box = "${currentPrisoner}"]`) :
        room.querySelector(`[data-number-box = "${arrBoxesOpen[arrBoxesOpen.length-1]}"]`);
        setTimeout(() => openBox(currentBox,currentPrisoner), 0);
    }
}

function nextPrisoner() {
    arrPrisonersFreedom.push(currentPrisoner);
    currentPrisoner = getCurrentPrisoner(arrPrisoners);
    document.querySelectorAll('.room__box_open').forEach(box => {
        box.classList.remove('room__box_open');
        box.innerText = box.getAttribute('data-number-box');
        arrBoxesOpen.splice(0,arrBoxesOpen.length);
    })
    renderStatistics();
}

function gameOver() {
    arrNumbersPrisoners = getFirstSetup();
    arrPrisoners = getFirstSetup();
    arrBoxesOpen.splice(0,arrBoxesOpen.length);
    arrPrisonersFreedom.splice(0,arrPrisonersFreedom.length);
    currentPrisoner = getCurrentPrisoner(arrPrisoners);
    [...room.children].forEach(box => box.remove());
    renderBoxes(arrNumbersPrisoners);
    renderStatistics();
}

function setNewStyle(val,val1,val2) {
    document.documentElement.style.setProperty('--color-primary', val);
    document.documentElement.style.setProperty('--color-room', val1);
    document.documentElement.style.setProperty('--color-box', val2);
}

const room = document.querySelector('.room');
const counts = document.querySelectorAll('.statistics__count');
const modeGame = document.querySelector('#mode-game');
let arrNumbersPrisoners = getFirstSetup(); //Распределение номеров по коробкам
let arrPrisoners = getFirstSetup(); //Очередь заключенных
const arrBoxesOpen = []; //Массив открытых коробок
const arrPrisonersFreedom = []; //Массив, нашедших свой номер
let currentPrisoner = getCurrentPrisoner(arrPrisoners); //Первый в очереди

renderBoxes(arrNumbersPrisoners);
renderStatistics();


room.addEventListener('click', (event) => {
    if (event.target.classList.contains('room__box_closed')) {
        openBox(event.target,currentPrisoner);
    }
})

document.addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        let currentBox = arrBoxesOpen.length == 0 ? room.querySelector(`[data-number-box = "${currentPrisoner}"]`) :
        room.querySelector(`[data-number-box = "${arrBoxesOpen[arrBoxesOpen.length-1]}"]`);
        openBox(currentBox,currentPrisoner);
    }
})

window.addEventListener('load', () => {
    if (typeof localStorage.cup == 'undefined') {
        renderStaticsGlobal();
    } else {
        renderStaticsGlobal(localStorage.coffin,localStorage.cup);
    }
})

window.addEventListener('unload', () => {
    localStorage.coffin = counts[4].innerText;
    localStorage.cup = counts[5].innerText;
})

document.querySelector('.statistics__global')
.addEventListener('click', () => {
    localStorage.clear();
    renderStaticsGlobal();
})

modeGame.addEventListener('input', () => {
    if (modeGame.checked) {
        let currentBox = arrBoxesOpen.length == 0 ? room.querySelector(`[data-number-box = "${currentPrisoner}"]`) :
        room.querySelector(`[data-number-box = "${arrBoxesOpen[arrBoxesOpen.length-1]}"]`);
        openBox(currentBox,currentPrisoner);
    }
});

document.querySelector('.menu-colors')
.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu-colors__item_red')) {
        setNewStyle('#FFE4E1','#FFF0F5','#bc8f8f');
    } else if (event.target.classList.contains('menu-colors__item_yellow')) {
        setNewStyle('#f6f374','#f9f8c8','#efef1f');
    } else {
        setNewStyle('#5de46a','#aaf2b1','#1eca2e');
    }
})