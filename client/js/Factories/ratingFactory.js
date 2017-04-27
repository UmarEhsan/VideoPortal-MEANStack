/**
 * Created by LAPTECH on 3/18/2017.
 */
//Rating factory to use rating factor into two views one is inside all videos for rating and one is for video details for a single video
(function () {
    angular.module('VideoPortal')
        .factory('ratingFactory', ratingFactory)
    function ratingFactory(queryFactory) {
        var videoRating = {rating: rating, overAllRatingVideos : overAllRatingVideos, singleVideo : singleVideo};
        return videoRating;
        //save rating for videos
        function rating(rating, callback) {
            queryFactory.query("POST", "video/ratings", {sessionId: rating["session"]}, {
                videoId: rating["video"]["_id"],
                rating: rating["rating"]
            })
                .then(success, error);
            function success(response) {
                callback(response);
            }

            function error(err) {
                callback(err)
            }
        }

        function overAllRatingVideos(videos){
          return  videos.reduce(function(object, elem, index){
                var rate = elem.ratings.reduce(function(start, value){
                        return (start += value) ;
                    },0)/videos[index].ratings.length;
                return elem["overAllRating"] = Math.round(rate);
            },"overAllRating");
        }

        function singleVideo(video){

            video.overAllRating = Math.round(video.ratings.reduce(function(start, value){
                return (start += value) ;
            },0)/video.ratings.length);




        }
    }
})()

