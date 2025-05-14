// Calculate age from DOB
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.addEventListener("DOMContentLoaded", () => {
    const regForm = document.getElementById('registration-form');
    const loginForm = document.getElementById("login-form");

    // REGISTRATION FORM
    if (regForm) {
        regForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let isValid = true;

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const dob = document.getElementById('dob').value;
            const idNumber = document.getElementById('idNumber').value.trim();
            const genderElement = document.querySelector('input[name="gender"]:checked');
            const address = document.getElementById('address').value.trim();

            // Clear all previous errors
            document.querySelectorAll('.error').forEach(span => span.innerText = '');

            if (!firstName) {
                document.getElementById('firstNameError').innerText = 'First name is required';
                isValid = false;
            }
            if (!lastName) {
                document.getElementById('lastNameError').innerText = 'Last name is required';
                isValid = false;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('emailError').innerText = 'Valid email is required';
                isValid = false;
            }
            if (!password || password.length < 6) {
                document.getElementById('passwordError').innerText = 'Password must be at least 6 characters';
                isValid = false;
            }
            if (!confirmPassword || confirmPassword !== password) {
                document.getElementById('confirmPasswordError').innerText = 'Passwords do not match';
                isValid = false;
            }
            if (!phone || !/^\d{10}$/.test(phone)) {
                document.getElementById('phoneError').innerText = 'Phone number must be 10 digits';
                isValid = false;
            }
            if (!dob) {
                document.getElementById('dobError').innerText = 'Date of birth is required';
                isValid = false;
            } else if (calculateAge(dob) < 18) {
                document.getElementById('dobError').innerText = 'You must be at least 18 years old';
                isValid = false;
            }
            if (!idNumber) {
                document.getElementById('idNumberError').innerText = 'ID number is required';
                isValid = false;
            }
            if (!genderElement) {
                document.getElementById('genderError').innerText = 'Gender is required';
                isValid = false;
            }
            if (!address) {
                document.getElementById('addressError').innerText = 'Address is required';
                isValid = false;
            }

            if (isValid) {
                const userData = {
                    firstName,
                    lastName,
                    email,
                    password,
                    phone,
                    dob,
                    idNumber,
                    gender: genderElement.value,
                    address
                };

                let users = JSON.parse(localStorage.getItem("rdpUsers")) || [];

                // Prevent duplicate email registration
                if (users.some(user => user.email === email)) {
                    alert("Email already registered.");
                    return;
                }

                users.push(userData);
                localStorage.setItem("rdpUsers", JSON.stringify(users));

                alert("Registration successful!");
                window.location.assign("login.html");
                //regForm.reset();
            }
        });
    }

    // LOGIN FORM
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            const users = JSON.parse(localStorage.getItem("rdpUsers")) || [];
            const matchedUser = users.find(user => user.email === email && user.password === password);

            if (matchedUser) {
                alert(`Welcome back, ${matchedUser.firstName}!`);
                window.location.assign("indexs.html");
            } else {
                alert("Invalid login details.");
            }
        });
    }
});
