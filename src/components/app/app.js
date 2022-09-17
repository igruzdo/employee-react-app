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
        {name:'John', salary:'1000', increase: true, id: 1},
        {name:'Bet', salary:'2000', increase: false, id: 2},
        {name:'Fred', salary:'3000', increase: false, id: 3}
      ]
    }
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      // const index = data.findIndex((item) => item.id === id)
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr = [...before, ...after]
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  render() {
    return (
      <div className="app">
          <AppInfo />
  
          <div className="search-panel">
              <SearchPanel/>
              <AppFilter/>
          </div>
          
          <EmployeesList 
            onDelete={id => this.deleteItem(id)}
            data={this.state.data}/>
          <EmployeesAddForm/>
      </div>
    );
  }
}

export default App;
