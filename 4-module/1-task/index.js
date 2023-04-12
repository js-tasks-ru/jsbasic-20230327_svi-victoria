function makeFriendsList(friends) {
  let list = document.createElement("ul");
  let aMezin = document.createElement("li");
  aMezin.textContent = `${friends[0].firstName} ${friends[0].lastName}`;
  list.appendChild(aMezin);

  let iKantor = document.createElement("li");
  iKantor.textContent = `${friends[1].firstName} ${friends[1].lastName}`;
  list.appendChild(iKantor);

  let cMichael = document.createElement("li");
  cMichael.textContent = `${friends[2].firstName} ${friends[2].lastName}`;
  list.appendChild(cMichael);

  return list;
}
