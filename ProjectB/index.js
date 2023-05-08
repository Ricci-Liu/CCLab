//document.getElementById("id");
//document.getElementsByTag("tagName");
//let elt = document.getElementsByClassName("scene1")[0];
//console.log(elt);
//elt.style.position = "absolute";
//elt.style.left = "500px";
//elt.style.backgroundColor = "red"
// background-color
let scrollOne = document.getElementById("top");
let scrollTwo = document.getElementsByClassName("scene2")[0];
let scrollFour = document.getElementsByClassName("scene4")[0];
let scrollFive = document.getElementsByClassName("scene5")[0];
let scrollSix = document.getElementsByClassName("scene6")[0];
let scrollEight = document.getElementsByClassName("scene8")[0];
let scrollNine = document.getElementById('quote');

let able2 = true;
let able4 = true;
let able5 = true;
let able6 = true;
let able8 = true;
let able9 = true;

let mybutton = document.getElementById('restartBtn');
let isScrolledToPosition = false;



function draw() {
    window.addEventListener('scroll', function () {
        let scrollPosition = window.scrollY;
        if (scrollPosition >= 500) {
            isScrolledToPosition = true;
        }
    });
    storeItem('1start', isScrolledToPosition);
    print(isScrolledToPosition);

    let start2 = getItem("2start");
    let start4 = getItem("4start");
    let start5 = getItem("5start");
    let start6 = getItem("6start");
    let start8 = getItem("8start");
    let start9 = getItem("9start");

    if (start2 == true) {
        scroll2();
        able2 = false;
    }
    if (start4 == true) {
        scroll4();
        able4 = false;
    }
    if (start5 == true) {
        scroll5();
        able5 = false;
    }
    if (start6 == true) {
        scroll6();
        able6 = false;
    }
    if (start8 == true) {
        scroll8();
        able8 = false;
    }
    if (start9 == true) {
        scroll9();
        able9 = false;
    }
    // let scene3 = document.getElementsByClassName("scene3")[0];
    // console.log(scene3.scrollHeight);

    //print(); // print the page using a printer
    //print(value); // console.log the value
}
function highlight(e) {
    //console.log("over");
    //let elt = document.getElementsByClassName("scene1")[0];
    //elt.style.opacity = "0.7";
}






function scroll2() {
    if (able2 == true) {
        scrollTwo.scrollIntoView({
            behavior: "smooth", block: "center", inline: "center"
        });
    }

}
function scroll4() {
    // scrollIntoView(alignToTop);
    if (able4 == true) {
        scrollFour.scrollIntoView({
            behavior: "smooth", block: "center", inline: "center"
        });
    }
}

function scroll5() {
    if (able5 == true) {
        scrollFive.scrollIntoView({
            behavior: "smooth", block: "center", inline: "center"
        });
    }
}
function scroll6() {
    if (able6 == true) {
        scrollSix.scrollIntoView({
            behavior: "smooth", block: "center", inline: "center"
        });
    }
}
function scroll8() {
    if (able8 == true) {
        scrollEight.scrollIntoView({
            behavior: "smooth", block: "center", inline: "center"
        });
    }
}
function scroll9() {
    if (able9 == true) {
        scrollNine.scrollIntoView({
            behavior: "smooth", block: "center", inline: "center"
        });
    }
}


