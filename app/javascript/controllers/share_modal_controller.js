import { Controller } from '@hotwired/stimulus'

export default class extends Controller
{

    // Copy current page URL to the clipboard.
    copyLink() 
    {
        navigator.clipboard.writeText(this.element.dataset.shareUrl);
    }

    // Share current page URL on WhatsApp.
    shareWhatsapp() 
    {
        // Get the current page URL.
        var x = document.URL;

        // Open WhatsApp with the page URL as the shared text.
        window.location.href = "https://web.whatsapp.com/send?text="+x 
    }

}