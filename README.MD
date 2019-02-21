## Maplestory_MonsterLife:

* Projects pertaining around Maplestory's Monster Life Farm
* All images belong to Nexon
* Feel free to use any of these files
---
**monstersExcelSheet.xlsx:**
* All Monster Life Combinations (SPECIAL MONSTERS) as of 1/10/2019
* I collected all these combinations by manually from Maplestory's Monster Life so how the stats of each monster written are how they are listed in Monster Life directly
* IDs correlate with the sprite images of the monsters

**monstersCSV.csv:**
* same as monstersExcelSheet but in CSV format

**monstersJSON.json:**
* same as monstersCSV but in JSON format

**monstersCSV2JSON.js:**
* File I have included which I used to convert the CSV --> JSON using [csvtojson](https://www.npmjs.com/package/csvtojson)

To Use: 
1. install csvtojson in directory
2. node monstersCSV2JSON.js

**MonsterSprites:**
* Extracted sprites using [WzComparerR2](https://github.com/PirateIzzy/WzComparerR2)

**Static_CombinationMonsters:**
* Static webpage that shows combination monsters by rank/type with their resulting monsters/combo
* json file was just saved in object "monsters"
* Made this pretty quickly as the bulk of my time was the data entry of combos so the JS could be a lot better.....and I had the data different when I was testing (like a dictionary accessed via monsters["id"] but ^__^ will be changing !!! )

To use:
1. Unzip MonsterSprites to the same directory and delete zipped file (Please note this is the path for the images: monsterImagesrc= MonsterSpritesmonsterIdpng
2. Open up "mc.html" using browser (I used Chrome - may have some things that don't work for other browsers)
3. Choose the Type/Rank of Combination Monster you would like to see and press "search"
4. Click on any of the Combination Monsters to see their combos

Preview:
<img src= "https://github.com/Tofufu/Maplestory_MonsterCollection/blob/master/previewStaticCombination.png?raw=true">
