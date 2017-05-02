angular.module('app.services')
  .factory('User',
    ['$http', 'API', 'Auth', '$window',
      function($http, API, Auth, $window) {

      var userLogin = function(email, password) {
        return $http.post(API + '/authenticate', {
          email: email,
          password: password
        })
      }

      var checkIfUserExists = function(email) {
        return $http.get(API + '/checkuserstatus?email=' + email)
      }

      var createUser = function(email, password, slackUserId) {
        return $http.post(API + '/createuser', {
          password: password,
          email: email,
          slackUserId: slackUserId
        })
      }

      var setCurrentUser = function(data){
        setCurrentUserEmail(data.user);
        setCurrentUserAccounts(data.accounts);
        setCurrentUserAdminAndOwnerAccounts();
      }

      var getAllUserAccounts = function(){
        return $http.get(API + '/api/user/accounts');
      }

      var deleteCurrentUser = function(){
        return $http.delete(API + '/api/user');
      }

      var setCurrentUserEmail = function(email){
        $window.localStorage.setItem("currentUser.email",email);
      }

      var getCurrentUserEmail = function(){
        return $window.localStorage.getItem("currentUser.email");
      }

      var setCurrentUserAccounts = function(accounts){
        var accountsArray = [];
        for(var i = 0; i < accounts.length; i++){
          accountsArray.push(accounts[i]);
        }
        $window.localStorage.setItem("currentUser.accounts", JSON.stringify(accountsArray));
      }

      var getCurrentUserAccounts = function(){
        return JSON.parse(localStorage.getItem("currentUser.accounts"));
      }

      var setCurrentUserAdminAndOwnerAccounts = function(){
        var adminAndOwerAccounts = [];
        var currentUserAccounts = getCurrentUserAccounts();
        for(var i = 0; i < currentUserAccounts.length; i++ ){
          if((currentUserAccounts[i].isOwner || currentUserAccounts[i].isAdmin) && !currentUserAccounts[i].isDisabled){
            adminAndOwerAccounts.push(currentUserAccounts[i]);
          }
        }
        $window.localStorage.setItem("currentUser.adminOwnerAccounts", JSON.stringify(adminAndOwerAccounts));
      }

      var getCurrentUserAdminAndOwnerAccounts = function(){
        return JSON.parse(localStorage.getItem("currentUser.adminOwnerAccounts"));
      }

      var sendPasswordReset = function (email) {
        return $http.post(API + '/createpasswordreset', {
          email: email
        })
      }

      var isUserLoggedIn = function(){
        return Auth.isAuthed();
      }

      var userLogout = function(){
        return Auth.logout();
      }

      var addSlackUserId = function (slackUserId) {
        return $http.post(API + '/api/user/editslackuserid', {
          slackUserId: slackUserId
        })
      }

    return {
      getCurrentUserEmail: getCurrentUserEmail,
      getCurrentUserAdminAndOwnerAccounts: getCurrentUserAdminAndOwnerAccounts,
      getCurrentUserAccounts: getCurrentUserAccounts,
      setCurrentUser: setCurrentUser,
      login: userLogin,
      isLoggedIn: isUserLoggedIn,
      logout: userLogout,
      resetPassword: sendPasswordReset,
      getAllUserAccounts: getAllUserAccounts,
      setCurrentUserAccounts: setCurrentUserAccounts,
      createUser: createUser,
      checkIfUserExists: checkIfUserExists,
      setCurrentUserEmail: setCurrentUserEmail,
      addSlackUserId: addSlackUserId,
      deleteCurrentUser: deleteCurrentUser
    };

  }
]);


