const func = ( () => {
    function x() {
        console.log('this is me b');
    }

    let y = 21

    // the object returned doesn't have access to the variables defined in the outer scope

    return {
        c:  7,
        // concise method declaration does not need function keyword
        a() {
            return console.log('this is me a');
        },

        // but the methods in the returned object have access to the variables defined in the enclosing function
        b() {
            return y
        },

        d() {
            // you have the this variable available to you inside the returned object
            return this.b();
        },

        e() {
            return y += 1
        }
    }
})();

module.exports = func;