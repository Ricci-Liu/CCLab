//document.getElementById("id");
//document.getElementsByTag("tagName");
//let elt = document.getElementsByClassName("scene1")[0];
//console.log(elt);
//elt.style.position = "absolute";
//elt.style.left = "500px";
//elt.style.backgroundColor = "red"
// background-color

let able2 = true;
let able4 = true;
let able5 = true;

function setup() {
    // 
}

function draw() {
    let start2 = getItem("2start");
    let start4 = getItem("4start");
    let start5 = getItem("5start");
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
}
function highlight(e) {
    //console.log("over");
    //let elt = document.getElementsByClassName("scene1")[0];
    //elt.style.opacity = "0.7";
}


function scroll2() {
    // scrollIntoView(alignToTop);
    if (able2 == true) {
        window.scrollTo({
            top: 1050,
            left: 0,
            behavior: "smooth"
        })
    }
}
function scroll4() {
    // scrollIntoView(alignToTop);
    if (able4 == true) {
        window.scrollTo({
            top: 1600,
            left: 0,
            behavior: "smooth"
        })
    }
}

function scroll5() {
    // scrollIntoView(alignToTop);
    if (able5 == true) {
        window.scrollTo({
            top: 2300,
            left: 0,
            behavior: "smooth"
        })
    }
}