import firebase from "lib/firebase";
// const signinWithEmail = (email, password) => {
//     return firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((response) => {
//         handleUser(response.user);
//         Router.push('/sites');
//       });
//   };

export const logout = () => firebase.auth().signOut();

export const signinWithGitHub = () =>
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then((response) => {
      // handleUser(response.user);
      console.log(response.user.email);
    });

export const signinWithGoogle = () =>
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((response) => {
      //   handleUser(response.user);
      console.log(response.user.email);
    });
