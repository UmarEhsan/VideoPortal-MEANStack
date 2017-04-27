(function () {

    angular
        .module('VideoPortal')
        .directive('navDirective', navDirective);

    function navDirective($state, $window, authentication, $rootScope) {
        return {
            restrict: 'EA',
            templateUrl: 'js/directives/navigation/navigation.html',
            scope: true,

            link: function (scope, elem, attr) {
                isUserLogin();
                $rootScope.$on("userLogin", userLogin);

                scope.logOut = logOut;

                function userLogin() {
                    isUserLogin()
                }


                function isUserLogin() {
                    scope.isLoggedIn = authentication.isLoggedIn();
                }

                // scope.currentUser = authentication.currentUser();
                function logOut() {
                    var session = JSON.parse(authentication.getSession());
                    authentication.logout(session.sessionId, response);
                    function response(data) {
                        if (data.status != 401 && data.statusText !== "Unauthorized") {
                            isUserLogin();
                            $state.go("home");
                        }
                    }


                }
            }
        };
    }

})();