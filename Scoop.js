Array.prototype.contain = function(a) {
	return (this.indexOf(a) !== -1) ? true : false;
};

var Scoop = function(v, m, n) {
	this.name = (n == "") ? null : n;
	this.value = v;
	this.measure = m;
	this.table = {};
	this.convertBase = {
		// Misc
		gelatin_powder: 0.6,
		peanut_butter: 1,
		flaked_almonds: 0.3,
		salt: 1.4,
		soy: 1,
		egg: 1,
		yolk: 1,
		albumen: 1

		// Suger and sweeteners
		bread_syrup: 1.4,
		brown_sugar: 0.75,
		icing_sugar: 0.6,
		fructose: 0.7,
		jelly_sugar: 0.7,
		honey: 1.2,
		light_syrup: 1.4,
		dark_syrup: 1.4,
		pearl_sugar: 0.6,
		sugar: 0.9,
		raw_sugar: 0.9,
		jam_sugar: 0.95,
		stevia_sugar: 0.85, // Sötströ
		vanilla_sugar: 0.6,
		white_syrup: 1.4,

		// Mushrooms
		mushroom: 0.3,
		chanterelles: 0.3,

		// Jam and jelly
		apricot_jam: 1.2,
		raspberry_jam: 1.25,


		// Berries and fruit
		blackberry: 0.7,
		blueberry: 0.7,
		raspberry: 0.7,
		strawberry: 0.5,
		lingonberry: 0.6,
		plums: 0.75,
		raisins: 0.6,

		// Chocolate
		cocoa: 0.4,

		// Liquids
		water: 1,
		orange_juice: 1,
		lime_juice: 1,
		cranberry_juice: 1,
		wine: 1,

		// Milk and cheese
		creme_fraiche: 1,
		feta_cheese: 0.6,
		sour_milk: 1,
		cream: 1,
		sour_cream: 1,
		quark: 1,
		cottage_cheese: 1,
		milk: 1,
		shredded_cheese: 0.4,
		shredded_parmesan_cheese: 0.5,
		cream_cheese: 1,
		turkish_yogurt: 1,
		whipping_cream: 1,
		yogurt: 1,

		// Nuts and seeds
		cashew_nuts: 0.5,
		hazelnuts: 0.65,
		peanuts: 0.69,
		coconut_flour: 0.5,
		linseed: 0.65,
		almond_flour: 0.6,
		pine_nuts: 0.8,
		sunflower_seeds: 0.62,
		almonds: 0.65,
		walnuts: 0.4,

		// Rice, potato, pasta
		food_grain: 0.7,
		rice: 0.8,

		// Ketchup, sauces etc
		mayonnaise: 1,
		mustard: 1.1,
		ketchup: 1.3,
		tomato_paste: 1,

		// Blowing agents
		baking_powder: 1,
		bicarbonate: 1,
		dry_yeast: 1,

		// Cooking fat
		margarine: 0.95,
		coconut_butter: 0.9,
		coconut_oil: 0.9,
		coconut_milk: 1,
		cooking_oil: 0.93,
		olive_oil: 0.93,
		butter: 0.9,

		// Flour, grains, flakes and starch etc.
		wheat_bran: 0.3,
		wheat_flour: 0.6, // Whole wheat too
		durum_wheat_flour: 0.65,
		wheat_germs: 0.35,
		semolina: 0.7,
		fiberhusk: 0.67,
		graham_grains: 0.6,
		graham_flour: 0.6,
		rye_meal: 0.55,
		rye_flakes: 0.4,
		rye_flour: 0.57,
		oatmeal: 0.37,
		coconut_flakes: 0.35,
		coconut_flour: 0.5,
		kruskakli: 0.2,
		corn_starch: 0.55,
		potato_starch: 0.8,
		bread_crumbs: 0.5,
		cornflakes: 0.11,
		instant_coffee_powder: 0.22
	};
};

