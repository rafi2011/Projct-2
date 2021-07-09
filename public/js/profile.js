const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#meal-name').value.trim();
  const calories = document.querySelector('#meal-calories').value.trim();
  const category = document.querySelector('#category-choice').value.trim();
  const mealDate = document.querySelector('#meal-date').value.trim();

  if (name && calories && category && mealDate) {
    const response = await fetch(`/api/meals`, {
      method: 'POST',
      body: JSON.stringify({ name, calories, category, mealDate}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create meal');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/meals/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete meals');
    }
  }
};

const filterHandler = async (event) => {
  event.preventDefault();

  const filterDate = document.querySelector('#filter-date').value.trim();
  
  document.location.replace(`/profile/filter/${filterDate}`);

    
};

document
  .querySelector('.new-meal-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.meal-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.filter-form')
  .addEventListener('submit', filterHandler);

Handlebars.registerHelper("sum_calories", function(meals) {
    
      var sum = 0;
      for(var i = 0; i < meals.length; i++){
        sum+=meals[i].calories;
      }
    return sum
  });