// Get user data and create user buttons
fetch('https://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(users => {
		const usersContainer = document.querySelector('.users');
		users.forEach(user => {
			const button = document.createElement('button');
			button.textContent = user.username;
			button.addEventListener('click', () => {
				getUserTodos(user.id);
			});
			usersContainer.appendChild(button);
		});
	})
	.catch(error => console.log(error));

// Get user's todo list and display it
async function getUserTodos(userId) {
	try {
		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
		const todos = await response.json();
		const todoList = document.querySelector('.todo-list');
		todoList.innerHTML = '';
		todos.forEach(todo => {
			const todoItem = document.createElement('li');
			todoItem.textContent = todo.title;
			if (todo.completed) {
				todoItem.classList.add('completed');
			}
			todoList.appendChild(todoItem);
		});
	} catch (error) {
		console.log(error);
	}
}
