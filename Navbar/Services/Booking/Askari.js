document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const formContent = document.getElementById('formContent');
    const serviceButtons = document.querySelectorAll('.service');
    const forms = document.querySelectorAll('.form');
    const closeBtn = document.getElementById('closeBtn');

    // Show the booking form and the first service form when the service button is clicked
    serviceBtn.addEventListener('click', function() {
        bookingForm.classList.remove('hidden'); // Show the booking form
        showForm('guardsForm'); // Show the first form by default
        console.log("Booking Form Open Succesfully")
    });

    // Function to show the appropriate form based on the button clicked
    function showForm(formId) {
        forms.forEach(form => form.classList.add('hidden')); // Hide all forms
        const selectedForm = document.getElementById(formId);
        selectedForm.classList.remove('hidden'); // Show the selected form
    }

    // Event listeners for service buttons
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove red color from all buttons
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            // Add red color to the clicked button
            button.classList.add('active');
            // Show the corresponding form
            showForm(button.dataset.service + 'Form'); // Show the corresponding form
        });
    });

    // Close button functionality
    closeBtn.addEventListener('click', function() {
        bookingForm.classList.add('hidden'); // Hide the booking form
    });
});
