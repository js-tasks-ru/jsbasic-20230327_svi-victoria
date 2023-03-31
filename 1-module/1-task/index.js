function factorial(n) {
  let interval = 1;
  for (let i = 1; i <= n; i++) {
    interval *= i;
  }
  return interval;
}
