var express = require("express"),
    app = express(),
    mongoose = require("mongoose");

// Database: monsterCollection, Collection: monsters
mongoose.connect("mongodb://localhost/monsterCollection", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var monsterSchema = new mongoose.Schema({
    name: String,
    rank: String,
    category: String,
    obtained: String,
    stat: String,
    id: String,
    combo: 
    {
        combo1: String,
        combo2: String
    },
    result: [String],
    combobinary: String,
    resultbinary: String,
    stat1: String,
    stat2: String,
    insidefarm: String,
    favorite: String
});

var monsterDB = mongoose.model("monsters", monsterSchema);

app.get("/", function(req,res){ res.redirect("/monsters"); });

// Main Page displays all monsters - mainMonsters1.ejs
app.get("/monsters", function(req,res){
    monsterDB.find({}, {name:1, id:1}).sort({name: 'asc'}).exec(function(error, returnedMonsters){
        if(error) { console.log(error); }
        else
        {
            res.render("mainMonsters1", {allMonsters: returnedMonsters} );
        }
    });
}); //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~app.get(/monsters)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Individual Monster Pages - indivMonsters2.ejs - have to return the individual monster, result monsters, and combo monsters req.params.id res.render("errorPage");
app.get("/monsters/:id", function(req, res){
    var indivMonID = req.params.id;

    singleMonsterFindPromise(indivMonID)
        .then(function(retSingleMonPromise){
            var objectIDs = {};
            objectIDs[retSingleMonPromise.id] = retSingleMonPromise; 

            if(retSingleMonPromise.combobinary === "1")
            {
                return new Promise(function(resolve,reject){
                    monsterDB.find({id: {$in: [retSingleMonPromise.combo.combo1, retSingleMonPromise.combo.combo2]} },function(error,returnedCombo){
                        if(error || !returnedCombo.length)
                        {
                            var returnError = new Error("Error could not find single Monster");
                            reject(returnError);
                        }
                        else
                        {
                            objectIDs = creatingObjectKeys(objectIDs, returnedCombo);
                            resolve([retSingleMonPromise, objectIDs]); 
                        }
                    }); // monsterDBfind()
                }); // Promise()
            }
            else  // Else this object does not have comboMonsters inside so we just move on with the single Monster inside ObjectIDs
            {
                return [retSingleMonPromise, objectIDs];
            }
        })
        .then(function(secondThenReturnedArray){
            if(secondThenReturnedArray[0].resultbinary === "1")
            {
                return new Promise(function(resolve,reject){
                    var correctResultArray = (secondThenReturnedArray[0].result).filter(function(arrayItem){
                        return arrayItem !== "";
                    });

                    var dependentComboMonsterArray = []; 
                    monsterDB.find({id: {$in: correctResultArray} },function(error, returnedResultMonstersArray){
                        if(error || !returnedResultMonstersArray.length)
                        {
                            var returnError = new Error("Could not find result monsters");
                            reject(returnError);
                        }
                        else
                        {
                            for(var i=0; i<returnedResultMonstersArray.length; i++)
                            {
                                if(returnedResultMonstersArray[i].combo.combo1 !== secondThenReturnedArray[0].id)
                                {
                                    dependentComboMonsterArray.push(returnedResultMonstersArray[i].combo.combo1);
                                }
                                else
                                {
                                    dependentComboMonsterArray.push(returnedResultMonstersArray[i].combo.combo2);
                                }
                            } // for()
                            monsterDB.find({id: {$in: dependentComboMonsterArray} },function(error, returnedDepCombos){
                                if(error || !returnedDepCombos.length)
                                {
                                    var returnError = new Error("Could not find combomonsterDEP");
                                    reject(returnError);
                                }
                                else
                                {
                                    var totalArrayOfComboandResult = returnedResultMonstersArray.concat(returnedDepCombos);
                                    var objectIDs = creatingObjectKeys(secondThenReturnedArray[1], totalArrayOfComboandResult);
                                    resolve([secondThenReturnedArray[0], objectIDs]);
                                }
                            });//monsterDBfind()
                        } // else found()
                    });//monsterDB.find(resultmonsters)
                }); // Promise()
            }
            else
            {
                return secondThenReturnedArray;
            }
            
        })
        .then(function(thirdThenReturnedArray){
            res.render("indivMonsters2", { indivMonsterID: thirdThenReturnedArray[0].id, allMonsters: thirdThenReturnedArray[1] } );
        })
        .catch(function(returnedError){
            console.log(returnedError.message);
            res.render("errorPage");
        });

    
}); //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ app.get(/monsters/id)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Function used for finding a single monster and returning the promise ~ used in /monsters/id
function singleMonsterFindPromise(monID)
{
    return new Promise(function(resolve,reject){
        monsterDB.find({id: monID},function(error, returnedMonster){
            if(error || !returnedMonster.length) 
            { 
                var returnError = new Error("Error could not find single Monster");
                reject(returnError);
            }
            else
            {
                resolve(returnedMonster[0]);
            }
        });// monsterDBfind()
    }); // Promise()
} // func singleMonsterFindPromise()

function creatingObjectKeys(objectKeys, mongoArray)
{
    for(var i=0; i<mongoArray.length; i++)
    {
        if( !(mongoArray[i].id in objectKeys) )
        {
            objectKeys[mongoArray[i].id] = mongoArray[i];
        } // if()
    }//for()
    return objectKeys;
}



app.listen(3000, function()
{
  console.log("server starting on port 3000");
});

