import { describe, it, expect } from "vitest";
import { Todo, addTodo, removeTodo, sortTodoByDueDate, formatDate, setDueDateForTodo, filterTodo } from "./useTodo";

describe("Todoリストに追加", () => {
    it("タスク名とタスク実行日からタスクが生成できること", () => {
        const todo: Todo[] = [];
        const itemText = "Test Todo";
        const dueDate = "2023-01-01";
        const newTodo = addTodo(todo, itemText, dueDate);
        expect(newTodo).toHaveLength(1);
        expect(newTodo[0]).toHaveProperty("text", itemText);
        expect(newTodo[0]).toHaveProperty("dueDate", dueDate);
    });

    it("タスク名とタスク実行日のいずれかが空であればタスクは生成されないこと", () => {
        const todo: Todo[] = [];
        const newTodo = addTodo(todo, "", "");
        expect(newTodo).toHaveLength(0);
    });
});
;
