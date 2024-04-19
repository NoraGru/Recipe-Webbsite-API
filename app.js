const searchMealURL = "https://themealdb.com/api/json/v1/1/search.php?s=";

let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector("#search-button");
let noSearchText = document.querySelector("#no-search-text");

let recipeItem = document.querySelector("#recipe-item");
let recipeImage = document.querySelector("#recipe-image");
let recipeName = document.querySelector("#recipe-name");
let recipeCategory = document.querySelector("#recipe-category");
let recipeInstructions = document.querySelector("#recipe-instructions");
let ingredientList = document.querySelector("#ingredient-list");

recipeItem.style.display = "none";

const categories = [
   "Beef",
   "Chicken",
   "Dessert",
   "Pasta",
   "Seafood",
   "Side",
   "Starter",
   "Vegan",
   "Vegetarian",
   "Breakfast",
   "Goat",
   "Lamb",
   "Miscellaneous",
   "Pork",
];
const recipeCategoryContainer = document.querySelector("#recipe-category-div");

categories.forEach((category) => {
   const categoryLink = document.createElement("a");
   categoryLink.href = `#${category}`;
   categoryLink.textContent = category;
   categoryLink.classList.add(
      "hover:text-rose-500",
      "transition",
      "duration-1000",
      "ease-in-out",
      "hover:text-xl",
      "transition",
      "duration-1000",
      "ease-in-out",
      "text-white",
      "text-center",
      "text-lg",
      "border-b-2",
      "border-white",
      "hover:border-rose-500",
      "px-2",
      "my-6",
      "mx-3"
   );
   recipeCategoryContainer.appendChild(categoryLink);
});

searchButton.addEventListener("click", function () {
   let searchUrl = searchMealURL + searchInput.value; //sammanfogar url och sökord
   fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
         if (data.meals !== null) {
            noSearchText.style.display = "none";
            recipeItem.style.display = "block";

            const recipe = data.meals[0];

            recipeName.innerHTML = recipe.strMeal;
            recipeImage.src = recipe.strMealThumb;

            recipeImage.style.borderRadius = "20px";

            recipeCategory.innerHTML = recipe.strCategory;
            recipeInstructions.innerHTML = recipe.strInstructions;

            searchInput.value = "";

            ingredientList.innerHTML = "";

            for (let i = 1; i < 21; i++) {
               if (
                  recipe[`strIngredient${i}`] !== null &&
                  recipe[`strIngredient${i}`] !== "" &&
                  recipe[`strMeasure${i}`] !== "" &&
                  recipe[`strMeasure${i}`] !== null
               ) {
                  let ingredient = `${recipe[`strIngredient${i}`]} - ${
                     recipe[`strMeasure${i}`]
                  }`;
                  let ingredientElement = document.createElement("li");
                  ingredientElement.innerHTML = ingredient;

                  ingredientList.appendChild(ingredientElement);
               }
            }
         }
      });
});
