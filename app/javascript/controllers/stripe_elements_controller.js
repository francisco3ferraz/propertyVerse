import { Controller } from '@hotwired/stimulus'

export default class extends Controller
{
    // CSS classes for the submit button.
    submitButtonClasses = "mt-4 w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 cursor-pointer";

    // Add classes to the Stripe form elements.
    connect()
    {
        // Add "hidden" class to the Stripe form label.
        this.getStripeFormLabel().classList.add('hidden');

        // Add "mt-4" class to the Stripe card element.
        this.getStripeCardElement().classList.add('mt-4');

        // Add the submitButtonClasses to the Stripe submit button's class name.
        this.getStripeSubmitButton().className += this.submitButtonClasses;
    }

    // Get the Stripe card element.
    getStripeCardElement() {
        return document.getElementById('card-element');
    }

    // Get the Stripe submit button.
    getStripeSubmitButton() {
        return document.querySelector('#stripe-form input[type="submit"]');
    }

    // Get the Stripe form label.
    getStripeFormLabel() {
        return document.querySelector('label[for="card_element"]');
    }
}
