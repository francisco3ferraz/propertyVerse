import { Controller } from '@hotwired/stimulus';
import { Datepicker } from 'vanillajs-datepicker';

export default class extends Controller
{
    static targets = ['checkin', 'checkout'];

    connect()
    {
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
        });

        // Listen for changes in the checkout date picker and update checkin picker accordingly
        this.checkoutTarget.addEventListener('changeDate', (e) => {
            const date = new Date(e.target.value);
            date.setDate(date.getDate() - 1);
            checkinPicker.setOptions({
                maxDate: date
            });
        });
    }
}