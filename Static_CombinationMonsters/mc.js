var leftButton = document.getElementById("leftbutton");
var typeSelection = document.getElementById("typeselection");
var rankSelection = document.getElementById("rankselection");
var leftSide = document.querySelector(".leftSide");
var rightSide = document.querySelector(".rightSide");

leftButton.addEventListener("click", function(){
    rightSide.textContent = "";
    
    // value = "" is for the "title" of the selection menu
    if (typeSelection.value === "Monster Type" || rankSelection.value === "Rank")
    {
        console.log("dne");
    }
    else 
    {
        gettingLeftSideMonsters(typeSelection.value, rankSelection.value);
    }
    
});

/*matches monsters w/ certain criteria*/
function gettingLeftSideMonsters (userType, userRank) 
{
    var monsterArray = []; 

    monsters.forEach(function(monster){
        if(monster.resultbinary === "1")
        {
            if(userType === "all" && userRank === "all")
            {
                monsterArray.push(monster);
            }
            else if((userType === "all") && (userRank !== "all") && (monster.rank === userRank))
            {
                monsterArray.push(monster);
            }
            else if((userType !== "all") && (userRank === "all") && (monster.category === userType))
            {
                monsterArray.push(monster);
            }
            else if((userType !== "all") && (userRank !== "all") && (monster.category === userType) && (monster.rank === userRank))
            {
                monsterArray.push(monster);
            }
            else
            {
                //console.log("This monster does not match" + monster.name );
            } 
        } // if resultbinary
    }); //foreach()

    addingLeftSideMonsters(monsterArray);
}

/* Adds the left monsters dynamically from the array of matched monsters*/
function addingLeftSideMonsters (arrayOfMatchedMonsters) 
{
    if (arrayOfMatchedMonsters.length === 0)
    {
        leftSide.textContent = "";
        var dne = document.createElement("div");
        dne.textContent = "No Combination Monsters with this Criteria";
        dne.style.color = "white";
        leftSide.appendChild(dne);
    }
    else
    {
        // empty out before appending everything
        leftSide.textContent = "";

        var frag = document.createDocumentFragment();
        var leftMonsterDiv;

        arrayOfMatchedMonsters.forEach(function(matchedmonster){
            leftMonsterDiv = creatingMonsterDiv(matchedmonster, "leftMonster");
            frag.appendChild(leftMonsterDiv);
        }); // foreach()

        leftSide.appendChild(frag);
        leftMonsterClicks(arrayOfMatchedMonsters);
    }
}

// returns monster div
function creatingMonsterDiv(monster, mainDivClass)
{
    var monsterDiv = document.createElement("div");
    monsterDiv.classList.add(mainDivClass); // adds "imagebox/imagebox2 etc"

    var monsterName = document.createElement("div"); /*<div class="monstername">*/
    monsterName.classList.add("monstername");
    monsterName.textContent = monster.name;
    var monsterRank = document.createElement("span"); /*<span class="rank">B</span>*/
    monsterRank.classList.add("rank");
    monsterRank.textContent = monster.rank;
    monsterName.appendChild(monsterRank);

    var monsterImage = document.createElement("img"); /*<img src="9500529.png">*/
    monsterImage.src= "./MonsterSprites/" + monster.id + ".png";
    monsterImage.alt = monster.id;

    var monsterDescription = document.createElement("div"); /*<div class="description">*/
    monsterDescription.classList.add("description");
    var monsterCategory = document.createElement("div"); /*<div class="category">Special</div>*/
    monsterCategory.classList.add("category");
    monsterCategory.textContent = monster.category;
    var monsterObtained = document.createElement("div"); /*<div class="obtained">Obtained: Combining</div>*/
    monsterObtained.classList.add("obtained");
    monsterObtained.textContent = "Obtained: " + monster.obtained;
    var monsterStat = document.createElement("span");
    monsterStat.textContent = monster.stat;
    
    monsterDescription.appendChild(monsterCategory);
    monsterDescription.appendChild(monsterStat);
    monsterDescription.appendChild(monsterObtained);
    

    monsterDiv.appendChild(monsterName);
    monsterDiv.appendChild(monsterImage);
    monsterDiv.appendChild(monsterDescription);

    return monsterDiv;
}

/* Adding event listeners to leftmonster divs that were dynamically added*/
function leftMonsterClicks(arrayOfMatchedMonsters)
{
    var leftDivs = document.querySelectorAll(".leftMonster");
    leftDivs.forEach(function(leftsidemonsterdiv){
        leftsidemonsterdiv.addEventListener("click", function(){
            // erase the right side
            rightSide.textContent = "";

            // image "alt" has the id of the monster stored
            var imageAltCurrentMonster = this.getElementsByTagName("img")[0].alt;
            console.log(imageAltCurrentMonster);
            console.log(arrayOfMatchedMonsters);
             var currentMonsterResults = [];
            for(var i=0; i<arrayOfMatchedMonsters.length; i++)
            {
                if(arrayOfMatchedMonsters[i].id == imageAltCurrentMonster)
                {
                    // filter out the empty elements
                    currentMonsterResults = arrayOfMatchedMonsters[i].result.filter(function(element){
                        return element != "";
                    });
                }
            }
            console.log(currentMonsterResults);

             var resultMonstersArray = [];
             currentMonsterResults.forEach(function(resultMonsterID){
                 monsters.forEach(function(monster){
                     if(monster.id === resultMonsterID)
                     {
                         resultMonstersArray.push(monster);
                     }
                 });
             });
            console.log( resultMonstersArray);


            var rightfrag = document.createDocumentFragment();
            var combo1, combo2, comboChart;
            var imageboxDiv, imagebox2Div, imagebox3Div;
            var line1, line2;
            var clearing;

            // going through the list and displaying it onto the right side
            resultMonstersArray.forEach(function(resultMonster){
                console.log("this is one result monster combo: ");
                monsters.forEach(function(monster){
                    if( monster.id === resultMonster.combo.combo1)
                    {
                        combo1 = monster;
                    }

                    if( monster.id === resultMonster.combo.combo2)
                    {
                        combo2 = monster;
                    }
                });

                comboChart = document.createElement("div"); /*parent comboChart Div*/
                comboChart.classList.add("comboChart");

                imageboxDiv = creatingMonsterDiv(resultMonster, "imagebox");
                imagebox2Div = creatingMonsterDiv(combo1, "imagebox2");
                imagebox3Div = creatingMonsterDiv(combo2, "imagebox3");

                line1 = document.createElement("div");
                line1.classList.add("line1");
                line2 = document.createElement("div");
                line2.classList.add("line2");

                comboChart.appendChild(imageboxDiv);
                comboChart.appendChild(line1);
                comboChart.appendChild(line2);
                comboChart.appendChild(imagebox2Div);
                comboChart.appendChild(imagebox3Div);
                //clearing float

                clearing = document.createElement("div");
                clearing.classList.add("clear");


                rightfrag.appendChild(comboChart);
                rightfrag.appendChild(clearing);

            }); // foreachresultmonster() 

           rightSide.appendChild(rightfrag);
        }); // click() function
    });
}