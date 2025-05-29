document.addEventListener("DOMContentLoaded", function(){
  const factsBtn = document.getElementById("submit-facts-btn");
  const photosBtn = document.getElementById("submit-btn");
  const factsInput = document.getElementById("get-facts");
  const photosInput = document.getElementById("get-photos");
  const DisplayFacts = document.getElementById("display-facts");
  const DisplayPhotos = document.getElementById("display-photos");
  const loadingImage = document.getElementById("loading-image");

  function showLoading() {
    loadingImage.style.display = "block";
    DisplayFacts.innerHTML = "";
    DisplayPhotos.innerHTML = "";
  }

  function hideLoading() {
    loadingImage.style.display = "none";
  }

  factsBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let limit = factsInput.value;

    showLoading();

    axios
      .get(`https://meowfacts.herokuapp.com/?count=50`)
      .then(function (response) {
        const facts = response.data.data;
        for (let i = 0; i < facts.length; i++) {
          const li = document.createElement("li");
          li.textContent = facts[i];
          DisplayFacts.appendChild(li);
        }
        hideLoading();
      })
      .catch(function (error) {
        hideLoading();
          DisplayFacts.innerHTML = `<p class="error">Could not load facts: ${error.message}</p>`;
      });
  });

  photosBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let count = photosInput.value;

    showLoading();

    axios
      .get(`https://api.thecatapi.com/v1/images/search?limit=10`)
      .then(function (response) {
        const photos = response.data;
        for (let i = 0; i < photos.length; i++) {
          DisplayPhotos.innerHTML += `<img src="${photos[i].url}" alt="cat" style="width: 300px; margin: 10px;" />`;
        }
        hideLoading();
      })
      .catch(function (error) {
        hideLoading();
          DisplayPhotos.innerHTML = `<p class="error">Could not load photos: ${error.message}</p>`;
      });
  });
});
