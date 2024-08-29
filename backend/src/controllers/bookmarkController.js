// Import necessary modules
import bookmarkModel from '../models/bookMarksModel.js'; // Corrected file name
import answerModel from '../models/answerModel.js'; // Corrected model name
import questionModel from '../models/questionModel.js';

// Controller function to add a bookmark
const addBookmark = async (req, res) => {
    const { answerId, questionId, userId } = req.body;

    try {
        // Check if the bookmark already exists
        const existingBookmark = await bookmarkModel.findOne({ answerId, questionId, userId });

        if (existingBookmark) {
            return res.status(400).json({ success: false, message: 'Bookmark already exists' });
        }

        // Create and save the new bookmark
        const bookmark = new bookmarkModel({ answerId, questionId, userId });
        await bookmark.save();

        return res.json({ success: true, message: 'Bookmark added' });
    } catch (error) {
        console.error("Error adding bookmark:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Controller function to remove a bookmark
const removeBookmark = async (req, res) => {
    const { answerId, questionId, userId } = req.body;

    try {
        // Find the bookmark
        const existingBookmark = await bookmarkModel.findOne({ answerId, questionId, userId });

        if (!existingBookmark) {
            return res.status(404).json({ success: false, message: 'Bookmark not found' });
        }

        // Delete the bookmark
        await bookmarkModel.deleteOne({ _id: existingBookmark._id });

        return res.json({ success: true, message: 'Bookmark removed' });
    } catch (error) {
        console.error("Error removing bookmark:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const getBookmarks = async (req, res) => {
    const { userId } = req.params;

    // Debug log to inspect userId
    console.log("Received userId:", userId);

    try {
        // Find bookmarks for the specified user and populate the referenced models
        const bookmarks = await bookmarkModel.find({ userId }).populate('answerId questionId');

        // Debug log to inspect the query result
        console.log("Retrieved bookmarks:", bookmarks);

        if (!bookmarks || bookmarks.length === 0) {
            console.warn("No bookmarks found for user:", userId);
        }

        return res.json({ success: true, bookmarks });
    } catch (error) {
        console.error("Error retrieving bookmarks:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Export controller functions
export { addBookmark, removeBookmark, getBookmarks };
