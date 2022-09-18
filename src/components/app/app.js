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
      ],
      term: '',
      filter: 'all',
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

  searchEmp = (items, term) => {
    if(term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise)
      case '1000':
        return items.filter(item => item.salary > 1000)
      default:
        return items
    }
  }

  onFilerSelect = (filter) => {
    this.setState({filter})
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);


    return (
      <div className="app">
          <AppInfo employees={employees} increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
              <AppFilter filter={filter} onFilerSelect={this.onFilerSelect}/>
          </div>
          
          <EmployeesList 
            onDelete={id => this.deleteItem(id)}
            data={visibleData}
            onToggleProp={this.onToggleProp}
          />
          <EmployeesAddForm addEployee={this.addEmployee}/>
      </div>
    );
  }
}

export default App;
