import { Controller } from "@hotwired/stimulus"

export default class extends Controller
{
    favorite() {
        if (this.element.dataset.favorited === 'true') {
            this.element.dataset.favorited = 'false';
            this.element.setAttribute('fill', 'rgba(0, 0, 0, 0.5)');
        } else {
            this.element.setAttribute('fill', '#F47174');
            this.element.dataset.favorited = 'true';
        }
    }
}