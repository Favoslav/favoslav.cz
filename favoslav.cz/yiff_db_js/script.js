async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashedPassword;
}

document.querySelector('.loginform').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the default form submission

  console.log('Form submission triggered');
  // Get form data using FormData
  const formData = new FormData(event.target);
  // Convert FormData to an object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Hash the password using the hashPassword function
  try {
    const hashedPassword = await hashPassword(formDataObject.password);
    formDataObject.password = hashedPassword;

    // Make a POST request using the Fetch API
    fetch('https://api.favoslav.cz/v1/yiffdb/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
      credentials: 'include', // Include cookies in the request
    })
    .then(response => {
      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Parse the JSON data from the response
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);

      if (data && data.success === true) {
        // Redirect to the specified URL
        window.location.href = 'https://www.favoslav.cz/yiff_db_js/content';
      }
    })
    .catch(error => {
      // Handle errors
      console.error('Fetch error:', error);
    });
  } catch (error) {
    console.error('Error hashing password:', error);
  }
});

fetch('https://api.favoslav.cz/v1/yiffdb/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
    // body: JSON.stringify(formDataObject),
    credentials: 'include', // Include cookies in the request
  })
  .then(response => {
    // Check if the response status is OK (200-299)
    if (response.ok) {
      console.log("You're logged in")
    }
  })
  .catch(error => {
    // Handle errors
    console.error('Fetch error:', error);
  });