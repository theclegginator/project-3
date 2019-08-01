import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "./style.css";



export default withAuth(class Loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      error: null,
      username: '',
      password: ''
    }
    this.oktaAuth = new OktaAuth({ url: props.baseUrl });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => this.setState({
        sessionToken: res.sessionToken
      }))
      .catch(err => {
        this.setState({error: err.message});
        console.log(err.statusCode + ' error', err)
      });
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }
    const errorMessage = this.state.error ? 
<span className="error-message">{this.state.error}</span> : 
null;
    return (
  
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
        <form  onSubmit={this.handleSubmit}>
        {errorMessage}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            id="username"
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <br></br>
          <Button
             type="submit"
             size='large'
             variant="contained"
             color="primary"
             className='submit'
             id= "submit"
            value='submit'
          >
            Sign In
          </Button>
          <br></br>
          <Grid container justify="center">
            {/* <Grid item xs> */}
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            {/* </Grid> */}
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
















      // <form onSubmit={this.handleSubmit}>
      //   {errorMessage}
      //   <div className="form-element">
      //     <label>Username:</label>
      //     <input
      //       id="username" type="text"
      //       value={this.state.username}
      //       onChange={this.handleUsernameChange} />
      //   </div>
      //   <div className="form-element">
      //     <label>Password:</label>
      //     <input
      //       id="password" type="password"
      //       value={this.state.password}
      //       onChange={this.handlePasswordChange} />
      //   </div>
      //   <input id="submit" type="submit" value="Submit" />
      // </form>
    );
  }
});