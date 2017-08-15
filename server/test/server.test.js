const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app}=require('./../server');
const {Todo}=require('./../models/Todo');


var testId = new ObjectID();
//create a dummy Data
const todos=[
  {
    _id: new ObjectID(),
    text: 'First Docs'
  },
  {
    _id: new ObjectID(),
    text: 'Second Docs',
    completed: true,
    completedAt: 12345
  }
];

//Cleaning Database after each request
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done());
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
      Todo.find({text}).then((todos)=>{
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
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });
});


//TC for reading Docs
describe('POST /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

//TC for fetching single node
describe('GET /todos/:id',()=>{
  it('should return todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found',(done)=>{
    request(app)
    .get(`/todos/${testId.toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non object ids',(done)=>{
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  });

});

//TC for delete route
describe('DELETE /todos/:id',()=>{
  it('should delete a todo',(done)=>{
    var hexId=todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res)=>{
      if(err){
        return done(err);
      }
      Todo.findById(hexId).then((todos)=>{
        expect(todos).toNotExist();
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });

  it('should return 404 if not found',(done)=>{
    request(app)
    .delete(`/todos/${testId.toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if id is invalid',(done)=>{
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });

});

//TC for update Todo List
describe('PATCH /todos/id',()=>{

  it('should update the todo',(done)=>{
      var hexId=todos[0]._id.toHexString();
      request(app)
      .patch(`/todos/${hexId}`)
      .send({id: hexId,
      completed: true,
      text: "Updated by mocha TC"})
      .expect(200)
      .expect((res)=>{
        //console.log(JSON.stringify(res.body,undefined,2));
        expect(res.body.todo.text).toBe("Updated by mocha TC");
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt if todo is not completed',(done)=>{
    var hexId=todos[1]._id.toHexString();
    request(app)
    .patch(`/todos/${hexId}`)
    .send({id: hexId,
    completed: false,
    text: "Updated second text by mocha TC"})
    .expect(200)
    .expect((res)=>{
      //console.log(JSON.stringify(res.body,undefined,2));
      expect(res.body.todo.text).toBe("Updated second text by mocha TC");
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });

});
