async function getcharacter() {
  const name = document.getElementById("charactername").value;
  const charimage = document.getElementById("charimage");
  const charname = document.getElementById("charname");
  fetch(`https://eldenring.fanapis.com/api/bosses?name=${name}`)
    .then((data) => data.json())
    .then((body) => {
      charimage.src = body.data[0].image;
      charname.textContent = body.data[0].name;
    });
}
