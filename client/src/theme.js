import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
   palette: {
      primary: {
         main: red[500]
      }
   }
});

export default theme;