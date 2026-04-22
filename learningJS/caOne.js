let age = 7

// String concatenation in JavaScript.
console.log("Tommy is " + age + " years old");
// String interpolation: String literal with one or more placeholders (e.g. "{age}")
console.log('Tommy is ${age} years old.');

/*
Multiple
Line
Comment
*/

const currency = "$"
let userIncome = 800;

console.log(currency + userIncome + " is more than the average income.");


function Student(name) {
  this.name = name;
}

const sam = new Student("Sam");
const amy = new Student("Amy");

console.log(sam + amy);
