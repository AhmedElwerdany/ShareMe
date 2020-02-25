import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {withRouter} from "react-router";

import NavBar from "./components/NavBar";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import Admin from "./components/Admin"
import "./App.scss";

import { Layout } from "antd";
const { Content, Header } = Layout;
const Navbar = withRouter(NavBar)
function App(props) {
  return (
    <Layout className='layout'>
      <Router>
        <Header>
          <div className='container'>
            <Navbar/>
          </div>
        </Header>
        <Content>
          <div className='container'>
            <Switch>
              <Route exact path='/' >
                  <Users type='all'/>
              </Route>
              <Route path='/whatsapp'>
                <Users type='whatsapp' />
              </Route>
              <Route path='/twitter'>
                <Users type='twitter' />
              </Route>
              <Route path='/snapchat'>
                <Users type='snapchat' />
              </Route>
              <Route path='/add_user' component={AddUser} />
              <Route path='/admin' component={Admin} />
            </Switch>
          </div>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
