angular.module('app').controller('menuController', function ($scope, $state, ApiService,$rootScope) {
    // $state.go("app.addMobile")
    var url = "/mobiles"
    ApiService.get(url).then(function(result){
        if(result.data.mobiles){
            var allMobiles = result.data.mobiles;
            $scope.mobiles = allMobiles
        }
        if(result.data.message){
            $scope.noMobiles = result.data.message;
        }
        
    })
    $rootScope.$on("updateMobiles",function(evt,data){
        ApiService.get(url).then(function(result){
            if(result.data.mobiles){
                var allMobiles = result.data.mobiles;
                $scope.mobiles = allMobiles
            }
            if(result.data.message){
                $scope.noMobiles = result.data.message;
            }
            
        })
    })
    $scope.go_to_addMobile = function(){
        $state.go('app.addMobile')
    }
    $scope.go_to_viewMobile = function(id){
        var reqParams = id;
        console.log("id:"+ id)
        $state.go("app.viewMobile",{id:reqParams})
    }
    
})