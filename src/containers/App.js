import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/card-list/card-list.component';
import SearchBox from '../components/searchbox/searchbox.component';
import Scroll from '../components/scroll/scroll.component';
import ErrorBoundary from '../components/error/error-boundary.component';
import './App.css';

import { setSearchField, requestRobots } from '../redux/actions';


class App extends React.Component {
    
    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return isPending ?        
            <div className='tc'>
                <h1>Loading</h1>
            </div>
        :
            <div className='tc'>
                <h1 className='f1'>Robofriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <ErrorBoundary>
                    <CardList robots={filteredRobots} />
                </ErrorBoundary>
            </div>
    }
}

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots(dispatch))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(App);