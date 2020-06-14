import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut} from '@aws-amplify/ui-react';



export default function SignInSide() {
  return (
    <div style={{position:"absolute",width:"100%", height:"100%", backgroundColor:"#BCBCBC"}}>
      <div className="center">
        <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email",
            placeholder: "Email",
            required: true,
          },
          {
            type: "name",
            label: "Name",
            placeholder: "Name",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Password",
            required: true,
          }
        ]} 
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
            </div></div>
  );
}
