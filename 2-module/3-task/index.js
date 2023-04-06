let calculator = {
  read: function (a, b) {
    let first = a;
    let second = b;
    this.first = first;
    this.second = second;
  },
  sum: function () {
    return this.first + this.second;
  },
  mul: function () {
    return this.first * this.second;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
