import { Controller } from '@hotwired/stimulus';
import axios from 'axios';

export default class extends Controller 
{
    // declares the HTML elements to be manipulated by the controller
    static targets = ['email', 'emailWrapper', 'submit', 'invalidSvg', 'invalidMsg'];

    // method called when the controller is connected to a page
    connect()
    {
        // adds a click event listener to the submit button
        this.submitTarget.addEventListener('click', (e) => {
            // prevents the form from being submitted
            e.preventDefault();

            // checks if the value of the email field is empty
            if (this.emailTarget.value.length === 0) {
                // adds CSS classes to mark the email field as invalid
                this.emailWrapperTarget.classList.add('invalid-inset-input-text-field');
                this.emailTarget.classList.add('invalid-inset-input-text-field');
                this.emailWrapperTarget.classList.remove('focus:ring-blue-500');
                this.emailWrapperTarget.classList.remove('focus:border-blue-500');
                this.invalidSvgTarget.classList.remove('hidden');
                this.invalidMsgTarget.classList.remove('hidden');
            } else {
                // makes a GET request to the "/api/users_by_email" endpoint,
                // passing the value of the email field as a parameter
                axios.get('/api/users_by_email', {
                    params: {
                        email: this.emailTarget.value
                    },
                    headers: {
                        'ACCEPT': 'application/json'
                    }
                })
                // if the request succeeds, redirect to "/users/sign_in"
                .then((response) => {
                    Turbo.visit('/users/sign_in');
                })
                // if the request fails, redirect to "/users/sign_up"
                .catch((response) => {
                    Turbo.visit('/users/sign_up');
                });
            }
        });
    }

}
