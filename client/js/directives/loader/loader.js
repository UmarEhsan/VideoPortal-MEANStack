
(function () {

  angular
    .module('VideoPortal')
    .directive('loading', loading);

  function loading() {
   return {
      restrict: 'E',
      scope : {
        message: '@message'
        
      },
      
      templateUrl: 'js/directives/loader/loader.html',
    };
  }

})();
