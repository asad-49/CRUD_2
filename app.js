const express=require('express');
const bodyParser=require('body-parser')

const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let users = [
    { 
      id: 1,
      name: 'abid',
      task: 'A',
      email: 'abid@gmail.com',
    },
    { 
      id: 2,
      name: 'raj',
      task: 'B',
      email: 'raj@gmail.com',
    },
  ];
  
  // Getting the list of users from the mock database
  app.get('/', (req, res) => {
      res.send(users);
  })

  app.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user});

    res.send(`${user.name} has been added to the Database`);
}) 
app.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
});
app.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index=users.findIndex(user => user.id === userId);
 
    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        res.json({ message: 'id deleted successfully', deletedUser });
    } else {
        res.status(404).json({ message: 'id not found' });
    }
});
app.patch('/:id', (req, res) => {
    const { id } = req.params;
  
    const { name, email} = req.body;
  
    const user = users.find((user) => user.id === id)
  
    if(name) user.name = name;
    if(email) user.email = email;
  
    res.send(`User with the ${id} has been updated`)
    
  });
  
app.listen(3000,()=>{
    console.log("cccc");
})