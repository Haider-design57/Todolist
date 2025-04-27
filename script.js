// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEXIjJwfiizgbraJDAK3mF9LzqxixiFoQ",
    authDomain: "todolist-5fe29.firebaseapp.com",
    projectId: "todolist-5fe29",
    storageBucket: "todolist-5fe29.firebasestorage.app",
    messagingSenderId: "819797409383",
    appId: "1:819797409383:web:40e5cd0c944b9f3a299ec2"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get DOM elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const userName = document.getElementById('userName');
const loginBox = document.getElementById('loginBox');
const signupBox = document.getElementById('signupBox');

// Function to switch between login and signup forms
function switchForms(showLogin) {
    if (showLogin) {
        loginBox.style.display = 'block';
        signupBox.style.display = 'none';
    } else {
        loginBox.style.display = 'none';
        signupBox.style.display = 'block';
    }
}

// Check if user is already logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, redirect to todo page
        window.location.href = 'todo.html';
    } else {
        // User is signed out
        userName.textContent = 'User';
    }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Show loading state
    const submitButton = loginForm.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Logging in...';

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Redirect to todo page
            window.location.href = 'todo.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Login';
        });
});

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            
            // Update user profile with name
            return user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            console.log('User created and profile updated');
            // Switch to login form after successful signup
            switchForms(true);
            alert('Account created successfully! Please login.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Handle signup link click
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms(false);
});

// Handle login link click
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms(true);
}); 