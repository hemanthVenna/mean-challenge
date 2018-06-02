angular.module('app').controller('regController',function ($scope, $state, ApiService) {
    $scope.user = {}
    var url = "/auth/register";
    $scope.registerUser = function (user) {
        var registerEmail = user.registerEmail;
        var registerPassword = user.registerPassword;
        if((registerEmail) && (registerPassword)){
            var data = {};
            data.registerEmail = registerEmail;
            data.registerPassword = registerPassword;
            ApiService.post(url, data).then(function(result){
                console.log("user registered successsfully")
                console.log(result.data)
                if(result.data.success){
                    $state.go('app.addMobile')
                }
                if(result.data.error){
                    $scope.signupStatus = result.data.error;
                }
                
            })
        }else{
            $scope.signupStatus = "Please fill all fields"
        }
    }
    $scope.go_to_login = function(){
        $state.go('login')
    }

   
})