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






// === Helper Functions to Get & Save Data === //

// Get all users from localStorage (or initialize empty)
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Get friendship & follow data
function getFriendshipData() {
    return JSON.parse(localStorage.getItem('friendshipData')) || { friends: [], following: [] };
}

// Save friendship & follow data
function saveFriendshipData(data) {
    localStorage.setItem('friendshipData', JSON.stringify(data));
}

// === User Registration === //
document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name.trim()) {
        alert('Gamer Tag is required');
        return;
    }

    let users = getUsers();

    // Prevent duplicate users
    if (!users.some(user => user.name === name)) {
        users.push({ name, email, password });
        saveUsers(users);
    }

    alert('User registered successfully!');
    displayUsers();
});

// === Friend & Follow Functions === //
function addFriend(friendName) {
    let data = getFriendshipData();

    if (!data.friends.includes(friendName)) {
        data.friends.push(friendName);
        saveFriendshipData(data);
        displayUsers();
    }
}

function followUser(userName) {
    let data = getFriendshipData();

    if (!data.following.includes(userName)) {
        data.following.push(userName);
        saveFriendshipData(data);
        displayUsers();
    }
}

// === Display Users in Sections === //
function displayUsers() {
    let users = getUsers();
    let data = getFriendshipData();

    const friendsDiv = document.getElementById('friends-list');
    const followingDiv = document.getElementById('following-list');
    const usersDiv = document.getElementById('users-list');

    if (!friendsDiv || !followingDiv || !usersDiv) {
        console.error("One or more user display sections are missing!");
        return;
    }

    // Clear previous content
    friendsDiv.innerHTML = '<h3>👫 Friends</h3>';
    followingDiv.innerHTML = '<h3>🔔 Following</h3>';
    usersDiv.innerHTML = '<h3>🌎 All Users</h3>';

    function createUserElement(user) {
        let userEntry = document.createElement('div');
        userEntry.classList.add('user-entry');
        userEntry.innerHTML = `
            <p>👤 ${user.name}</p>
            <button class="friend-btn" data-user="${user.name}">➕ Friend</button>
            <button class="follow-btn" data-user="${user.name}">👀 Follow</button>
        `;
        return userEntry;
    }

    users.forEach(user => {
        let userElement = createUserElement(user);
        if (data.friends.includes(user.name)) {
            friendsDiv.appendChild(userElement);
        } else if (data.following.includes(user.name)) {
            followingDiv.appendChild(userElement);
        } else {
            usersDiv.appendChild(userElement);
        }
    });
}

// === Event Delegation for Buttons === //
document.getElementById('users-section').addEventListener('click', function(event) {
    if (event.target.classList.contains('friend-btn')) {
        addFriend(event.target.getAttribute('data-user'));
    } else if (event.target.classList.contains('follow-btn')) {
        followUser(event.target.getAttribute('data-user'));
    }
});
function changeSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('div[id$="-section"]');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    } else {
        console.error("Section not found:", sectionId);
    }
}

// === Ensure Click Events Work for Buttons === //
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('friend-btn')) {
        addFriend(event.target.getAttribute('data-user'));
    } else if (event.target.classList.contains('follow-btn')) {
        followUser(event.target.getAttribute('data-user'));
    }
});

function displayUsers() {
    let users = getUsers();
    let data = getFriendshipData();

    const friendsDiv = document.getElementById('friends-list');
    const followingDiv = document.getElementById('following-list');
    const usersDiv = document.getElementById('users-list');

    if (!friendsDiv || !followingDiv || !usersDiv) {
        console.error("One or more user sections are missing!");
        return;
    }

    // Clear previous content
    friendsDiv.innerHTML = '<h3>👫 Friends</h3>';
    followingDiv.innerHTML = '<h3>🔔 Following</h3>';
    usersDiv.innerHTML = '<h3>🌎 All Users</h3>';

    function createUserElement(user) {
        let userEntry = document.createElement('div');
        userEntry.classList.add('user-entry');
        
        // Check if the user is already a friend or following
        const isFriend = data.friends.includes(user.name);
        const isFollowing = data.following.includes(user.name);

        // Create buttons dynamically
        let friendButton = isFriend 
            ? `<button class="friend-btn" disabled>✅ Friend</button>` 
            : `<button class="friend-btn" data-user="${user.name}">➕ Friend</button>`;
        
        let followButton = isFollowing 
            ? `<button class="follow-btn" disabled>👀 Following</button>` 
            : `<button class="follow-btn" data-user="${user.name}">👀 Follow</button>`;

        userEntry.innerHTML = `
            <p>👤 ${user.name}</p>
            ${friendButton} ${followButton}
        `;
        return userEntry;
    }

    users.forEach(user => {
        let userElement = createUserElement(user);

        // Show user in all three sections
        usersDiv.appendChild(userElement.cloneNode(true)); // Keep in "Users" Section
        if (data.friends.includes(user.name)) friendsDiv.appendChild(userElement.cloneNode(true));
        else if (data.following.includes(user.name)) followingDiv.appendChild(userElement.cloneNode(true));
    });
}

