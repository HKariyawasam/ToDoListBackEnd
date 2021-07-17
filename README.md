# ToDoListBackEnd
Created using NodeJS and MongoDb

POST /todo create new todo items.
http://localhost:8070/todos/add

DELETE /todo/{id}
http://localhost:8070/todos/delete/id

UPDATE /todo
http://localhost:8070/todos/updates/id

GET /todos
http://localhost:8070/todos/

GET /todo?searchKeyword=beta 
http://localhost:8070/todos/searchListByName/beta

GET /todo?filterByPriority=high 
http://localhost:8070/todos/filterListByPriority

GET /todo?filterByColor=red 
http://localhost:8070/todos/filterListByColor

GET /todo?startDate=2010-01-20 
http://localhost:8070/todos/startDate

GET /todo?endDate=2020-10-30 
http://localhost:8070/todos/endDate
