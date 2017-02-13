(function(){
	app = {
		init:function(){
			this.animationinit();
			this.pointinit();
		},
		pointinit:function(){
			console.log("recupération des points");

			if(!localStorage.getItem("devinerandgain" || localStorage.getItem("devinerandgain")<= 1)){
				gain = 1;
				localStorage.setItem("devinerandgain", gain)
			}else{
				gain = localStorage.getItem("devinerandgain");
			}
			$('#gain').html(gain + " de gain a la prochaine victoire");

			var intergain = setInterval(function(){
				if(gain>Math.floor(points/2) && points>10){
					gain = Math.floor(gain-gain*0.1);
					localStorage.setItem("devinerandgain", gain);
				}
				if(!localStorage.getItem("devinerandgain" || localStorage.getItem("devinerandgain")<= 1)){
					gain = 1;
					localStorage.setItem("devinerandgain", gain)
				}else{
					gain = localStorage.getItem("devinerandgain");
				}
				$('#gain').html(gain + " de gain a la prochaine victoire");


			}, 7000);

			if(!localStorage.getItem("devinerandpoint") ){
				points = 0;
				localStorage.setItem("devinerandpoint", points)
			}else{
				points = localStorage.getItem("devinerandpoint");
			}


			if(points >100000){
				var pointsnum = new Number (points)
				$('#points').html(pointsnum.toExponential(1)+" MysteryPoints");
			}else{
				$('#points').html(points+" MysteryPoints")
			}if(pointsnum == "Infinity"){
				$('#points').html("GG t'as fini le jeu click ici pour recommencer !!")
				.on('click', function(){
					localStorage.setItem('devinerandgain', 1)
					localStorage.setItem('devinerandpoint', 0)
					$(location).attr('href', "#")
				})
			}

		},
		animationinit:function(){
			function chiffreRand(){
				return Math.floor(Math.random()*10);
			};

			$('html').unbind('click');

			var interv = setInterval(function () {
				$('#app').css('font-size', "5000%")
				.html(chiffreRand(10));
			}, 100);
			
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

			phrasevictoire = ["Quand je suis content, je vomis.", "VOILÀ!          ", "Hasta la vista, baby !", "Moulti-pass            ", " des points des points des points des points...", "On ne peut pas tromper 1000 fois une personnes, mais.. euh non on ne peut pas tromper 1000 personnes une fois mais.. bref", "J'suis vraiment très content là!", "Grâce a la magie d'HappyRoteur"];

			phrasedefeat = ["Reste cool, sac à merde.", "C'est pas donné a tout le monde de gagné...", "Ya des fois c’est toi qui cogne le bar, mais des fois, c'est le bar qui te cogne.", "Essai plutôt Alt+F4 ?          ", "Et non c'était 36 854,2... encore perdu"];

			function arrayRand(inp){
				return inp[chiffreRand(inp.length)];
			};

			var rand = chiffreRand(10);
			$('#app').html("Devine mon chiffre ? <br /> (0-9)");
			$('#app').css("font-size", "100px");
			$('body').unbind('keypress');
			var tupeuxtaper = setTimeout(function(){
				$('#app').html("Devine mon chiffre ? <br /> Tu peux taper sur ton clavier...")
			}, 15000)
			console.log(rand);
			var i=0;
			// var petit=0,
			// grand=0;
			$('body').on('keypress', function (e){
				clearInterval(tupeuxtaper);
				var touche = e.which;
				console.log(touche);
				if(touche <=57 && touche >=48){
					if(i<=2){
						// $('#app').html(touche-48);
						if(touche===rand+48){
							var phrasev = arrayRand(phrasevictoire);
							var tempsdelecturev = phrasev.length;

							points = parseInt(points) + parseInt(gain);
							console.log(points+ " Points");
							localStorage.setItem("devinerandpoint", points);

							if(points >100000){
								var pointsnum = new Number (points)
								$('#points').html(pointsnum.toExponential(1)+" MysteryPoints");
							}else{
								$('#points').html(points+" MysteryPoints")
							}if(pointsnum == "Infinity"){
								$('#points').html("GG t'as fini le jeu click ici pour recommencer !!")
							}

							$('#app').css('font-size', "100xp");
							$('#app').html("Gagné");

							var victtimeout1 = setTimeout(function(){
								$('#app').html(phrasev);
							}, 1500);

							var victtimeout2 = setTimeout(function(){
								$('#app').html('(Encore? click)');
							}, tempsdelecturev*150);

							$('body').unbind('keypress');

							$("html").on('click', function(){
								clearTimeout(victtimeout1);
								clearTimeout(victtimeout2);
								$(this).unbind('click');
								app.animationinit();
							})
							gain = gain*2;
							$('#gain').html(gain + " de gain a la prochaine victoire");
							localStorage.setItem("devinerandgain", gain);
							console.log(gain + " de gain")
						}else if(touche<rand+48){
							$('#app').html(touche-48+"? C'est Plus");
							// petit=0;
							// grand++;
							i++;
						}else if(touche>rand+48){
							$('#app').html(touche-48+"? C'est moin")
							// grand=0;
							// petit++;
							i++;
						}
					}if(i>2){
						var phrase = arrayRand(phrasedefeat);
						var tempsdelecture = phrase.length;
						console.log(tempsdelecture);
						$('#app').html('PERDU');
						var defeattimeout1 = setTimeout(function(){
							$('#app').html(phrase);
						}, 1000);
						var defeattimeout2 = setTimeout(function(){
							$('#app').html('(Encore? click)');
						}, tempsdelecture*150);

						$('body').unbind('keypress');

						$("html").on('click', function(){
							clearTimeout(defeattimeout1)
							clearTimeout(defeattimeout2)
							$(this).unbind('click');
							app.animationinit();
						});
					}
				}
			});	
		}
	}
	$(document).ready(function(){
		app.init();

	})
})()
