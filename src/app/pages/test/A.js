export default class A {

  constructor() {
    this.t = 999;
  }

  @bar(321)
  foo() {
    console.log('----');
    console.log(this, this.t);
  }

}

function bar(num) {
  console.log('====', num);
  return (target, name, descriptor) => {
    console.log(1);
    const oldValue = descriptor.value;
    descriptor.value = (...rest) => {
      console.log(10000, target, target.t);
      return oldValue.apply(target, rest);
    };
    return descriptor;
  };
}

// function bar(target, name, descriptor) {
//   console.log('====');
//   console.log(target, name, descriptor);
//   const oldValue = descriptor.value;
//   descriptor.value = (...rest) => {
//     console.log(10000, target, rest);
//     return oldValue.apply(target, rest);
//   };
//   return descriptor;
// }
