var app = angular.module('GalleryApp', []);
app.controller('GalleryCtrl', function($scope) {
  $scope.images = ['https://xakep.ru/wp-content/uploads/2015/06/XP_wallpaper.jpg',
    'http://fastvista.ru/pictures/wallpapers/fastvista.ru_wallpapers24.jpg', 'http://angularconnect.com/perch/resources/angular.png',
    'http://looi.co/img/logo.png',
    'http://www.reka-il.net/_ph/6/842309937.jpg'
  ];
  $scope.sidebar = true;
  $scope.grid = true;
  $scope.open_image = function(data) {
  	console.log($scope);
    $scope.fullscreen_img = data;
    $scope.grid = false;
    $scope.sidebar=false;
  }
  $scope.close_image = function() {
    $scope.fullscreen_img = null;
    $scope.grid = true;
    $scope.sidebar=true;
  }
})
app.directive('resize', function($window) {
  return function($scope, $element, $attrs) {
    var w = angular.element($window);
    var pic_count = 1;
    var toggle_sidebar = function(option) {
      if (option == true) {
        $scope.sidebar = true;
        $element.css({
          'margin-left': '200px'
        })
      } else {
        $scope.sidebar = false;
        $element.css({
          'margin-left': 0
        })
      }
    }
    var setWidthAndHeight = function(size) {
      return {
        'width': size + 'px',
        'height': size + 'px'
      }
    }
    var setSizes = function() {
	if (!pic_count>2){
		pic_count=2;
	}
	while (pic_count<$element[0].offsetWidth/260){
		pic_count++;
	}
	while (pic_count>$element[0].offsetWidth/240)
	{
		pic_count--;
	}
      if ($element[0].offsetWidth < 400) {
        console.log('<400');
        toggle_sidebar(false);
        $scope.imagesize = setWidthAndHeight($element[0].offsetWidth);
      } else
      if ($element[0].offsetWidth >= 400 && $element[0].offsetWidth < 480) {
        console.log('>400');
        toggle_sidebar(true);
        $scope.imagesize = setWidthAndHeight($element[0].offsetWidth - 200);
      } else {
        console.log('>480');
        toggle_sidebar(true);
        $scope.imagesize = setWidthAndHeight(($element[0].offsetWidth - 200) / pic_count);
        toggle_sidebar(true);
      }
	console.log(pic_count, $element[0].offsetWidth);
      $scope.$apply();
    }
    w.on('resize', function() {
      setSizes();
    })
    setSizes();
  }
})
