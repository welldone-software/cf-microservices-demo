const JOB_INTERVAL = process.env.JOB_INTERVAL || (1000 * 6);
const MONGO_URL = process.env.MONGO_URL || 'localhost/cf-reactjs-jumpstart';

const escapeRegexp = require('escape-regexp');
const monk = require('monk');
const debug = require('debug')('job:main');


const db = monk(MONGO_URL);
const todos = db.get('todos');
const suspicious = db.get('suspicious');

const prohibitedWords = require('./prohibitedWords.json');
const prohibitedWordsRegex = new RegExp(
  prohibitedWords.map(t => `\\b${escapeRegexp(t)}\\b`).join('|'),
  'ig'
);


main();

function main(){
  const timerId = setInterval(job, JOB_INTERVAL);
  job();
}



function job(){

  console.log(`Job run ${new Date()}`);

  todos.find({}, function(err, todoLists){
    todoLists.forEach(function(todoList){
      todoList.todos.forEach(function(todo){

        if(prohibitedWordsRegex.test(todo.text)){
          console.warn(`Prohibited words detected '${todo.text}' in list '${todoList.name}', todo id '${todo.id}'`);
          suspicious.findAndModify(
            { todoId : todo.id},
            { listId: todoList._id,
              listName: todoList.name,
              todoId: todo.id,
              todoText: todo.text
            },
            { upsert: true }
          );

        }
      });
    });
  });
}