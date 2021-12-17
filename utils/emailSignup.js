import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const onSignUpButtonPress = details => {
  auth()
    .createUserWithEmailAndPassword(details.email, details.password)
    .then(result => {
      result.additionalUserInfo.isNewUser
        ? firestore()
            .collection('Users')
            .doc(result.user.uid)
            .set({
              name: details.name,
              email: details.email,
              isAdmin: false,
            })
            .then(() => {
              console.log('User added!');
            })
        : null;
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
};
