import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import About from './components/pages/about';
import reactDisplay from './components/pages/reactDisplay';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo.js';
//import uuid from 'uuid';
import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        todos: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
            .then(res => this.setState({ todos: res.data }))
    }
    
    // Toggle Complete
    markComplete = (id) => {
        this.setState({ todos: this.state.todos.map(todo => {
            if(todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        })});
    }
    
    // Delete Todo
    delTodo = (id) => {
        {/* Javascript Promise */}
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
        
    }
    
    // Add Todo
    addTodo = (title) => {
        {/* Javascript Promise */}
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        }).then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    }

    render() {
        return (
          <Router>
              <div className="App">
                <div className="container">
                    <Header />
                    {/* path="/" means the index file */}
                    <Route exact path="/" render={props => (
                        <React.Fragment>
                            <AddTodo addTodo={this.addTodo} />
                            <Todos todos={this.state.todos} markComplete={this.markComplete} 
                            delTodo={this.delTodo} />
                        </React.Fragment>
                    )} />
                    <Route path="/about" component={About} />
                    <Route path="/reactDisplay" component={reactDisplay} />
                </div>
              </div>
         </Router>
        );
    }
}

export default App;