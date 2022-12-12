const express = require('express');
const studentArray = require("../src/InitialData");
const {student,track}= require("../model/model");
const router = express.Router();
router.get("/student/", async (req, res) => {
    try {
        const user = await student.find();
      if (user.length) {
            res.json({
                status: "success",
                result: user,
            });
          }
        else {
            await student.create(studentArray);
            await track.create({
                id: "auto",
                sequence: studentArray.length
            })
            const std = await student.find();
            const totalId = await track.find();
            res.json({
                status: "succses",
                result: std,
                totalId: totalId
            });
        }
    }
    catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
});

router.get("/student/:id",async(req,res)=>{
    const user = await student.find({id:req.params.id});
    try{
        if(user.length){
            res.json({
                status:"success",
                result:user
            })
        }
        else{
            res.status(404).json({
                status:"failed",
                message:"invalid response"
               })
        }
    }catch(e){
       res.json({
        status:"failed",
        message:e.message
       })
    }
});
router.post("/student/",async(req,res)=>{
      try{
        const trackSeq = await track.find();
        await student.create({
            id:trackSeq[0].sequence + 1,
            name:req.body.name,
            currentClass:req.body.currentClass,
            division: req.body.division,
        });
        await track.updateOne({ id: "auto" }, { sequence: trackSeq[0].sequence + 1 });
        // const trackd = await track.find();
        let newStudent = await student.find({id:trackSeq[0].sequence + 1});
        res.json({
            status: "new student added succesfully",
            result:newStudent,
        });
        
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
});
router.put("/student/:id",async(req,res)=>{
    try {
        const std = await student.find({ id: req.params.id });
        if(std.length){
           await student.updateOne({ id: req.params.id }, {
                name: req.body.name,
                currentClass: req.body.currentClass,
                division: req.body.division,
             });
            const updatedStudent = await student.find({ id: req.params.id });
            res.json({
                status: "updated succesfully",
                result:updatedStudent
            })
    }
        else{
            res.status(400).json({
                status:"failed",
                message:"invalid data"
            })
        }
         

    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message,
        })
    }
});

router.delete("/student/:id",async(req,res)=>{
   
    try{
        const std = await student.find({ id: req.params.id });
        if (std.length) {
            await student.deleteOne({ id: req.params.id });
            res.json({
                status: "deleted successfully",
            })
        }
        else{
            res.status(404).json({
                status: "failed",
                message:"invalid data"
            })
        }
    }
    catch(e){
        res.json({
            status:"failed",
            message:e.message,
        })
    }
})


module.exports = router ;
