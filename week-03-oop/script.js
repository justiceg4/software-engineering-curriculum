class Vehicle{
    // state/properties
    constructor(make,model){
        this.mk = make;
        this.mdl = model;
        this.spd = 0;
    }

    // behavior methods
    accelerate(amount) {
        return this.spd+=amount;
    }
    brake(amount) {
        return this.spd-=amount;
    }
    describe() {
        return `${this.mk} ${this.mdl}: speed of ${this.spd}`;
    }

}

class ElectricVehicle extends Vehicle{
    constructor(make,model){
        super(make,model);
        this.btry = 0;
    }

    charge(amount){
        this.btry += amount;
        return `${this.mk} ${this.mdl}: speed of ${this.spd},
        increased battery charge by ${this.btry}`;
    }

}


const car1 = new Vehicle("Toyota", "Camry");
const car2 = new Vehicle("Honda", "Civic");

car1.accelerate(20);
car1.accelerate(10);
car1.brake(5);

console.log(car1.describe());
// should describe Toyota Camry and speed of 25

console.log(car2.describe());
// should describe Honda Civic and speed of 0

const car3 = new ElectricVehicle("Tesla", "Model 3");

car3.accelerate(15);
car3.brake(5);

console.log(car3.charge(7));


console.log(Object.getPrototypeOf(car1));
console.log(Vehicle.prototype);
console.log(Object.getPrototypeOf(car1) === Vehicle.prototype);