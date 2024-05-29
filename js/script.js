// script.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerButton').addEventListener('click', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        const userData = {
            name: name,
            email: email,
            password: password
        };

        console.log( 
            name, email, password
        ) 

        fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            if (status === 200) {
                window.location.href = 'dashboard.html';
            } else {
                alert(body.msg); // Mostrar mensaje de error adecuado
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
