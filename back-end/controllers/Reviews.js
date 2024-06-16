import { Review } from "../models/Reviews.js";

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).send({records: reviews});
    } catch (err) {
        res.status(500).send({message: "Server error", error: err});
    }
};

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) {
            res.status(200).send({review});
        } else {
            res.status(404).send({message: "Review not found"});
        }
    } catch (err) {
        res.status(500).send({message: "Server error", error: err});
    }
};

const create = async (req, res) => {
    try {
        const {Rating, Details,UserUsername,PitchId} = req.body;

        if (Rating === undefined || Details === undefined) {
            return res.status(400).send({message: "Rating and Details are required"});
        }

        const review = await Review.create({
            Rating,
            Details,
            UserUsername,
            PitchId
        });

        res.status(201).send({message: "Review was created", review});
    } catch (err) {
        res.status(500).send({message: "Server error", error: err});
    }
};

const update = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) {
            const {Rating, Details,UserUsername,PitchId} = req.body;

            const updatedReview = await review.update({
                Rating,
                Details,
                UserUsername,
                PitchId
            });

            res.status(200).send({review: updatedReview});
        } else {
            res.status(404).send({message: "Review not found"});
        }
    } catch (err) {
        res.status(500).send({message: "Server error", error: err});
    }
};

const remove = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) {
            await review.destroy();
            res.status(200).send({message: "Deleted review"});
        } else {
            res.status(404).send({message: "Review not found"});
        }
    } catch (err) {
        res.status(500).send({message: "Server error", error: err});
    }
};

export {
    getReviews,
    getReviewById,
    create,
    update,
    remove,
};
