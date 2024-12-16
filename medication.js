document.addEventListener("DOMContentLoaded", function () {
    const medicationNameInput = document.getElementById("medication-name");
    const dosageInput = document.getElementById("dosage");
    const frequencyInput = document.getElementById("frequency");
    const reminderTimeInput = document.getElementById("reminder-time");
    const addReminderButton = document.getElementById("add-reminder");
    const reminderList = document.getElementById("reminder-items");

    const reminders = [];

    // Function to play the selected alarm sound
    const playAlarm = () => {
        const selectedAlarm = localStorage.getItem("selectedAlarm");
        if (!selectedAlarm) {
            alert("No alarm sound selected! Please select an alarm.");
            return;
        }
        const audio = new Audio(selectedAlarm);
        audio.play();
    };

    // Function to show a browser notification
    const showNotification = (message) => {
        if (Notification.permission === "granted") {
            new Notification("Medication Reminder", {
                body: message,
                icon: "https://cdn-icons-png.flaticon.com/512/2913/2913463.png",
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("Medication Reminder", {
                        body: message,
                        icon: "https://cdn-icons-png.flaticon.com/512/2913/2913463.png",
                    });
                }
            });
        }
    };

    // Function to add a new reminder
    const addReminder = () => {
        const medicationName = medicationNameInput.value.trim();
        const dosage = dosageInput.value.trim();
        const frequency = frequencyInput.value.trim();
        const reminderTime = reminderTimeInput.value;

        if (!medicationName || !reminderTime) {
            alert("Please fill out all required fields!");
            return;
        }

        const reminder = { medicationName, dosage, frequency, reminderTime };
        reminders.push(reminder);
        displayReminders();

        // Schedule the reminder
        const now = new Date();
        const reminderDate = new Date();
        const [hours, minutes] = reminderTime.split(":").map(Number);
        reminderDate.setHours(hours, minutes, 0, 0);

        const timeDifference = reminderDate - now;

        if (timeDifference >= 0) {
            setTimeout(() => {
                playAlarm();
                showNotification(`Time to take your medication: ${medicationName}`);
            }, timeDifference);
        } else {
            alert("The reminder time must be in the future!");
        }

        // Clear inputs
        medicationNameInput.value = "";
        dosageInput.value = "";
        frequencyInput.value = "";
        reminderTimeInput.value = "";
    };

    // Function to display reminders in the list
    const displayReminders = () => {
        reminderList.innerHTML = "";
        reminders.forEach((reminder, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${reminder.medicationName} - ${reminder.reminderTime}`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                reminders.splice(index, 1);
                displayReminders();
            });
            listItem.appendChild(deleteButton);
            reminderList.appendChild(listItem);
        });
    };

    // Event listener for adding reminders
    addReminderButton.addEventListener("click", addReminder);
});


document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const medicationName = document.getElementById("medication-name").value;
    const dosage = document.getElementById("dosage").value;
    const frequency = document.getElementById("frequency").value;
    const reminderTime = document.getElementById("reminder-time").value;
    const selectedDays = Array.from(document.querySelectorAll("#select-days input:checked"))
        .map((checkbox) => checkbox.value);
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    const reminder = {
        medicationName,
        dosage,
        frequency,
        reminderTime,
        selectedDays,
        startDate,
        endDate,
    };

    // Here, you can use this `reminder` object to store the reminder
    console.log(reminder); // For debugging

    // If you want to trigger an alarm based on this data, you'd need to integrate a time-check system with JavaScript's `setTimeout` or `setInterval`
});



