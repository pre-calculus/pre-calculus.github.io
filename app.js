let isSignup = false;










function updateClock() {
    const timeOptions = { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const dateOptions = { timeZone: 'America/Los_Angeles', year: 'numeric', month: 'long', day: 'numeric' };
    const time = new Intl.DateTimeFormat('en-US', timeOptions).format(new Date());
    const date = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date());
    document.getElementById('date').textContent = `Current Date: ${date}`;
    document.getElementById('clock').textContent = `Current Time: ${time}`;
}

function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();
                
                if (data.address && data.address.city && data.address.country) {
                    document.getElementById('location').textContent = `Location: ${data.address.city}, ${data.address.country}`;
                } else {
                    document.getElementById('location').textContent = "Location: Unknown";
                }
            } catch (error) {
                document.getElementById('location').textContent = "Location: Unable to determine";
            }
        }, () => {
            document.getElementById('location').textContent = "Location: Permission Denied";
        });
    } else {
        document.getElementById('location').textContent = "Location: Not Supported";
    }
};

function updateUserNameDisplay() {
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
const nameDiv = document.getElementById('username-display');
if (nameDiv) {
    nameDiv.textContent = `Name: ${storedUser.name}`;
}
}
}

function updateUserEmailDisplay() {
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
const emailDiv = document.getElementById('email-display');
if (emailDiv) {
    emailDiv.textContent = `Email: ${storedUser.email}`;
}
}
}

document.getElementById('auth-form').addEventListener('submit', function(event) {
event.preventDefault();
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const name = document.getElementById('name').value;
const age = document.getElementById('age').value;
const gender = document.getElementById('gender').value;
const grade = document.getElementById('grade').value;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

if (!emailRegex.test(email)) {
alert('Invalid email format');
return;
}

if (!passwordRegex.test(password)) {
alert('Password must be at least 6 characters long and contain at least one letter and one number');
return;
}

if (isSignup) {
if (!name.trim()) {
    alert('Gamer Tag is required');
    return;
}
if (!age) {
    alert('Age is required');
    return;
}
if (!gender) {
    alert('Gender is required');
    return;
}
if (!grade) {
    alert('Grade is required')
    return;
}



localStorage.setItem('user', JSON.stringify({ email, password, name, age, gender }));
alert('Signup successful! Welcome to the arena!');
checkLoginStatus();
} else {
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser && storedUser.email === email && storedUser.password === password) {
    alert('Login successful!');
    checkLoginStatus();
} else {
    alert('Invalid email or password');
}
}
});

function updateUserDetailsDisplay() {
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
const nameDiv = document.getElementById('name-display');
const emailDiv = document.getElementById('email-display');
const ageDiv = document.getElementById('age-display');
const genderDiv = document.getElementById('gender-display');
const gradeDiv = document.getElementById('grade-display')

if (nameDiv) {
    nameDiv.textContent = `Name: ${storedUser.name}`;
}
if (emailDiv) {
    emailDiv.textContent = `Email: ${storedUser.email}`;
}
if (ageDiv) {
    ageDiv.textContent = `Age: ${storedUser.age}`;
}
if (genderDiv) {
    genderDiv.textContent = `Gender: ${storedUser.gender}`;
}
if (gradeDiv) {
    gradeDiv.textContent = `Grade: ${storedUser.grade}`;
}
}
}




function generateIQ() {
    return Math.floor(Math.random() * 150); // Generates a number between 0 and 200
}

let storedIQ = localStorage.getItem("userIQ");
if (!storedIQ) {
    storedIQ = generateIQ();
    localStorage.setItem("userIQ", storedIQ);
}

document.getElementById("iqDisplay").innerText = "IQ level: " + storedIQ;



function checkLoginStatus() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('welcome-section').style.display = 'block';
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('welcome-message').innerText = `🎮 Welcome back, ${storedUser.name}! Ready to game? 🚀`;
    }
}



document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    
    if (isSignup) {
        if (!name.trim()) {
            alert('Gamer Tag is required');
            return;
        }
        localStorage.setItem('user', JSON.stringify({ email, password, name }));
        alert('Signup successful! Welcome to the arena!');
        checkLoginStatus();
    } else {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('Login successful!');
            checkLoginStatus();
        } else {
            alert('Invalid email or password');
        }
    }
});
function toggleForm() {
    isSignup = !isSignup;
    document.getElementById('form-title').innerText = isSignup ? 'Sign Up' : 'Login';
    document.getElementById('name-group').style.display = isSignup ? 'block' : 'none';
    document.getElementById('age-group').style.display = isSignup ? 'block' : 'none';
    document.getElementById('gender-group').style.display = isSignup ? 'block' : 'none';
    document.getElementById('grade-group').style.display = isSignup ? 'block' : 'none';

    document.querySelector('.toggle').innerText = isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up";
}

function checkLoginStatus() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('welcome-section').style.display = 'block';
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('welcome-message').innerText = `🎮 Welcome back, ${storedUser.name}! Ready to game? 🚀`;
        document.getElementById('name-display').innerText = `Name: ${storedUser.name}`;
        document.getElementById('email-display').innerText = `Email: ${storedUser.email}`;
        document.getElementById('age-display').innerText = `Age: ${storedUser.age}`;
        document.getElementById('gender-display').innerText = `Gender: ${storedUser.gender}`;
        document.getElementById('grade-display').innerText = `Grade: ${storedUser.grade}`;
    }
}

function logout() {
    localStorage.removeItem('user');
    location.reload();
}

document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const grade = document.getElementById('grade').value;
    
    if (isSignup) {
        if (!name.trim() || !age || !gender || !grade) {
            alert('All fields are required');
            return;
        }
        localStorage.setItem('user', JSON.stringify({ email, password, name, age, gender, grade }));
        alert('Signup successful! Welcome to the arena!');
        checkLoginStatus();
    } else {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('Login successful!');
            checkLoginStatus();
        } else {
            alert('Invalid email or password');
        }
    }
});


window.onload = checkLoginStatus;

setInterval(updateClock, 1000);
updateClock();
detectLocation();