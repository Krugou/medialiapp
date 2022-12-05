'use strict';

module.exports = (app, port) => {
    app.listen(port, () => console.log(`Program port:  ${port}!  time: ${Date(Date.now())}`));

}