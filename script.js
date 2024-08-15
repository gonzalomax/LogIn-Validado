document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('showHide');


    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
        //validar form
    })

    emailInput.addEventListener('blur', function () {
        // validar mail
        validateEmail()
    })

    emailInput.addEventListener('change', function () {
        // agregar metodo q limpie el error
        clearError(emailError);
    })

    passwordInput.addEventListener('change', function () {
        // agregar metodo q limpie el error
        clearError(passwordError);
    })

    confirmPasswordError.addEventListener('change', function () {
        // agregar metodo q limpie el error
        clearError(confirmPasswordError);
    })

    showHideButton.addEventListener('click', function () {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text'
            confirmPasswordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
            confirmPasswordInput.type = 'password'
        }
    })



    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidEmail && isValidPassword && passwordMatch) {
            // JSON guardar mail en local storage y generar JSON en conosla
            saveToLocalStorage();
            alert('has ingresado con exito')
        }
    }
    function validateEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim() // el trim elimina espacios vacios al comienzo y al final del inpu
        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingresa un Email Valido');
            return false;
        }
        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        if (passwordValue.length < 6) {
            showError(passwordError, 'Ingresa una constraseña de al menos 6 caracteres')
            return false;
        }
        return true;
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas deben coincidir')
            return false;
        }
        // linea para que si pones mal el password y dsp bien se limpie el error
         clearError(confirmPasswordError)
        return true;
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';

    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';

    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue)
        //JSON
        const body = bodyBuilderJSON();
        console.log(body)
    }

    function bodyBuilderJSON() {
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }

})