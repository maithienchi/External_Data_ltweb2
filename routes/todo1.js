const {Router}=require('express');
const Todo = require('../services/todos');

const router = new Router();

//render the ejs and display added task, task(index.ejs) = task(array)
router.get('/', function todo(req,res){
   if(req.currentUser){
    res.render('todo',{ task: Todo.findAllNotDone(), complete: Todo.findDone() });
   }else{
       res.redirect('/');
   }  
});

router.post('/',function (req,res){
    var newTask = req.body.newtask;
    if(newTask!=""){
    //add the new task from the post route into the array
        Todo.add(newTask);
    }else{
        var completeTask = req.body.check;
    //add the new task from the post route into the array
        // Todo.markAsDone(Todo.findById(completeTask));
        const todo2 = Todo.findById(parseInt(completeTask));//to int 
        Todo.markAsDone(todo2);
    }
    //after adding to the array go back to the root route
    res.redirect('/todo');
});



module.exports=router;