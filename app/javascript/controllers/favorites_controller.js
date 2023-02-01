import { Controller } from "@hotwired/stimulus"
import axios from 'axios';

export default class extends Controller
{
    favorite() {

        if (this.element.dataset.userLoggedIn === 'false') {
            return document.querySelector('[data-header-target="userAuthLink"]').click();
        }

        if (this.element.dataset.favorited === 'true') {
            axios.delete(this.element.dataset.unfavoriteUrl, {     
                headers: {
                    'ACCEPT': 'application/json'
                }
            }).then((response) => {
                this.element.dataset.favorited = 'false';
                this.element.setAttribute('fill', 'rgba(0, 0, 0, 0.5)');
            })
        } else {
            axios.post(this.element.dataset.favoriteUrl, {
                user_id: this.element.dataset.userId,
                property_id: this.element.dataset.propertyId
            }, { 
                headers: {
                    'ACCEPT': 'application/json'
                }
            }).then((response) => {
                this.element.setAttribute('fill', '#F47174');
                this.element.dataset.favorited = 'true';
            });
        }
    }
}