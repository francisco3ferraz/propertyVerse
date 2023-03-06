import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

    share(e) 
    {
        // Prevent the default event behavior.
        e.preventDefault();

        // Click the share modal trigger.
        document.getElementById('share-modal-trigger').click();
    }
}