import React from 'react'; 
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import config from '../../app.config';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "./style.css";
export default withAuth(class RegistrationForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      sessionToken: null
    };
    this.oktaAuth = new OktaAuth({ url: config.url });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);    
  }
  async checkAuthentication() {
    const sessionToken = await this.props.auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }
  componentDidUpdate() {
    this.checkAuthentication();
  }
  handleFirstNameChange(e){
    this.setState({firstName:e.target.value});
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    fetch('/api/users', { 
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then(user => {
      this.oktaAuth.signIn({
        username: this.state.email,
        password: this.state.password
      })
      .then(res => this.setState({
        sessionToken: res.sessionToken
      }));
    })
    .catch(err => console.log);
  }

  render(){
    // const useStyles = makeStyles(theme => ({
    //   '@global': {
    //     body: {
    //       backgroundColor: theme.palette.common.white,
    //     },
    //   },
    //   paper: {
    //     marginTop: theme.spacing(8),
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //   },
    //   avatar: {
    //     margin: theme.spacing(1),
    //     backgroundColor: theme.palette.secondary.main,
    //   },
    //   form: {
    //     width: '100%', // Fix IE 11 issue.
    //     marginTop: theme.spacing(3),
    //   },
    //   submit: {
    //     margin: theme.spacing(3, 0, 2),
    //   },
    // }));
  
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }
    // const classes = useStyles();
    return(
      
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className='paper'>
{/*   
        <Avatar container justify='center' className='avatar'>
          <LockOutlinedIcon  spacing={2}  className='avatar' />
        </Avatar> */}
        <Typography className='title' component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={this.handleSubmit}className='form' noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
       value={this.state.firstName} 
  onChange={this.handleFirstNameChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              value={this.state.lastName} 
  onChange={this.handleLastNameChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              value={this.state.email} 
  onChange={this.handleEmailChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              value={this.state.password} 
  onChange={this.handlePasswordChange} />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          {/* <Fab 
          variant="extended" 
          color="primary"
           aria-label="add" 
           type="submit"
           fullWidth
           className='submit'
           id= "submit"
           value='Register'>
           Extended
        </Fab> */}
<br></br>
          <Button
            type="submit"
            size='large'
            variant="contained"
            color="primary"
            className='submit'
            id= "submit"
            value='Register'
          >
            Sign Up
          </Button>
          <br></br>
          <Grid container justify="center">
            <Grid item>
              <Link className="gotosignin" href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
              <br></br>
            </Grid>
          </Grid>
        </form>
      </div>
  
    </Container>
  );
    }
})





//       <form onSubmit={this.handleSubmit}>
//         <div className="form-element">
//           <label>Email:</label>
//           <input type="email" id="email" value={this.state.email} 
//   onChange={this.handleEmailChange}/>
//         </div>
//         <div className="form-element">
//           <label>First Name:</label>
//           <input type="text" id="firstName" value={this.state.firstName} 
//   onChange={this.handleFirstNameChange} />
//         </div>
//         <div className="form-element">
//           <label>Last Name:</label>
//           <input type="text" id="lastName" value={this.state.lastName} 
//   onChange={this.handleLastNameChange} />
//         </div>
//         <div className="form-element">
//           <label>Password:</label>
//           <input type="password" id="password" value={this.state.password} 
//   onChange={this.handlePasswordChange} />
//         </div>
//         <input type="submit" id="submit" value="Register"/>
//       </form>
//     );
//   }
// });