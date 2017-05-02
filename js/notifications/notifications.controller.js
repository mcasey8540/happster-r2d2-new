angular.module('app.controllers')
  .controller('NotificationsController', ['$rootScope', '$scope', '$interval', 'Notification', '$state', 'Auth', function($rootScope, $scope, $interval, Notification, $state, Auth) {

    $scope.notificationsData = {
      badgeCount: 0,
      notifications: []
    }

    $interval(initializeController, 1000 * 300);

    function initializeController (){
      if(Auth.isAuthed()){
        Notification.getRemoteNotifications()
          .then(getRemoteNotificationsSuccess)
      }
    }


    function getRemoteNotificationsSuccess(res){
      if(res.data && res.data.success){
        $scope.notificationsData.notifications = res.data.notifications;
        $scope.notificationsData.badgeCount = Notification.updateBadgeCount(res.data.unviewedCount)
      }
    }

    $scope.markNotificationsAsViewed = function(){
      Notification.markNotificationsAsViewed()
        .then(markNotificationsAsViewedSuccess)
    }

    function markNotificationsAsViewedSuccess(res){
      if(res.data && res.data.success){
        $scope.notificationsData.badgeCount = Notification.updateBadgeCount(0);
        $state.go('home.notifications');
      }
    }

    $scope.markAsRead = function(notification){
      if(!notification.readAt){
        Notification.markAsRead(notification.notificationId)
          .then(function(res){
            if(res.data && res.data.success){
              notification.readAt = res.data.notification.readAt;
              $scope.notificationsData.badgeCount = Notification.reduceUnreadCountByOne()
            }
          })
          .finally(function(){
            //TODO: Navigate to Detail View after successfully markAsRead
            navigateToState(notification.category, notification.targetId)
          })
      }else{
        //TODO: Navigate to Detail View after successfully markAsRead
        navigateToState(notification.category, notification.targetId)
      }
    }

    function navigateToState(category, targetId){
      if(category == 'feedback'){
        $state.go('home.feedbackDetail', {feedbackId: targetId});
      }
      if(category == 'hero'){
        $state.go('home.heroesDetail', {heroId: targetId});
      }
      if(category == 'question'){
        $state.go('home.qhubDetail', {questionId: targetId});
      }
    }

    $rootScope.$on('rootScope.currentAccountUpdated', function(event, data) {
      initializeController();
    })

    initializeController();

}]);
