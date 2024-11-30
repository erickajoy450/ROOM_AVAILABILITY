// Open and close modal utilities
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function showRegister() {
    document.getElementById("registerModal").style.display = "flex";
}

function showLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function openScheduleModal() {
    document.getElementById("scheduleModal").style.display = "flex";
}

// Registration handler
function handleRegister(event) {
    event.preventDefault(); // Prevent page refresh

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    if (!role) {
        alert("Please select a role!");
        return;
    }

    // Retrieve existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("Username already exists. Please choose a different username.");
        return;
    }

    // Add the new user
    const newUser = { username, password, role };
    users.push(newUser);

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    closeModal("registerModal");
}


// Login handler
function handleLogin(event) {
    event.preventDefault(); // Prevent page refresh

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Retrieve existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username and password match any stored user
    const matchingUser = users.find(user => user.username === username && user.password === password);

    if (matchingUser) {
        alert(`Welcome, ${matchingUser.role}! Login successful.`);
        document.getElementById("authSection").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        closeModal("loginModal");
    } else {
        alert("Incorrect username or password. Please try again.");
    }
}


// Schedule submission handler
function submitSchedule(event) {
    event.preventDefault(); // Prevent page refresh

    const teacher = document.getElementById("teacher").value;
    const subject = document.getElementById("subject").value;
    const course = document.getElementById("course").value;
    const section = document.getElementById("section").value;
    const day = document.getElementById("day").value;
    const room = document.getElementById("room").value;
    const timeIn = document.getElementById("timeIn").value;
    const timeOut = document.getElementById("timeOut").value;

    // Create schedule object
    const newSchedule = { teacher, subject, course, section, day, room, timeIn, timeOut };

    // Retrieve existing schedules from localStorage
    let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    schedules.push(newSchedule);

    // Save updated schedules back to localStorage
    localStorage.setItem("schedules", JSON.stringify(schedules));

    // Update the table
    addScheduleToTable(newSchedule);

    alert("Schedule added successfully!");
    closeModal("scheduleModal");
}
function loadSchedules() {
    const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    schedules.forEach(schedule => addScheduleToTable(schedule));
}

function addScheduleToTable(schedule) {
    const tableBody = document.querySelector("#scheduleTable tbody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${schedule.teacher}</td>
        <td>${schedule.subject}</td>
        <td>${schedule.course}</td>
        <td>${schedule.section}</td>
        <td>${schedule.room}</td>
        <td>${schedule.day}</td>
        <td>${schedule.timeIn} - ${schedule.timeOut}</td>
        <td><button onclick="deleteSchedule(this)">Cancel</button></td>
    `;

    tableBody.appendChild(row);
}


// Delete schedule row
function deleteSchedule(button) {
    const row = button.parentElement.parentElement;
    const index = Array.from(row.parentElement.children).indexOf(row);

    // Remove schedule from localStorage
    let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    schedules.splice(index, 1);
    localStorage.setItem("schedules", JSON.stringify(schedules));

    // Remove the row from the table
    row.remove();
    alert("Schedule removed.");
}
// Load schedules when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadSchedules();
});


// Go back functionality
function goBack() {
    alert("Going back to the previous page."); // Replace with actual back navigation logic
}

function openSettings() {
    alert("Settings will open here."); // Placeholder for settings functionality
}

function openAbout() {
    alert("About information."); // Placeholder for about functionality
}