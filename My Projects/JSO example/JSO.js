class Vehicle {
    constructor (make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return "Beep!!!"
    }
    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year){
        super(make, model, year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, modle,year) {
        super(make, model, year);
            this.numWheels = 2;
         }
    revEngine() {
            return "Vroom!!!!";
        }
}

class Garage {
    constructor(capacity) {
        this.vehicle = [];
        this.capacity = capacity;
    }

    add(newVehicle) {
        if(!(newVehicle instanceof Vehicle)) {
            return "Only vehicles are allowed here!";
        }
        if(this.Vehicle.length >= this.capacity) {
            return "Sorry, we're full!";
        }
        this.Vehicle.push(newVehicle);
        return "Vehicle added!";
    }
}