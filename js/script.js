// script.js
document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    const signinButton = document.getElementById('signinButton');
    
    // Manejo del registro
    if (registerButton) {
        registerButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const password = document.getElementById('passwordInput').value;

            const userData = {
                name: name,
                email: email,
                password: password
            };

            // console.log('Datos de registro:', name, email, password);

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
    } else {
        console.error('registerButton no encontrado');
    }

    // Manejo del inicio de sesión
    if (signinButton) {
        signinButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('emailInput1').value;
            const password = document.getElementById('passwordInput1').value;

            const userData = {
                email: email,
                password: password
            };

            // console.log('Datos de inicio de sesión:', email, password);

            fetch('http://localhost:3000/api/usuarios/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'dashboard.html';
                } else {
                    return response.json().then(data => { throw new Error(data.msg || 'Error en la solicitud') });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message); // Mostrar mensaje de error adecuado
            });
        });
    } else {
        console.error('signinButton no encontrado');
    }
});
