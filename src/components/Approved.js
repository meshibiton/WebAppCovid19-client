import React, {Component} from 'react';
import ApprovedItem from './ApprovedItem';
import PropTypes from 'prop-types';

class Approved extends Component{

    render() {
        return this.props.approved.map((approved)=>(
        <ApprovedItem key={approved.id} todo={approved} markToggleComplete={this.props.markToggleComplete} delTodo={this.props.delTodo}/>
        ));
    }
}
// proptype
Approved.propTypes={
    approved: PropTypes.array.isRequired,
    markToggleComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}
export default Approved;