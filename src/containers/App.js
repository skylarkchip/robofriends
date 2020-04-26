import React from 'react';
import CardList from '../components/card-list/card-list.component';
import SearchBox from '../components/searchbox/searchbox.component';
import Scroll from '../components/scroll/scroll.component';
import ErrorBoundary from '../components/error/error-boundary.component';

import './App.css';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return !robots.length ?        
            <div className='tc'>
                <h1>Loading</h1>
            </div>
        :
            <div className='tc'>
                <h1 className='f1'>Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll> 
            </div>
    }
}

export default App;