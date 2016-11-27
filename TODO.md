
# TODO

## Model

### Hops
* ~~Hops should have an alpha acid in percentage~~
  * ~~Minimum should be 0 % and max should be 100%~~
* ~~Hops should have an amount in grams~~
  * ~~Minimum should be 0~~
* ~~Hops should have a name to be identified with~~
* ~~Hops should have a time in minutes of how long it will be boiled~~
  * ~~Minimum should be 0~~
* ~~Hops bitterness contribution (IBU) should be calculated based on Tinseths formula (http://www.realbeer.com/hops/research.html)~~
  * ~~With a batch size of 10 liters, Target gravity of 1.050, hop amount of 10g, alpha acid of 14% and boil time of 60 min should give an IBU of approx. 32.3.~~
  * ~~With 0 time IBU should be zero~~

### Fermentables
* ~~Fermentable should have a yield percentage to show how much sugar that can be extracted~~
  * ~~Minimum should be 0 % and max should be 100%~~
* ~~Fermentable should have amount in kg~~
  * ~~Minimum should be 0~~
* ~~Fermentable should have a name~~
* ~~Should be able to calculate expected amount of sugar contribution with formula (`1+(((FERMENTATION_YIELD*384*EFFICIENCY*AMOUNT_KG)/VOLUME_LITER)/1000)`)~~
* Should be able to calculate color contribution according to the EBC scale

### Yeast
* ~~Yeast should have a name~~
* ~~Yeast should have a attenuation percentage to show how much sugar it can ferment~~
  * ~~Minimum should be 0 % and max should be 100%~~

### Recipe
* ~~Recipe should have volume in liter~~
  * ~~Minimum should be 0~~
* ~~Recipe should have efficiency~~
  * ~~Minimum should be 0 % and max should be 100%~~
* ~~Can add a Yeast to Recipe~~
* ~~Can add Hops to Recipe~~
* ~~Can add Fermentables to Recipe~~
* ~~Calculate expected original gravity based on Fermentables~~
  * ~~Should return 1 if not fermentable exists~~
  * ~~Should sum expected gravity from each fermentable~~
* ~~Calculate expected final gravity based on original gravity and Yeast~~
  * ~~Should be 1.010 if original gravity is 1.040 and attenuation is 0.75~~
  * ~~Should be same as original gravity if no yeast is added~~
  * ~~Should be 1.000 if no fermentables are added~~
* ~~Calculate total IBU based on Hops~~
* ~~Calculate Alcohol by volume based on original and final gravity~~
  * ~~Should be approximately 5.3 % with og 1.050 and fg 1.010~~
  * ~~Should be approximately 9.8 % with og 1.080 and fg 1.010~~
  * ~~Should return 0 if nothing is added~~

## Controller

### RecipeApp

* ~~Should tell view to render~~
* Should listen for events/actions from view
  * Should handle adding of hops
  * Should handle adding of fermentables
  * Should handle adding of yeast
* Should tell view to re-render on changes

## view

### MainView
* Should display welcome message on start
* Should show menu on each re-render
* Should show recipe on each re-render
  * Should show recipe volume
  * Should show recipe efficiency
  * Should show expected OG
  * Should show expected FG
  * Should show expected IBU
  * Should show expected ABV
  * Should show list of fermentables
  * Should show list of hops
  * Should show yeast

### Table
* Should be able to add padding between columns.
* Should be able to render header columns
  * Should have a config with length of each column
  * Should have a line separating the rest of the rows
* Should be able to render row
  * Should have a config with length of each column
