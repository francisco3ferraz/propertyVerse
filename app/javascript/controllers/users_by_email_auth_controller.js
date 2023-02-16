import { Controller } from '@hotwired/stimulus';
import axios from 'axios';

// exporta a classe como o controller padrão
export default class extends Controller 
{
    // declara os elementos HTML a serem manipulados pelo controlador
    static targets = ['email', 'emailWrapper', 'submit', 'invalidSvg', 'invalidMsg'];

    // método chamado quando o controlador é conectado a uma página
    connect()
    {
        // adicionar event listener de um click ao butao submit
        this.submitTarget.addEventListener('click', (e) => {
            // previne o envio do formulário)
            e.preventDefault();

            // verifica se o valor do campo de email é vazio
            if (this.emailTarget.value.length === 0) {
                // adiciona as classes CSS para marcar o campo de email como inválido
                this.emailWrapperTarget.classList.add('invalid-inset-input-text-field');
                this.emailTarget.classList.add('invalid-inset-input-text-field');
                this.emailWrapperTarget.classList.remove('focus:ring-blue-500');
                this.emailWrapperTarget.classList.remove('focus:border-blue-500');
                this.invalidSvgTarget.classList.remove('hidden');
                this.invalidMsgTarget.classList.remove('hidden');
            } else {
                // realiza um request GET ao endpoint "/api/users_by_email"
                // passando o valor do campo de email como parâmetro
                axios.get('/api/users_by_email', {
                    params: {
                        email: this.emailTarget.value
                    },
                    headers: {
                        'ACCEPT': 'application/json'
                    }
                })
                // se a requisição for bem-sucedida, redireciona para "/users/sign_in"
                .then((response) => {
                    Turbo.visit('/users/sign_in');
                })
                // se a requisição falhar, redireciona para "/users/sign_up"
                .catch((response) => {
                    Turbo.visit('/users/sign_up');
                });
            }
        });
    }
}
