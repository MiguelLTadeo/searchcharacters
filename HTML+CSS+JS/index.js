function buttonchoice(value) {
  const name = document.getElementById("charactername").value;
  searchurl = `https://eldenring.fanapis.com/api/bosses?name=${name}`;
  allurl = `https://eldenring.fanapis.com/api/bosses?limit=106`;
  if (value === 0) {
    getcharacter(searchurl);
  }
  if (value === 1) {
    getcharacter(allurl);
  }
}

async function getcharacter(url) {
  fetch(url)
    .then((data) => data.json())
    .then((body) => {
      const characterlist = document.getElementById("Characterslist");
      characterlist.innerHTML = body.data
        .map(
          (i) => `
      <div>
        <h1>${i.name}</h1>
        <br/>
        <img src = "${i.image}" alt ="${i.image}"/>
      </div>`
        )
        .join("");
    });
}
