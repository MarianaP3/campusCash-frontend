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

            if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
                alert('Por favor, complete todos los campos.');
                return; // Detener la ejecución del resto del código si hay campos vacíos
            }

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
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(data => {
                const token = data.token; // Asegúrate de que el token viene en data.token
                localStorage.setItem('authToken', token); // Guarda el token en localStorage
                console.log('Usuario autenticado, token guardado'); 
                alert('Usario creado correctamente, es necesario iniciar sesión')
                window.location.href = 'index.html'; // Mueve la redirección aquí
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

            if (email.trim() === '' || password.trim() === '') {
                alert('Por favor, complete todos los campos.');
                return; // Detener la ejecución del resto del código si hay campos vacíos
            }

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
                    return response.json(); // Obtener la respuesta JSON que contiene el token
                } else {
                    return response.json().then(data => { throw new Error(data.msg || 'Error en la solicitud') });
                }
            })
            .then(data => {
                const token = data.token; // Suponiendo que el token viene en data.token
                localStorage.setItem('authToken', token); // Guarda el token en localStorage
                console.log('Usuario autenticado, token guardado');
                window.location.href = 'dashboard.html'; // Redirigir después de guardar el token
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message); // Mostrar mensaje de error adecuado
            });
        });
    } else {
        console.error('signinButton no encontrado');
    }

    const saveIncomeButton = document.getElementById('save-income-movement');

    if (saveIncomeButton) {
        saveIncomeButton.addEventListener('click', function(event) {
            event.preventDefault();

            const concept = document.getElementById('conceptInput1').value;
            const amount = parseFloat(document.getElementById('amountInput1').value);
            const category = document.getElementById('categoryInput1').value;

            const movementData = {
                concept: concept,
                amount:  parseFloat(amount),
                categorie: category, // Convierte a minúsculas para coincidir con tu constante
                type: 'income' 
            };

            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Token no encontrado, por favor inicie sesión de nuevo.');
                return;
            }

            fetch('http://localhost:3000/api/movimientos/createMovement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(movementData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(data => {
                // console.log('Movimiento guardado:', data);
                alert('Movimiento guardado exitosamente');
                // Aquí puedes agregar lógica adicional como actualizar la lista de movimientos en la página
                setTimeout(() => {
                    location.reload();
                }, 500);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al guardar el movimiento');
            });
        });
    } else {
        console.error('saveButton no encontrado');
    }

    const saveEgressButton = document.getElementById('save-egress-movement');

    if (saveEgressButton) {
        saveEgressButton.addEventListener('click', function(event) {
            event.preventDefault();

            const concept = document.getElementById('conceptInput2').value;
            const amount = parseFloat(document.getElementById('amountInput2').value);
            const category = document.getElementById('categoryInput2').value;

            const movementData = {
                concept: concept,
                amount:  parseFloat(amount),
                categorie: category, // Convierte a minúsculas para coincidir con tu constante
                type: 'expense' 
            };

            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Token no encontrado, por favor inicie sesión de nuevo.');
                return;
            }

            fetch('http://localhost:3000/api/movimientos/createMovement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(movementData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(data => {
                // console.log('Movimiento guardado:', data);
                alert('Movimiento guardado exitosamente');
                // Aquí puedes agregar lógica adicional como actualizar la lista de movimientos en la página
                setTimeout(() => {
                    location.reload();
                }, 500);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al guardar el movimiento');
            });
        });
    } else {
        console.error('saveButton no encontrado');
    }
    
});
