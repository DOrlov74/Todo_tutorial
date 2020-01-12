import React, {Component} from 'react';
import './todo-list-item.css';

class TodoListItem extends Component {

    constructor(){
        super();
        /* this.state={done: false,
        important: false}; */
        this.onLabelClick=()=>{
            //this.setState({done: true});
            //console.log(`Done: ${this.props.label}`);
            //console.log(this.state.done);
            this.setState(({done})=>{
                return{
                    done: !done
                };
            });
        };
        this.onMarkImportant=()=>{
            //this.setState({important:true});
            this.setState((state)=>{
                return {
                    important: !state.important
                };
            });
        };
    };

    render(){
        const {label, onDeleted, 
            onToggleImportant, onToggleDone,
            done, important
        }= this.props;
        
        //const {done, important}=this.state;
        let classNames='todo-list-item';
        if (done){
            classNames+=' done';
        }
        if(important){
            classNames+=' important';
        }
        return (
        <span 
            className={classNames}>
            <span 
                className="todo-list-item-label" 
                //onClick={this.onLabelClick}>
                onClick={onToggleDone}>
                {label}
            </span>
    
            <button type="button" className="btn btn-outline-success btn-sm float-right"
                //onClick={this.onMarkImportant}>
                onClick={onToggleImportant}>
                <i className="fa fa-exclamation"/>
            </button>
            <button type="button" className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
                <i className="fa fa-trash-o"/>
            </button>
    
        </span>);
    }
}

/* const TodoListItemFunc=({label, important=false})=>{
    const style={
        color: important? 'tomato': 'black'
    }
    return (
    <span 
        className="todo-list-item" 
        style={style}>{label}

        <button type="button" className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-exclamation"/>
        </button>
        <button type="button" className="btn btn-outline-danger btn-sm">
            <i className="fa fa-trash-o"/>
        </button>

    </span>);
}; */

export default TodoListItem;