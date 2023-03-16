const tabs = document.getElementById("tabs"); //navigation tabs
const slide = document.querySelector(".mySlide"); //slide
const respSlide = document.querySelector(".mySlide"); //responsive slide
let slideRightEdge = false;
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");

//tabs names for navigation
const tabsContent = [
    { tabName: 'თავფურცელი', sectionName: 'slider' },
    { tabName: 'შესავალი', sectionName: 'introduction' },
    { tabName: 'სამი ფიგურა', sectionName: 'three' },
    { tabName: 'გაგრძელება', sectionName: 'continue' },
    { tabName: 'ეკოლოგია', sectionName: 'ecology' },
    { tabName: 'პატარა არსებები', sectionName: 'little' },
    { tabName: 'ვარსკვლავები', sectionName: 'stars' },
    { tabName: 'სიყვარული', sectionName: 'love' },
    { tabName: 'გალარეა', sectionName: 'galery' },
    { tabName: 'პროექტის შესახებ', sectionName: 'about' }
];

//adding all tabs in navigation
tabsContent.forEach(tab => {
    let li = document.createElement('li');

    li.classList.add(tab.sectionName);
    li.setAttribute('onclick', `showSec('${tab.sectionName}')`);
    li.innerHTML = tab.tabName;

    if (tab.sectionName == 'slider') {
        li.classList.add('active');
    }

    tabs.appendChild(li)
});

//function to hide and show sections
function showSec(section) {
    //auto close nav bar if its responsive
    closeNav();

    //change active tab
    document.querySelector('.active').classList.remove('active');
    document.querySelector(`.${section}`).classList.add('active');

    //show section
    let fromSec = document.querySelector('.show'); //sections that is shown
    fromSec.classList.remove('show');

    let toSec = document.querySelector(`.${section}_Sec`); //sections that should be shown
    toSec.classList.add('show');
}

// switch between slides
let slideIndex = 55;
showSlides(slideIndex);

function plusSlides(n) {
    slideIndex += n * 55;
    showSlides();
}

function showSlides() {
    if (slideIndex <= 0) {
        slideIndex = 0;
        arrowLeft.classList.add("hide");
    } else if (slideIndex > 100) {
        slideIndex = 100;
        arrowRight.classList.add("hide");
    } else {
        arrowLeft.classList.remove("hide");
        arrowRight.classList.remove("hide");
    }

    slide.style.left = `${slideIndex}%`;
    slide.style.transform = `translateX(-${slideIndex}%)`;
}

//show and hide navigation bar on responsive
function openNav() {
    tabs.classList.add('openedNav')
}

function closeNav() {
    tabs.classList.remove('openedNav')
}

//responsive flows
let touchstartX = 0
let touchendX = 0

//change tabs on left/right slide
function nex_prev(current, n) {
    for (let i = 0; i < tabsContent.length; i++) {
        if (tabsContent[i].tabName == current) {
            showSec(tabsContent[i + n].sectionName);
        }
    };
}

function checkDirection() {
    const current = document.querySelector('.active').innerHTML;

    if (touchendX - touchstartX < -80) {
        if (current == "პროექტის შესახებ" || (current == "თავფურცელი" && !slideRightEdge)) { //right edge
            return;
        }
        nex_prev(current, 1); //next tab
    }

    if (touchendX - touchstartX > 80) { //left edge
        if (current == "თავფურცელი") {
            return;
        }
        nex_prev(current, -1); //prev tab
    }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
});

respSlide.addEventListener("scroll", () => {
    if (respSlide.scrollLeft >= 2237 - window.innerWidth) {
        slideRightEdge = true;
    } else {
        slideRightEdge = false;
    }
}, { passive: true });