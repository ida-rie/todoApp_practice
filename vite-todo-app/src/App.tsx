import { useState } from 'react';
import './App.css';
import { InputForm } from './components/InputForm';
import { Button } from './components/Button';

type Todos = {
	id: number;
	title: string;
	status: string;
};

function App() {
	const [todos, setTodos] = useState<Todos[]>([
		{
			id: 1,
			title: 'タスク1',
			status: 'complete',
		},
		{
			id: 2,
			title: 'タスク2',
			status: 'incomplete',
		},
	]);

	const [todoTitles, setTodoTitles] = useState<string>('');
	const [todoId, setTodoId] = useState<number>(0);

	const handleSetTodoTitles = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTodoTitles(event.target.value);
	};

	const resetTodoTitles = () => setTodoTitles('');

	const handleAddTodo = () => {
		const newTodos = [...todos, { id: todoId, title: todoTitles, status: 'incomplete' }];
		setTodos(newTodos);
		setTodoId((prev) => prev + 1);
		resetTodoTitles();
	};

	const handleDeleteTodo = (targetTodo: { id: number; title: string; status: string }) => {
		console.log(targetTodo);
		const deleteTodo = todos.filter((todo) => todo.id !== targetTodo.id);
		const newTodos = [...deleteTodo];
		setTodos(newTodos);
	};

	const handleEditTodo = () => {};

	return (
		<>
			<div className="container mx-auto p-8 max-w-lg md:max-w-2xl lg:max-w-4xl bg-white shadow-lg rounded-lg">
				<h1 className="text-3xl font-bold text-center text-blue-500 mb-4">Todo App</h1>

				{/* タスク入力フォーム */}
				<InputForm value={todoTitles} onChange={handleSetTodoTitles} onClick={handleAddTodo} />

				{/* タブメニュー */}
				<div className="flex justify-center gap-4 mt-6 flex-wrap">
					<button className="px-6 py-3 rounded-lg shadow-md text-white transition-colors bg-yellow-400 hover:bg-yellow-300">
						ALL
					</button>
					<button className="bg-blue-500 hover:bg-blue-400">サンプル</button>
				</div>

				{/* タスクリスト */}
				<div className="mt-8">
					<ul className="space-y-4">
						{todos.map((todo) => (
							<li
								key={todo.id}
								className="flex flex-col md:flex-row md:items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
							>
								<label className="flex items-center space-x-3">
									<input type="checkbox" className="form-checkbox h-6 w-6 text-blue-500" />
									<span className="text-gray-700 text-lg">{todo.title}</span>
								</label>
								<div className="space-x-3 mt-2 md:mt-0">
									<Button
										label="編集"
										className="text-blue-500 hover:text-blue-400"
										onClick={handleEditTodo}
									/>
									<Button
										label="削除"
										className="text-red-500 hover:text-red-400"
										onClick={() => handleDeleteTodo(todo)}
									/>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default App;
