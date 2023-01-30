import { Controller } from "@hotwired/stimulus"

export default class extends Controller
{
    favorite() {
        if (this.element.dataset.favorited === 'true') {
            this.element.dataset.favorited = 'false';
            this.element.setAttribute('fill', '#CED4DA');
        } else {
            this.element.setAttribute('fill', '#F47174');
            this.element.dataset.favorited = 'true';
        }
    }
}