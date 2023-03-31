function truncate(str, maxlength) {
  let newString =
    str.length <= maxlength ? str : str.slice(0, maxlength - 1) + "…";
  return newString;
}
