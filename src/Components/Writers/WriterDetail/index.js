import React, {Component, Fragment} from 'react'
import {Link, Route} from 'react-router-dom'
import Text from './Text'
import NotFound from '../../Errors'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default class extends Component {

  render() {
    const {match, match: {url}, writerId, id, texts, name, description, born, deceased, image} = this.props
    console.log('texts: ', texts)

    return (
      <Fragment>

        <h1>{name}</h1>
        <img src={image} style={{maxWidth: 270}} alt={name}/>
        <h3>{born}&mdash;{deceased}</h3>
        <div>{description}</div>

        <h2>Writings: </h2>
        <ul> {texts.map(({id, title}) => (
          <li key={id}>
            <Link to={`${url}/texts/${id}`}
                  style={{textDecoration: 'none', listStyle: 'none', color: 'inherit'}}
            > {title} </Link>
          </li>
        ))}
        </ul>


        <Route
          path={`${url}/texts/:textId`}
          render={props => {
            const textData = texts.find(({id}) => (id === props.match.params.textId))
            return (
              textData ?
                <Text
                  {...props}
                  textData={textData}
                />
                : <NotFound/>
            )
          }}
        />
      </Fragment>
    )
  }
}
