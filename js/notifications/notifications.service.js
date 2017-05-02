angular.module('app.services')
  .factory('Notification',
    ['$http', 'NOTIFICATIONS_API', 'Account',
      function($http, NOTIFICATIONS_API, Account) {

        var getRemoteNotifications = function(){
          return $http.get(NOTIFICATIONS_API + '/api/notifications/'+Account.getCurrentTeamId(),{},{
            ignoreLoadingBar: true
          });
        }

        var markNotificationsAsViewed = function(){
          return $http.post(NOTIFICATIONS_API + '/api/notifications/markasviewed/account/'+Account.getCurrentTeamId(),{},{
            ignoreLoadingBar: true
          });
        }

        var markAsRead = function(notificationId){
          return $http.post(NOTIFICATIONS_API + '/api/notificatons/read/' + notificationId +'/account/'+Account.getCurrentTeamId(),{},{
            ignoreLoadingBar: true
          });
        }

        // BEGIN BADGE COUNT
        var badgeCount = 0;

        var getBadgeCount = function(){
          return badgeCount;
        }

        var updateBadgeCount = function(newBadgeCount){
          badgeCount = newBadgeCount;
          return badgeCount;
        }

        var reduceUnreadCountByOne = function(){
          if(badgeCount > 0){
            badgeCount = badgeCount - 1;
          }
          return badgeCount;
        }
        // END BADGE COUNT

        return {
          getRemoteNotifications: getRemoteNotifications,
          getBadgeCount: getBadgeCount,
          updateBadgeCount: updateBadgeCount,
          markNotificationsAsViewed: markNotificationsAsViewed,
          markAsRead: markAsRead,
          reduceUnreadCountByOne: reduceUnreadCountByOne
        };

      }
    ]);



