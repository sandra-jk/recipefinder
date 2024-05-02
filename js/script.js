document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('input-ingredient');
  const recipeName = document.getElementById('recipe-name');
  const recipeImage = document.getElementById('recipe-image');
  const instructionsList = document.getElementById('instructions-list');
  const ingredientsList = document.getElementById('ingredients-list');

  // Fetch recipe data from JSON file
  fetch('db.json')
      .then(response => response.json())
      .then(data => {
          // Define function to display recipe
          function displayRecipe(recipe) {
              recipeName.textContent = recipe.name;
              recipeImage.src = recipe.image;
              instructionsList.innerHTML = recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('');
              ingredientsList.innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
          }

          // Handle search button click
          searchButton.addEventListener('click', function () {
              const searchTerm = searchInput.value.trim().toLowerCase();
              const foundRecipe = data.recipes.find(recipe => recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)));
              if (foundRecipe) {
                  displayRecipe(foundRecipe);
              } else {
                  // Clear recipe display if no recipe found
                  recipeName.textContent = "Recipe not found";
                  recipeImage.src = "";
                  instructionsList.innerHTML = "";
                  ingredientsList.innerHTML = "";
              }
          });
      })
      .catch(error => console.error('Error fetching recipe data:', error));
});
