async function saveHandler (event){
  console.log("save");
  event.preventDefault();
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const name = document.querySelector('#meal-name').value.trim();
  const calories = document.querySelector('#meal-calories').value.trim();

    const response = await fetch(`/api/meals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, calories }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create meal');
    }
};

document
  .querySelector('.edit-meal-form')
  .addEventListener('submit', saveHandler);
