"use strict"


// NOTES:  Everything on 'this' keyword:
// 1) Default binding, example: foo()
// 2) Method on an Object, example: bar.foo()
// 3) call/bind/apply, example: foo.call(thisObj, p1, p2...);
// 4) new binding, example: new Foo();
// 'This' represents the current object/'calling object'


// Other examples of .call() and .apply()

foo(x,y); 
// the above is the SAME as:
foo.call(window, x, y);
// the above is the same as:
foo.apply(window, [x, y]);

bar.foo(x, y);
// the above is the SAME as:
foo.call(bar, x, y);
// this above is the same as:
foo.apply(bar, [x, y]);
// this is the same representation:
thisObj.foo(x,y,z) === foo.call(thisObj, x,y,z);
// this is the same representation:
foo.call(context, x, y, z) === foo.apply(context, [x, y, z]);



// Using object literal, this and .bind() method:
let dog = {
    sound: 'woof',
    talk: function(){
        // 'this' is determined by how it's invoked.
        console.log(this.sound);
    }
}
dog.talk(); //because you are invoking .talk() on dog object,
// then 'this' is the dog.



// After reassigning dog.talk() to a variable, 'this' no longer
// refers to dog object - unless using .bind() method.
let talkFunction = dog.talk;
// .bind() forces talkFunction to be bound to dog object.
let boundFunction = talkFunction.bind(dog);
// When invoking boundFunction, it should output 'woof'.
boundFunction();



let cat = {
    sound: 'meooow!',
    talk: function(){
  // 'this' is determined by how it's invoked.
        console.log(this.sound);
    }
}
cat.talk();//because you are invoking .talk() on cat object,
// then 'this' is the cat.


let button = document.getElementById('myButton');
// In this instance, when addEventListener is listening
// for 'click', the 'this.sound' is now referring to the 
// Window. It's not referring to 'cat'.

button.addEventListener('click', cat.talk.bind(cat));



// Use 'this' keyword
let talk = function(){
    console.log(this.sound);
}
let pigsCanFly = {
    // the talk function is being assigned a 'sound' property
    speak: talk,
    sound: "Yipppeee! Pigs can Fly!"
}
// calling a property on pigsCanFly object
pigsCanFly.speak();
// 'talk' is referring to global window in this instance
talk();




// Use 'this' keyword
let talk = function(){
    console.log(this.sound);
}
let boromir = {
    sound: "One does not simply walk into  mordor!"
}
// .bind() creates new copy of talk, but 'this'
// will now always refer to boromir
boromir.speak = talk.bind(boromir);
let blabber = boromir.speak;
// 'blabber' is assigned to boromir
blabber();
// 'talk' is undefined and just refers to vanilla object which
// has not been bound to anything.
talk();




let talk = function(){
    console.log(this.sound);
}
let catsRuleTheWorld = {
    blabber: talk,
    sound: 'Hahahaha! You punny humans are no match for me!'
}
let dogsOfWar = {
    // referring back to talk function. it's the same as replacing talk.
    jabber: catsRuleTheWorld.blabber,
    sound: 'Wooofff! Those cats need to be stopped befor they dominate the world!'
}
dogsOfWar.jabber();
catsRuleTheWorld.blabber();
// use .bind() on dogsOfWar so that it references catsRuleTheWorld:
const rebound = dogsOfWar.jabber.bind(catsRuleTheWorld);
rebound();


function talk(sound){
    console.log(sound);
}
talk('Hello there!');


// Example using .call() method:
// printName function takes two parameters
function printName(first, last){
    console.log(`${first} ${last}`);
    console.log(this);
}
// the .call() method is a method on the printNamefunction and
// the .call() method will change the 'this' keyword
printName.call({
    model: 'Samsung Galaxy',
    color: 'black'
}, 'Dominic', 'Smith' );



// Example using sum function, passing two parameters and .apply() method:
function sum(a, b){
// 'this' can be refered as the CONTEXT
    console.log(this);
    return a + b;
}
// .apply() method on the sum function, that passes an Array to the function:
const result = sum.apply({
    animal: 'zebra',
    color: 'black and white stripes'
},[5, 10]);

console.log(result);



// Example using total function with zero parameters & using .apply() method:
function total(){
    console.log(this);
// set variable counter to 0.
    let counter = 0;
// arguments is a keyword and returns 'array-like' elements:
    for(let i = 0; i < arguments.length; i++){
        // looping thru array of objects and incrementing
        // by 1; next, adding each element in array to counter:
        counter += arguments[i];
    }
    return counter;
}
// .apply() method on the total function, that passes an Object & Array
const result = total.apply({
    name: 'Rena',
    isFemale: true
}, [15, 20, 1]);

console.log(result);


// the spread operator is better version than using arguments keyword.
function logAll(...args) {for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
}}

logAll('Rena', 22, false, 'Adam');




// Example using Object.assign() method: To combine or merge two JS objects together
// into a new object.
const course = {
    name: 'Web Programming',
    score: 80
};
const grade = {
    score: 92
};
// the last object is the value if there are multiple properties of same name?
// Can add multiple objects to create a combined or merged object.
const finalResult = Object.assign(course, grade, {
    teacher: 'Mrs. Waterhouse'
});
console.log(finalResult);



var string1 = '';
var object1 = {a: 1, b: 2, c:3}
// looping through every enumberable property in object:
for (var property1 in objhect1){
    // get the value in object 1 and add to string1.
    string1 = string1 + object1[property1];
}
console.log(string1);



// Another example of Object.assign() method:
function printName(options){
// create defaults object with properties; these will run
// if there is NOT another object that will over-ride
// first object with same values.
    const defaults = {
        firstName: 'Rena',
        lastName: 'Tan'
    };
// Using Object.assing(), passing two parameters
// if there is a property inside options, then it will over-ride
// the same value in defaults:
    options = Object.assign(defaults, options);

    console.log(`${options.firstName} ${lastName}`);
}
// invoking printName function and passing firstName object
// as the 'options' parameter
printName({
    firstName: 'Jason'
});


// Examples of Object.create() method: it creates a new object
// with prototype set to a certain object.

// created an object literal with a function
const cat = {
    makeSound: function(){
// 'this' refers to cat and is set to 'sound'
        console.log(this.sound);
    }
};
// Using Object.create() and passing 'cat' object literal
// as a parameter and creates a new object.
const princess = Object.create(cat)
// assign the 'sound'
    princess.sound = 'Mmmeeeooooowww!'
// refers to the 'makeSound' function
    princess.makeSound();

const waffles = Object.create(cat)
// assign the 'sound'
waffles.sound = 'Meoouuuuufffff'
// refers to the 'makeSound' function
waffles.makeSound();

console.log('Is princess a cat?', cat.isPrototypeOf(princess));




