const expect = require('expect');
const request = require('supertest');
const {app}=require('./../server');
const {Todo}=require('./../models/Todo');

//Cleaning Database after each request
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    done();
  });
});

//Test cases for creating a todo Doc
describe('POST /todos',()=>{

  it('should create a new todo doc',(done)=>{
    var text = "New Todo Doc from test";

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });

  it('should note create a new todo doc for invalid text body',(done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(0);
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });
});
