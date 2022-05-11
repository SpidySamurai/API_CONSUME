const CAT_API = "https://api.thecatapi.com/v1/";
const API_KEY = "8b8d2f7c-74e4-47cd-83c2-b03ee2c82027";
//query parameter, you can request 1, and more data objects

const loadRandomCats = async () => {
  const response = await fetch(
    `${CAT_API}images/search?limit=3&api_key${API_KEY}`
  );
  const data = await response.json();

  const img1 = document.getElementById("img-container-1");
  img1.src = data[0].url;

  const img2 = document.getElementById("img-container-2");
  img2.src = data[1].url;

  const img3 = document.getElementById("img-container-3");
  img3.src = data[2].url;
};

loadRandomCats();
