function camelize(str) {
  let newstr = str
    .split("-")
    .map((item, index, arr) =>
      arr.indexOf(item) == 0 ? item : item[0].toUpperCase() + item.slice(1)
    )
    .join("");
  return newstr;
}
