function ucFirst(str) {
  if (str.length == 0) {
    return str;
  } else {
    let newStr = str[0].toUpperCase() + str.slice(1);
    return newStr;
  }
}
