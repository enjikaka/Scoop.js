Scoop.js
==========================

The ultime library for converting your scoops of goodies to other units.

### With this JS script you can: ###

 - Convert between different weight units.
 - Convert between different
   volume units.
 - Convert between weight and volume units for supported types.

Thanks to "jvenema" for some help from [his answer on Stack Overflow][1]

## Supported units ##
### Weight ###
#### SI-units ####
 - kg
 - hg
 - g
 - mg

#### English & American ####
 - ounce
 - lb (pounds)

### Volumes ###
#### SI-units ####
 - l
 - dl
 - cl
 - ml

#### English & American ####
 - oz (fluid ounce)
 - cup
 - tbsp (Tablespoon - 14,7ml)
 - tsp (Teaspoon - 4,9ml)

#### Australian ####
 - atbsp (Australian tablespoon - 20ml)

#### Swedish ####
 - msk (Matsked - 15ml)
 - tsk (Tesked - 5ml)
 - kkp (Kaffekopp - 1,5dl)
 - tkp (Tekopp . 2,5dl)

## Supported ingredients ##
Notice that these are the only items you can convert between weight and volumes from. Source for these values: [recepten.se][2]

**Berries and fruit:** blackberry, blueberry, raspberry, strawberry, lingonberry, plums, raisins

**"Blowing agents"**: baking_powder, bicarbonate, dry_yeast

**Dairy:** creme_fraiche, feta_cheese, sour_milk, cream, sour_cream, quark, cottage_cheese, milk, shredded_cheese, shredded_parmesan_cheese, cream_cheese, whipping_cream, yogurt, margarine, coconut_butter, coconut_oil, coconut_milk, cooking_oil, olive_oil, butter

**Flour, flakes, grains & starch:** wheat_bran, wheat_flour, durum_wheat_flour, wheat_germs, semolina, fiberhusk, graham_grains, graham_flour, rye_meal, rye_flakes, rye_flour, oatmeal, coconut_flakes, kruskakli, corn_starch, potato_starch, bread_crumbs, cornflakes, instant_coffe_powder

**Jam:** apricot_jam, raspberry_jam

**Ketchup & sauce:** mayonnaise, mustard, ketchup, tomato_paste

**Liquids:** water, orange_juice, lime_juice, cranberry_juice, wine

**Mushrooms:** muschroom, chanterelles

**Nuts & seeds:** cashew_nuts, hazelnuts, peanuts, coconut_flour, linseed, almond_flour, pine_nuts, sunflower_seeds, almonds, walnuts

**Sugar:** bread_syrup, brown_sugar, icing_sugar, fructose, jelly_sugar, honey, light_syrup, dark_syrup, pearl_sugar, sugar, raw_sugar, jam_sugar, stevia_sugar, vanilla_sugar, white_syrup

**Rice and such:** food_grain, rice

**Misc:** gelatin_powder, peanut_butter, flaked_almonds, salt, soy, egg, yolk, albumen, cocoa


## Examples ##

#### Converting from liter to fluid ounce ####
	new Scoop(1,'l').as('oz');
	// Returns 33.8140227
#### Converting from pounds to kilograms ####
	new Scoop(129,'lb').as('kg');
	// Returns 58.51341573000000
#### Converting an ingredient from weight to volume ####
	new Scoop(1,'kg','wheat_flour').as('dl');
	// Returns 6

	new Scoop(10,'lb','light_syrup').as('cup');
	// Returns 13.49977291666667

  [1]: http://j.mp/1dDraAC
  [2]: http://www.recepten.se/artiklar/maatt_enheter.html