//login directive for user to login and navigate to videos

(function () {

    angular
        .module('VideoPortal')
        .directive('loginDirective', loginDirective);

    function loginDirective($state, authentication, $rootScope, $mdToast) {
        return {
            restrict: 'EA',
            templateUrl: 'js/directives/login/login.html',
            scope: true,

            link: function (scope, elem, attr) {
                scope.isRequestPending = false;

                scope.submit = function () {
                    scope.isRequestPending = true;
                    signIn();
                }
                function signIn() {
                    authentication.login(scope.auth, response);
                }

                function response(response) {
                    var position = getPosition();
                    if(response.status !== "error"){
                        scope.isRequestPending = false;
                        showMessage(response.status);
                        $rootScope.$broadcast("userLogin", {});
                        $state.go("videos");
                    }
                    else{
                        scope.isRequestPending = false;
                        showMessage(response.error);
                    }

                    function showMessage(message){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(message)
                                .position(position)
                                .hideDelay(3000)

                        );
                    }



                    function getPosition(){
                        return "top center"
                    }


                }
            }
        }
    }

})();