/**
 * Created by LAPTECH on 3/18/2017.
 */
(function(){
    angular
        .module('VideoPortal')
        .controller('videoDetail', videoDetail);

        function videoDetail($scope, $stateParams, queryFactory, ratingFactory, authentication, $mdToast){
            var videoId = $stateParams.id;
            $scope.onRating = onRating;
            getVideoDetail(videoId);

            function getVideoDetail(videoId){
                var session = JSON.parse(authentication.getSession());
                queryFactory.query("GET", "video", {sessionId : session.sessionId, videoId : videoId},{},{}).then(success, error);

                function success(response){
                    console.log(response);
                    $scope.videoDetail = response.data.data;
                    ratingFactory.singleVideo($scope.videoDetail);
                }
                function error(err){
                    console.log(err);
                }
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
                                return "top"
                            }
                        }
                    })

                }
            }

            function getUser(){
                var user = authentication.getSession();
                return user && JSON.parse(user);
            }
        }
})()