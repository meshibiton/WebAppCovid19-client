import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FaMinusSquare} from "react-icons/fa";

export class ApprovedItem extends Component {
    getStyle= () => {
            return{
                backgroundColor:'#f4f4f4',
                padding: '10px',
                borderBottom:'1px #ccc dotted',
                // textDecoration: this.props.todo.completed ? 'line-through':'none'
            }
        }

    render() {
        const {id, title, yes, no} = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    {/* <input type="checkbox" onChange={ this.props.markComplete.bind(this, id)}/>{''}
                    {title}*/}
                    {"Id:"}{id}{' | '}{"Yes:"}{yes}{" | "}{"No:"}{no}{" | title:"}{title}
                    <button className="btn-warning" style ={{...btnStyle}} onClick={ this.props.markToggleComplete.bind(this, id)}>Hidden Poll <FaMinusSquare /></button>
                    {/* <button style ={{...btnStyle, ...btnRed}} onClick={this.props.delTodo.bind(this, id)}>x</button> */}

                    </p>
            </div>
        )
    }
}
// proptype
ApprovedItem.propTypes={
    todo: PropTypes.object.isRequired,
    markToggleComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}
const btnStyle = {

    color:'#000',
    border: 'none',
    padding: '5px 10px',
    // borderRadius: '50%',
    cursor: 'poiter',
    float: 'right',
    marginRight: '10px',
    
}


export default ApprovedItem
