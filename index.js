let listEl = document.querySelector('.pagination');
let targetEl; 
let spiner = document.querySelector('.preloader-wrapper');
let leftArrow = document.querySelector('.arrowL');
let rightArrow = document.querySelector('.arrowR');


async function readImage() {
    let page = localStorage.getItem('value');
    let bodyEl = document.querySelector(".row");
    bodyEl.innerHTML = '';
    spiner.style.display = 'flex'
    try { 
        bodyEl.style.display = 'none';
        let img = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
        let images = await img.json();
        for (let image of images) {
            let cardImg = `<img class="col xl3 l4 m6 s12 materialboxed" src="${image.download_url}">`;
            bodyEl.insertAdjacentHTML('beforeend', cardImg);
        }
        M.AutoInit();
    }
    catch {
        alert("So sorry, it's error...")
    }
    finally {
        setTimeout(() => { spiner.style.display = 'none'; bodyEl.style.display = 'block'; }, 2500);
    }
}

function startSession() {
    let currentPage = +localStorage.getItem('value');
    
    if (!currentPage) {
        currentPage = 1;

        localStorage.setItem('value', currentPage);
    }

    if (currentPage == 1) {
        listEl.firstElementChild.classList.add('disabled');
    }
    else if (currentPage == 5) {
        listEl.lastElementChild.classList.add('disabled');
    }

    targetEl = listEl.children[currentPage];
    targetEl.classList.add('active');
    
    readImage();
}

function pagination(event) {
    const leftChevron = event.target.closest('.arrowL');
    const rightChevron = event.target.closest('.arrowR');
    const currentPage = +localStorage.getItem('value');
    
    let newPage = null;

    if (leftChevron && currentPage > 1) {
        newPage = currentPage - 1;
    }
    else if (rightChevron && currentPage < 5) {
        newPage = currentPage + 1;
    }
    else if (!leftChevron && !rightChevron && event.target.tagName == 'A') {
        newPage = +event.target.textContent;
    }

    if (!newPage || newPage == currentPage) return;

    listEl.firstElementChild.classList.remove('disabled');
    listEl.lastElementChild.classList.remove('disabled');

    listEl.firstElementChild.classList.add('waves-effect');
    listEl.lastElementChild.classList.add('waves-effect');

    listEl.children[currentPage].classList.remove('active');
    listEl.children[newPage].classList.add('active');


    if (newPage == 1) {
        listEl.firstElementChild.classList.add('disabled');
        listEl.firstElementChild.classList.remove('waves-effect');
    }
    else if (newPage == 5) {
        listEl.lastElementChild.classList.add('disabled');
        listEl.lastElementChild.classList.remove('waves-effect');
    }

    localStorage.setItem('value', newPage);

    readImage();
}

listEl.addEventListener('click', pagination);
startSession();