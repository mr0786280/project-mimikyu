// JavaScript Document
   
    window.onload = init();

	function init() {
		
            window.addEventListener('scroll', function(e) {
                var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                    shrinkOn = 300,
                    header = document.querySelector("header");
                if (distanceY > shrinkOn) {
                    classie.add(header, "smaller");
                } else {
                    if (classie.has(header, "smaller")) {
                        classie.remove(header, "smaller");
                    }
                }
            });
		
			$.ajax({
				method:'GET',
				url:'https://me.catchthesehands.net/wp-json/wp-api-menus/v2/menus/3',
				dataType:'json',
				success: function(data) {
					$('nav').hide();
					var menu = menuBuilder(data.items);
					$('nav').html(menu).slideDown();
					$('nav li a').click(function() {
							getPage($(this).data("pgid"));  
					});
					getPage(102);
					$("#loaderDiv").fadeOut("slow");                                  
				},
				error: function(){
					console.log('all was not good');
				}
			});
		
			$.ajax({
				method:'GET',
				url:"https://me.catchthesehands.net/wp-json/wp-api-menus/v2/menus/5",
				dataType:'json',
				success: function (data) {
					console.log(data);
					var menu = menuBuilder(data.items, 'genLinks', 'footer-ul');
					$('#genLinks').replaceWith(menu);
					$('#genLinks li a').click(function () {
						getPage($(this).data("pgid"));
					});                               
				},
				error: function(){
					console.log('all was not good');
				}
			});
 }
 

			 function menuBuilder(obj, targetEl, classInfo) {
				 var theMenu = '';
				 if (obj.length > 0) {
					 
					 let target = (targetEl)?' id="'+targetEl+'"':'';
					 let elClass = (classInfo)?'class="'+classInfo+'"':'';
					 
					 theMenu = theMenu + '<ul'+target+''+elClass+'>';
					 obj.forEach(function (item) {
						 theMenu = theMenu + '<li><a href="#" data-pgid="' + item.object_id + '">' + item.title + '</a>';
						if(item.children) {
							theMenu = theMenu + menuBuilder(item.children);
						}
					theMenu = theMenu + '</li>';
					});
					 theMenu = theMenu + '</ul>';
				 }else{
					 console.log('no data');
				 }
				 return theMenu;
			 }

	
			function getPage(obj) {
				$("#loaderDiv").fadeIn("slow");
				$.ajax({
					method: 'GET',
					url: 'https://me.catchthesehands.net/wp-json/wp/v2/pages/' + obj,
					dataType: 'json',
					success: function(data) {
						var pgbuild = '';
						pgbuild = '<section><div class="container">' + data.content.rendered + '</div></section>';
					   $("#content").fadeOut(function() {
							$('html').animate({
								scrollTop: 0
							}, 'slow'); //IE, FF
							$('body').animate({
								scrollTop: 0
							}, 'slow'); //chrome, don't know if Safari works
							$(this).html(pgbuild).fadeIn();
							$("#loaderDiv").fadeOut("slow");
						});
					},
					error: function() {
						console.log('bad');
					}
				});
			}

