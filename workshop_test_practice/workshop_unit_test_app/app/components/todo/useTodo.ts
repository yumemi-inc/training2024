/**
 * タスクのインターフェース定義。
 */
export interface Todo {
    id: number;
    text: string;
    completed?: boolean;
    dueDate: string;
}

/**
 * 絞り込みタイプの定義。
 */
export type FilterType = "today" | "tomorrow" | "completed" | "active" | "";

/**
 * タスクを追加します。
 * @param {Todo[]} todo - タスクのリスト。
 * @param {string} text - タスクのテキスト。
 * @param {string} dueDate - タスクの期限日。
 * @returns {Todo[]} - 更新後のタスクのリスト。
 */
export const addTodo = (todo: Todo[], text: string, dueDate: string): Todo[] => {
    if (!text.trim() || !dueDate) {
        return todo;
    }

    const newTodo: Todo = {
        id: Date.now(),
        text,
        dueDate,
        completed: false,
    };
    return [...todo, newTodo];
};

/**
 * タスクを取得します。
 * @returns {Todo[]} - タスクのリスト。
 */
export const getTodo = (): Todo[] => {
    return [];
};

/**
 * タスクの完了状態を
 * @param {Todo[]} todo - タスクのリスト。
 * @param {number} id - タスクのID。
 * @returns {Todo[]} - 更新後のタスクのリスト。
 */
export const toggleCompleted = (todo: Todo[], id: number): Todo[] => {
    return todo.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
};

/**
 * タスクを削除
 * @param {Todo[]} todo - タスクのリスト。
 * @param {number} id - タスクのID。
 * @returns {Todo[]} - 更新後のタスクのリスト。
 */
export const removeTodo = (todo: Todo[], id: number): Todo[] => {
    return todo.filter((item) => item.id !== id);
};

/**
 * タスクを期限日でソートします。
 * @param {Todo[]} todo - タスクのリスト。
 * @param {boolean} ascending - ソート順。
 * @returns {Todo[]} - ソート後のタスクのリスト。
 */
export const sortTodoByDueDate = (todo: Todo[], ascending: boolean = true): Todo[] => {
    return todo.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

/**
 * 完了済みのタスクを取得
 * @param {Todo[]} todo - タスクのリスト。
 * @returns {Todo[]} - 完了済みのタスクのリスト。
 */
const getCompletedTodo = (todo: Todo[]): Todo[] => {
    return todo.filter((todo) => todo.completed);
};

/**
 * 未完了のタスクを取得
 * @param {Todo[]} todo - タスクのリスト。
 * @returns {Todo[]} - 未完了のタスクのリスト。
 */
const getActiveTodo = (todo: Todo[]): Todo[] => {
    return todo.filter((todo) => !todo.completed);
};

/**
 * 日付をフォーマット "YYYY/MM/DD"形式
 * @param {string} dateStr - 日付文字列。
 * @returns {string} - フォーマットされた日付文字列。
 */
export const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-");
    return `${year}/${month}/${day}`;
};

/**
 * 今日からの日数を基に、タスクの実行日を設定
 * @param {number} days - 今日からの日数。
 * @returns {string} - フォーマットされた期限日（"YYYY-MM-DD"形式）。
 */
export const setDueDateForTodo = (days: number): string => {
    const today = new Date();
    const targetDate = new Date(today.setDate(today.getDate() + days));
    return `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1).toString().padStart(2, "0")}-${targetDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
};

/**
 * タスクを絞り込みます。
 * @param {Todo[]} todo - タスクのリスト。
 * @returns {Todo[]} - 絞り込み後のタスクのリスト。
 */
const filterTodayTodo = (todo: Todo[]): Todo[] => {
    const todayStr = new Date().toISOString().split("T")[0];
    return todo.filter((todo) => todo.dueDate === todayStr);
};

/**
 * 当日のタスク一覧を返す
 * @param {Todo[]} todo - タスクのリスト。
 * @param {FilterType} filterType - 絞り込みタイプ。
 * @returns {Todo[]} - 絞り込み後のタスクのリスト。
 */
export const filterTodo = (todo: Todo[], filterType: FilterType): Todo[] => {
    switch (filterType) {
        case "today":
            return filterTodayTodo(todo);
        case "tomorrow":
            return filterTomorrowTodo(todo);
        case "completed":
            return getCompletedTodo(todo);
        case "active":
            return getActiveTodo(todo);
        default:
            return todo; // 絞り込み解除
    }
};

/**
 * 翌日のタスク一覧を返します。
 * @param {Todo[]} todo - タスクのリスト。
 * @returns {Todo[]} - 絞り込み後のタスクのリスト。
 */
const filterTomorrowTodo = (todo: Todo[]): Todo[] => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    return todo.filter((todo) => todo.dueDate === tomorrowStr);
};

// /**
//  * タスクをAPI経由で追加します。
//  * @param {Todo[]} todo - タスクのリスト。
//  * @param {string} inputText - タスクのテキスト。
//  * @param {string} dueDate - タスクの期限日。
//  * @returns {Promise<Todo>} - 追加されたタスク。
//  */
// export const postAddTodo = async (todo: Todo[], inputText: string, dueDate: string): Promise<Todo> => {
//     const response = await fetch("/api/todo", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ todo, text: inputText, dueDate }),
//     });

//     if (!response.ok) {
//         // エラーレスポンス時にエラー情報を含む例外を投げる
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Something went wrong");
//     }

//     const data = await response.json();
//     return data;
// };
