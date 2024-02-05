//same keys and values
const instructor = (firstName, lastName) => {
    return {
        firstName,
        lastName
    }
}

//computed property names
let favNum = 72;
const instructor = {
    firstName : 'King',
    [favNum] : "That's my fav number!"
}

//object methods
const instructor = {
    firstName : 'King',
    Hello(){
        return "Hi!";
    },
    Bye(){
        return this.firstName + " says bye!!!"
    }
}

//create animal
const animal = (species, verb, noise) => {
    return {
        species,
        [verb](){
            return noise;
        }
    }
}