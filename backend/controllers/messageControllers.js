const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    console.log(message);

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const decryptImage = (encryptedImageData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedImageData, ENCRYPTION_KEY);
  const decryptedImageData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedImageData;
};

const uploadImage = asyncHandler(async (req, res) => {
  const { encryptedImage } = req.body;

  // Decrypt image data
  const decryptedImageData = decryptImage(encryptedImage);

  // Process and store decrypted image data (e.g., save to MongoDB or cloud storage)
  // Ensure proper error handling and return the image URL or identifier

  res.json({ imageUrl: "<image_url>" }); // Placeholder for image URL
});

module.exports = { allMessages, sendMessage, uploadImage };
