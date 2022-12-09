import "./styles.css";

//creational pattenrns

// class patternt
class Car {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }
}

// constructor pattern
class OverRoad extends Car {
  constructor(model, color) {
    super(model, color);
    this.weels = 4;
  }
}

//singlton
let instance = null;
class Transport {
  constructor(model, color) {
    if (!instance) {
      this.model = model;
      this.color = color;
      instance = this;
    } else {
      return instance;
    }
  }
}

//factory, mechansm of creating instances
class CarFactory {
  createCar(type) {
    switch (type) {
      case "mazda": {
        return new Car("mazda", "silver");
      }
      case "mitsubishi": {
        return new Car("mitsubishi", "blue");
      }
      default: {
        break;
      }
    }
  }
}

//Abstract factory is just one more layer of abstraction above

////Structural patterns
//Module patern - is a usual pattern with import/export logic with separated files

//Mixin pattern - add additional logic
const printLogs = {
  printCar() {
    console.log(`${this.model} has ${this.weels} weels`);
  }
};
Object.assign(Car.prototype, printLogs);

//facade - good example is areact components. Hide complexity of module and use it just in one line of code
//flyweight - avoid reacriation of instance. Same as singlton creational pattern
//decorator - 2nd stage in js. Do the same as mixins. Used in typescript
//MVC - model-view-controller. view has access to both
//MVP - model-view-presenter. View doesn't has access to model. Views asscs data to presenter. presenter ascks to model and provide it.
//MVVM(MVVC) - model-view-view-model. React, Angular. we have two views. One view is stateless. Other view is statefull(model)

//// Behavior
// Observer
// State
// Iterator
// Strategy. Example is a factory
// command pattern. Redux is a good example

const arr = new Array(10);
console.log(arr);

const cars = new CarFactory();
const mazda = cars.createCar("mazda");
const mitsubishi = cars.createCar("mitsubishi");

mazda.printCar();

console.log(mazda, mitsubishi);

const ford = new OverRoad("ford f150", "green");
const honda = new Car("civic", "red");

document.getElementById("app").innerHTML = `
<h1>${honda.model} is ${honda.color}</h1>
<h1>${ford.model} is ${ford.color} has ${ford.weels}</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
