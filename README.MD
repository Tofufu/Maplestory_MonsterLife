Maplestory_MonsterCollection:
======
* Projects pertaining around Maplestory's Monster Life Farm
* All images belong to Nexon
* Feel free to use any of these files
---
__monstersExcelSheet.xlsx:__
<br />
* All Monster Life Combinations (SPECIAL MONSTERS) as of 1/10/2019
* I collected all these combinations by manually from Maplestory's Monster Life so how the stats of each monster written are how they are listed in Monster Life directly
* IDs correlate with the sprite images of the monsters
<br />
__monstersCSV.csv:__
<br />
* same as monstersExcelSheet but in CSV format
<br />
__monstersJSON.json:__
<br />
* same as monstersCSV but in JSON format
<br />
__monstersCSV2JSON.js:__
<br />
* File I have included which I used to convert the CSV --> JSON using [csvtojson](https://www.npmjs.com/package/csvtojson)
To Use: <br />
1. install csvtojson in directory
2. node monstersCSV2JSON.js
<br />
__MonsterSprites:__
<br />
* Extracted sprites using [WzComparerR2](https://github.com/PirateIzzy/WzComparerR2)
<br />
<br />
__Static_CombinationMonsters:__
<br />
* Static webpage that shows combination monsters by rank/type with their resulting monsters/combo
* json file was just saved in object "monsters"
* Made this pretty quickly as the bulk of my time was the data entry of combos so the JS could be a lot better.....and I had the data different when I was testing (like a dictionary accessed via monsters["id"] but ^__^ will be changing !!! )
* Written with vanilla js
__To use:__
<br />
1. Unzip MonsterSprites to the same directory and delete zipped file (Please note this is the path for the images: monsterImage.src= "./MonsterSprites/" + monster.id + ".png";)
2. Open up "mc.html" using browser (I used Chrome - may have some things that don't work for other browsers)
3. Choose the Type/Rank of Combination Monster you would like to see and press "search"
4. Click on any of the Combination Monsters to see their combos
<br />
__Preview:__
<br />

![alt text](https://github.com/Tofufu/Maplestory_MonsterCollection/blob/master/previewStaticCombination.PNG)
