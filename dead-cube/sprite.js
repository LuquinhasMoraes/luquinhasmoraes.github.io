function Sprite(x, y, largura, altura){
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;

	this.desenha = function(xCanvas, yCanvas){
		ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
	}
}

var fundo = new Sprite(0, 0, 700, 630),
	spriteChao = new Sprite(0, 630, 700, 70),
	spriteBloquinho = new Sprite(782, 12, 60, 60);
	spritePlay = new Sprite(814, 476, 471, 221);
	spritePerdeu = new Sprite(805, 114, 470, 320);
	spriteLogo = new Sprite(883, 9, 456, 99);