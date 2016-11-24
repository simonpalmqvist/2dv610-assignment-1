
# TODO

## Model

### Hops
* ~~Hops should have an alpha acid in percentage~~
** ~~Minimum should be 0 % and max should be 100%~~
* ~~Hops should have an amount in grams~~
** ~~Minimum should be 0~~
* ~~Hops should have a name to be identified with~~
* Hops should have a time in minutes of how long it will be boiled
** Minimum should be 0
* Hops bitterness contribution should be calculated based on Tinseths formula (https://www.shbf.se/wiki/index.php/Formler_för_ungefärlig_beräkning_av_IBU)

### Fermentables
* Fermentable should have a yield percentage to show how much sugar that can be extracted
** Minimum should be 0 % and max should be 100%
* Fermentable should have amount in kg
** Minimum should be 0
* Fermentable should have a name
* Should be able to calculate amount of sugar contribution with formula
(`1+(((FERMENTATION_YIELD*384*EFFICIENCY*AMOUNT_KG)/VOLUME_LITER)/1000)`)
* Should be able to calculate color contribution according to the EBC scale

### Yeast
* Yeast should have a name
* Yeast should have a attenuation percentage to show how much sugar it can ferment
** Minimum should be 0 % and max should be 100%

### Recipe
