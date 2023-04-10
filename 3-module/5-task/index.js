function getMinMax(str) {
  let newarr = str.split(" ").filter((item) => isFinite(item));
  let outcome = {
    min: Math.min(...newarr),
    max: Math.max(...newarr),
  };
  return outcome;
}
