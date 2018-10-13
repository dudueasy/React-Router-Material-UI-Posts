import React, {Fragment} from 'react'
import {NavLink, Route,} from 'react-router-dom'
import WriterDetail from './WriterDetail'
import NotFound from '../Errors'

export default ({writersData, match, match: {url}, ...props}) => (
  <Fragment>

    <Route path={url}
           render={() => (<h3>Please select a writer below: </h3>  )}
    />

    <ul style={{listStyleType: "none"}}>
      {writersData.map(({id, name}) => {
          if (url.endsWith('/')) {
            console.log('url:', url)
          }
          return (
            <li key={id}>
              <NavLink style={{textDecoration: 'none', listStyle: 'none', color: 'inherit'}}
                       activeStyle={{fontWeight: "bold"}}
                       to={`${url}/${id}`}>
                {name}
              </NavLink>
            </li>
          )
        }
      )}
    </ul>


    <Route
      path={`${url}/:writerId`}
      render={
        props => {
          console.log('url:', url)
          console.log('writerId: ', props.match.params.writerId)

          const writerData = writersData.find(({id}) => id === props.match.params.writerId)
          return writerData ?
            (<WriterDetail {...props} {...writerData} key={props.match.params.writerId}/>)
            : <NotFound/>
        }
      }
    />

  </Fragment>
)
