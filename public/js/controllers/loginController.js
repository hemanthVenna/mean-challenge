angular.module('app').controller('loginController',function ($scope, $state, ApiService) {
    $scope.user = {}
    var url = "/auth/login";
    $scope.loginUser = function (user) {
        var loginEmail = user.loginEmail;
        var loginPassword = user.loginPassword;
        if((loginEmail) && (loginPassword)){
            var data = {};
            data.username = loginEmail;
            data.password = loginPassword;
            console.log(url)
            ApiService.post(url, data).then(function(result){
                console.log("user login successsfully")
                console.log(result.data)
                if(result.data.success){
                    console.log("suucess")
                    $state.go('app.addMobile')
                }
                if(result.data.error){
                    if(result.data.error){
                        $scope.loginStatus = result.data.error;
                    }
                }
            })
        }else{
            $scope.loginStatus = "Please fill all fields"
        }
    }
    $scope.go_to_register = function(){
        $state.go('home')
    }

   
})