document.getElementById('circleInput').addEventListener('click', function() {
    document.getElementById('ImageUpload').click(); // Trigger the file input click
});

document.getElementById('ImageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result; // Set the image source
        }
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});
