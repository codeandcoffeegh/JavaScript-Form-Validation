//input fields
const firstName = document.getElementById('firstName');
const LastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const address = document.getElementById('address');
const phoneNumber = document.getElementById('phoneNumber');

//form
const form = document.getElementById('signUp');

//validation colours
const green = '#4CAF50';
const red = '#F44336';

//function validate firstName
function validateFirstName() {
    //check if empty
    if (checkIfEmpty(firstName)) return;
    //check if it has only letters
    if (!checkIfOnlyLetters(firstName)) return;
    return true;
}

//function validate lastName
function validateLastName() {
    //check if empty
    if (checkIfEmpty(lastName)) return;
    //check if it has only letters
    if (!checkIfOnlyLetters(lastName)) return;
    return true;
}

//function validate address
function validateAddress() {
    //check if empty
    if (checkIfEmpty(address)) return;
    //check if it has only letters and numbers + space
    if (!checkIfOnlyLettersNumbers(address)) return;
    return true;
}

//function validate password
function validatePassword() {
    //check if empty
    if (checkIfEmpty(password)) return;
    //check length
    if (!meetLength(password, 8, 40)) return;
    //check if it has letters + numbers + characters
    if (!containsCharacters(password, 4)) return;
    return true;
}

//validate confirm passowrd
function validateConfirmPassword() {
    if (password.className !== 'valid') {
        setInvalid(confirmPassword, `Password must be vaild`);
        return;
    }
    //check if they match
    if (password.value !== confirmPassword.value) {
        setInvalid(confirmPassword, `passwords must match`);
        return;
    } else {
        setValid(confirmPassword);
        return true;
    }
}
//validate number
function validateNumber() {
    if (checkIfEmpty(phoneNumber)) return;
    //check if it meets the length
    if (!meetLength) return;
    //check if only numbers
    if (!onlyNumbers(phoneNumber)) return;
    return true;
}

//validate email
function validateEmail() {
    if (checkIfEmpty(email)) return;
    if (!containsCharacters(email, 5)) return;
}



//Utility functions - reusable accross the other validation functions
//check if field value is empty then set valid
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        //set invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        //set field valid
        setValid(field);
        return false;
    }
}

//check if value is empty
function isEmpty(value) {
    if (value === '') return true;
    return false;
}

//set invalid function
function setInvalid(field, message) {
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}

//set valid function
function setValid(field) {
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    //field.nextElementSibling.style.color = green;
}

//check if only letters
function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
    }
}
//check if it has both numbers and letters
function checkIfOnlyLettersNumbers(field) {
    if (/^[A-Za-z0-9\s]*$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters and numbers`);
        return false;
    }
}

//check if only numbers
function onlyNumbers(field) {
    if (/^\d+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only numbers`);
        return false;
    }
}


//fucntion to check lengh of characters
function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(field, `${field.name} must be atleast ${minLength} characters long`);
        return false;
    } else {
        setInvalid(field, `${field.name} must be shorter than ${maxLength} characters`);
        return false;
    }
}

//function to check which characters are in the input field
function containsCharacters(field, code) {
    let regEx;
    switch (code) {
        case 1:
            //letters
            regEx = /(?=.*[a-zA-Z])/;
            return mathWithRegEx(regEx, field, `must contain atleast one letter`);
        case 2:
            //letters and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return mathWithRegEx(regEx, field, `must contain atleast one letter and one number`);
        case 3:
            //One upper case and one lower case and one number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return mathWithRegEx(regEx, field, `must contain atleast one upper case, one lower case and one number`);
        case 4:
            //One upper case and one lower case and one number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return mathWithRegEx(regEx, field, `must contain atleast one upper case, one lower case, 
                    one number and one symbol`);
        case 5:
            //One upper case and one lower case and one number
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return mathWithRegEx(regEx, field, ` must be a valid email`);
        default:
            return false;
    }
}

function mathWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}