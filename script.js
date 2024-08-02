document.addEventListener('DOMContentLoaded', function() {
    const lengthRange = document.getElementById('length-range');
    const lengthDisplay = document.getElementById('length-display');
    const passwordInput = document.getElementById('field-box');

    // Check if the elements are present
    if (!lengthRange || !lengthDisplay || !passwordInput) {
        console.error('Required DOM elements are missing.');
        return;
    }

    function updateLengthDisplay() {
        lengthDisplay.textContent = lengthRange.value;
    }
    
    function generatePassword() {
        const length = parseInt(lengthRange.value);
        const includeUppercase = document.getElementById('uppercase').checked;
        const includeLowercase = document.getElementById('lowercase').checked;
        const includeNumbers = document.getElementById('numbers').checked;
        const includeSpecialChars = document.getElementById('special-characters').checked;

        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let charset = '';
        if (includeUppercase) charset += upperChars;
        if (includeLowercase) charset += lowerChars;
        if (includeNumbers) charset += numberChars;
        if (includeSpecialChars) charset += symbolChars;

        if (charset.length === 0) {
            alert('Please select at least one character type.');
            return '';
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        return password;
    }
    
    function updatePassword() {
        passwordInput.value = generatePassword();
    }

    lengthRange.addEventListener('input', updateLengthDisplay);
    document.querySelector('.refresh-icon').addEventListener('click', updatePassword);
    document.querySelector('.copy-btn').addEventListener('click', function() {
        navigator.clipboard.writeText(passwordInput.value).then(function() {
            alert('Password copied to clipboard!');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    });

    // Initialize UI
    updateLengthDisplay();
    updatePassword();
});
