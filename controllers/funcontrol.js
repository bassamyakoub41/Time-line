const Message = require('../models/message');
const Comment = require('../models/comment')
const data =[
  { name : "Bassam Yakoub",
    createdAt : "21-02-2013",
    message : "This is my message    This is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my messageThis is my message This is my messageThis is my message This is my message This is my messageThis is my message" 
  },

  { name : "Zeinab Kamel",
    createdAt : "23-01-2013",
    message : "This is my message   This is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my message This is my messageThis is my messageThis is my message This is my messageThis is my message This is my message This is my messageThis is my message"
  },


  { name : "Fahd Al Yusif",
    createdAt : "05-01-2013",
    message : "This is my message    This is my message This is my message This is my messageThis is my message"
  },

]


const message= async (req , res)=>{  
    const createMessage= new Message (req.body);  
     await createMessage.save();
     res.redirect( '/' ); 
};

const getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find().sort({ createdAt: -1 }).populate('comments');
    const user = req.user ? req.user : null; 
    res.render('posts', { Msg: allMessages, post: data, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const comments = async (req, res) => {
  const { id } = req.params;
  const { name, comment } = req.body;


  try {
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).send('Message not found');
    }

    const newComment = new Comment({ name, comment });
    await newComment.save();

    message.comments.push(newComment._id);
    await message.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {message,getAllMessages,comments}; 