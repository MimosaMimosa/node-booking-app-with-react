import Hotel from '../models/Hotel.js';

export const store = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save()
        return res.status(200).json(saveHotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const index = async (req, res, next) => {
    try {
        const hotels = Hotel.find()
        return res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const update = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate
            (
                req.params.id,
                { $set: req.body },
                { new: true }
            )
        return res.status(200).json(updatedHotel);
    } catch (error) {
        next(error)
    }
}


export const destroy = async () => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted");
    } catch (error) {
        next(error)
    }
}