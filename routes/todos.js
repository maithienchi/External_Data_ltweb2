const { Router } = require('express');
const Todo = require('../services/todos');
const asyncHandler = require('express-async-handler');
const requireLoggedIn = require('../middlewares/requireLoggedIn')

const router = new Router();

router.use(requireLoggedIn);

router.get('/',asyncHandler(async function(req,res){
    const todos = await Todo.findAllNotDone(req.currentUser.id);
    const todone = await Todo.findDone(req.currentUser.id);
    res.render('todos',{ todos,todone });
}));

router.get('/:id/done',asyncHandler(async function(req,res){
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if(todo && todo.userId===req.currentUser.id){
        await todo.markAsDone();
    }
    res.redirect('/todos');
}));
router.post('/',asyncHandler(async function (req,res){
    var newTask = req.body.newtask;
    if(newTask!=""){
        await Todo.add(newTask,req.currentUser.id);
    }
    res.redirect('/todos');
}));

module.exports=router;