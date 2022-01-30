document.addEventListener("DOMContentLoaded", async () => {
  await load_data();
});
let persoId;
async function load_data() {
  const request = await fetch("list.php");
  const persos = await request.json();
  let createContentDiv = document.createElement("div");
  createContentDiv.classList.add("content");
  document.body.appendChild(createContentDiv);

  for (const perso of persos) {
    let createDiv = document.createElement("div");
    let createh1 = document.createElement("h1");
    let createp = document.createElement("p");
    let createImg = document.createElement("img");
    let createBtnEdit = document.createElement("button");
    let createBtndel = document.createElement("button");

    createDiv.classList.add("perso");
    createh1.classList.add("name");

    createp.classList.add("house");
    createImg.classList.add("img");
    createBtnEdit.classList.add("btnEdit");
    createBtndel.classList.add("btnDel");

    createh1.appendChild(document.createTextNode(`${perso.name}`));
    createp.appendChild(document.createTextNode(`${perso.house}`));
    createImg.src = `${perso.imageSrc}`;
    createBtnEdit.appendChild(document.createTextNode("Edit"));
    createBtndel.appendChild(document.createTextNode("Delete"));
    createBtndel.onclick = () => {
      delete_perso(perso.id);
    };
    createBtnEdit.onclick = () => {
      persoId = perso.id;
      const hiddenDiv = document.querySelector(".show");
      const maskPerso = document.querySelector(".content");
      hiddenDiv.classList.toggle("active");
      maskPerso.classList.toggle("active");
      const infoInputName = document.getElementById("edit_Name");
      const infoInputhouse = document.getElementById("edit_House");
      const infoInputImg = document.getElementById("edit_Img");
      infoInputName.value = perso.name;
      infoInputhouse.value = perso.house;
      infoInputImg.value = perso.imageSrc;
    };

    createDiv.appendChild(createh1);
    createDiv.appendChild(createImg);
    createDiv.appendChild(createp);
    createDiv.appendChild(createBtnEdit);
    createDiv.appendChild(createBtndel);
    createContentDiv.appendChild(createDiv);
  }
}
async function delete_perso(id) {
  await fetch("delete.php", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: id,
  });
  window.location.reload(true);
  await load_data();
}
function returnHome() {
  const hiddenContent = document.querySelector(".content");
  const maskModif = document.querySelector(".show");
  hiddenContent.classList.remove("active");
  maskModif.classList.remove("active");
}
function hideAddPerso() {
  const hideAdd = document.querySelector(".add");
  const maskbtn = document.querySelector(".showAdd");
  hideAdd.classList.remove("active");
  maskbtn.style.display = "inline";
}
function showAdd() {
  const hiddenContent = document.querySelector(".add");
  const maskbtn = document.querySelector(".showAdd");
  hiddenContent.classList.toggle("active");
  maskbtn.style.display = "none";
}

async function edit_perso() {
  const name = document.getElementById("edit_Name").value;
  const house = document.getElementById("edit_House").value;
  const image = document.getElementById("edit_Img").value;
  const perso = {
    id: persoId,
    name: name,
    house: house,
    imageSrc: image,
  };
  await fetch("edit.php", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(perso),
  });
  window.location.reload(true);
  await load_data();
}

async function send_perso() {
  const id = document.getElementById("id_input").value;
  const name = document.getElementById("name_input").value;
  const house = document.getElementById("house_input").value;
  const image = document.getElementById("img_input").value;
  const perso = {
    id: id,
    name: name,
    house: house,
    imageSrc: image,
  };

  await fetch("add.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(perso),
  });
  window.location.reload(true);
  await load_data();
}
