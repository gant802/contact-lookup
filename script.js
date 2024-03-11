const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button')
const firstNameText = document.getElementById('first-name');
const lastNameText = document.getElementById('last-name');
const mobileNumberText = document.getElementById('mobile-number');
const emailText = document.getElementById('email');
const streetText = document.getElementById('street');
const appartmentNumberText = document.getElementById('appartment-number');
const cityText = document.getElementById('city');
const stateText = document.getElementById('state');
const zipCodeText = document.getElementById('zip-code');
const submitButton = document.getElementById('submit-button');

const foundContactText = document.getElementById('found-contact');

const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function searchForContact(input, array) {
    const matchingContacts = [];
    if (searchInput.value === "") {
        foundContactText.innerHTML = "";
        return
    };
    for (let contact of array) {
        for (let key in contact) {
            if (typeof contact[key] === 'object') {
                // Recursively search nested objects
                const result = searchForContact(input, [contact[key]]); // Convert nested object to array for recursion
                if (result && result.length > 0) {
                    matchingContacts.push(contact);
                }
            } else {
                const formattedValue = contact[key].toString().toLowerCase();
                if (formattedValue.includes(input)) {
                    matchingContacts.push(contact);
                    break; // Stop searching this contact once a match is found
                }
            }
        }
    }
    return matchingContacts.length > 0 ? matchingContacts : false; // Return array of matching contacts or returns false if no matches
};

searchButton.addEventListener("click", function() {
    const userInput = searchInput.value.toLowerCase();
    let result = searchForContact(userInput, contacts); // Start searching from the first contact
    if (result) {
        displayFoundContact(result);
    } else {
        return alert("Cannot find contact")
    }
});

const displayFoundContact = (contactFound) => {
    foundContactText.innerHTML = "";

    contactFound.forEach(contact => {
        foundContactText.innerHTML += `
        <div id="found-contact-innerHTML" style="border: 1px solid black; border-radius: 10px; width: 400px; padding: 5px;">
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Number:</strong> ${contact.mobileNumber}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Address:</strong> ${contact.address.street} ${contact.address.appartmentNumber}, ${contact.address.city}, ${contact.address.state} ${contact.address.zipCode}</p>
        </div>
        `  
    }) 
}

function addContact() {
    let contactObj = {
        firstName: firstNameText.value,
        lastName: lastNameText.value,
        mobileNumber: mobileNumberText.value,
        email: emailText.value,
        address: {
            street: streetText.value,
            appartmentNumber: appartmentNumberText.value,
            city: cityText.value,
            state: stateText.value,
            zipCode: zipCodeText.value
        }
    };
    if (firstNameText.value !== '' && lastNameText.value !== '' && mobileNumberText.value !== '') {
        contacts.push(contactObj);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        console.log(contacts);
    } else {
        console.log("Needs at least a first name, last name and mobile number!")
    }
};

function clearContent() {
    firstNameText.value = "";
    lastNameText.value = "";
    mobileNumberText.value = "";
    emailText.value = "";
    streetText.value = "";
    appartmentNumberText.value = "";
    cityText.value = "";
    stateText.value = "";
    zipCodeText.value = "";
}


submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addContact();
    clearContent();
});

console.log(contacts);


//next time, get the found contact to pop up and all contacts to show at the bottom