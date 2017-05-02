angular.module('app.services')
  .factory('Account',
    ['$http', 'API', '$window', '$rootScope',
      function($http, API, $window,  $rootScope) {

      var setCurrentAccount = function(data){
        $window.localStorage.setItem("currentAccount.accountId", data.accountId);
        $window.localStorage.setItem("currentAccount.firstName", data.firstName);
        $window.localStorage.setItem("currentAccount.lastName", data.lastName);
        $window.localStorage.setItem("currentAccount.fullName", data.fullName);
        $window.localStorage.setItem("currentAccount.teamName", data.teamName);
        $window.localStorage.setItem("currentAccount.teamId", data.teamId);
        $window.localStorage.setItem("currentAccount.profilePictureUrl",  data.profilePictureUrl);
        $window.localStorage.setItem("currentAccount.title", data.title);
        $window.localStorage.setItem('currentAccount.isAdmin', data.isAdmin);
        $window.localStorage.setItem('currentAccount.isOwner', data.isOwner);
        $rootScope.$emit('rootScope.currentAccountUpdated');
      }

      var getCurrentAccount = function(){
        return {
          firstName: $window.localStorage.getItem("currentAccount.firstName"),
          lastName: $window.localStorage.getItem("currentAccount.lastName"),
          accountId: $window.localStorage.getItem("currentAccount.accountId"),
          fullName: $window.localStorage.getItem("currentAccount.fullName"),
          teamName: $window.localStorage.getItem("currentAccount.teamName"),
          teamId: $window.localStorage.getItem("currentAccount.teamId"),
          profilePictureUrl: $window.localStorage.getItem("currentAccount.profilePictureUrl"),
          title: $window.localStorage.getItem("currentAccount.title"),
          isAdmin: $window.localStorage.getItem("currentAccount.isAdmin"),
          isOwner: $window.localStorage.getItem("currentAccount.isOwner")
        }
      }

      var setCurrentTeamName = function(teamName){
        $window.localStorage.setItem("currentAccount.teamName", teamName);
      }

      var getCurrentTeamName = function(){
        return $window.localStorage.getItem("currentAccount.teamName");
      }

      var getCurrentTeamId = function(){
        return $window.localStorage.getItem("currentAccount.teamId");
      }

      var getCurrentAccountFirstName = function(){
        return $window.localStorage.getItem("currentAccount.firstName");
      }

      var getCurrentAccountLastName = function(){
        return $window.localStorage.getItem("currentAccount.lastName");
      }

      var getCurrentAccountId = function(){
        return $window.localStorage.getItem("currentAccount.accountId");
      }

      var getCurrentAccountProfilePicture = function(){
        return $window.localStorage.getItem("currentAccount.profilePictureUrl");
      }

      var makeAdmin = function (accountId,teamId) {
        return $http.post(API + '/api/account/makeadmin', {
          accountId: accountId,
          teamId: teamId
        })
      }

      var removeAdmin = function (accountId,teamId) {
        return $http.post(API + '/api/account/removeadmin', {
          accountId: accountId,
          teamId: teamId
        })
      }

      var disableAccount = function (accountId,teamId) {
        return $http.post(API + '/api/account/disable', {
          accountId: accountId,
          teamId: teamId
        })
      }

      var reEnableAccount = function (accountId,teamId) {
        return $http.post(API + '/api/account/reenable', {
          accountId: accountId,
          teamId: teamId
        })
      }

      var createAccount = function (teamId, fName, lName) {
        return $http.post(API + '/api/account/create', {
          teamId: teamId,
          firstName: fName,
          lastName: lName
        })
      }

      var getAccountProfile = function(accountId, teamId){
        return $http.get(API + '/api/user/accountprofile/'+accountId+'/team/'+teamId);
      }

      return {
        getCurrentAccount: getCurrentAccount,
        setCurrentAccount: setCurrentAccount,
        getCurrentTeamId: getCurrentTeamId,
        getCurrentAccountId: getCurrentAccountId,
        getCurrentTeamName: getCurrentTeamName,
        getCurrentAccountFirstName: getCurrentAccountFirstName,
        getCurrentAccountLastName: getCurrentAccountLastName,
        getCurrentAccountProfilePicture: getCurrentAccountProfilePicture,
        makeAdmin: makeAdmin,
        removeAdmin: removeAdmin,
        disableAccount: disableAccount,
        reEnableAccount: reEnableAccount,
        setCurrentTeamName: setCurrentTeamName,
        createAccount: createAccount,
        getAccountProfile: getAccountProfile
      };

  }
]);


