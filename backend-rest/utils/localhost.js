'use strict';
let date = new Date(Date.now()).toLocaleString(fi - FI)();
module.exports = (app, port) => {
    app.listen(port, () => console.log(`JAK port:  ${port}!  time: ${date}`));

}