document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cocktail-search-form");
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("cocktail-results");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        const searchTerm = searchInput.value.trim();

        if (searchTerm === "") {
            alert("Por favor, ingrese un término de búsqueda.");
            return;
        }

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                
                resultsContainer.innerHTML = "";

                if (data.drinks) {
                    data.drinks.forEach(cocktail => {
                        const cocktailElement = document.createElement("div");
                        cocktailElement.classList.add("cocktail");
                        cocktailElement.innerHTML = `
                            <h2>${cocktail.strDrink}</h2>
                            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                        `;
                        resultsContainer.appendChild(cocktailElement);
                    });
                } else {
                    resultsContainer.textContent = "No se encontraron resultados.";
                }
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    });
});