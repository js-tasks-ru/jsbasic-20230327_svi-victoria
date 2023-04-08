function showSalary(users, age) {
  let reducer = function (acc, item) {
    acc.push(item.name + ", " + item.balance);
    return acc;
  };
  let filtrated = users
    .filter((item) => item.age <= age)
    .reduce(reducer, [])
    .join("\n");
  return filtrated;
}
