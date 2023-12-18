import Contest from "../models/contest.js";

export const updateLink = async (req, res) => {
    try {
        const {
            link,
            price
        } = req.body;
        console.log({
            link,
            price
        })

        const number = await Contest.find().countDocuments();
        let contest;
        if(number === 0){
            contest = new Contest({
                link,
                price
            });
            await contest.save();
        }else{
            contest = await Contest.findOneAndReplace(
                {},
                {
                    link,
                    price
                },
                {new: true}
            );
        }

        res.status(201).json({
            contest,
            message: 'Link Updated Successfully'
        });
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const getPrice = async (req, res) => {
    try {
        const contest = await Contest.findOne();
        res.status(200).json({
            price: contest.price
        });
    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
}

export const getLink = async (req, res) => {
    try {
        const contest = await Contest.findOne();
        res.status(200).json({
            link: contest.link
        });
    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
}