function print(text) {
  console.log(text);
}

function isValid(name) {
  let validity =
    name == null || name.includes(" ") || name.length < 4 ? false : true;
  return validity;
}

function sayHello() {
  let userName = prompt("Введите ваше имя");

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print("Некорректное имя");
  }
}
