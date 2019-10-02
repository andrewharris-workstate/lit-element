import { 
	LitElement, 
	html 
} from 'lit-element';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export default class TodoApp extends LitElement {
	static get properties() {
		return {
			todos: { type: Array },
			localStorage: { type: Object },
		};
	}

	constructor() {
		super();
		this.localStorage = typeof window !== 'undefined' && window.localStorage;
		this.todos = this.getTodosFromLocalStorage();
	}

	getTodosFromLocalStorage() {
		try {
			const todos = JSON.parse(this.localStorage.getItem('todos'));

			if (!Array.isArray(todos)) throw new Error;
			
			return todos;
		} catch (e) {
			return [];
		}
	}

	addTodo(e) {
		this.todos.push(e.detail);
		this.setTodos();
		this.requestUpdate();
	}

	deleteTodo(e) {
		const { detail } = e;
		this.todos = this.todos.filter((item, i) => i.toString() !== detail.id);
		this.setTodos();
		this.requestUpdate();
	}

	setTodos() {
		this.localStorage.setItem('todos', JSON.stringify(this.todos));
	}

	firstUpdated(changedProps) {
		this.addEventListener('save-todo', this.addTodo);
		this.addEventListener('delete-todo', this.deleteTodo);
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<h1>Todo List</h1>
			<todo-form></todo-form>
			<ul id="todos">
				${this.todos.map((item, i) => 
					html`<todo-item 
						todo-id=${i}
						title=${item.title}
						description=${item.description}
						?isDone=${item.isDone}
					></todo-item>`)}
			</ul>
		`;
	}
}

customElements.define('todo-list', TodoApp);
