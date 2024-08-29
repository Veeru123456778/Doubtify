// import userModel from '../models/userModel.js';

// const notifications = async (req, res) => {
//   const { userId } = req.params;
//   const { name, action,time } = req.body;

//   try {
//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const newNotification = {
//       name,
//       action,
//       time, // you can use the current date and time or pass a specific time
//     };

//     user.notifications.push(newNotification);
//     await user.save();

//     res.status(200).json({ success: true, message: 'Notification added successfully' });
//   } catch (error) {
//     console.error('Error adding notification:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// export { notifications };


import userModel from '../models/userModel.js';

const notifications = async (req, res) => {
  const { userId } = req.params;
  const { name, action, time } = req.body;

  // Log the incoming request body for debugging
  console.log('Incoming notification data:', req.body);

  if (!name || !action) {
    return res.status(400).json({ success: false, message: 'Name and action are required' });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newNotification = {
      name,
      action,
      time: time || new Date(), // Use the provided time or the current date and time
    };

    user.notifications.push(newNotification);
    await user.save();

    res.status(200).json({ success: true, message: 'Notification added successfully' });
  } catch (error) {
    console.error('Error adding notification:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { notifications };
