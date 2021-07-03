const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#meal-name').value.trim();
  const type = document.querySelector('#meal-type').value.trim();
  const calories = document.querySelector('#meal-calories').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/meals`, {
      method: 'POST',
      body: JSON.stringify({ name, type, calories }),
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
      document.location.replace('/meals');
    } else {
      alert('Failed to delete meals');
    }
  }
};

document
  .querySelector('.new-meal-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.meal-list')
  .addEventListener('click', delButtonHandler);
