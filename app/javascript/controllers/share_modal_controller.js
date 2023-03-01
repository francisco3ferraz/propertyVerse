import { Controller } from '@hotwired/stimulus'

export default class extends Controller
{
    copyLink()
    {
        navigator.clipboard.writeText(this.element.dataset.shareUrl)
    }

    shareWhatsapp()
    {
        var x = document.URL
        window.location.href = "whatsapp://send?text="+x
    }

    shareFacebook()
    {
        console.log("aa")
    }

    shareTwitter()
    {
        console.log("aa")
    }
}