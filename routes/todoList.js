const router =require("express").Router();
let List = require("../models/TodoList");



router.route("/add").post((req,res) => {

    const id = Number(req.body.id);
    const title = req.body.title;
    const timestamp = req.body.timestamp;
    const color =req.body.color;
    const completed = req.body.completed;
    const priority = req.body.priority;
    
    if(!color.match(/^#[0-9A-F]{6}$/i)){
        console.log("Colour is not a hex clour");
        res.status(300).send({status:"Error with hexColour recheck"});
    }else{
        const newList = new List({id,title,timestamp,color,completed,priority,})

        newList.save().then(() =>{//pass the object to database if successful
            res.status(200).send({message:"List Added"})//from jason format a response sent to front end
        }).catch((err) =>{//error or exception handling
            console.log(err);
            res.status(300).send({status : "Error with insert list",error:err.message});
    
        })
    }

   

})

//Retrieve all Lists
router.route("/").get((req,res) => {

    List.find().then((lists) =>{
        res.json(lists)

    }).catch((err)=>{
        console.log(err);
    })
})

//Retrieve one list using id
router.route("/get/:id").get(async(req,res) => {

let id = req.params.id;//nic taken from frontend

const list = await List.findOne({id : id})
.then((list) =>{
    res.status(200).send({status :"List fetched",list:list})
}).catch(() => {
    console.log(err.message);
    res.status(500).send({status : "Error with retrieving list", error:err.message});
})

})

//Delete one list  using id
router.route("/delete/:id").delete(async(req,res) =>{

    let id = req.params.id;

    await List.findOneAndDelete({id : id})
    .then(() =>{
        res.status(200).send({status: "List deleted"});
    }).catch(() => {
        console.log(err);
        res.status(500).send({status:"Error with delete list",error : err.message});
    })


})


//Update the list based on list id
router.route("/updates/:id").put(async(req,res) => {

    let nid =req.params.id;

    const {id,title,timestamp,color,completed,priority} = req.body;

    const updateList = {id,title,timestamp,color,completed,priority}

    const update = await List.findOneAndUpdate({id:nid},updateList)
    .then(() => {
        res.status(200).send({status:"List updated"})
     }).catch((err) =>{
         console.log(err);
         //res.status(300).send({status: "Error with updating data",error: err.message});
         res.status(301).send({status : "Error with list update",error:err.codeName});
     }) 

})

//To search for lists from name Value 
router.route("/searchListByName/:name").get((req,res) => {

    let val =req.params.name.trim();//as the name input we can enter the value beta
 
     List.find({title :{$regex: ".*" + val + ".*", $options:'i'}}).then((lists) =>{
         res.json(lists)
 
     }).catch((err)=>{
         console.log(err);
     })
 
 })

 router.route("/filterListByPriority").get((req,res) => {

    let val ="high";
 
     List.find({priority :{$regex: ".*" + val + ".*", $options:'i'}}).then((lists) =>{
         res.json(lists)
 
     }).catch((err)=>{
         console.log(err);
     })
 
 })

 router.route("/filterListByColor").get((req,res) => {

    let val ="#FF0000";//
 
     List.find({color :{$regex: "^" + val + ".*", $options:'i'}}).then((lists) =>{
         res.json(lists)
 
     }).catch((err)=>{
         console.log(err);
     })
 
 })


//To get all the lists after the given startDate
router.route("/startDate").get((req,res) => {

    List.find({"timestamp" :{$gte: new Date("2010-01-20T20:15:31Z")}}).then((result) =>{
       res.json(result);

   }).catch((err)=>{
       console.log(err);
   })

})

//To get all the lists before the given endDate
router.route("/endDate").get((req,res) => {

    List.find({"timestamp" :{$lte: new Date("2020-10-30T20:15:31Z")}}).then((result) =>{
       res.json(result);

   }).catch((err)=>{
       console.log(err);
   })

})





module.exports = router;
