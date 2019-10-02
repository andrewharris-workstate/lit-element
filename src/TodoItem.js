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
				margin: 20px 0;
			}
			.todo__title {
				font-weight: 600;
			}
			.todo__title:after {
				content: " - ";
			}
			.todo__desc {
				display: inline;
				margin: 0;
				font-family: Arial, sans-serif;
				white-space: pre-wrap;
				word-wrap: break-word;
			}
			.todo__done {
				display: block;
				background: #eee;
				margin-top: 10px;
			}
		`;
	}

	static get properties() {
		return {
			title: { type: String },
			description: { type: String },
			isDone: { type: Boolean, reflect: true },
		};
	}

	constructor() {
		super();
		this.title = '';
		this.description = '';
		this.isDone = false;
	}

	removeItem() {
		this.isDone = true;
		setTimeout(() => {
			this.dispatchEvent(
				new CustomEvent('delete-todo', {
					bubbles: true,
					detail: {
						id: this.getAttribute('todo-id')
					}
				})
			);
		}, 300);
	}

	updated(changedProps) {
		/**
		 * implemented this workaround because 
		 * https://stackoverflow.com/questions/55962214/litelement-not-updating-checkbox-in-list
		 * solution (adding property binding) does not work
		 */
		if (changedProps.has('isDone')) {
			setTimeout(() => {
				this.shadowRoot.getElementById('done').checked = false;
			}, 300);
		}
	}

	render() {
		return html`
			<li>
				<span class="todo__title">${this.title}</span>
				<pre class="todo__desc">${this.description}</pre>
				<label class="todo__done">
					<input
						id="done"
						type="checkbox" 
						@change=${this.removeItem}
						.checked=${this.isDone}
					/>Done
				</label>
			</li>
		`;
	}
}

customElements.define('todo-item', TodoItem);
