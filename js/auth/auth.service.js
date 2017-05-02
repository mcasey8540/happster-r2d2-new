services
  .service('Auth',
    ['$window',
      function($window) {

      var parseJwt = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
      }

      //save token to local storage
      var saveToken = function(token) {
        $window.localStorage['token'] = token;
      }
      //return stored token
      var getToken = function() {
        return $window.localStorage['token'];
      }

      //remove token
      var logout = function() {

        //current account
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem(['currentAccount.accountId']);
        $window.localStorage.removeItem(['currentAccount.teamId']);
        $window.localStorage.removeItem(['currentAccount.teamName']);
        $window.localStorage.removeItem(['currentAccount.firstName']);
        $window.localStorage.removeItem(['currentAccount.lastName']);
        $window.localStorage.removeItem(['currentAccount.fullName']);
        $window.localStorage.removeItem(['currentAccount.title']);
        $window.localStorage.removeItem(['currentAccount.profilePictureUrl']);
        $window.localStorage.removeItem(['currentAccount.isAdmin']);
        $window.localStorage.removeItem(['currentAccount.isOwner']);

        //current user
        $window.localStorage.removeItem(['currentUser.email']);
        $window.localStorage.removeItem(['currentUser.accounts']);
        $window.localStorage.removeItem(['currentUser.adminOwnerAccounts']);

        if ($window.localStorage["token"]) {
          return false;
        } else {
          return true;
        }
      }

      var isAuthed = function() {
        var token = getToken();
        if(token) {
          var params = parseJwt(token);
          return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
          return false;
        }
      }

    return {
      parseJwt: parseJwt,
      saveToken: saveToken,
      getToken: getToken,
      logout: logout,
      isAuthed: isAuthed
    };

  }
]);
