const CAT_API = "https://api.thecatapi.com/v1/";
const API_KEY = "8b8d2f7c-74e4-47cd-83c2-b03ee2c82027";
//query parameter, you can request 1, and more data objects

const error = document.getElementById("error");

const createCatArticle = (cat, catImgUrl, onClickAction) => {
  const catArticle = document.createElement("article");

  const catImg = document.createElement("img");
  catImg.width = 350;
  catImg.src = catImgUrl;
  catImg.loading = "lazy";

  const catBtn = document.createElement("button");
  const btnText = document.createTextNode("Guardar en favoritos");
  catBtn.onclick = () => onClickAction(cat.id);
  catBtn.appendChild(btnText);

  catArticle.appendChild(catImg);
  catArticle.appendChild(catBtn);

  return catArticle;
};

const loadRandomCats = async () => {
  const response = await fetch(
    `${CAT_API}images/search?limit=4&api_key${API_KEY}`
  );
  const data = await response.json();

  if (response.status === 200) {
    const favouriteCats = document.querySelector(".randomCats__cards");
    favouriteCats.innerHTML = "";
    data.forEach((cat) => {
      const catArticle = createCatArticle(cat, cat.url, addCatToFav);
      favouriteCats.appendChild(catArticle);
    });
  } else {
    error.innerHTML = "Hubo un error en random " + response.status;
  }
};

const loadFavouriteCats = async () => {
  const response = await fetch(`${CAT_API}favourites?`, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  const data = await response.json();

  if (response.status === 200) {
    const favouriteCats = document.querySelector(".favouriteCats__cards");
    favouriteCats.innerHTML = "";
    data.forEach((cat) => {
      const catArticle = createCatArticle(cat, cat.image.url, removeCatfromFav);

      favouriteCats.appendChild(catArticle);
    });
  } else {
    error.innerHTML = "Hubo un error en favourites " + response.status;
  }
};

const addCatToFav = async (id) => {
  const response = await fetch(`${CAT_API}favourites?`, {
    method: "POST",
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  console.log("Gato ingresado a favoritos");
  if (response.status !== 200) {
    error.innerHTML = "Hubo un error en random " + response.status;
  } else {
    loadFavouriteCats();
  }
};

const removeCatfromFav = async (id) => {
  const response = await fetch(`${CAT_API}favourites/${id}?`, {
    method: "DELETE",
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  console.log("Gato retirado de favoritos");
  if (response.status !== 200) {
    error.innerHTML = "Hubo un error en favourites " + response.status;
  } else {
    loadFavouriteCats();
  }
};

const uploadCat = async () => {
  const form = document.querySelector(".uploadingForm");
  const formData = new FormData(form);

  console.log(formData.get("file"));

  const response = await fetch(`${CAT_API}images/upload`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      "X-API-KEY": API_KEY,
    },
    body: formData,
  });

  const data = await response.json();
  console.log(response.status);
  console.log(data.message);
  // addCatToFav(data.id);
};

loadRandomCats();
loadFavouriteCats();
