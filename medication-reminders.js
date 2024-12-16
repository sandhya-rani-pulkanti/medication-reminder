document.getElementById("reminderForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const medName = document.getElementById("med-name").value.trim();
    const dose = document.getElementById("dose").value.trim();
    const frequency = document.getElementById("frequency").value.trim();
    const time = document.getElementById("time").value.trim();
    const duration = document.getElementById("duration").value.trim();

    if (medName && dose && frequency && time && duration) {
        const reminder = {
            medName,
            dose,
            frequency,
            time,
            duration,
        };

        // Add the reminder to the list
        addReminderToList(reminder);

        // Optionally, set a reminder alarm here (this part would depend on your alarm system)

        // Clear the form after submission
        document.getElementById("reminderForm").reset();
    }
});

function addReminderToList(reminder) {
    const remindersList = document.getElementById("remindersList");

    const reminderElement = document.createElement("div");
    reminderElement.classList.add("reminder-item");

    reminderElement.innerHTML = `
      <p><strong>${reminder.medName}</strong> - ${reminder.dose}mg</p>
      <p>Frequency: ${reminder.frequency}, Time: ${reminder.time}, Duration: ${reminder.duration} hours</p>
      <button class="delete-btn" onclick="deleteReminder(this)">Delete Reminder</button>
    `;

    remindersList.appendChild(reminderElement);
}

function deleteReminder(button) {
    const reminderItem = button.closest(".reminder-item");
    reminderItem.remove();
}
