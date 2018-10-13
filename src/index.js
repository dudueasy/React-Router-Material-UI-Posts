import React from 'react'
import {render} from 'react-dom'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import App from './Components/App'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFA000',

      contrastText: '#fff',
    }
  }
});

function Main() {
  return (
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  );
}

render(<Main/>, document.getElementById('root'))
