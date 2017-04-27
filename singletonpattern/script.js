// var mySingleton = (function () {
//
//     var instance;
//
//     function init() {
//         var privateRandomNumber = Math.random();
//         return {
//             getRandomNumber: function () {
//                 return privateRandomNumber;
//             }
//         };
//     }
//
//     return {
//         getInstance: function () {
//             if (!instance) {
//                 instance = init();
//             }
//             return instance;
//         }
//     };
// })();
//
// var singleA = mySingleton.getInstance();
// var singleB = mySingleton.getInstance();
//
// console.log(singleA.getRandomNumber());
// console.log(singleB.getRandomNumber());
//
// function Singleton() {
//
//     if (typeof Singleton.instance === 'object') {
//         return Singleton.instance;
//     }
//
//     var randomNumber = Math.random();
//
//     this.testNumber = function () {
//         console.log(randomNumber);
//     };
//     Singleton.instance = this;
// }
//
// var userSingleton = new Singleton();
// var personSingleton = new Singleton();
//
// userSingleton.testNumber();
// personSingleton.testNumber();
//
// function Singleton() {
//
//     if (Singleton.instance !== undefined) {
//         return Singleton.instance;
//     }
//
//     var privateNumber = Math.random();
//
//     Singleton.instance = {
//         getNumber: function () {
//             return privateNumber;
//         }
//     };
//     return Singleton.instance;
// }
//
// s = new Singleton();
// s2 = new Singleton();
//
// console.log(s.getNumber());
// console.log(s2.getNumber());