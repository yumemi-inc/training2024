import { NextRequest, NextResponse } from "next/server";
import { Todo } from "../../components/todo/useTodo";

const todo: Todo[] = [];

export function GET(req: NextRequest) {
    const res = NextResponse.json({ todo });
    return res;
}

export async function POST(req: NextRequest) {
    const data: Todo = await req.json();
    const { text, dueDate } = data;
    if (!text.trim() || !dueDate) {
        return todo;
    }
    const newTodo: Todo = {
        id: Date.now(),
        text,
        dueDate,
        completed: false,
    };
    todo.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
}
