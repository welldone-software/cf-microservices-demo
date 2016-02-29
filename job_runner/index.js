const config = require('./config');
const jobInterval = config.jobInterval;
const mongoUrl = config.mongoUrl;

const escapeRegexp = require('escape-regexp');
const monk = require('monk');
const debug = require('debug')('job:main');


const db = monk(mongoUrl);
const todos = db.get('todos');

const prohibitedWords = require('./prohibitedWords.json');
const prohibitedWordsRegex = new RegExp(
  prohibitedWords.map(t => `\\b${escapeRegexp(t)}\\b`).join('|'),
  'ig'
);


main();

function main(){
  const timerId = setInterval(job, jobInterval);
  job();
}



function job(){

  console.log(`Job run ${new Date()}`);

  todos.find({}, function(err, todoLists){
    todoLists.forEach(function(todoList){
      todoList.todos.forEach(function(todo){
        console.log(todo.text);
        if(prohibitedWordsRegex.test(todo.text)){
          console.warn(`Prohibited words detected '${todo.text}' in list '${todoList._id}', todo id '${todo.id}'`);
        }
      });
    });
  });
}
