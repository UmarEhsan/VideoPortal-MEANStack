// users authentication factory
//  authentication Factory used to authenticate user

(function () {
    angular
        .module('VideoPortal')
        .factory('authentication', authentication);
    authentication.$inject = ['$http', '$q', '$window', 'queryFactory'];
    function authentication($http, $q, $window, queryFactory) {
        var Access = {OK: 200, UNAUTHORIZED: 401, FORBIDDEN: 403};
        //save users session inside sessionStorage
        function saveSession(session) {
            $window.sessionStorage['user'] = JSON.stringify(session);
        };

        //get users token from session storage when ever need
        function getSession() {
            return $window.sessionStorage['user'];
        };

        //CHeck if users signin then allow to move to videos and videodetail route
        function isAuthenticated() {
            var deferred = $q.defer();
            var user = getSession();
            user && deferred.resolve(Access.OK) || deferred.reject();
            return deferred.promise;
        }

        //Get detail of signin user
        function isLoggedIn() {
            return getSession()
        };

        //Login user and save session into sessionStorage;
        function login(user, callback) {
            queryFactory.query('POST', "user/auth", {}, user).then(function (response) {
                if (response.data.status === "success") {
                    saveSession(response.data);
                    callback(response.data)

                }
                else if (response.data.status === "error"){
                    callback(response.data);
                }

            }, function (err) {
                callback(err)
            });
        };
        //Logout and remove users session
        function logout(sessionId, callback) {
            queryFactory.query("GET", "user/logout", {sessionId: sessionId}, {}, {}).then(success, error);
            function success(response) {
                removeSession();
                callback(response)
            }

            function error(err) {
                callback(err)
            }
        };

        function removeSession() {
            $window.sessionStorage.removeItem('user');
        }


        return {
            getSession: getSession,
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated
        };
    }


})();
