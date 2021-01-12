import React, {Component} from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component{

    render() {
        return this.props.todos.map((todo)=>(
        <TodoItem key={todo.id} todo={todo} markToggleComplete={this.props.markToggleComplete} delTodo={this.props.delTodo}/>
        ));
    }
}
// proptype
Todos.propTypes={
    todos: PropTypes.array.isRequired,
    markToggleComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}
export default Todos;