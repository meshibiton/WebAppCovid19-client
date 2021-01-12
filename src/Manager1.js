import React, { Component } from "react";
import Todos from "./components/Todos";
import Approved from "./components/Approved";
import AddTodo from "./components/AddTodo";
import "./App.css";
import axios from "axios";
import {  notify } from "./util";
import { ToastContainer } from 'react-toastify';

class Manager1 extends Component {
  state = { todos: [] };
  componentDidMount() {
    axios.get("/polls").then((res) => {
      this.setState({ todos: res.data });
    }).catch(error => {
      notify()
   });;
  }

  checkComplited = (todo) => {
    return todo.mode;
  };
  checkUnComplited = (todo) => {
    return !todo.mode;
  };

  markToggleComplete = (id, complited) => {
    axios.put(`/polls/mode/${id},${complited}`)
    .then(res=>{ 

      this.setState({
        todos: this.state.todos.map((todo) => {
          if (todo.id === id) {
            todo.mode = !todo.mode;
          }
          return todo;
        }),
      });
 


  }).catch(error => {
    notify()
 });;

  };
  // delete to do
  delTodo = (id) => {
    axios
      .delete(`polls/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };



    //  add todo
    addTodo = (title) => {
      let obj =  { qes: `${title}`}

      if(title !==''){
        axios.post('/polls/qes', obj)

    .then(res=>{ 

      this.setState({
      todos: [...this.state.todos,res.data],
    })
  }).catch(error => {
    notify()
 });
      }
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <React.Fragment>
          <ToastContainer />

            <AddTodo addTodo={this.addTodo} />
            <h1>Show Approved Polls</h1>
            <Approved
              approved={this.state.todos.filter(this.checkComplited)}
              delTodo={this.delTodo}
              markToggleComplete={this.markToggleComplete}
            />
            <h1>Hidden Polls</h1>
            <Todos
              todos={this.state.todos.filter(this.checkUnComplited)}
              delTodo={this.delTodo}
              markToggleComplete={this.markToggleComplete}
            />
          </React.Fragment>
          
        </div>
      </div>
    );
  }
}

export default Manager1;
