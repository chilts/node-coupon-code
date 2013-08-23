var cc = require('./coupon-code');
var fs = require('fs');


var qty = 350000; //Cantidad de Cupones a generar
var opts = {parts:1, partLen: 5}; //cantidad de partes y largo de c/parte del cupon XXX-XXX-XXX
var outputfile = 'coupons.json';
var prevCouponsFile = 'Coupons-A.json'; //Cupones generados en una corrida anterior para evitar repetir codigos,
										//should be with the same format as coupons.json output
var prevCoupons = {};

var coupons = {}; //Debe se un objeto y no Array ya que se usa Object[key] como PK.
var validOpts = opts;


console.time('Cupones generados en');



//Synchronous read!!!!
if (prevCouponsFile) {
	console.log('Cargando Cupones previos');
	prevCoupons = JSON.parse(fs.readFileSync(prevCouponsFile));
	console.log('Se cargaron ' + Object.keys(prevCoupons).length + ' cupones previos');
}


var generated = 0;
while (generated < qty) {
	//Intento generar la cantidad de cupones solicitados
	//lo hago en dos loops para no chequear en cada iteracion Object.Keys(coupons)
	//que es costoso
	for (i=generated;i<qty;i++) {
		coupon = cc.generate(opts);
		//valido el cupon por si se genera mal y que no este entre los previos
		validOpts.code = coupon;
		if (cc.validate(validOpts)==coupon && prevCoupons[coupon]===undefined)
			//utilizo el object.key como PK para asegurarme que es unico
			coupons[coupon] = "VALIDADO";
	}
	generated = Object.keys(coupons).length;
}

//guardo los cupones en un archivo
fs.writeFile(outputfile, JSON.stringify(coupons, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('JSON saved at coupons.json');
    }
});

console.log(Object.keys(coupons).length);
console.timeEnd('Cupones generados en');