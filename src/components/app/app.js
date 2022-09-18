import { Component } from 'react';


import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        {name:'John', salary:'1000', increase: true, rise: false, id: 1},
        {name:'Bet', salary:'2000', increase: false, rise: false, id: 2},
        {name:'Fred', salary:'3000', increase: false, rise: false, id: 3}
      ]
    }
    this.maxId = 3;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addEmployee = ({name, salary}) => {
    if(!name || !salary) return
    this.setState(({data}) => {
      return {
        data: [
        ...data,
        {name, salary, increase: false, id: this.maxId + 1}
      ]}
    })
    this.maxId += 1;
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map((item) => {
        if(item.id === id) {
          return {
            ...item,
            [prop]: !item[prop]
          }
        }
        return item
      })
    }))

  }

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length
    return (
      <div className="app">
          <AppInfo employees={employees} increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel/>
              <AppFilter/>
          </div>
          
          <EmployeesList 
            onDelete={id => this.deleteItem(id)}
            data={this.state.data}
            onToggleProp={this.onToggleProp}
          />
          <EmployeesAddForm addEployee={this.addEmployee}/>
      </div>
    );
  }
}

export default App;
