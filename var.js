// var a = 1;
// function callingvariable(){
//     var b= 2
//     console.log(a+b)
// }
// callingvariable()

// let a = 1
var a = 3
function callingvariable2(){
    let b= 2;
    console.log(a+b)
    return a+b;
}

let sum = a+ callingvariable2()
console.log(sum)
console.log(["1"]==["1"]);

