import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

class App extends Component {
    maxId=100;
    state={
        todoData:[
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Make awesome App'),
            this.createTodoItem('Have a lunch'),
            // {label: 'Drink coffee', important:false, id:1},
            // {label: 'Make awesome App', important:true, id:2},
            // {label: 'Have a lunch', important:false, id:3},
        ],
        term: '',
        filter: 'all'  //all, active, done
    };
    createTodoItem(label){
        return{
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };
    deleteItem=(id)=>{
        this.setState(({todoData})=>{
            const idx=todoData.findIndex((el)=>el.id===id);
            //todoData.splice(idx,1);//do not modify current state
            //const before=todoData.slice(0, idx);
            //const after = todoData.slice(idx+1);
            const newArray=[
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx+1)
            ];

            return{
                todoData: newArray
            };
        });
    };
    addItem=(text)=>{
        console.log('added', text);
        // generate id
        /* const newItem={
            label: text,
            important: false,
            id: this.maxId++
        } */
        const newItem=this.createTodoItem(text);
        // add element in array
        this.setState(({todoData})=>{
            const newArr=[...todoData, newItem];
            return {
                todoData: newArr
            };
        });
    };
    toggleProperty(arr, id, propName){
            const idx=arr.findIndex((el)=>el.id===id);
            const oldItem=arr[idx];
            //copy & update object
            const newItem={...oldItem, [propName]: !oldItem[propName]}; //update done property
            //construct new array
            return[
                ...arr.slice(0, idx), 
                newItem,
                ...arr.slice(idx+1)
            ];
    };
    onToggleImportant=(id)=>{
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData,id,'important')
            };
        });
        console.log('toggle important', id);
    };
    onToggleDone=(id)=>{
        this.setState(({todoData})=>{
            /* const idx=todoData.findIndex((el)=>el.id===id);
            const oldItem=todoData[idx];
            //copy & update object
            const newItem={...oldItem, done: !oldItem.done}; //update done property
            //construct new array
            const newArray=[
                ...todoData.slice(0, idx), 
                newItem,
                ...todoData.slice(idx+1)
            ]; */
            return {
                todoData: this.toggleProperty(todoData,id,'done')
            };
        });
        console.log('toggle done', id);
    };
    onSearchChange=(term)=>{
        this.setState({term});
    };
    onFilterChange=(filter)=>{
        this.setState({filter});
    };
    search(items, term){
        if (term.length===0){
            return items;
        };
        return items.filter((item)=>item.label.toLowerCase().indexOf(term.toLowerCase())>-1);
    };
    filter(items, filter){
        switch(filter){
            case 'all':
                return items;
            case 'active':
                return items.filter((item)=>!item.done);
            case 'done':
                return items.filter((item)=>item.done);
            default:
                return items;
        }
    };

    render() {
    const isLoggedIn=false;
    const loginBox=<span>Login please</span>;
    const welcomeBox=<span>Welcome back</span>;
    const {todoData, term, filter}=this.state;
    const visibleItems=this.filter(this.search(todoData, term),filter);
    const doneCount=todoData
        .filter((el=>el.done===true)).length;
    const todoCount=todoData.length-doneCount;
        return (
            <div className="todo-app">
                {isLoggedIn? null: loginBox}
            <span>{(new Date().toString())}</span>
                <AppHeader toDo={todoCount} done={doneCount}/>
                
                <div className="top-panel d-flex">
                <SearchPanel 
                    onSearchChange={this.onSearchChange}/>
                <ItemStatusFilter filter={filter} 
                    onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems}
                //onDeleted={(id)=>console.log('delete', id)}/>
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    };
};

export default App;