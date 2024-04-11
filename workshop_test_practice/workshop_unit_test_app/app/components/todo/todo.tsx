"use client";
import { useState, ChangeEvent, FC } from "react";
import {
    Todo,
    addTodo,
    getTodo,
    removeTodo,
    sortTodoByDueDate,
    formatDate,
    toggleCompleted,
    setDueDateForTodo,
    filterTodo,
    FilterType,
} from "./useTodo";

export const ToDoList: FC = () => {
    const [todo, setTodo] = useState<Todo[]>(getTodo());
    const [inputText, setInputText] = useState<string>("");
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [filterType, setFilterType] = useState<FilterType>("");
    const [dueDate, setDueDate] = useState<string>("");

    const handleFilterChange = (type: FilterType) => {
        setFilterType(type);
    };

    const handleSetDueDate = (days: number) => {
        const newDueDate = setDueDateForTodo(days);
        setDueDate(newDueDate);
    };

    const handleAddTodo = () => {
        const updatedTodo = addTodo(todo, inputText, dueDate);
        setTodo(updatedTodo);
        setInputText("");
        setDueDate("");
    };

    const handleToggleCompleted = (id: number) => {
        const updatedTodo = toggleCompleted(todo, id);
        setTodo(updatedTodo);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleRemoveTodo = (id: number) => {
        const updatedTodo = removeTodo(todo, id);
        setTodo(updatedTodo);
    };

    const handleSortToggle = () => {
        setIsAscending(!isAscending);
        setTodo(sortTodoByDueDate(todo, !isAscending));
    };

    const displayedTodo = sortTodoByDueDate(filterTodo(todo, filterType), isAscending);

    const getButtonClassName = (buttonType: FilterType) => {
        return `py-1 px-3 text-sm rounded-full border ${
            filterType === buttonType
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-400 hover:bg-gray-100"
        }`;
    };

    return (
        <div className="max-w-4xl w-full mx-auto p-4">
            <h1 className="text-2xl mb-4">ToDoリスト</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <fieldset className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="todoInput">
                        タスク
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="todoInput"
                        type="text"
                        value={inputText}
                        onChange={handleChange}
                        placeholder="ユニットテストを実装する"
                    />
                </fieldset>
                <fieldset className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        タスク実行日
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        placeholder="予定日"
                    />
                </fieldset>
                <fieldset className="mb-4 flex justify-start gap-2">
                    <button
                        onClick={() => handleSetDueDate(0)}
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        今日にセットする
                    </button>
                    <button
                        onClick={() => handleSetDueDate(1)}
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        明日にセットする
                    </button>
                </fieldset>
                <button
                    className={`w-full text-sm border-4 py-1 px-2 rounded ${
                        inputText
                            ? "bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-white"
                            : "bg-gray-500 text-white border-gray-500 cursor-not-allowed"
                    }`}
                    type="button"
                    onClick={handleAddTodo}
                    disabled={!inputText}
                >
                    追加
                </button>
            </form>
            <h2 className="block text-gray-700 text-xl font-bold mb-4">絞り込み</h2>
            <div className="flex justify-between">
                <button
                    className="py-1 px-3 text-sm rounded-full border bg-white text-black border-gray-400 hover:bg-gray-100"
                    onClick={handleSortToggle}
                >
                    {isAscending ? "昇順" : "降順"}
                </button>
                <button onClick={() => handleFilterChange("today")} className={getButtonClassName("today")}>
                    今日のタスク
                </button>
                <button onClick={() => handleFilterChange("tomorrow")} className={getButtonClassName("tomorrow")}>
                    明日のタスク
                </button>
                <button onClick={() => handleFilterChange("completed")} className={getButtonClassName("completed")}>
                    完了したタスクを表示
                </button>
                <button onClick={() => handleFilterChange("active")} className={getButtonClassName("active")}>
                    未完了のタスクを表示
                </button>
                <button onClick={() => handleFilterChange("")} className={getButtonClassName("")}>
                    全て表示
                </button>
            </div>

            <ul className="w-960">
                {displayedTodo.length > 0 ? (
                    displayedTodo.map((todo) => (
                        <li
                            className={`w-full flex justify-between items-center border-b-2 border-neutral-400 py-4 dark:border-opacity-50`}
                            key={todo.id}
                        >
                            <span
                                className={`cursor-pointer ${todo.completed ? "line-through" : ""}`}
                                onClick={() => handleToggleCompleted(todo.id)}
                            >
                                {todo.text} - {formatDate(todo.dueDate)}
                            </span>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                onClick={() => handleRemoveTodo(todo.id)}
                            >
                                削除
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-center py-4">タスクはありません。</li>
                )}
            </ul>
        </div>
    );
};
