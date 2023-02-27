var canvas, ctx, LARGURA, ALTURA, estadoAtual, frame = 0, velocidade = 7, velocidade_obs2 = 7, record, img,

		estado = {
			jogar: 0,
			jogando: 1,
			perdeu: 2
		},

		estadoAtual,

		teto = {
			y: 0,
			altura: 50,
			cor: "#00FF7F",

			desenha: function(){
				// ctx.fillStyle = this.cor;
				// ctx.fillRect(0, this.y, LARGURA, this.altura);
			}
		},

		piso = {
			y: 630,
			altura: 20,
			cor: "#00FF7F",

			desenha: function(){
				// ctx.fillStyle = this.cor;
				// ctx.fillRect(0, this.y, LARGURA, this.altura);
			}
		},

		chao = {
			y: 650,
			altura: 50,
			cor: "#ffdf70",

			desenha: function(){
				// ctx.fillStyle = this.cor;
				// ctx.fillRect(0, this.y, LARGURA, this.altura);
			}
		}

		bloco = {
			x: 310,
			y: 0,
			altura: spriteBloquinho.largura,
			largura: spriteBloquinho.altura,
			cor: "red",
			gravidade: 1.5,
			velocidade: 0,
			forcaPulo: 18,
			deslocamento: 60,
			contPulos: 0,
			score: 0,

			atualiza: function(){
				this.velocidade += this.gravidade;
				this.y += this.velocidade;

				if (this.y > piso.y - this.altura && estadoAtual != estado.perdeu){
					this.y = piso.y - this.altura;
					this.contPulos = 0;
					this.velocidade = 0;
				}
			},

			desloca: function(){
				
				var tecla = window.event.keyCode;
				
				if (tecla == 13){
					estadoAtual == estado.jogando;
				}

				if (tecla == 97){
					this.x -= this.deslocamento;

					if (this.x < 0){
						this.x = 0;
					}
				} 

				else if (tecla == 100){
					this.x += this.deslocamento;

					if (this.x > LARGURA - this.largura){
						this.x = LARGURA - this.largura;
					}
				}

				else if (tecla == 119){
					if (this.contPulos < 2){
						this.velocidade = -this.forcaPulo;
						this.contPulos++;
					}
				}

				
			},

			reset: function(){
				this.y = 0;
				this.velocidade = 0;
				velocidade = 7;
				this.x = LARGURA / 2 - 25;

				if (this.score > record){
					record = this.score;
					localStorage.setItem("record", this.score);
				}

				this.score = 0;
			},

			desenha: function(){
				spriteBloquinho.desenha(this.x, this.y);
			},

		},

		//Objeto que define os Obstáculos de Nível dois do Jogo
		obstaculos2 = {
			//Configurações do Objeto (Vetor que armazenará todos os obstáculos, configurações de cores e tempo de insersão);
			_obs2: [],
			cores: ["#FF1493", "#FFD700"],
			tempoInsere: 0,

			//Essa função insere Obstáculos automaticamente.
			insere: function(){
				//Inserindo indices do vetor _obs2, aonde a cordenada x do obstáculo será a largura total da canvas, 
				// A largura do obstáculo será 50px e a altura será aleatória, que vai variar de 30px a 69px
				//Cores também serão aleatórias
				this._obs2.push({
					x: LARGURA,
					largura: 50,
					altura: 30 + Math.floor(40 * Math.random()),
					cor: this.cores[Math.floor(2 * Math.random())]
				});
				
				//Define o tempo de inserção, que vai varia de 100 a 119px de locomoção dos obstáculos, esse tempo será mediante ao loop que insere obstáculos.
				this.tempoInsere = 100 + Math.floor(20 * Math.random());
				
				//Esse if verifica se os pontos do jogador atual é maior ou igual a 110, caso for, ele aumentará a dificuldade do jogo, diminuindo o tempo de inserção de objetos e aumentando a velocidade.

				if (bloco.score >= 110){
					velocidade_obs2 = 10;
					this.tempoInsere = 90 + Math.floor(20 * Math.random());
				}

				//Segue o mesmo raciocínio do if acima
				else if (bloco.score >= 150){
					velocidade_obs2 = 14;
					this.tempoInsere = 80 + Math.floor(20 * Math.random());
				}

			},

			//Essa função atualiza os obstáculos.
			atualiza: function(){

				if (this.tempoInsere == 0)
					this.insere();
				else
					this.tempoInsere--;

				for (var i = 0, tam = this._obs2.length; i < tam; i++) {
					var obs = this._obs2[i];
					
					obs.x -= velocidade_obs2;


					//If verifica a colisão com os obstáculos. Caso a cordenada x do bloco seja menor que a cordenada x do obstáculo e ao mesmo
					//tempo a cordenada x do bloco for maior que a cordenada x do obstáculo, significa que o bloco encostou diretamente sobre o obstáculos.
					//Porém, só com essa condição não seria possível verificar precisamente se o bloco colidiu ou não com os obstáculos, pois se o bloco estiver passando por cima do obstáculos o programa entederia como "perdeu". Portando temos mais duas condições para que possamos evitar isso. 
					//Temos que verificar se o y do bloco + altura do mesmo é >= 

					if (bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= piso.y - obs.altura){
						estadoAtual = estado.perdeu;	
					}

					else if (obs.x == 0){
						bloco.score++;
				
					}
						

					else if (obs.x < -obs.largura){
						this._obs2.splice(i, 1);
						tam--;
						i--;
					}
				}
			},

			limpa: function(){
				this._obs2 = [];
			},

			desenha: function(){
				for (var i = 0, tam = this._obs2.length; i < tam; i++) {
					var obs = this._obs2[i];
					ctx.fillStyle = obs.cor;
					ctx.fillRect(obs.x, piso.y - obs.altura, obs.largura, obs.altura);
				};
			}

		},

		obstaculos = {
			_obs1: [],
			cores: ["#00BFFF", "#8B4513", "#FF0000", "#800080", "#FF1493", "#00008B"],
			tempoInsere: 0,

			insere: function(){
				this._obs1.push({
					y: 0,
					x: 10 + Math.floor(680 * Math.random()),
					largura: 50,
					altura: 30 + Math.floor(110 * Math.random()),
					cores: this.cores[Math.floor(10 * Math.random())]
				});

				this.tempoInsere = 20 + Math.floor(20 * Math.random());
				
				if (bloco.score >= 15 && bloco.score < 50){
					velocidade = 10;
					this.tempoInsere = 15 + Math.floor(10 * Math.random());
				}

				if (bloco.score >= 50 && bloco.score < 80){
					velocidade = 14;
					this.tempoInsere = 10 + Math.floor(10 * Math.random());
				}

				if (bloco.score > 80){
					this.tempoInsere = 10 + Math.floor(10 * Math.random());
				}

			}, 

			

			atualiza: function(){
				if (this.tempoInsere == 0)
					this.insere();
				else
					this.tempoInsere--;

				for (var i = 0, tam = this._obs1.length; i < tam; i++){
					var obs = this._obs1[i];
					obs.y += velocidade;

					if (obs.y > bloco.y && bloco.x + bloco.largura > obs.x && bloco.x < obs.x + obs.largura)
						estadoAtual = estado.perdeu;

					else if (obs.y == 630)
						bloco.score++;
						
					else if (obs.y > piso.y + obs.altura){
						this._obs1.splice(i, 1);
						tam--;
						i--;
					}
				}


			},

			limpa: function(){
				this._obs1 = [];
			},

			desenha: function(){
				for(var i = 0, tam = this._obs1.length; i < tam; i++){
					var obs = this._obs1[i];
					ctx.fillStyle = obs.cor;
					ctx.fillRect(obs.x, obs.y - obs.altura, obs.largura, obs.altura);
				}

			}

		};

		function Clique(evt){

			if (estadoAtual == estado.jogar){
				estadoAtual = estado.jogando;
			}

			if (estadoAtual == estado.perdeu){
				estadoAtual = estado.jogar;
				obstaculos2.limpa();
				obstaculos.limpa();
				bloco.reset();
			}
			
		}

		function Tecla(event){
			if (estadoAtual == estado.jogando){
				bloco.desloca();
			}

			if (estadoAtual == estado.perdeu){
				estadoAtual = estado.jogar;
			}
		}

		function Main(){
			LARGURA = window.innerWidth;
			ALTURA = window.innerHeight;

			if (LARGURA >= 600) {
				LARGURA = 700;
				ALTURA = 700;
			};

			canvas = document.createElement("canvas");
			canvas.width = LARGURA;
			canvas.height = ALTURA;
			canvas.style.border = "5px solid #505050";

			ctx = canvas.getContext("2d");
			document.body.appendChild(canvas);
			document.addEventListener("onkeypress", Tecla);
			document.addEventListener("mousedown", Clique);

			estadoAtual = estado.jogar;
			
			record = localStorage.getItem("record", bloco.score)
			if (record == null){
				record = 0;
			}

			//Cria objeto para importar a imagem de fundo
			img = new Image();			
			img.src = "img/background.png";

			Roda();

		}

		function Roda(){
			Atualiza();
			Desenha();

			window.requestAnimationFrame(Roda);
		}

		function Atualiza(){
			frame++;
			
			bloco.atualiza();
			
			if (estadoAtual == estado.jogando){
				obstaculos.atualiza();
				if (bloco.score >= 80){
					obstaculos2.atualiza();
				}
			}
		}

		function Desenha(){

			fundo.desenha(0, 0);
			
			//Desenhando texto do Score
			ctx.fillStyle = "#808dee";
			ctx.font = "40px Arial";
			ctx.fillText("Score: " + bloco.score, 30, 50);

			//Desenhando texto do Record
			ctx.fillStyle = "#808dee";
			ctx.font = "40px Arial";
			
			if (record >= 0 && record < 10){
				ctx.fillText("Record: " + record, 480, 50);
			}

			else if (record >= 10 && record < 99){
				ctx.fillText("Record: " + record, 460, 50);
			} else {
				ctx.fillText("Record: " + record, 440, 50);
			}


			

			if (estadoAtual == estado.jogar){
				spritePlay.desenha(LARGURA / 2 - 471 / 2, ALTURA / 2 - 180 / 2);
				spriteLogo.desenha(LARGURA / 2 - 456 / 2, ALTURA / 2 - 400 / 2);
			} 

			if (estadoAtual == estado.perdeu){
				
				spritePerdeu.desenha(LARGURA / 2 - 470 / 2, ALTURA / 2 - 320 / 2);
				ctx.fillStyle = "#fff";
				ctx.font = "34px Arial";
				ctx.fillText("Score: "+ bloco.score, 150, 380);
				ctx.fillText("Record: "+ record, 150, 430);

				
				if (bloco.score > record){
					ctx.fillStyle = "#00FF00";
					ctx.font = "70px Arial";
					
					
					if (record >= 0 && record < 10){
						ctx.fillText("New Record: " + bloco.score, LARGURA / 2 - 220, 135);
					}

					else if (record >= 10 && record < 99){
						ctx.fillText("New Record: " + bloco.score, LARGURA / 2 - 240, 135);
					} else {
						ctx.fillText("New Record: " + bloco.score, LARGURA / 2 - 260, 135);
					}
				}
			}

			if (estadoAtual == estado.jogando){
				obstaculos.desenha();
				obstaculos2.desenha();
			}
			
			spriteChao.desenha(0, 630);
			// piso.desenha();
			// chao.desenha();
			bloco.desenha();
		}

		Main();