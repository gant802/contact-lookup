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
const addNewContactButton = document.getElementById('add-new-contact');
const cancelButton = document.getElementById('cancel-button');
const form = document.getElementById('new-contact-form');
const allContactsContainerText = document.getElementById('all-contacts-container');
const viewContactsButton = document.getElementById('view-contacts');
const closeContactsButton = document.getElementById('close-contacts-button');

const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function searchForContact(input, array) {
    const matchingContacts = [];
    if (searchInput.value === "") {
        foundContactText.innerHTML = "";
        return;
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

const displayFoundContact = (contactFound) => {
    foundContactText.innerHTML = "";

    contactFound.forEach(contact => {
        foundContactText.innerHTML += `
        <div id="found-contact-innerHTML">
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
       return alert("Needs at least a first name, last name and mobile number!")
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

const displayAllContacts = () => {
    allContactsContainerText.innerHTML = '';
    
    contacts.forEach(contact => {
        allContactsContainerText.innerHTML += `
        <div class="all-contacts-innerHTML">
        <span><strong>${contact.firstName} ${contact.lastName}</strong></span>
        <div>
        <button type="button" id="edit-contact">Edit</button>
        <button type="button" id="delete-contact">Delete</button>
        </div>
        </div>`
    })
};

viewContactsButton.addEventListener("click", function (event) {
    event.preventDefault();
    closeContactsButton.style.display = "block";
    allContactsContainerText.style.display = "block";
    displayAllContacts();
})

closeContactsButton.addEventListener("click", function() {
    closeContactsButton.style.display = "none";
    allContactsContainerText.style.display = "none";
})

searchButton.addEventListener("click", function() {
    const userInput = searchInput.value.toLowerCase();
    let result = searchForContact(userInput, contacts); // Start searching from the first contact
    if (result) {
        displayFoundContact(result);
    } else {
        return alert("Cannot find contact")
    }
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addContact();
    clearContent();
    form.style.display = "none";
});

addNewContactButton.addEventListener("click", function() {
    allContactsContainerText.innerHTML = '';
    form.style.display = "block";
})

cancelButton.addEventListener("click", function() {
    form.style.display = "none";
})

console.log(contacts);


//next time, get all contacts to show at the bottom