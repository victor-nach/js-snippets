const func = require('./func');

// first time it is called, the state of the private variable is updated
console.log(func.e());

// and for subsequent calls, it still remembers this state which was updated earlier
console.log(func.e());

console.log(func.e());