function displayUsers() {
    let users = getUsers();
    let data = getFriendshipData();

    const friendsDiv = document.getElementById('friends-list');
    const followingDiv = document.getElementById('following-list');
    const usersDiv = document.getElementById('users-list');

    if (!friendsDiv || !followingDiv || !usersDiv) {
        console.error("One or more user sections are missing!");
        return;
    }

    // Clear previous content
    friendsDiv.innerHTML = '<h3>👫 Friends</h3>';
    followingDiv.innerHTML = '<h3>🔔 Following</h3>';
    usersDiv.innerHTML = '<h3>🌎 All Users</h3>';

    function createUserElement(user) {
        let userEntry = document.createElement('div');
        userEntry.classList.add('user-entry');
        
        // Check if the user is a friend or following
        const isFriend = data.friends.includes(user.name);
        const isFollowing = data.following.includes(user.name);

        // Create buttons dynamically
        let friendButton = isFriend 
            ? `<button class="friend-btn" disabled>✅ Friend</button>` 
            : `<button class="friend-btn" data-user="${user.name}">➕ Friend</button>`;
        
        let followButton = isFollowing 
            ? `<button class="follow-btn" disabled>👀 Following</button>` 
            : `<button class="follow-btn" data-user="${user.name}">👀 Follow</button>`;

        userEntry.innerHTML = `
            <p>👤 ${user.name}</p>
            ${friendButton} ${followButton}
        `;
        return userEntry;
    }

    users.forEach(user => {
        let userElement = createUserElement(user);

        // Keep users visible in "Users" section
        usersDiv.appendChild(userElement.cloneNode(true));

        // Show in Friends section if they are a friend
        if (data.friends.includes(user.name)) friendsDiv.appendChild(userElement.cloneNode(true));

        // Show in Following section if they are being followed
        if (data.following.includes(user.name)) followingDiv.appendChild(userElement.cloneNode(true));
    });
}
// Ensure click events work for buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('friend-btn')) {
        toggleFriend(event.target.getAttribute('data-user'));
    } else if (event.target.classList.contains('follow-btn')) {
        toggleFollow(event.target.getAttribute('data-user'));
    }
});


// === Ensure Users Load on Page Refresh === //
document.addEventListener('DOMContentLoaded', () => {
    displayUsers();
});

function displayUsers() {
    let users = getUsers();
    let data = getFriendshipData();

    const friendsDiv = document.getElementById('friends-list');
    const followingDiv = document.getElementById('following-list');
    const usersDiv = document.getElementById('users-list');

    if (!friendsDiv || !followingDiv || !usersDiv) {
        console.error("One or more user sections are missing!");
        return;
    }

    // Clear previous content
    friendsDiv.innerHTML = '<h3>👫 Friends</h3>';
    followingDiv.innerHTML = '<h3>🔔 Following</h3>';
    usersDiv.innerHTML = '<h3>🌎 All Users</h3>';

    function createUserElement(user) {
        let userEntry = document.createElement('div');
        userEntry.classList.add('user-entry');
        
        // Check if the user is a friend or following
        const isFriend = data.friends.includes(user.name);
        const isFollowing = data.following.includes(user.name);

        // Create dynamic buttons for friending & following
        let friendButton = `<button class="friend-btn" data-user="${user.name}">
            ${isFriend ? '❌ Unfriend' : '➕ Friend'}
        </button>`;

        let followButton = `<button class="follow-btn" data-user="${user.name}">
            ${isFollowing ? '🚫 Unfollow' : '👀 Follow'}
        </button>`;

        userEntry.innerHTML = `
            <p>👤 ${user.name}</p>
            ${friendButton} ${followButton}
        `;
        return userEntry;
    }

    users.forEach(user => {
        let userElement = createUserElement(user);

        // Keep users visible in "Users" section
        usersDiv.appendChild(userElement.cloneNode(true));

        // Show in Friends section if they are a friend
        if (data.friends.includes(user.name)) friendsDiv.appendChild(userElement.cloneNode(true));

        // Show in Following section if they are being followed
        if (data.following.includes(user.name)) followingDiv.appendChild(userElement.cloneNode(true));
    });
}

function toggleFriend(friendName) {
    let data = getFriendshipData();

    if (data.friends.includes(friendName)) {
        // If already a friend, remove from friends list
        data.friends = data.friends.filter(name => name !== friendName);
    } else {
        // Otherwise, add as a friend
        data.friends.push(friendName);
    }

    saveFriendshipData(data);
    displayUsers(); // Refresh UI
}

function toggleFollow(userName) {
    let data = getFriendshipData();

    if (data.following.includes(userName)) {
        // If already following, remove from following list
        data.following = data.following.filter(name => name !== userName);
    } else {
        // Otherwise, add as following
        data.following.push(userName);
    }

    saveFriendshipData(data);
    displayUsers(); // Refresh UI
}

 




window.onload = checkLoginStatus;

setInterval(updateClock, 1000);
updateClock();
