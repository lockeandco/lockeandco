import React from 'react'

export default class Cookie extends React.Component  (

    static async getInitialProps ({req, query}) {
        const user = req && req.session ? req.session.decodedToken : null
        // don't fetch anything from firebase if the user is not found
        const snap = user && await req.firebaseServer.database().ref('messages').once('value')
        const messages = snap && snap.val()
        return { user, messages }
      }
    <Route
      {...rest}
      render={props => (
        <Authenticator>
          <Greetings />
          <SignIn />
          <Component {...props} />
        </Authenticator>
      )}
    />
  )