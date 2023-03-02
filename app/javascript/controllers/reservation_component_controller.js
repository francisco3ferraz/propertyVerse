import { Controller } from '@hotwired/stimulus';
import { Datepicker } from 'vanillajs-datepicker';

export default class extends Controller
{
    static targets = ['checkin', 'checkout'];
    connect()
    {
        let checkinPicker = new Datepicker(this.checkinTarget, { 
            minDate: '3/2/2023'
        });

        checkinPicker.setOptions({
            minDate: '4/2/2023'
        });

        checkinPicker.setOptions({
            minDate: '5/2/2023'
        });

    }
}