import {
	LitElement,
	html,
	css
} from 'lit-element';

export default class TodoForm extends LitElement {
	static get styles() {
		return css`
			fieldset {
				border: 1px solid #ccc;
			}
			fieldset > * {
				box-sizing: border-box;
				display: block;
				margin: 1rem 0;
				padding: 10px;
				font: normal 16px Arial, sans-serif;
			}
			fieldset > input, fieldset > textarea {
				width: 50%;
				border: 1px solid #ccc;
				border-radius: 3px;
			}
			fieldset > button {
				background: #eee;
				border: 1px solid #ccc;
				padding: 5px 10px;
			}
		`;
	}

	static get properties() {
		return {
			title: { type: String },
			desc: { type: String }
		};
	}

	constructor() {
		super();
		this.title = '';
		this.desc = '';
	}

	updateProperty(prop, val) {
		this[prop] = val;
	}

	saveNewTodo() {
		this.dispatchEvent(new CustomEvent('save-todo', {
			bubbles: true,
			composed: true,
			detail: {
				title: this.title,
				description: this.desc
			}
		}));
	}

	render() {
		return html`
			<fieldset>
				<input 
					type="text" 
					id="title" 
					.value="${this.title}"
					@blur="${e => this.updateProperty('title', e.target.value)}"
				/>
				<textarea 
					id="description" 
					.value="${this.desc}"
					@blur="${e => this.updateProperty('desc', e.target.value)}"
				></textarea>
				<button type="button" id="save-btn" @click="${this.saveNewTodo}">Save</button>
			</fieldset>
		`;
	}
}

customElements.define('todo-form', TodoForm);
