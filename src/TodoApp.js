import { 
	LitElement, 
	html 
} from 'lit-element';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export default class TodoApp extends LitElement {
	static get properties() {
		return {
			todos: { type: Array }
		};
	}

	constructor() {
		super();
		this.todos = [];
		this.addTodo = this.addTodo.bind(this);
	}

	addTodo(e) {
		this.todos.push(e.detail);
		this.requestUpdate();
	}

	firstUpdated(changedProps) {
		this.addEventListener('save-todo', this.addTodo);
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<h1>Todo List</h1>
			<todo-form></todo-form>
			<ul id="todos">
				${this.todos.map(i => 
					html`<todo-item 
						title="${i.title}"
						description="${i.description}"
					></todo-item>`)}
			</ul>
		`;
	}
}

customElements.define('todo-list', TodoApp);
