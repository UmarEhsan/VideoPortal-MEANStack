/**
 * Created by LAPTECH on 3/19/2017.
 */
(function () {
    angular
        .module('VideoPortal')

        .directive('singleVideo', function () {
            var videos = [];
            return function (scope, element, attrs) {
                angular.element(document).ready(function () {
                    videos.push(element[0]);
                    function stopOthers() {
                        var id = this.id, i = 0;
                        for (var j = videos.length; i < j; i++) {
                            if (videos[i].id !== id) {
                                videos[i].pause();
                            }
                        }
                    }

                    var i = 0;
                    for (var j = videos.length; i < j; i++) {
                        videos[i].addEventListener("play", stopOthers, false);
                    }
                });
            };

        });
})();