import $ from 'jquery';

const baseUrl = 'http://localhost:3000/';

export const createNewUser = (username, password) => {
  $.ajax({
    'url': baseUrl + 'users/',
    'method': 'POST',
    'headers': {
      'content-type': 'application/x-www-form-urlencoded',
    },
    'data': {
      'password': password,
      'username': username
    }
  }).done(response => {
    // do something with response...
    console.log(response);
  });
};

// Obj example: {"password": "potato", "wins": 87}
// Keys must be fields in users table
export const updateUser = (userId, obj) => {
  $.ajax({
    'url': baseUrl + 'users/' + userId,
    'method': 'POST',
    'headers': {
      'content-type': 'application/x-www-form-urlencoded',
    },
    'data': obj
  }).done(response => {
    // do something with response...
    console.log(response);
  });
};

//updated to get by userName, before it was userID
export const getUser = userName => {
  $.ajax({
    'url': baseUrl + 'users/' + userName,
    'method': 'GET'
  }).done(response => {
    // do something with response...
    console.log(response);
  });
};

export const createNewGame = (user1Id, user2Id) => {
  $.ajax({
    'url': baseUrl + 'games/',
    'method': 'POST',
    'headers': {
      'content-type': 'application/x-www-form-urlencoded',
    },
    'data': {
      'user1Id': user1Id,
      'user2Id': user2Id
    }
  }).done(response => {
    // do something with response...
    console.log(response);
  });
};

// Keys must be fields in games table
// ATM, values in db will be totally overwritten by your obj values,
// rather than concatenated.
export const updateGame = (gameId, obj) => {
  $.ajax({
    'url': baseUrl + 'games/' + gameId,
    'method': 'POST',
    'headers': {
      'content-type': 'application/x-www-form-urlencoded',
    },
    'data': obj 
  }).done(response => {
    // do something with response...
    console.log(response);
  });
};

export const getGame = gameId => {
  $.ajax({
    'url': baseUrl + 'games/' + gameId,
    'method': 'GET'
  }).done(response => {
    // do something with response...
    console.log(response);
  });
}; 

