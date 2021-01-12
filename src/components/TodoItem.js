import React, { Component } from 'react';
import {FaCheckSquare, FaTrashAlt} from "react-icons/fa";
import PropTypes from 'prop-types'

export class TodoItem extends Component {
    getStyle= () => {
            return{
                backgroundColor:'#f4f4f4',
                padding: '10px',
                borderBottom:'1px #ccc dotted',
                textDecoration: this.props.todo.mode ? 'line-through':'none'
            }
        }

    render() {
        const {id, title, yes, no, mode} = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    {/* <input type="checkbox" onChange={ this.props.markComplete.bind(this, id)}/>{''}
                    {title}*/}
                    {"Id:"}{id}{' | '}{"Yes:"}{yes}{" | "}{"No:"}{no}{" | title:"}{title}
                    <button className="btn-info" style ={{...btnStyle}} onClick={ this.props.markToggleComplete.bind(this, id, !mode)}>Confirm <FaCheckSquare/> </button>
                    <button style ={{...btnStyle, ...btnRed}} onClick={this.props.delTodo.bind(this, id)}><FaTrashAlt/></button>

                    </p>
            </div>
        )
    }
}
// proptype
TodoItem.propTypes={
    todo: PropTypes.object.isRequired,
    markToggleComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}
const btnStyle = {

    color:'#fff',
    border: 'none',
    padding: '5px 10px',
    // borderRadius: '50%',
    cursor: 'poiter',
    float: 'right',
    marginRight: '10px',
    
}
const btnRed = {
    backgroundColor:'#ff0000'

}


export default TodoItem
