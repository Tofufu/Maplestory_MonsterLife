
## Maplestory_MonsterLife:

* Projects pertaining around Maplestory's Monster Life Farm
* All images belong to Nexon
* Feel free to use any of these files
---
---
 **MonsterLife_Data (This folder contains the monster data):**

*monstersExcelSheet.xlsx:*
* All Monster Life Combinations (SPECIAL MONSTERS) as of 1/10/2019
* I collected all these combinations manually from Maplestory's Monster Life so how the stats of each monster written are how they are listed in Monster Life directly
* IDs correlate with the sprite images of the monsters

*monstersCSV.csv:*
* same as monstersExcelSheet but in CSV format

*monstersJSON.json:*
* same as monstersCSV but in JSON format

*monstersCSV2JSON.js:*
* File I have included which I used to convert the CSV --> JSON using [csvtojson](https://www.npmjs.com/package/csvtojson)

To Use *monstersCSV2JSON.js*: 
1. install csvtojson in directory
2. node monstersCSV2JSON.js


**Update 2/21/2019:**
*jsonMonsters2DB.json*
* Updated previous monstersJSON.json with STATS consistency (ex: Strength --> STR), added stat1,stat2,insidefarm,favorite properties for future development  

---
---
**MonsterSprites:**
* Extracted sprites using [WzComparerR2](https://github.com/PirateIzzy/WzComparerR2)
---
---
**Static_CombinationMonsters:**
* Static webpage that shows combination monsters by rank/type with their resulting monsters/combo
* json file was just saved in object "monsters"
* Made this pretty quickly as the bulk of my time was the data entry of combos so the JS could be a lot better.....and I had the data different when I was testing (like a dictionary accessed via monsters["id"] but ^__^ will be changing !!! )

To use *Static_CombinationMonsters*:
1. Unzip MonsterSprites to the same directory and delete zipped file
2. Open up "mc.html" using browser (I used Chrome - may have some things that don't work for other browsers)
3. Choose the Type/Rank of Combination Monster you would like to see and press "search"
4. Click on any of the Combination Monsters to see their combos

Preview:
<img src= "https://github.com/Tofufu/Maplestory_MonsterCollection/blob/master/previewStaticCombination.png?raw=true">
---
---
**NodeJS_MonsterLife:**
- Monster Life website allows you to navigate to individual monster pages (uses bootstrap, nodejs, express, ejs, mongodb)
-  Currently this version displays all combination/result monsters in Monster Life as well as each monster's individual pages (some things may appear differently on other browsers ~ I used Chrome)

To use *NodeJS_MonsterLife*:
1. Extract the sprites from *Static_CombinationMonsters/MonsterSprites* to *NodeJS_MonsterLife/public/MonsterSprites*
2. Import monster data (*MonsterLife_Data/jsonMonsters2DB.json*) to MongoDB: 
mongoimport -d monsterCollection -c monsters --jsonArray --maintainInsertionOrder --file ".\jsonMonsters2DB.json"
3. Inside the *NodeJS_MonsterLife/* install express, ejs, mongoose:
npm install ejs express mongoose --save
4. Inside *NodeJS_MonsterLife/* run: node index (Runs on port 3000)
5. In browser: localhost:3000/monsters
6. Also able to go to individual monster pages: localhost:3000/monsters/9300348

**Preview:**

<img src= "https://github.com/Tofufu/Maplestory_MonsterCollection/blob/master/previewNode1.png?raw=true">

<img src= "https://github.com/Tofufu/Maplestory_MonsterCollection/blob/master/previewNode2.png?raw=true">