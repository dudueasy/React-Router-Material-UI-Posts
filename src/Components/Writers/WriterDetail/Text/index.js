import React, {Fragment} from 'react'

export default ({textData: {title, description, published}}) =>
  (
    <Fragment>
      <h3>{title}{published ? (published) : ''}</h3>
      <p>{description ? description : <i>No description</i>}</p>
    </Fragment>
  )