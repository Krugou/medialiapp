'use strict';

module.exports = (app, port) => {
    app.listen(port, () => console.log(`Program is listening to port:  ${port}!  time now is: ${Date(Date.now())}`));

}