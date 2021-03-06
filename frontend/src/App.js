import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import logo from './logo.svg';

import Category from './components/Category';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [hasError, setErrors] = useState(false);
  const [categories, setCategories] = useState({});
  const [catName, setCatName] = useState("");
  
    
  useEffect(() => {
    async function fetchData() {
      //const res = await fetch("https://swapi.co/api/planets/");
      const res = await fetch("http://localhost:3001/categories");
      res
        .json()
        .then(res => { 
          console.log("res: " + res);
          setCategories(res) ;
        })
        .catch(err => { 
          console.log("err: " + err);
          setErrors(err);
        });
    }

    fetchData();
  },[]);
    
  let addCategory = (evt) => {
    evt.preventDefault();
    console.info("adding category: " + catName);
    let body = JSON.stringify({"name": catName});
    console.log("body: " + body);
    fetch('http://localhost:3001/categories', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: body
    });
  }
  let activateCategory = async (evt, id) => {
      evt.preventDefault();
      
  }

  return (
    <div className="App" style={{textAlign:`center`}}>
        <h3>A Simple Demo of API Use</h3>
        <hr />
        <Form>
        <Button onClick={addCategory}>Add Category</Button>&nbsp;
        <Form.Control type="text" placeholder="New Category" style={{width: `10rem`,display:"inline", verticalAlign:`middle`}} value={catName} onChange={e => setCatName(e.target.value)}/>
        </Form>

      <hr />
      <Router>
        <Switch>
          <Route path="/category/:id" render={({match}) => (
            <Category _id={match.params.id}/>
          )}/>
          <Route path="/">
            {
              categories.results ? 
              categories.results.map(({_id, name}) => <div><Link to={`/category/${_id}`}>{name}</Link></div>) 
              : 
              ""
            }
          </Route>
        </Switch>
       </Router>
    </div>
  );
}

export default App;
//        <input type="text" name="category-name" value={catName} onChange={e => setCatName(e.target.value)}></input>
//<a href="" onClick={(e) => activateCategory(e, _id) }>{name}</a> - 
//<span>{JSON.stringify(categories)}</span>
//<img src={logo} className="App-logo" alt="logo" />
//  <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>