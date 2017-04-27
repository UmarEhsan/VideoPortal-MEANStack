(function () {
angular
    .module('VideoPortal',[
        'ui.router',
        'ngMaterial',
        'jkAngularRatingStars',
        'infinite-scroll',
        'ngMdIcons'

    ])

.run(['$rootScope', '$state',  'authentication', run])
function run($rootScope, $state, authentication) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name !== 'home' && !authentication.getSession()) {
            event.preventDefault();
            $state.go('home');
        }
        else if(toState.name === 'home' && authentication.getSession()) {
            event.preventDefault();
            $state.go('videos');
        }
    })

  }

})()











