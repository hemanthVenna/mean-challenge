var app = angular.module('app', ['ui.router',"app.services",'ngAnimate','ngMaterial'])

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('');
    $stateProvider
        .state('home',{
            url:'',
            templateUrl:'templates/home.html',
            controller:'regController'
        })
        .state('login',{
            url:'',
            templateUrl:'templates/login.html',
            controller:'loginController'
        })
        .state('app',{
            url:"/mobiles",
            // abstract:true,
            templateUrl: 'templates/menu.html',
            controller:'menuController'
        })
        .state('app.addMobile', {
            url: '/addmobile',
            views:{
                'contentView':{
                    templateUrl: 'templates/addmobiles.html',
                    controller: 'addMobileController'
                }
            }
            
        })
        .state('app.viewMobile', {
            url: '/viewmobile',
            params:{id:null},
            views:{
                'contentView':{
                    templateUrl: 'templates/viewmobile.html',
                    controller: 'viewMobileController'
                }
            }
            
        })
        


    //token interceptor.
    $httpProvider.interceptors.push(function () {
        return {
            'request': function (config) {
                var formHeader = config.headers;
                formHeader['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                return config;
            }
        };
    });
    $httpProvider.defaults.withCredentials = true;


})
