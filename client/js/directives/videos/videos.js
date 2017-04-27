(function () {

    angular
        .module('VideoPortal')
        .directive('videosDirective', videosDirective);

    function videosDirective($state, queryFactory, ratingFactory, authentication, $mdToast) {
        return {
            restrict: 'EA',
            templateUrl: 'js/directives/videos/videos.html',
            scope: true,
            link : function (scope) {
                scope.isRequestPending = false;
                scope.onRating         = onRating;
                scope.loadMore         = loadMore;
                function loadMore(){
                    getVideos(10);
                }
                function onRating(video, rating){
                    var session =  getUser();
                    if(session){
                        var ratingInfo = {
                            session : session["sessionId"],
                            video   : video,
                            rating  : rating
                        }
                        ratingFactory.rating(ratingInfo, function(rating){
                            if(rating["status"] === 200){
                                var position = getPosition();
                                $mdToast.show(
                                         $mdToast.simple()
                                        .textContent('Rating added!')
                                        .position(position)
                                        .hideDelay(3000)

                                );

                                function getPosition(){
                                    return "top center"
                                }
                            }
                        })

                    }

                }



                function getVideos(limit){
                    var videoLimit = scope.videos && (scope.videos.length += limit) || 10;
                    var session =  getUser();
                    if(session){
                        queryFactory.query("GET", "videos", {sessionId : session["sessionId"], skip : 0, limit : videoLimit}).then(success, error);
                        function success(response){
                            scope.videos = response.data.data;
                            ratingFactory.overAllRatingVideos(scope.videos, "single");



                        }
                        function error(err){
                            if(err.statusText === 'Unauthorized'){
                                $state.go("home");
                            }
                        }
                    }

                }
                function getUser(){
                    return authentication.getSession() && JSON.parse(authentication.getSession()) ;
                }





            }
        }
    }

})();


