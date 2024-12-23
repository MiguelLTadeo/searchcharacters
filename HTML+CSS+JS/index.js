async function getcharacter(button) {
  let name = document.getElementById("charactername").value;
  if (button === 1) {
    name = "";
  }

  fetch(`https://eldenring.fanapis.com/api/bosses?limit=106&name=${name}`)
    .then((data) => data.json())
    .then((body) => {
      const characterlist = document.getElementById("Characterslist");
      const speccharacter = document.createElement("speccharacter");
      speccharacter.classList.add("speccharacter");
      const allcharacter = document.createElement("allcharacter");
      allcharacter.classList.add("allcharacter");
      if (button === 0) {
        characterlist.innerHTML = "";
        speccharacter.innerHTML = body.data
          .filter((i) => i.image !== null)
          .map(
            (i) => `
      <div class="charactercontainer">
        <h1>${i.name}</h1>
        <br/>
        <img src = "${i.image}" alt ="${i.image}" class="imagechar"/>
      </div>`
          )
          .join("");
        characterlist.appendChild(speccharacter);
      }
      if (button === 1) {
        characterlist.innerHTML = "";
        allcharacter.innerHTML = body.data
          .filter((i) => i.image !== null)
          .map(
            (i) => `
      <div class="charactercontainer">
        <h1>${i.name}</h1>
        <br/>
        <img src = "${i.image}" alt ="${i.image}" class="imagechar"/>
      </div>`
          )
          .join("");
        characterlist.appendChild(allcharacter);
      }
    });
}
