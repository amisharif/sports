
const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sharifcse:sharifcse@cluster0.1c9o8w2.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('MatchDB');
        const collection = db.collection('MatchDetails');

        const schoolDB = client.db('schoolDB');
        const schoolCollection = schoolDB.collection('schoolCollection');

        const schoolInfoDB = client.db('schoolInfoDB');
        const schoolInfoCollection = schoolInfoDB.collection('schoolInfoCollection');

        const playerInfoDB = client.db('playerInfoDB');
        const playerInfoCollection = playerInfoDB.collection('playerInfoCollection');

        // const standingDB = client.db('standingDB');
        // const standingCollection = standingDB.collection('standingCollection');

        const addMatchDB = client.db('addMatchDB');
        const addMatchCollection = addMatchDB.collection('addMatchCollection');

        const playersInMatch = client.db('playersInMatch');
        const playersInMatchCollection = playersInMatch.collection('playersInMatchCollection');

        const statisticsDB = client.db('statisticsDB');
        const statisticsCollection = statisticsDB.collection('statisticsCollection');

        const standDB = client.db('standDB');
        const standCollection = standDB.collection('standCollection');

        const groupCloneDB = client.db('groupCloneDB');
        const groupCloneCollection = groupCloneDB.collection('groupCloneCollection');

        const standingDB = client.db('standingDB');
        const standingACollection = standingDB.collection('standingACollection');
        const standingBCollection = standingDB.collection('standingBCollection');
        const standingCCollection = standingDB.collection('standingCCollection');
        const standingDCollection = standingDB.collection('standingDCollection');
        const standingECollection = standingDB.collection('standingECollection');
        const standingFCollection = standingDB.collection('standingFCollection');
        const standingGCollection = standingDB.collection('standingGCollection');
        const standingHCollection = standingDB.collection('standingHCollection');


        app.get('/statistics', async (req, res) => {

            // const stat = await statCollection.find({}).sort({ goals: -1 }).limit(5).toArray();
            // console.log('Found documents:', stat);
            // res.send(stat)
            const stat = await statisticsCollection.find({}).sort({ goals: -1 }).limit(5).toArray();
            // console.log('Found documents:', stat);
            res.send(stat)
        })

        // app.get('/standing', async (req, res) => {

        //     const result = await standingCollection.aggregate([
        //         {
        //             $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
        //         }
        //     ]).toArray();
        //     console.log(result)
        //     res.send(result)

        // })

        // app.get('/stand',async(req,res)=>{

        // //    const result  = await standCollection.insertMany(data);

        //     if(2<5)console.log(true);
        //   //  console.log(result);
        //     res.send({sharif:'ce19012'})

        // })


        app.get('/matchscore', async (req, res) => {

            const documents = await addMatchCollection.find({}).toArray();
            //  console.log('Found documents:', documents);
            res.send(documents)
        })

        app.get('/matchdetails/:id', async (req, res) => {

            const id = req.params.id;
            const documents = await collection.findOne({ _id: new ObjectId(id) });
            //  console.log('Found documents:', documents);
            res.send(documents)
        })


        app.get('/showschool', async (req, res) => {
            const shcoolList = await schoolCollection.find({}).toArray();
            res.send(shcoolList)
        })

        app.get('/showschool/:email', async (req, res) => {

            const query = { email: req.params.email }
            const document = await schoolInfoCollection.findOne(query);
            console.log('Found school:', document);
            res.send(document)
        })

        app.get('/teaminfo/:eiin', async (req, res) => {
            const query = { schoolId: req.params.eiin }
            const teamInfoList = await playerInfoCollection.find(query).toArray();
            res.send(teamInfoList)
        })

        app.get('/playerinfo/:birthid', async (req, res) => {

            const query = { birthId: req.params.birthid }
            const playerInfo = await playerInfoCollection.findOne(query);
            res.send(playerInfo)
        })

        app.get('/playerinfo', async (req, res) => {
            const documents = await playerInfoCollection.find({}).toArray();
            res.send(documents)
        })

        app.get('/groupclone', async (req, res) => {
            const documents = await groupCloneCollection.find({}).toArray();
            res.send(documents)
        })

        app.post('/groupclone', async (req, res) => {

            const delResult = await groupCloneCollection.deleteMany({})
            const insResult = await groupCloneCollection.insertMany(req.body);

            // console.log(insResult)
            res.send(insResult)
        })




        app.get('http://localhost:3000/cleara', async (req, res) => {
            const data = standingACollection.deleteMany({});
            res.send(data)
        })

        app.get('/standdataa', async (req, res) => {
            const data = await standingACollection.aggregate([
                {
                    $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
                }
            ]).toArray();
            //console.log(data)
            res.send(data)
        })

        app.get('/standdatab', async (req, res) => {
            const data = await standingBCollection.aggregate([
                {
                    $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
                }
            ]).toArray();
            //console.log(data)
            res.send(data)
        })

        app.get('/standdatac', async (req, res) => {
            const data = await standingCCollection.aggregate([
                {
                    $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
                }
            ]).toArray();
            //console.log(data)
            res.send(data)
        })
        app.get('/standdatad', async (req, res) => {
            const data = await standingDCollection.aggregate([
                {
                    $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
                }
            ]).toArray();
            //console.log(data)
            res.send(data)
        })
        app.get('/standdatae', async (req, res) => {
            const data = await standingECollection.aggregate([
                {
                    $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
                }
            ]).toArray();
            //console.log(data)
            res.send(data)
        })
        app.get('/standdataf', async (req, res) => {
            const data = await standingFCollection.aggregate([
                {
                    $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
                }
            ]).toArray();
            //console.log(data)
            res.send(data)
        })
        app.get('/standdatag', async (req, res) => {
            const data = await standingGCollection.aggregate([
                {
                    $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
                }
            ]).toArray();
            //console.log(data)
            res.send(data)
        })
        app.get('/standdatah', async (req, res) => {
            const data = await standingHCollection.aggregate([
                {
                    $sort: { points: -1, goal_difference: -1, goals_scored: -1 } // sort by points, goal difference, and goals scored
                }
            ]).toArray();
            //console.log(data)
            res.send(data)
        })


        // ------------------------get birthId from school id--------------------------




        app.post('/standinga', async (req, res) => {

            const standData = {
                team_name: req.body.id,
                draws: 0,
                goal_difference: 0,
                goals_conceded: 0,
                goals_scored: 0,
                losses: 0,
                matches_played: 0,
                points: 0,
                wins: 0
            }

            const result = await standingACollection.insertOne(standData);
            console.log(result)
            res.send(standData)
        })

        app.post('/standingb', async (req, res) => {

            const standData = {
                team_name: req.body.id,
                draws: 0,
                goal_difference: 0,
                goals_conceded: 0,
                goals_scored: 0,
                losses: 0,
                matches_played: 0,
                points: 0,
                wins: 0
            }

            const result = await standingBCollection.insertOne(standData);
            // console.log(result)
            res.send(standData)
        })
        app.post('/standingc', async (req, res) => {

            const standData = {
                team_name: req.body.id,
                draws: 0,
                goal_difference: 0,
                goals_conceded: 0,
                goals_scored: 0,
                losses: 0,
                matches_played: 0,
                points: 0,
                wins: 0
            }

            const result = await standingCCollection.insertOne(standData);
            //  console.log(result)
            res.send(standData)
        })
        app.post('/standingd', async (req, res) => {

            const standData = {
                team_name: req.body.id,
                draws: 0,
                goal_difference: 0,
                goals_conceded: 0,
                goals_scored: 0,
                losses: 0,
                matches_played: 0,
                points: 0,
                wins: 0
            }

            const result = await standingDCollection.insertOne(standData);
            //  console.log(result)
            res.send(standData)
        })
        app.post('/standinge', async (req, res) => {

            const standData = {
                team_name: req.body.id,
                draws: 0,
                goal_difference: 0,
                goals_conceded: 0,
                goals_scored: 0,
                losses: 0,
                matches_played: 0,
                points: 0,
                wins: 0
            }

            const result = await standingECollection.insertOne(standData);
            //  console.log(result)
            res.send(standData)
        })
        app.post('/standingf', async (req, res) => {

            const standData = {
                team_name: req.body.id,
                draws: 0,
                goal_difference: 0,
                goals_conceded: 0,
                goals_scored: 0,
                losses: 0,
                matches_played: 0,
                points: 0,
                wins: 0
            }

            const result = await standingFCollection.insertOne(standData);
            //  console.log(result)
            res.send(standData)
        })
        app.post('/standingg', async (req, res) => {

            const standData = {
                team_name: req.body.id,
                draws: 0,
                goal_difference: 0,
                goals_conceded: 0,
                goals_scored: 0,
                losses: 0,
                matches_played: 0,
                points: 0,
                wins: 0
            }

            const result = await standingGCollection.insertOne(standData);
            //  console.log(result)
            res.send(standData)
        })
        app.post('/standingh', async (req, res) => {

            const standData = {
                team_name: req.body.id,
                draws: 0,
                goal_difference: 0,
                goals_conceded: 0,
                goals_scored: 0,
                losses: 0,
                matches_played: 0,
                points: 0,
                wins: 0
            }

            const result = await standingHCollection.insertOne(standData);
            //  console.log(result)
            res.send(standData)
        })






        app.post('/addmatch', async (req, res) => {

            const result = await addMatchCollection.insertOne(req.body);
            // const result = await standCollection.insertOne(req.body);
            const { score1, score2, teamId1, teamId2 } = req.body;

            const query1 = { team_name: teamId1 }
            const document1 = await standCollection.findOne(query1);

            const query2 = { team_name: teamId2 }
            const document2 = await standCollection.findOne(query2);

            let totalGoalS1;
            let totalGoalS2;
            let totalGoalC1;
            let totalGoalC2;
            let goalDiff1;
            let goalDiff2;




            if (document1 === null) {
                totalGoalS1 = score1
                totalGoalC1 = score2;
                goalDiff1 = 0;

            } else {
                totalGoalS1 = score1 + document1.goals_scored;
                totalGoalC1 = score2 + document1.goals_conceded;
                goalDiff1 = document1.goal_difference;
            }

            if (document2 === null) {
                totalGoalS2 = score2
                totalGoalC2 = score1;
                goalDiff2 = 0;
            } else {
                totalGoalS2 = score2 + document2.goals_scored;
                totalGoalC2 = score1 + document2.goals_conceded;
                goalDiff2 = document2.goal_difference;
            }




            if (score1 > score2) {

                const incData1 = {
                    "wins": 1,
                    "draws": 0,
                    "losses": 0,
                    "goals_scored": score1,
                    "goals_conceded": score2,
                    "goal_difference": (totalGoalS1 - totalGoalC1) - goalDiff1,
                    "points": 3,
                    "matches_played": 1
                }
                const result1 = await standCollection.updateMany({ "team_name": teamId1 }, {
                    $inc: incData1,
                    $setOnInsert: {}  // Create new document if player doesn't exist
                }, { upsert: true });


                const incData2 = {
                    "wins": 0,
                    "draws": 0,
                    "losses": 1,
                    "goals_scored": score2,
                    "goals_conceded": score1,
                    "goal_difference": (totalGoalS2 - totalGoalC2) - goalDiff2,
                    "points": 0,
                    "matches_played": 1
                }
                const result2 = await standCollection.updateMany({ "team_name": teamId2 }, {
                    $inc: incData2,
                    $setOnInsert: {}  // Create new document if player doesn't exist
                }, { upsert: true });



            } else if (score1 < score2) {

                const incData1 = {
                    "wins": 0,
                    "draws": 0,
                    "losses": 1,
                    "goals_scored": score1,
                    "goals_conceded": score2,
                    "goal_difference": (totalGoalS1 - totalGoalC1) - goalDiff1,
                    "points": 0,
                    "matches_played": 1
                }
                const result1 = await standCollection.updateMany({ "team_name": teamId1 }, {
                    $inc: incData1,
                    $setOnInsert: {}  // Create new document if player doesn't exist
                }, { upsert: true });


                const incData2 = {
                    "wins": 1,
                    "draws": 0,
                    "losses": 0,
                    "goals_scored": score2,
                    "goals_conceded": score1,
                    "goal_difference": (totalGoalS2 - totalGoalC2) - goalDiff2,
                    "points": 3,
                    "matches_played": 1
                }
                const result2 = await standCollection.updateMany({ "team_name": teamId2 }, {
                    $inc: incData2,
                    $setOnInsert: {}  // Create new document if player doesn't exist
                }, { upsert: true });

            } else {
                const incData1 = {
                    "wins": 0,
                    "draws": 1,
                    "losses": 0,
                    "goals_scored": score1,
                    "goals_conceded": score2,
                    "goal_difference": (totalGoalS1 - totalGoalC1) - goalDiff1,
                    "points": 1,
                    "matches_played": 1
                }
                const result1 = await standCollection.updateMany({ "team_name": teamId1 }, {
                    $inc: incData1,
                    $setOnInsert: {}  // Create new document if player doesn't exist
                }, { upsert: true });


                const incData2 = {
                    "wins": 0,
                    "draws": 1,
                    "losses": 0,
                    "goals_scored": score2,
                    "goals_conceded": score1,
                    "goal_difference": (totalGoalS2 - totalGoalC2) - goalDiff2,
                    "points": 1,
                    "matches_played": 1
                }

                const result2 = await standCollection.updateMany({ "team_name": teamId2 }, {
                    $inc: incData2,
                    $setOnInsert: {}  // Create new document if player doesn't exist
                }, { upsert: true });
            }
            //console.log(req.body);
        })

        

        app.post('/playerinfo', async (req, res) => {

            const result = await playerInfoCollection.insertOne(req.body);
            res.send(result);

        })



        app.post('/playersinmatch', async (req, res) => {

            const result = await playersInMatchCollection.insertOne(req.body);

            // const stat = await statisticsCollection.updateMany({ "birthId": req.body.birthId }, {
            //     $inc: { "Goals": req.body.goals },
            //     $setOnInsert: req.body  // Create new document if player doesn't exist
            // }, { upsert: true });


            console.log(result);
            res.send(result);

        })

        app.put('/playerinfo', async (req, res) => {
            const updatedPlayerInfo = req.body;
            const filter = { birthId: updatedPlayerInfo.birthId }
            const options = { upsert: true };

            const player = {
                $set: {
                    name: updatedPlayerInfo.name,
                    position: updatedPlayerInfo.position,
                    cls: updatedPlayerInfo.cls,
                    photo: updatedPlayerInfo.photo,
                }
            }
            const result = await playerInfoCollection.updateOne(filter, player, options);
            res.send(result);

            // console.log(updatedData);

        })

        app.delete('/playerinfo/:birthid', async (req, res) => {
            const id = req.params.birthid;
            const query = { birthId: id }
            const result = await playerInfoCollection.deleteOne(query);
            res.send(result);
        })




        app.post('/admin/addschool', async (req, res) => {
            console.log(req.body);
            const newSchool = req.body;
            const result = await schoolCollection.insertOne(newSchool);
            res.status(200).json({ message: 'Form submitted successfully', data: result.insertedId });
        })


        app.post('/showschool/:id', async (req, res) => {

            const id = req.params.id;
            //  console.log(id);
            try {
                const objectId = new ObjectId(id);
                const filter = { _id: objectId };
                const result = await schoolCollection.deleteOne(filter);
                //    console.log(`${result.deletedCount} document deleted`);
                const count = result.deletedCount
                res.send({ count });
            } catch (error) {
                console.log('Error deleting document:', error);
            }
        })


    } finally {
        // Ensures that the client will close when you finish/error
        //  await client.close();
    }
}
run().catch(console.dir);



app.listen(3000, (req, res) => {
    console.log('Listeaning to port 3000');
})

