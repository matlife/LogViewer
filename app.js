// Routing
var app = angular.module('Viewer', ['ui.router']);
// Config for routing INCOMPLETE
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'PostCtrl'
    });
   $stateProvider
   	.state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);

// Controller stuff

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.nodes = [
	  'node 1',
	  'node 2',
	  'node 3',
	  'node 4',
	  'node 5'
	];
}]);

app.controller('PostCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.posts = posts.posts;
  $scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  $scope.posts.push({
	    title: $scope.title,
	    link: $scope.link,
	    upvotes: 0,
	    comments: [
    	{author: 'Joe', body: 'Cool post!', upvotes: 0},
    	{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  		]
	  });
  };

  $scope.incrementUpvotes = function(post) {
	  post.upvotes += 1;
	};
}]);

app.controller('PostsCtrl',[
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];
	}
]);

// Service stuff

app.factory('posts', [function(){
  var o = {
    posts: []
	  };
  return o;
}])

