import React from 'react';
import './Signin.css';


class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        if(this.state.signInEmail === '' || this.state.signInPassword === ''){
            
            return;
        }
        fetch("https://stormy-ocean-88968.herokuapp.com/signin", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id){ 
                    this.props.loadUser(user);
                    //console.log(user.name);
                    this.props.onRouteChange('Home');
                  }
          
            })

    }
    render() {
        const {onRouteChange} = this.props;
         return (
        <article className="br3 ba   b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>

                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 " htmlFor="email-address">Email</label>
                            <input onChange = {this.onEmailChange} className="bold-lettering pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange = {this.onPasswordChange} className="bold-lettering b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>

                    </fieldset>
                    <div className="">
                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p id="reg" onClick={() => onRouteChange('Register')} className="f6 link dim black db grow">Register</p>
                    </div>
                </div>
            </main>
        </article>
    );
    }
   
}

export default Signin;


