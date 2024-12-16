import { getReviews } from "../models/reviewmodel.js";
const getReviewList = (req, res) => {
    try {
        const reviews = getReviews();  // Fetch reviews from the model
        res.status(200).json({ user_reviews: reviews });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
    }
};
export { getReviewList };  // Use ES Module export