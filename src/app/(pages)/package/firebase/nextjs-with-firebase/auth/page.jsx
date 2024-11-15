import React from 'react';
import { FiClipboard } from 'react-icons/fi'; // Clipboard icon from react-icons

const copyToClipboard = (code) => {
  navigator.clipboard.writeText(code).then(
    () => alert('Code copied to clipboard!'),
    (err) => alert('Failed to copy code: ', err)
  );
};

export default function NextJsAuthentication() {
  const signUpCode = `
import firebase from 'firebase/app';
import 'firebase/auth';

const signUp = async (email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
};
  `;

  const signInCode = `
import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
};
  `;

  const signOutCode = `
import firebase from 'firebase/app';
import 'firebase/auth';

const signOut = async () => {
  try {
    await firebase.auth().signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};
  `;

  const resetPasswordCode = `
import firebase from 'firebase/app';
import 'firebase/auth';

const resetPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error resetting password:', error.message);
  }
};
  `;

  const sendVerificationCode = `
import firebase from 'firebase/app';
import 'firebase/auth';

const sendEmailVerification = async (user) => {
  try {
    await user.sendEmailVerification();
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error.message);
  }
};
  `;

  const googleSignInCode = `
import firebase from 'firebase/app';
import 'firebase/auth';

const googleSignIn = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    console.log('User signed in with Google:', user);
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
  }
};
  `;

  const facebookSignInCode = `
import firebase from 'firebase/app';
import 'firebase/auth';

const facebookSignIn = async () => {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    console.log('User signed in with Facebook:', user);
  } catch (error) {
    console.error('Error signing in with Facebook:', error.message);
  }
};
  `;

  return (
    <div>
      <h1 className='text-4xl'>Firebase Authentication Functions</h1>

      <div className="mt-6">
        <h2 className='text-2xl'>Sign Up (Create User)</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(signUpCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{signUpCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Sign In (Login User)</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(signInCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{signInCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Sign Out (Logout User)</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(signOutCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{signOutCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Password Reset</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(resetPasswordCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{resetPasswordCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Email Verification</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(sendVerificationCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{sendVerificationCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Google Sign-In</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(googleSignInCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{googleSignInCode}</code></pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className='text-2xl'>Facebook Sign-In</h2>
        <div className="relative bg-black text-white p-4 rounded-lg">
          <FiClipboard 
            className="absolute top-2 right-2 cursor-pointer text-lg"
            onClick={() => copyToClipboard(facebookSignInCode)} 
          />
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{facebookSignInCode}</code></pre>
        </div>
      </div>
    </div>
  );
}
