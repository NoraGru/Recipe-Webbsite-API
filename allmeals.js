const filterMealURL = "https://themealdb.com/api/json/v1/1/search.php?f=";

let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector("#search-button");
let noSearchText = document.querySelector("#no-search-text");
let imgContainer = document.querySelector("#img-container");

let recipeItem = document.querySelector("#recipe-item");

searchButton.addEventListener("click", function () {
   let letter = searchInput.value.toLowerCase();
   let mealsByLetter = filterMealURL + letter;

   while (imgContainer.firstChild) {
      imgContainer.removeChild(imgContainer.firstChild); // rensar imgContainer vid varje ny sökning.
   }

   fetch(mealsByLetter)
      .then((response) => {
         if (!response.ok) {
            //om datan inte är ok -->
            throw new Error("något gick fel vid hämtning av data");
         }
         return response.json(); //om datan är ok
      })
      .then((data) => {
         if (data.meals !== null) {
            noSearchText.style.display = "none";
         }

         data.meals.forEach((meal) => {
            let mealName = meal.strMeal;
            let mealImgSrc = meal.strMealThumb;
            let mealArea = meal.strArea;
            let mealCategory = meal.strCategory;
            let mealId = meal.idMeal; //meal ID

            let mealContainer = document.createElement("div");
            mealContainer.style.display = "flex";
            mealContainer.style.flexDirection = "column";
            mealContainer.style.width = "25%";
            mealContainer.style.backgroundColor = "rgba(211, 211, 211, 0.8)";
            mealContainer.style.borderRadius = "30px";
            mealContainer.style.overflow = "hidden";
            mealContainer.style.transition = "transform 0.3s";
            mealContainer.style.transform = "scale(1)";
            mealContainer.style.cursor = "pointer";
            imgContainer.appendChild(mealContainer);

            mealContainer.addEventListener("click", () => {
               window.location.href = `recipe.html?mealId=${mealId}`; //eventhanterare för att öppna sida med recept
            });

            // hover funktion för mealcontainer
            mealContainer.addEventListener("mouseenter", function () {
               mealContainer.style.transform = "scale(1.05)";
            });
            mealContainer.addEventListener("mouseleave", function () {
               mealContainer.style.transform = "scale(1)";
            });

            let imgElement = document.createElement("img"); //adderar imgelement
            imgElement.src = mealImgSrc;
            imgElement.style.width = "100%";
            imgElement.style.height = "60%";
            imgElement.style.objectFit = "cover";
            mealContainer.appendChild(imgElement);

            imgElement.alt = mealName;
            let nameElement = document.createElement("p"); //adderar namn
            nameElement.textContent = mealName;
            nameElement.style.justifyContent = "center";
            nameElement.style.color = "white";
            nameElement.style.fontWeight = "bold";
            nameElement.style.fontSize = "18px";
            nameElement.style.margin = "5px";
            nameElement.style.textAlign = "center";
            nameElement.style.textTransform = "uppercase";
            mealContainer.appendChild(nameElement);

            let areaElement = document.createElement("p"); //ursprung
            areaElement.alt = mealArea;
            areaElement.textContent = mealArea;
            mealContainer.appendChild(areaElement);
            areaElement.style.color = "rgb(17 24 39)";
            areaElement.style.fontSize = "18px";
            areaElement.style.paddingLeft = "40px";
            areaElement.style.paddingTop = "20px";

            let categoryElement = document.createElement("P"); // skapar element för kategoritagg
            categoryElement.alt = mealCategory;
            categoryElement.textContent = mealCategory;
            mealContainer.appendChild(categoryElement);
            categoryElement.style.color = "rgb(17 24 39)";
            categoryElement.style.fontSize = "18px";
            categoryElement.style.paddingLeft = "40px";
            categoryElement.style.paddingTop = "10px";

            searchInput.value = "";
         });
      })
      .catch((error) => {
         console.error("det uppstod ett fel:", error);
      });
});
