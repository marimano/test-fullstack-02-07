console.log('Hello client');

fetch('/users')
  .then(response => response.json())
  .then(users => {
    users.forEach(u => {
      const userElement = document.createElement('div');
      userElement.textContent = 'User: ' + u.name + ` (${u.role})`;
      document.body.append(userElement);
    })
  });