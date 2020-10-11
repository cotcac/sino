const expect = require('chai').expect;
var sinon = require("sinon");
const index = require('../index');
describe('Test index', function(){
    it(' a should return 5', async function(){
        const x = await index();
        console.log(x);
        expect(x).to.be.eql(5);
      })
})