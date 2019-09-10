import React from 'react'
import{connect} from 'react-redux'
import CardList from'./CardList'
import SearchBox from './SearchBox'
import Scroll from './Scroll'
import {robots} from './robots'
import ErrorBoundry from'./ErrorBoundry'
import{setSearchField}from './Actions'

const mapStateToProps=state=>{
	return{
		searchField:state.searchField
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
	onSearchChange:(event)=>dispatch(setSearchField(event.target.value))
}
}
class App extends React.Component {
	constructor(){
		super()
		this.state={
		robots:robots,
		
		}
	}

	componentDidMount(){ 
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=>response.json())
		.then(users=>{this.setState({robots:users})})
	}

	
	render(){
		const {robots}=this.state
		const {searchField, onSearchChange}=this.props
		const filteredRobots=robots.filter(robots =>{
			return robots.name.toLowerCase().includes(searchField.toLowerCase())});
		
		return(
		<div className='tc'>
		<h1 className='f2'>RoboFriends</h1>
		<SearchBox searchchange={onSearchChange}/>
		<Scroll>
		<ErrorBoundry>
		 <CardList robots={filteredRobots}/>
		 </ErrorBoundry>
		 </Scroll>
		 </div>
		)
	
	}
		
	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);