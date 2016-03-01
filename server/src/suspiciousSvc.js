const monk = require('monk');
const coMonk = require('co-monk');
const mongoUrl = process.env.MONGO_URL || 'localhost/cf-reactjs-jumpstart';
const debug = require('debug')('api:todosdb');
const parse = require('co-body');
var co = require('co');

const db = monk(mongoUrl);
const suspicious = coMonk(db.get('suspicious'));

module.exports = function*() {
  const rows = [];

  (yield suspicious.find({})).forEach( s => {
    rows.push(`
      <tr>
        <td>${s.listId}</td>
        <td>${s.listName}</td>
        <td>${s.todoId}</td>
        <td>${s.todoText}</td>
      </tr>
    `);
  });

  return `
  <html>
    <body>
        <table border="1" cellpadding="10">
          <tr>
            <th>List ID</th>
            <th>List Name</th>
            <th>ToDo ID</th>
            <th>ToDo Text</th>
          </tr>
          ${rows.join('')}
        </table>
    </body>
  </html>
  `;


};