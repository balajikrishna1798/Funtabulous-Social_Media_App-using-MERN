import { conversation } from "../models/Conversation";

export const Conversation = async(req,res) => {
  const newConversation = new conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conv of a user

export const userId = async (req, res) => {
  try {
    const Conversation = await conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(Conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conv includes two userId

export const findUserId =  async (req, res) => {
  try {
    const Conversation = await conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(Conversation)
  } catch (err) {
    res.status(500).json(err);
  }
};

