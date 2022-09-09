document.getElementById('button-input').addEventListener('click', function(){
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    //spinner
    spinnerVisibility('block');
    //clear input value
    inputField.value = '';
    //clear single data
    const singleMealDiv = document.getElementById('singleMeal');
    singleMealDiv.textContent = '';
    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllMeals(data.meals))
})

// spinner function
const spinnerVisibility = spinnerStyle =>{
    document.getElementById('spinner').style.display = spinnerStyle;
}
const displayAllMeals = meals => {
    const allMealsDiv = document.getElementById('allMeals');
    allMealsDiv.textContent = '';
    meals?.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
        </div>
      </div>
        `;
        allMealsDiv.appendChild(div);
        div.addEventListener('click', function(){
            const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
            fetch(url)
            .then(res => res.json())
            .then(data => displaySignleMeal(data.meals[0]))
        })
    })
    spinnerVisibility('none');

}

const displaySignleMeal = meal => {
    const singleMealDiv = document.getElementById('singleMeal');
    singleMealDiv.textContent = '';
    singleMealDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go to youtube</a>
    </div>
    `;
}