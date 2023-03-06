import { Controller } from '@hotwired/stimulus';
import { Datepicker } from 'vanillajs-datepicker';
import { isEmpty } from 'lodash-es'
import Swal from 'sweetalert2';

export default class extends Controller
{
    // Define the targets used in this controller
    static targets = ['checkin', 'checkout', 'numOfNights', 'nightlyTotal', 'serviceFee', 'total'];
    connect()
    {
        // Initialize date pickers and set default minimum dates for checkin and checkout
        const checkinPicker = new Datepicker(this.checkinTarget, {
            minDate: this.element.dataset.defaultCheckinDate
        });

        const checkoutPicker = new Datepicker(this.checkoutTarget, {
            minDate: this.element.dataset.defaultCheckoutDate
        });

        // Listen for changes in the checkin date picker and update checkout picker accordingly
        this.checkinTarget.addEventListener('changeDate', (e) => {
            const date = new Date(e.target.value);
            date.setDate(date.getDate() + 1);
            checkoutPicker.setOptions({
                minDate: date
            });
            this.updateNightlyTotal();
        });

        // Listen for changes in the checkout date picker and update checkin picker accordingly
        this.checkoutTarget.addEventListener('changeDate', (e) => {
            const date = new Date(e.target.value);
            date.setDate(date.getDate() - 1);
            checkinPicker.setOptions({
                maxDate: date
            });
            this.updateNightlyTotal();
        });
    }  

    // Calculate the nightly total based on the number of nights and nightly price
    calculateNightlyTotal() 
    {
        return this.numberOfNights() * this.element.dataset.nightlyPrice;
    }

    // Update the nightly total element and the service fee element
    updateNightlyTotal() 
    {
        this.numOfNightsTarget.textContent = this.numberOfNights();
        this.nightlyTotalTarget.textContent = this.calculateNightlyTotal();
        this.updateServiceFee();
    }

    // Calculate the service fee based on the nightly total and service fee percentage
    calculateServiceFee() 
    {
        return (this.calculateNightlyTotal() * this.element.dataset.serviceFeePercentage).toFixed(2);
    }

    // Update the service fee element and the total element
    updateServiceFee() 
    {
        this.serviceFeeTarget.textContent = this.calculateServiceFee();
        this.updateTotal();
    }

    // Calculate the total based on the nightly total, cleaning fee, and service fee
    calculateTotal() 
    {
        return (+this.calculateNightlyTotal() + +this.element.dataset.cleaningFee + +this.calculateServiceFee()).toFixed(2);
    }

    // Update the total element
    updateTotal() 
    {
        this.totalTarget.textContent = this.calculateTotal();
    }

    // Calculate the number of nights between checkin and checkout dates
    numberOfNights() {
        if (isEmpty(this.checkinTarget.value) || isEmpty(this.checkoutTarget.value)) {
            return 0;
        }
        const checkinDate = new Date(this.checkinTarget.value);
        const checkoutDate = new Date(this.checkoutTarget.value);

        return (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
    }

    // Build a URLSearchParams object containing reservation parameters
    buildReservationParams()
    {
        // Construct an object with properties representing different values.
        const params = {
            checkin_date: this.checkinTarget.value,
            checkout_date: this.checkoutTarget.value,
            subtotal: this.calculateNightlyTotal(),
            cleaning_fee: this.element.dataset.cleaningFee,
            service_fee: this.calculateServiceFee(),
            total: this.calculateTotal(),
        };
    
        // Create a new URLSearchParams object from the params object and convert it to a string.
        const searchParams = new URLSearchParams(params);
        return searchParams.toString();
    }
    

    // This function builds the URL with the reservation parameters and a base URL.
    buildSubmitUrl(url) 
    {
        return `${url}?${this.buildReservationParams()}`;
    }
    

    // This function submits the reservation component with a Turbo visit to the submit URL.
    submitReservationComponent(e)
    {
        // Check if the check-in and check-out dates are empty and show an error message if so.
        if (isEmpty(this.checkinTarget.value) || isEmpty(this.checkoutTarget.value) ) {
            Swal.fire({
                text: 'Please select the checkin and checkout date.',
                icon: 'error',
            });
            return;
        }
        // Visit the submit URL with the reservation parameters.
        Turbo.visit(this.buildSubmitUrl(e.target.dataset.submitUrl));
    }

}