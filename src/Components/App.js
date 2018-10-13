import React, {Fragment, Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './Home'
import Layout from './Layout'

import Writers from './Writers'

import NotFound from './Errors'

export default class extends Component {
  state = {
    writersData: []
  }

  async componentDidMount() {
    let responseData = await (await fetch('http://localhost:3001/Writers?_embed=texts')).json()
    console.log(responseData)
    this.setState({writersData: responseData})
  }

  render() {
    const {writersData} = this.state

    return (
      <BrowserRouter writersData={writersData}>
        <Fragment>
          <Layout writersData={writersData}>
            <Switch>
              <Route path='/' exact render={Home}/>
              <Route path='/writers'
                     render={(props) =>
                       (<Writers {...props} writersData={this.state.writersData}/>)
                     }/>

              <Route
                component={NotFound}
              />
            </Switch>
          </Layout>
        </Fragment>
      </BrowserRouter>
    )
  }
}

