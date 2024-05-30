// test/UserController.test.js
const chai = require('chai');
const sinon = require('sinon');
const User = require('../models/User');
const UserController = require('../controllers/userController');
const { default: mongoose } = require('mongoose');
const { query } = require('express');
const Token = require('../middleware/authMiddleware');
const { client } = require('../config/redisClient');

const expect = chai.expect;

describe('UserController', () => {
   describe('createUser', () => {
     it('should create a new user', async () => {
       const req = {
         body: {
            userName: 'TestName',
            accountNumber: '001TEST',
            emailAddress: 'test@test.com',
            identityNumber: '033434234343234323432'
         }
       };
       const res = {
         status: sinon.stub().returnsThis(),
         json: sinon.spy()
       };
 
       const newUser = {
         _id: 'someId',
       };
 
       sinon.stub(User.prototype, 'save').returns(newUser);
 
       await UserController.createUser(req, res);
 
       sinon.assert.calledWithExactly(res.status, 201);
       sinon.assert.calledWithExactly(res.json, newUser);
 
       sinon.restore();
     });
 
     it('should return error when save fails', async () => {
       const req = {
         body: {
            userName: 'TestName',
            accountNumber: '001TEST',
            emailAddress: 'test@test.com',
            identityNumber: '033434234343234323432'
         }
       };
       const res = {
         status: sinon.stub().returnsThis(),
         json: sinon.spy()
       };
 
       sinon.stub(User.prototype, 'save').throws(new Error('Save failed'));
 
       await UserController.createUser(req, res);
 
       sinon.assert.calledWithExactly(res.status, 500);
       sinon.assert.calledWithExactly(res.json, { error: 'Save failed' });
 
       sinon.restore();
     });
   });

   describe('getUsers', () => {
      let findStub
      beforeEach(() => {
         findStub = sinon.stub(User, 'find');
      });

      afterEach(() => {
         findStub.restore();
      });

      it('should get list a users', async () => {
  
        const users = [
         {
            _id: new mongoose.Types.ObjectId(),
            userName: 'TestName',
            accountNumber: '001TEST',
            emailAddress: 'test@test.com',
            identityNumber: '033434234343234323432'
         },
         {
            _id: new mongoose.Types.ObjectId(),
            userName: 'TestName2',
            accountNumber: '002TEST',
            emailAddress: 'test2@test.com',
            identityNumber: '033434234343234323431'
         },
        ];
        
        findStub.resolves(users);
  
        const req = {};
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.getUsers(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(users)).to.be.true;
      });
  
      it('should return error when find users fails', async () => {
         findStub.rejects(new Error('Database Error'))

        const req = {};
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.getUsers(req, res);
  
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({error: 'Database Error'})).to.be.true;
  
      });
    });

    describe('getUserByAccountNumber', () => {
      let findStub
      beforeEach(() => {
         findStub = sinon.stub(User, 'findOne');
      });

      afterEach(() => {
         findStub.restore();
      });

      it('should get a user', async () => {
  
        const user = {
            _id: new mongoose.Types.ObjectId(),
            userName: 'TestName',
            accountNumber: '001TEST',
            emailAddress: 'test@test.com',
            identityNumber: '033434234343234323432'
         };
        
        findStub.resolves(user);
  
        const req = {
         query: {
            accountNumber: '001TEST'
         },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.getUserByAccountNumber(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(user)).to.be.true;
      });
  
      it('should return error when find users fails', async () => {
         findStub.rejects(new Error('Database Error'))

        const req = {
         query: {
            accountNumber: '001TEST'
         },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.getUserByAccountNumber(req, res);
  
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({error: 'Database Error'})).to.be.true;
  
      });
    });

    describe('deleteUser', () => {
      let deleteOneStub
      beforeEach(() => {
         deleteOneStub = sinon.stub(User, 'deleteOne');
      });

      afterEach(() => {
         deleteOneStub.restore();
      });

      it('should delete a user', async () => {

        const mockResult = {deletedCount: 1};
        
        deleteOneStub.resolves(mockResult);
  
        const req = {
         query: {
            id: 'TESTID'
         },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.deleteUser(req, res);
  
        expect(res.status.calledWith(202)).to.be.true;
        expect(res.json.calledWith({message: 'Delete Success'})).to.be.true;
      });
  
      it('should return error when delete users fails', async () => {
         deleteOneStub.rejects(new Error('Database Error'))

        const req = {
         query: {
            id: 'TESTID'
         },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.deleteUser(req, res);
  
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({error: 'Database Error'})).to.be.true;
  
      });
    });

    describe('getGenerateToken', () => {
      let findOneStub, generateTokenStub

      beforeEach(() => {
         findOneStub = sinon.stub(User, 'findOne');
         generateTokenStub = sinon.stub(Token, 'generateToken')

      });

      afterEach(() => {
         findOneStub.restore();
         generateTokenStub.restore()
      });

      it('should generate token', async () => {

        const mockToken = '#$%qweqrqwr1234512';
        
        findOneStub.resolves({
            _id: new mongoose.Types.ObjectId(),
            userName: 'test',
            accountNumber: '001TEST',
            emailAddress: 'test@test.com',
            identityNumber: '033434234343234323432'
        });
        generateTokenStub.resolves(mockToken)
  
        const req = {
         query: {
            userName: 'test'
         },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.getGenerateToken(req, res);
  
        expect(res.status.calledWith(201)).to.be.true;
      });
  
      it('should return error when generate token fails', async () => {
         findOneStub.rejects(new Error('Error'))

        const req = {
         query: {
            userName: 'test'
         },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.getGenerateToken(req, res);
  
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({error: 'Error'})).to.be.true;
  
      });
    });

    describe('patchUser', () => {
      let findOneStub
      let saveStub
      beforeEach(() => {
        findOneStub = sinon.stub(User, 'findOne');
        saveStub = sinon.stub(User.prototype, 'save');
      });

      afterEach(() => {
        findOneStub.restore();
        saveStub.restore();
      });
  
      it('should return error when findOne user fails', async () => {
        findOneStub.rejects(new Error('Database Error'))

        const req = {
         params: {id: '11111'},
         body: {
          userName: 'aaaa'
         },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy()
        };
  
        await UserController.patchUser(req, res);
  
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({error: 'Database Error'})).to.be.true;
  
      });
    });
 });