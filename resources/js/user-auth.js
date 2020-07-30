const loginForm = document.getElementById('log-in-form');
const registerForm = document.getElementById('register-form');
const loginAPI = 'https://matb-app.herokuapp.com/api/auth/signin';
const registerAPI = 'https://matb-app.herokuapp.com/api/auth/signup';

const changeForm = () => {
    loginForm.classList.toggle('d-none');
    registerForm.classList.toggle('d-none');
} 

const Login = () => {
    const data = {
        username: document.getElementById('login-username').value,
        password: document.getElementById('login-password').value
    };
    axios.post(loginAPI, data)
    .then((result) => {
        saveUserInLocalStorage(result.data);
    }).catch((err) => {
        document.getElementById('login-username').classList.add('warning');
        document.getElementById('login-password').classList.add('warning');
        document.getElementById('confirm-password').classList.remove('d-none');
    });
}

const Register = () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const rePassword = document.getElementById('re-password').value;
    if (password == rePassword) {
        const data = {
            username,
            password
        };
        axios.post(registerAPI, data)
        .then((result) => {
            saveUserInLocalStorage(result.data);
        }).catch((err) => {
            document.getElementById('confirm-username').classList.remove('d-none');
            document.getElementById('register-username').classList.add('warning');
        });
    } else {
        document.getElementById('confirm-password').classList.remove('d-none');
        document.getElementById('re-password').classList.add('warning');
        document.getElementById('register-password').classList.add('warning');
    }
}

const saveUserInLocalStorage = async (user) => {
    localStorage.setItem("token", user.token);
    localStorage.setItem("username", user.username);
    checkUserInLocalStorage();
}

const hello = document.getElementById('hello-user');
const form = document.getElementById('form-container');

const checkUserInLocalStorage = () => {
    const user = localStorage.getItem("username");
    if (user) {
        hello.classList.remove('d-none');
        form.classList.add('d-none');
        document.getElementById('greeting').innerText = "Xin chào " + user + ",";
        return true;
    } else {
        hello.classList.add('d-none');
        form.classList.remove('d-none');
        return false;
    }
}

const Logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    location.reload();
}

document.addEventListener("DOMContentLoaded", async () => {
    checkUserInLocalStorage();
});