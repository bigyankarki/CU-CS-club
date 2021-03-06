import React, { Component } from 'react';
import { firebaseApp, users } from '../firebase';
import { Link } from 'react-router';

class SignUp extends Component{

  constructor(props){
    super(props);

    this.state = {
      // uid: uuid.v1(),
      username: '',
      email: '',
      password: '',
      full_name: '',
      error : {
        message: ''
      }
    };
  }

  submitSignUp(){
    const {email, password} = this.state;

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('error', error);
        this.setState({error});
      })


      firebaseApp.auth().onAuthStateChanged(user => {
        const username = this.state.displayName;
        if(user){
          users.push({
            email: user.email,
            uid: user.uid,
            username: username
          })
          localStorage.setItem('username', username);
        }
      });
  }


  render(){
    return(

      <div className="container">

         <div className="main">
             <div id="first">
                 <h1 id="siteTitle">Meetgram</h1>
                 <span id="tagline">Start Your Journey With Us.</span>
             </div>
             <br />
             <p className="signinInitialStep__divider">
                or
             </p>

             <div className="third">
               <input
                 type="text"
                 placeholder="Username"
                 name="displayName"
                 ref="displayName"
                 validate ='required'
                 className="formField"
                 onChange ={event => this.setState({displayName: event.target.value})}
               />
                 <br />
               <input
                 type="text"
                 placeholder="Full Name"
                 name="fullName"
                 validate ='required'
                 className="formField"
                  onChange ={event => this.setState({full_name: event.target.value})}
               />
                 <br/>
               <input
                 type="email"
                 placeholder="Email"
                 name="emailAddress"
                validate ='required'
                className="formField"
                onChange ={event => this.setState({email: event.target.value})}
                />
                 <br />
               <input
                 type="password"
                 placeholder="Password"
                 name="password" required pattern=".{8,}"
                 title="Eight or more characters."
                validate ='required'
                className="formField"
                onChange ={event => this.setState({password: event.target.value})}
               />

              <br />

              <div style = {{color: 'red'}}>
                {this.state.error.message}
              </div>

             <button
               type="submit"
               className="btn btn-primary signup"
               onClick = {() => this.submitSignUp()}
              >
                Sign Up
              </button>



              <div id="signUpterms">
                By signing up you agree to our terms and privacy policy.
              </div>
            </div>

          </div>

         <div id="alreadyAccount">Have an account?
            <Link to = {'/signin'} id="login">Sign In</Link>
         </div>
     </div>

    )
  }
}

export default SignUp;
