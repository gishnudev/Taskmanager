import { Router } from "express";
import mongoose, { Schema } from "mongoose";


const Routes = Router()

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
        },
    description: {
        type: String,
        required: true
        },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
        },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
        },
    createdAt: {
        type: Date,
        default: Date.now
        }
})

const task = mongoose.model('taskDetails', taskSchema)

mongoose.connect('mongodb://localhost:27017/TaskManager')

Routes.post('/addtask', async (req, res) => {
    console.log("hi");
    
    const { title, description, status,priority,createdAt } = req.body
    console.log(title, description, status,priority,createdAt);
    
    const existingtask = await task.findOne({ title: title })
    console.log(existingtask);
    
    try {
        if (existingtask) {
            console.log("task already exists");
            res.status(400).json({ message: 'task already exits' })
        }
        else {
            const newTask = new task({
                title: title,
                description: description,
                status: status,
                priority:priority,
                createdAt:createdAt
            })
            console.log(newTask);
            
            await newTask.save()
            res.status(500).json({ message: 'task added sucessfully' })
        }

    } catch (error) {
        res.status(300).json({ message: 'server error' })
    }

})

Routes.get('/getalltasks',async(req,res)=>{
    const tasks = req.body
    console.log(tasks);
    
    const alltasks = await task.find( )
    console.log(alltasks);

    try {
        if(alltasks){
            res.status(300).json({message:'founded all tasks'})
        }
        else{
            res.status(400).json({message:'no tasks found'})
        }
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
    
})

Routes.put('/updatetask',async(req,res)=>{
    console.log("hai");
    

    const data = req.body
    console.log(data);

    const {title, newescription, newstatus,newpriority,newcreatedAt} = data
    
    const oldData = await task.findOne({title:title})
    try {
        if (oldData) {
            oldData.description= newescription||oldData.description,
            oldData.status= newstatus||oldData.status
            oldData.priority= newpriority||oldData.priority
            oldData.createdAt= newcreatedAt||oldData.createdAt

            await oldData.save()
            res.status(300).json({message:"data updated successfully"})
        } else {
            res.status(400).json({message:"error occured in update"})

        }
    } catch (error) {
        res.status(500).json({message:"server error"})

    }
})

Routes.delete('/delete/:id',async(req,res)=>{
    const data=req.params.id
    console.log(data);
    
    const deleteTask = await task.findOneAndDelete({title:data})
    try {
        if(deleteTask){
            res.status(300).json({message:"task deleted successfully"})
        }else{
            res.status(400).json({message:"canot find task"})
        }
    } catch (error) {
        res.status(500).json({message:"server error"})
    }

})

export { Routes }