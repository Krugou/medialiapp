'use strict';
let date = new Date(Date.now()).toISOString();
module.exports = (app, port) => {
  app.listen(port, () => console.log(`JAK port:  ${port}!  time: ${date}`));

};