async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById('inputUsername').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword').value.trim();
  
    if (username  && email && password) {
      const response = await fetch('/api/users/', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('.form-signup').addEventListener('submit', signupFormHandler);
