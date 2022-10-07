import create from 'zustand'
import  {devtools}  from 'zustand/middleware';

import {generateId} from '../helpers';

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>(devtools((set, get) => ({
    tasks: [
        {
            id: 'asdasdasd',
            title: 'fist defaul task',
            createdAt: 5555
        },
        {
            id: 'asdwqr',
            title: 'fist defaul task 2',
            createdAt: 7776
        },
    ],
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
           tasks: tasks.map((task) => ({
            ...task,
            title: task.id === id ? title : task.title,
           }))
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
           tasks: tasks.filter((task) => task.id !== id)
        });
    },
})))