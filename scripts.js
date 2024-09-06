document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const contact = formData.get('contact');
        const qualification = formData.get('qualification');

        // Validate the name (only letters and spaces)
        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(name)) {
            alert('Name should only contain letters.');
            return;
        }

        // Validate the contact number (exactly 10 digits)
        const contactPattern = /^\d{10}$/;
        if (!contactPattern.test(contact)) {
            alert('Please enter a valid 10-digit contact number.');
            return;
        }

        // If validations pass, create data object
        const data = {
            name: name,
            contact: contact,
            qualification: qualification
        };

        // Send the form data to the server using fetch
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Success alert and form reset
            alert('Jazakallah Hu Khair!');
            console.log('Success:', data);
            form.reset();
        })
        .catch(error => {
            // Error handling
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        });
    });
});
