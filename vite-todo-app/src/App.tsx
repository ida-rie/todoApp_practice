import { useState } from 'react';
import { InputForm } from './components/InputForm';
import { Button } from './components/Button';
import { EditForm } from './components/EditForm';
import { Tab } from './components/Tab';
import './App.css';

type Todos = {
	id: number;
	title: string;
	completed: boolean;
};

function App() {
	const [todos, setTodos] = useState<Todos[]>([]);

	const [todoTitles, setTodoTitles] = useState<string>('');
	const [todoId, setTodoId] = useState<number>(0);
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [editId, setEditId] = useState<number>(0);
	const [newTodoTitles, setNewTodoTitles] = useState<string>('');
	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

	const handleSetTodoTitles = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTodoTitles(event.target.value);
	};

	const resetTodoTitles = () => setTodoTitles('');

	// todoの追加
	const handleAddTodo = () => {
		const newTodos = [...todos, { id: todoId, title: todoTitles, completed: false }];
		setTodos(newTodos);
		setTodoId((prev) => prev + 1);
		resetTodoTitles();
	};

	// todoの削除
	const handleDeleteTodo = (targetTodo: { id: number; title: string; completed: boolean }) => {
		const deleteTodo = todos.filter((todo) => todo.id !== targetTodo.id);
		const newTodos = [...deleteTodo];
		setTodos(newTodos);
	};

	// 編集フォームの表示
	const handleEditOpen = (targetTodo: { id: number; title: string; completed: boolean }) => {
		setIsEditable(true);
		setEditId(targetTodo.id);
		setNewTodoTitles(targetTodo.title);
	};

	// 編集フォームを閉じる
	const handleEditCancel = () => {
		setIsEditable(false);
		setEditId(0);
	};

	const handleSetNewTodoTitles = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitles(event.target.value);
	};

	// 編集したtodoタイトルを保存
	const handleEditTodo = (targetTodo: { id: number; title: string; completed: boolean }) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === targetTodo.id ? { ...todo, title: newTodoTitles } : todo
			)
		);
		setIsEditable(false);
		setEditId(0);
	};

	// 完了、未完了の切り替え
	const toggleComplete = (id: number) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
		);
	};

	// 完了、未完了でtodoリストをフィルタリング
	const filteredTodos = todos.filter((todo) => {
		if (filter === 'all') return true;
		if (filter === 'active') return !todo.completed;
		if (filter === 'completed') return todo.completed;
		return true;
	});

	return (
		<>
			<div className="container mx-auto p-8 max-w-lg md:max-w-2xl lg:max-w-4xl bg-white shadow-lg rounded-lg">
				<h1 className="text-3xl font-bold text-center text-blue-500 mb-4">Todo App</h1>

				{/* タスク入力フォーム */}
				<InputForm value={todoTitles} onChange={handleSetTodoTitles} onClick={handleAddTodo} />

				{/* タブメニュー */}
				<div className="flex justify-center gap-4 mt-6 flex-wrap">
					<Tab
						label="すべて"
						onClick={() => setFilter('all')}
						filter={filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}
					/>
					<Tab
						label="未完了"
						onClick={() => setFilter('active')}
						filter={filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}
					/>
					<Tab
						label="完了"
						onClick={() => setFilter('completed')}
						filter={filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}
					/>
				</div>

				{/* タスクリスト */}
				<div className="mt-8">
					<ul className="space-y-4">
						{filteredTodos.map((todo) => (
							<li
								key={todo.id}
								className="flex flex-col gap-1 md:flex-row md:items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
							>
								{isEditable && todo.id === editId ? (
									<>
										<EditForm value={newTodoTitles} onChange={handleSetNewTodoTitles} />
										<div className="space-x-3 mt-2 md:mt-0">
											<Button
												label="編集を保存"
												className="text-blue-500 hover:text-blue-400"
												onClick={() => handleEditTodo(todo)}
											/>
											<Button
												label="キャンセル"
												className="text-red-500 hover:text-red-400"
												onClick={handleEditCancel}
											/>
										</div>
									</>
								) : (
									<>
										<label className="flex items-center space-x-3">
											<input
												type="checkbox"
												className="form-checkbox h-6 w-6 text-blue-500"
												onChange={() => toggleComplete(todo.id)}
											/>
											<span
												className={
													todo.completed
														? 'text-gray-700 text-lg line-through text-gray-500'
														: 'text-gray-700 text-lg'
												}
											>
												{todo.title}
											</span>
										</label>
										<div className="space-x-3 mt-2 md:mt-0">
											<Button
												label="編集"
												className="text-blue-500 hover:text-blue-400"
												onClick={() => handleEditOpen(todo)}
											/>
											<Button
												label="削除"
												className="text-red-500 hover:text-red-400"
												onClick={() => handleDeleteTodo(todo)}
											/>
										</div>
									</>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default App;
