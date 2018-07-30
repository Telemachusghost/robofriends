import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/cardlist';
import SearchBox from '../components/searchbox';
import Scroll from '../components/scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import '../containers/app.css';

import { setSearchField } from '../actions';



class App extends Component {
	
	const mapStateToProps = state => {
		return {
			searchField: state.searchRobots.searchField
		}
	}

	const mapDispatchToProps = (dispatch) => {
		return {
			onSearchChange: (event) => dispatch(setSearchField(event.target.value))
		}
	}

	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=>  response.json())
		.then(users => this.setState({ robots: users }));
	}


	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
	}

	render() {
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		return !robots.length ?
		<h1 className='tc'>Loading</h1> :
			(
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div>
			);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);