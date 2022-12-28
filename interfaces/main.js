class VehicleInterface {
  drive() {}
}

class Tourist {
  // Uses Vehicle Interface
  travel(vehicleInterface) {
    console.log("Gotta Travel");
    vehicleInterface.drive();
    console.log("Done Traveling Bye!");
  }
}

class Car {
  // Implements Vehicle Interface
  drive() {
    console.log("Driving Car ...");
  }
}

class Horse {
  moves() {
    console.log("Horse is moving");
  }
}

class HorseToVehicleAdapter {
  constructor(horse) {
    this.horse = horse;
  }

  drive() {
    this.horse.moves();
  }
}

const car = new Car();
const tourist = new Tourist();

tourist.travel(car);

const horse = new Horse();
const horseAdapter = new HorseToVehicleAdapter(horse);

tourist.travel(horseAdapter);
