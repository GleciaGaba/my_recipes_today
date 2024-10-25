const button = document.querySelector(".btn");

async function filter(input) {
  console.log(input);

  try {
    const response = await fetch(
      `https://api.spoonacular.com/food/search?query=${input}&apiKey=43b1af8bb4924e2389e95aebca1724cb`
    );
    const data = await response.json();
    const ingredients = data?.searchResults[0].results;

    console.log("ingredients", ingredients);

    if (!ingredients || ingredients.length === 0) {
      filter("chocolate");
      return;
    }

    let cards = "";
    for (const ingredient of ingredients) {
      cards += `<div class="col">
                    <div class="card h-100">
                      <a href="${ingredient.link}" target="_blank">
                        <img src="${ingredient.image}" class="card-img-top" alt="${ingredient.name}">
                      </a>
                      <div class="card-body">
                        <h5 class="card-title">${ingredient.name}</h5>
                      </div>
                    </div>
                  </div>`;
    }

    let div = document.querySelector("#cards");
    div.innerHTML = cards;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const inputFn = () => {
  const searchData = document.querySelector("#input").value.trim();

  console.log(searchData);
  if (!searchData) {
    return;
  }

  filter(searchData);
};

// Corriger l'événement pour le chargement
document.addEventListener("DOMContentLoaded", () => filter("chocolate"));

// Associer le bouton à l'action de recherche
button.addEventListener("click", inputFn);
