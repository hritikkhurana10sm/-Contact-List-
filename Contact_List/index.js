//required express to start with express (basic requirement)
const express = require('express');

//port on which our server runs
const port = 8000;

//we need to require the path to tell controller where is views and all that
const path = require('path');

//require config to connect to mongoDB
const db = require('./config/mongoose');      

//require the schema
const Contact = require('./models/contact');

//start express server
const app = express();
 
app.use(express.urlencoded());  // middleware used to bind the data from input in request like this

/*
    req = {
          body : {
              name : value,
              phone : value
           }
    }
*/ 

//it include all javascript , images , css files and etc
app.use(express.static('assets'));

//we used ejs template engine and here we are setting view engine as ejs
app.set('view engine' , 'ejs');

//here we are telling to controller where is views actaully in our project
app.set('views' , path.join(__dirname , 'views'));

//this is how we use middleware
app.use(function(req , res , next){

  console.log("middleware1 called");
  next();
});

app.use(function(req , res , next){

  console.log("middleware2 called");
  next();
});

//this we had used for static data usage , but we will not be using this 
/*var contactList = [
  {
    name : "Triple H",
    phone : "9222587965"
  },
  {
    name : "Hritik",
    phone : "7988695396"
  },
  {
    name : "John Cena",
    phone : "9865589775"
  }
];*/


//in get first argument '/' is router and second is callback function called controller
app.get('/' , function(req , res){
        //console.log(req);


      //find is a function to find the query ,followed by call back function
      Contact.find({} , function(err , contacts){

         if(err){
           console.log('facing error while loading!!');
           return;
         }

        return res.render('home', {
       
        title : "My Contacts List",
        contacts_list : contacts
       });

      });
     
})

/*
//it was just for example

app.get('/practice' , function(req , res){

  return res.render('practice' , {
    title : "Play it"
    });
});
*/

//we used post request for input data ,  as we need to send data to server
app.post('/create-contact' , function(req , res){

   //we are able to access req.body becuase of middleware express.urlencoded
   //contactList.push(req.body);

   // we want to push in data base

    Contact.create({

       name : req.body.name,
       phone : req.body.phone
    } , function(err , contact){

       if(err){

         console.log("error while in creating a contact!!");
         return;
        }

        console.log('*****' , contact);

        //back is used to get back to the same page we are initially
        return res.redirect('back');
    });

});

//in delete we dont use post are not sending anything , we are just getting the acknowledgement that yes
//data is deleted
app.get('/delete-contact/' , function(req , res){
   
   //console.log(req.params);
   // console.log(req.query);

    let id = req.query.id;
    
//it will delete the object by id
      Contact.findByIdAndDelete(id , function(err){

        if(err){

           console.log("error in deleting an object from database");
           return;
        }

        return res.redirect('/');
      })
   
});

//this is to connect the express server and run on port 8000
app.listen(port , function(err){

    if(err){
      console.log("its not loading ");
      return;
    }
    console.log("its running fine , great!");
});