const db = require('./index');
( async function(){
    const x = await db();
    console.log(x);
})()