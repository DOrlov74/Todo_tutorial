import React, {Component} from 'react';
import './search-panel.css';

class SearchPanel extends Component{
    /* const searchText='Type hear to search';
    const searchStyle={
        fontSize: '20px'
    } */
    state={
        term: ''
    };
    onSearchChange=(e)=>{
        const term=e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    };
    render(){
        return (
            <input className="search-input form-control"
            placeholder="Type to search"
            value={this.state.term}
            onChange={this.onSearchChange}>
            </input>
        );
    };
};

export default SearchPanel;