Scoop.prototype.as = function(targetMeasure) {
    this.targetMeasure = targetMeasure;
    var prefixes = ['k', 'h', '', 'd', 'c', 'm'];
    var factors = [3, 2, 0, -1, -2, -3];
    var measures = ['g', 'l'];
    for (var j = 0; j < measures.length; j++) {
        var base = measures[j];
        for (var i = 0; i < prefixes.length; i++) {
            this.addMeasure(base, prefixes[i] + base, Math.pow(10, factors[i]));
        }
    }
    this.addMeasure('g', 'ounce', 35.2739619);
    this.addMeasure('g', 'lb', 2.20462262);
    this.addMeasure('l', 'oz', 33.8140227);
    this.addMeasure('l', 'msk', 0.015);
    this.addMeasure('l', 'atbsp', 0.02);
    this.addMeasure('l', 'tbsp', 0.0147);
    this.addMeasure('l', 'tsk', 0.005);
    this.addMeasure('l', 'tsp', 0.0049);
    this.addMeasure('l', 'krm', 0.001);
    this.addMeasure('l', 'krm', 0.001);
    this.addMeasure('l', 'kkp', 0.15);
    this.addMeasure('l', 'tkp', 0.25);
    this.addMeasure('l', 'cup', 0.24);

    if (this.type(this.measure) == this.type(targetMeasure)) {
	    var endVal = this.value * (this.table[this.measure].multiplier / this.table[targetMeasure].multiplier);
	    if (this.isSpecial(targetMeasure)) {
			if (this.type(targetMeasure) == 'l') {
				var cl = (this.table[targetMeasure].multiplier > 1) ? this.table[targetMeasure].multiplier : (1 /  this.table[targetMeasure].multiplier);
				endVal = this.as('l').value * cl;
			} else {
				var cl = (this.table[targetMeasure].multiplier > 1) ? this.table[targetMeasure].multiplier : (1 /  this.table[targetMeasure].multiplier);
				endVal = this.as('kg').value * this.table[targetMeasure].multiplier;
			}
	    }
	    return new Scoop(endVal, targetMeasure);
    } else {
    	// Convert between volume and weight for specified product
    	console.log('Not same type, converting:');
		if (this.name !== null) {
			if (isNaN(this.convertBase[this.name])) {
				console.log('Incorrect name.');
				return null;
			}
			// 1 kilo of flour to 1 liter
			this.type(targetMeasure); // l : liter
			this.type(this.measure); // g : kilo
			var endVal = 0;
			var thisType = this.type(this.measure);
			// Convert this to base
			if (thisType == 'g') {
				// Converting from weight to volume
				var cl = this.convertBase[this.name];
				var cb = (cl > 1) ? (1 / cl) : cl;
				console.log(cb);
				endVal = this.as('kg').value * cb; // this weight * multiplier for converting
				endVal = new Scoop(endVal,'l').as(targetMeasure).value;
			} else if (thisType == 'l') {
				// Converting from volume to weight
				var cl = (1 / this.convertBase[this.name]);
				var cb = (cl > 1) ? (1 / cl) : cl;
				endVal = this.as('l').value * cb; // this weight * multiplier for converting
				endVal = new Scoop(endVal,'kg').as(targetMeasure).value;
			}
			return new Scoop(endVal,targetMeasure);
		} else {
			console.log('No name set.');
		}
    }
};

Scoop.prototype.isSpecial = function(measure) {
	var eng = ['ounce','atbsp','oz','lb','tbsp','tsp','msk','tsp','krm','kkp','tkp','cup'];
	return eng.contain(measure);
}

Scoop.prototype.type = function(measure, r) {
	var weights = ['g','mg','hg','kg','lb','ounce'];
	var volumes = ['l','oz','ml','cl','dl','atbsp','tbsp','msk','tsp','tsk','krm','kkp','tkp','cup'];
	if (weights.contain(measure)) {
		return (r) ? 'l' : 'g';
	} else if (volumes.contain(measure)) {
		return (r) ? 'g' : 'l';
	}
};

Scoop.prototype.addMeasure = function(baseMeasure, actualMeasure, multiplier) {
	var accept = ['g','hg','kg','l','dl','cl','ml','mg'];
	if (baseMeasure == 'g') {
		accept.push('ounce');
		accept.push('lb');
	} else if (baseMeasure == 'l') {
		accept.push('oz');
		accept.push('atbsp');
		accept.push('tbsp');
		accept.push('msk');
		accept.push('tsp');
		accept.push('tsk');
		accept.push('kkp');
		accept.push('tkp');
		accept.push('krm');
		accept.push('cup');
	}
	if (!accept.contain(actualMeasure)) return 404;
	this.table[actualMeasure] = {
		base: baseMeasure,
		acutal: actualMeasure,
		multiplier: multiplier
	};
};
/*
window.onload = function() {
	console.log('1 l of flour.');
	var flour = new Scoop(1,'l','wheat_flour');
	console.log(flour);
	console.log('Would in dl be: ' + flour.as('dl').value);
	console.log('And would in fluid ounces be: ' + flour.as('oz').value);
	console.log('And would in kg be: ' + flour.as('kg').value);
};
*/