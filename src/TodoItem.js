import {
	LitElement,
	html,
	css
} from 'lit-element';

export default class TodoItem extends LitElement {
	static get styles() {
		return css`
			:host {
				display: block;
			}
			.todo__title {
				font-weight: 600;
			}
			.todo__title:after {
				content: " - ";
			}
		`;
	}

	static get properties() {
		return {
			title: { type: String },
			description: { type: String }
		};
	}

	constructor() {
		super();
		this.title = '';
		this.description = '';
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem() {
		setTimeout(() => this.remove(), 300);
	}

	render() {
		return html`
			<span class="todo__title">${this.title}</span>
			<span class="todo__description">${this.description}</span>
			<input 
				type="checkbox" 
				id="done"
				@change="${this.removeItem}"
			/>Done
		`;
	}
}

customElements.define('todo-item', TodoItem);
