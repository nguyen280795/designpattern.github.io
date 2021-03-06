function Car(option) {
    // some defaults
    this.doors = option.doors || 4;
    this.state = option.state || "brand new";
    this.color = option.color || "silver";
}

// A constructor for defining new trucks
function Truck(option) {
    this.state = option.state || "used";
    this.wheelSize = option.wheelSize || "large";
    this.color = option.color || "blue";
}

// FactoryExample.js
function VehicleFactory() {

}

// Define the prototypes and utilities for this factory
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function (option) {
    switch (option.vehicleType) {
        case "car":
            this.vehicleClass = Car;
            break;
        case "truck":
            this.vehicleClass = Truck;
            break;
        //defaults to VehicleFactory.prototype.vehicleClass (Car)
    }
    return new this.vehicleClass(option);
};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});

// Test to confirm our car was created using the vehicleClass/prototype Car
// Outputs: true
console.log(car instanceof Car);

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car);

var movingTruck = carFactory.createVehicle({
    vehicleType: "truck",
    state: "like new",
    color: "red",
    wheelSize: "small"
});

// Test to confirm our truck was created with the vehicleClass/prototype Truck

// Outputs: true
console.log(movingTruck instanceof Truck);

// Outputs: Truck object of color "red", a "like new" state
// and a "small" wheelSize
console.log(movingTruck);

function TruckFactory() {

}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
    state: "omg..so bad.",
    color: "pink",
    wheelSize: "so big"
});

// Confirms that myBigTruck was created with the prototype Truck
// Outputs: true
console.log(myBigTruck instanceof Truck);

// Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
console.log(myBigTruck);

var abstractVehicleFactory = (function () {
    var types = [];
    return {
        getVehicle: function (type, customizations) {
            var Vehicle = types[type];

            return (Vehicle ? new Vehicle(customizations) : null);
        },
        registerVehicle: function (type, Vehicle) {
            var proto = Vehicle.prototype;

            if (proto.drive && proto.breakDown) {

            }
            return abstractVehicleFactory;
        }
    };
})();

abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

// Instantiate a new car based on the abstract vehicle type
car = abstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new"
});

// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow"
});