function sumSalary(salaries) {
  summ = 0;
  for (let key in salaries) {
    let i = salaries[key];
    if (Number.isFinite(i)) {
      summ = summ + salaries[key];
    }
  }
  return summ;
}
