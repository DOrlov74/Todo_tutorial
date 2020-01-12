import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList=({todos, onDeleted, onToggleImportant, onToggleDone})=>{
    //const items=['Learn React','Build awesome App']

    const elements=todos.map((item)=>{
        const {id, ...itemProps}=item;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem {...itemProps}
                //label={item.label}
                //important={item.important}
                onDeleted={()=>onDeleted(id)}
                onToggleImportant={()=>onToggleImportant(id)}
                onToggleDone={()=>onToggleDone(id)}/>
            </li>
        );
    });
    return(
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList;