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

    let limit = parseInt(factsInput.value);
    if(limit>50)
    {
     return  DisplayFacts.innerHTML=`<p>Please you are exceed the limit the required limit is 50</p>`
    } 
    
    

    showLoading();

    axios
      .get(`https://meowfacts.herokuapp.com/?count=${limit}`)
      .then(function (response) {
        const facts = response.data.data;
        for (let i = 0; i < Math.min(facts.length,limit); i++) {
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

    let count = parseInt(photosInput.value);
    if(count>11)
    {
      return  DisplayPhotos.innerHTML=`<p>Please you are exceed the limit the required limit is 10</p>`
      hideLoading()
    }

    showLoading();

    axios
      .get(`https://api.thecatapi.com/v1/images/search?limit=${count}`)
      .then(function (response) {
        const photos = response.data;
        for (let i = 0; i < Math.min(photos.length,count); i++) {
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
