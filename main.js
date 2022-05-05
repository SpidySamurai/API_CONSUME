console.log("xd");

const CAT_API = "https://api.thecatapi.com/v1/images/search";

fetch(CAT_API)
  .then((res) => res.json())
  .then((data) => {
    const img = document.getElementById("img-container");
    img.src = data[0].url;
  });

const onClickFetch = () => {
  fetch(CAT_API)
    .then((res) => res.json())
    .then((data) => {
      const img = document.getElementById("img-container");
      img.src = data[0].url;
    });
};
