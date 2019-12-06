$('document').ready(function() {
  var firebaseConfig = {
    apiKey: 'AIzaSyAh50GpB6sirjKPLqY-I6KAwN2tkfR86rs',
    authDomain: 'onlinescheduler-cc7ee.firebaseapp.com',
    databaseURL: 'https://onlinescheduler-cc7ee.firebaseio.com',
    projectId: 'onlinescheduler-cc7ee',
    storageBucket: 'onlinescheduler-cc7ee.appspot.com',
    messagingSenderId: '32569569158',
    appId: '1:32569569158:web:c26fcb132fbd658dd4c607'
  };

  var fb = firebase.initializeApp(firebaseConfig);
  var database = fb.database();

  $('#loginForm').submit(function(event) {
    event.preventDefault();
    SignIn($(this), database);
  });

  $('#newUserForm').submit(function(event) {
    event.preventDefault();
    CreateUser($(this), database);
  });
});
async function SignIn(form, database) {
  var inputs = form.find(':input');
  var userName = inputs[0].value;
  var password = inputs[1].value;

  var auth = false;

  await database.ref('/users/' + userName).once('value', function(snapshot) {
    if (snapshot.exists()) {
      var fbPassword = snapshot.val();
      if (password === fbPassword['password']) {
        auth = true;
      } else {
        alert('incorrect password');
      }
    } else {
      alert('incorrect username');
    }
  });
  if (auth) {
    sessionStorage.setItem('signedIn', userName);
    window.location.href = '/schedule.html?user=' + userName;
  }
}

function CreateUser(form, database) {
  var inputs = form.find(':input'),
    userName = inputs[0].value,
    firstPassword = inputs[1].value,
    secondPassword = inputs[2].value;

  if(userName === "") {
    alert("Username cannot be empty!");
    return;
  }

  if (firstPassword === "") {
    alert("Password cannot be empty!");
    return;
  }
  if ((firstPassword !== secondPassword)) {
    alert('Passwords are different!');
    return;
  }

  database.ref('/users/' + userName).set({
    password: firstPassword
  });
  sessionStorage.setItem('signedIn', userName);
  window.location.href = '/schedule.html?user=' + userName;
}
$('.toggle-btn').on('click', () => {
  console.log('hello');
});
var signIn = true;

function toggleForm() {
  //   if (signIn) {
  // $('#sign-in').hide('slide', { direction: 'right' }, 1000);
  // setTimeout(() => {
  //   $('#sign-up').show('slide', { direction: 'left' }, 1000);
  // }, 500);
  //     $('#sign-up').animate({
  //       width: $('#sign-up').width
  //     });
  //   } else {
  //     $('#sign-up').hide();
  //     $('#sign-in').show();
  //   }
  //   signIn = !signIn;
  $('#forms').toggleClass('sign-up');
  $('#forms').toggleClass('sign-in');
  $('.form').toggleClass('on');
}
