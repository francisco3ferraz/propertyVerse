import { Controller } from '@hotwired/stimulus';
import axios from 'axios';

export default class extends Controller 
{
    static targets = ['email', 'emailWrapper', 'submit', 'invalidSvg', 'invalidMsg'];

    connect()
    {
        this.submitTarget.addEventListener('click', (e) => {
            e.preventDefault();

            if (this.emailTarget.value.length === 0) {
                this.emailWrapperTarget.classList.add('invalid-inset-input-text-field');
                this.emailTarget.classList.add('invalid-inset-input-text-field');
                this.emailWrapperTarget.classList.remove('focus:ring-blue-500');
                this.emailWrapperTarget.classList.remove('focus:border-blue-500');
                this.invalidSvgTarget.classList.remove('hidden');
                this.invalidMsgTarget.classList.remove('hidden');
            } else {
                axios.get('/api/users_by_email', {
                    params: {
                        email: this.emailTarget.value
                    },
                    headers: {
                        'ACCEPT': 'application/json'
                    }
                }).then((response) => {
                    Turbo.visit('/users/sign_in');
                }).catch((response) => {
                    Turbo.visit('/users/sign_up');
                });
            }
        });
    }

}