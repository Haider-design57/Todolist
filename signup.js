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
const signupForm = document.getElementById('signupForm');

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Show loading state
    const submitButton = signupForm.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Creating Account...';

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
            alert('Account created successfully! Redirecting to login...');
            // Redirect to login page after successful signup
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Create Account';
        });
}); 