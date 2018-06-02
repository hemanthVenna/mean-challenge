angular.module('app.services', []).factory('ApiService', function($http) {
    return {
      get: function (url) {
        return $http.get(url);
      },
      post: function (url, data) {
        var transformRequest = function(data) {
          var str = [];
          for (var p in data)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
          return str.join("&");
        }
        return $http({
          method: 'POST',
          url: url,
          data: data,
          transformRequest : transformRequest
        });
      },
      postWithoutTransform: function (url, data, headers) {
        return $http({
          method: 'POST',
          url: url,
          data: data,
          headers: headers
        });
      }
    }
  })