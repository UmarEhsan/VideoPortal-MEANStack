// Service to communicate between client and server side a single service you can create for all apis
(function () {
    angular.module('VideoPortal')
        .factory('queryFactory', queryFactory)
    function queryFactory($http, $q) {
        var httpRequests = {query: query};
        return httpRequests;

        function query(method, url, params, data, headers) {
            var deffered = $q.defer();
            var opt = {method: method, url: url, params: params || {}, data: data || {}, headers: headers || {}};
            $http(opt).then(success, error);
            function success(serverDataResponse) {
                deffered.resolve(serverDataResponse);
            }

            function error(serverErrorResponse) {
                deffered.reject(serverErrorResponse);
            }

            return deffered.promise;
        }
    }
})()

