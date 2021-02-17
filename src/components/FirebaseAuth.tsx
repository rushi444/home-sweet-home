import { useState, useEffect, FC } from 'react'
import { Box } from '@chakra-ui/react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: '/'
}

export const FirebaseAuth: FC = () => {
  const [renderAuth, setRenderAuth] = useState(false)

  useEffect(() => {
    setRenderAuth(true)
  }, [])

  return (
    <Box mt="40%">
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </Box>
  )
}
