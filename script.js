async function render() {
  const response = await fetch(
    "https://api.spoonacular.com/food/search?apiKey=43b1af8bb4924e2389e95aebca1724cb"
  );

  const allRecipes = await response.json();
  const recipes = allRecipes.searchResults[0].results;

  let cards = "";
  let slides = "";

  // Cards for each recipe
  for (const recipe of recipes) {
    cards += `
      <div class="col">
          <div class="card h-100">
              <a href="${recipe.link}" target="_blank">
                  <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
              </a>
              <div class="card-body">
                  <h5 class="card-title">${recipe.name}</h5>
              </div>
          </div>
      </div>`;
  }

  // Carousel items
  slides += `<div class="carousel-inner">`;
  for (const [index, recipe] of recipes.entries()) {
    slides += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${recipe.image}" class="d-block w-100" height="400" alt="${
      recipe.name
    }">
      </div>`;
  }
  slides += `</div>`;

  // Full carousel
  slides = `
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      ${slides}
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`;

  let div = document.querySelector("#cards");
  let carousel = document.querySelector("#carouselExampleAutoplaying");

  div.innerHTML = cards;
  carousel.innerHTML = slides;
}

document.addEventListener("DOMContentLoaded", render);
