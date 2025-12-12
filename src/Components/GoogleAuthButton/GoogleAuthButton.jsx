// components/GoogleAuthButton.jsx
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from '@/store/api';

const GoogleAuthButton = () => {
  const [googleLogin, { isLoading, error }] = useGoogleLoginMutation();

  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const idToken = credentialResponse.credential;
            console.log('Google credentialResponse:', credentialResponse);

            const data = await googleLogin({ idToken }).unwrap();
            console.log('Backend googleLogin OK:', data);
            // здесь можно сделать redirect, закрыть модалку и т.п.
          } catch (err) {
            console.log('Backend googleLogin FAILED:', err);
          }
        }}
        onError={() => {
          console.log('Google Login widget failed');
        }}
      />

      {isLoading && <p>Signing in with Google...</p>}

      {error && (
        <pre style={{ color: 'red', fontSize: 12, whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default GoogleAuthButton;
