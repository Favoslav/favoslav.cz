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
    if (!response.ok) {
      window.location.href = 'https://www.favoslav.cz/yiff_db_js/'
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check if the response content-type is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json(); // Parse JSON if the content-type is JSON
    } else {
      return response.text(); // Treat as text if the content-type is not JSON
    }
  })
  .then(htmlContent => {
    // Manipulate or display the HTML content as needed
    document.getElementById('body').innerHTML = htmlContent;
  })
  .catch(error => {
    // Handle errors
    console.error('Fetch error:', error);
  });