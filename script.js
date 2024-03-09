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

const contacts = [
    {
        firstName: "Quinn",
        lastName: "O'reilly",
        mobileNumber: 8028640201,
        email: "oreillyqb@gmail.com",
        address: {
            street: "39 Maple Street",
            appartmentNumber: "B",
            city: "Winooski",
            state: "Vermont",
            zipCode: "05404"
        }
    },
    {
        firstName: "Brennan",
        lastName: "Fitzpatrick",
        mobileNumber: 8024469087,
        email: "Fitzy7@gmail.com",
        address: {
            street: "44 Allen Drive",
            appartmentNumber: "",
            city: "South Burlington",
            state: "Vermont",
            zipCode: "05403"
        }
    }
];


function searchForContact(input, obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            const result = searchForContact(input, obj[key]); // Recursively search nested objects
            if (result) {
                return obj;
            }
        } else {
            const formattedValue = obj[key].toString().toLowerCase();
            if (formattedValue.includes(input)) {
                return obj;
            }
        } 
    }
    return null;
}

searchButton.addEventListener("click", function() {
    const input = searchInput.value.toLowerCase();
    for (let i = 0; i < contacts.length; i++) {
    let result = searchForContact(input, contacts[i]); // Start searching from the first contact
    if (result) {
        console.log(result);
    } else if (i === contacts.length - 1){
        return console.log("Cannot find contact")
    }
} 
});

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
        console.log(contacts);
    } else {
        console.log("Needs at least a first name, last name and mobile number!")
    }
};


submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addContact();
});

console.log(contacts);

//When you come back to this, add it to github and use local storage to save data.