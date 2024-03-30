const scriptURL = 'https://script.google.com/macros/s/AKfycbzghC3UdO-QTNTnU21QakWNdVwLLr6GY80qnfdmvFcdCUzutfpjKFmUejc5Zn0ChtGeJQ/exec';
const form = document.forms['contact-form'];
const submitButton = document.querySelector('input[type="submit"]');

form.addEventListener('submit', e => {
    e.preventDefault();
    submitButton.disabled = true;
    const formData = new FormData(form);
    const imageFile = document.getElementById('image-upload').files[0];

    // Read image file as data URL
    const reader = new FileReader();
    reader.onloadend = function() {
        formData.append('base64Image', reader.result.split(',')[1]); // Extract base64 encoded image data
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    alert("Thank you! Your form is submitted successfully.");
                    window.location.reload();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => console.error('Error!', error.message));
    }
    reader.readAsDataURL(imageFile);
});
