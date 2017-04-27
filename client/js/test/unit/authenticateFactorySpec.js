/**
 * Created by LAPTECH on 3/19/2017.
 */
//
'use strict'
// beforeEach(module('VideoPortal'));

var mockWindow, authenticationObj;
beforeEach(function(){
    module(function($provide){
        $provide.service('$window', function(){
            this.sessionStorage = jasmine.createSpy('sessionStorage');
        });

    });
    module('VideoPortal');
});

// beforeEach(inject(function($window, authentication){
//     mockWindow=$window;
//     authenticationObj = authentication
//
// }));
beforeEach(inject(function($window, authentication){
    mockWindow=$window;
    authenticationObj = authentication;
}));

it('should show alert when title is not passed into showDialog', function(){
    var user = { username : "ali" };
    authenticationObj.saveSession(user);

    expect(mockWindow.sessionStorage());

});