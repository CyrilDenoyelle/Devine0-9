(function(){
	app = {
		init:function(){
			this.animationinit();
		},
		animationinit:function(){
			function chiffreRand(){
				return Math.floor(Math.random()*10);
			};
			var interv = setInterval(function () {
				$('#app').css('font-size', "5000%")
				.html(chiffreRand(10));
			}, 100);
			$('html').unbind('click')
			setTimeout(function(){
				clearInterval(interv);
			}, 3000);

			$('#app').fadeOut(3000, function(){
				$(this).show().html("");
				app.gameStart()
			});
		},
		gameStart:function(){
			console.log('gameStart');

			function chiffreRand(x){
				return Math.floor(Math.random()*x);
			};

			phrasesessai = ["ARTUR! CUIERE!", "J'apprécie les fruits au sirop!", "Ils sont fous ces romains!!!", "j'aime les nounours!!!", "Que la Force soit avec toi", ];

			phrasevictoire = ["Quand je suis content, je vomis.", "VOILÀ!            ", "Hasta la vista, baby !", "Moulti-pass         ", " des points des points des points des points..."];

			phrasedefeat = ["Reste cool, sac à merde.", "C'est pas donné a tout le monde de gagné...", "Ya des fois c’est toi qui cogne le bar, mais des fois, c'est le bar qui te cogne.", "Essai plutôt Alt+F4 ?"];

			function arrayRand(inp){
				return inp[chiffreRand(inp.length)]
			};

			var rand = chiffreRand(10);
			$('#app').html("ALORS C'EST QUEL CHIFFRE ?!?!?!");
			$('#app').css("font-size", "100px");
			$('body').unbind('keypress')
			console.log(rand);
			var i=0,
			petit=0,
			grand=0;
			$('body').on('keypress', function(e){
				var touche = e.which;
				console.log(touche)
				if(touche <=57 && touche >=48){
					if(i<2){
						// $('#app').html(touche-48);
						if(touche===rand+48){
							var phrasev = arrayRand(phrasevictoire);
							var tempsdelecturev = phrasev.length;
							$('#app').css('font-size', "100xp");
							$('#app').html("GG <br>"+phrasev);
							var victtimeout = setTimeout(function(){
								$('#app').html('click pour encore');
							}, tempsdelecturev*100)

							$('body').unbind('keypress');

							$("html").on('click', function(){
								clearTimeout(victtimeout);
								$(this).unbind('click');
								app.init();
							})
						}else if(touche<rand+48){
							$('#app').html("Plus grand");
							petit=0;
							grand++;
							i++;
						}else if(touche>rand+48){
							$('#app').html("Plus petit")
							grand=0;
							petit++;
							i++;
						}
					}else if(i>1){
						var phrase = arrayRand(phrasedefeat);
						var tempsdelecture = phrase.length;
						console.log(tempsdelecture);
						$('#app').html('PERDU');
						var defeattimeout1 = setTimeout(function(){
							$('#app').html(phrase)
						}, 2000)
						var defeattimeout2 = setTimeout(function(){
							$('#app').html('click pour encore');
						}, tempsdelecture*100)

						$('body').unbind('keypress');

						$("html").on('click', function(){
							clearTimeout(defeattimeout1)
							clearTimeout(defeattimeout2)
							$(this).unbind('click');
							app.init();
						});
					}
				}
			});	
		}
	}
	$(document).ready(function(){
		app.init();
		// var rand = chiffreRand();
		

	})
})()
