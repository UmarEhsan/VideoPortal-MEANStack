(function () {
  angular
    .module('VideoPortal')
    .config(['$stateProvider', '$urlRouterProvider', '$logProvider', config])


  function config($stateProvider, $urlRouterProvider, $logProvider){
      "use strict";
      $logProvider.debugEnabled(true);

      $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl: 'components/home/home.html',

        })
      
        .state('videos', {
          url : '/videos',
          templateUrl : 'components/videos/videos.html',
            resolve: {
                access: ["authentication", function(authentication) {

                    return authentication.isAuthenticated();
                }]
            }
        })

        .state('video', {
            url: '/videodetail/:id',
            templateUrl : 'components/videoDetail/videoDetail.html',
            controller  : 'videoDetail',
            resolve: {
                access: ["authentication", function(authentication) {
                    return authentication.isAuthenticated();
                }]
            }
        })





     
    // $locationProvider.html5Mode(true)
  }
})();
