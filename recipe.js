const searchMealURL = "https://themealdb.com/api/json/v1/1/search.php?s=";


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