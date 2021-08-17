
const Client = require('../database/models/client');


//Endpoint for all users
// check
exports.getAllClients = async (req, res) => {
    try {
        // 1. return accounts from database instead
        const users = await Client.find();
        return res.json(users)
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    };
}

//Endpoint for adding user
// check
exports.addClient = async (req, res) => {
    console.log(req.body)
    const user = new Client({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
    });

    try {
        console.log('New client successfully created')
        const newUser = await user.save();
        return res.json(newUser);
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}


// Implement a new endpoint, that will be able to return a specific account by id. :/id
// check
exports.getSingleClient = async (req, res) => {
    try {
        const user = await Client.findById(req.params.id);
        console.log('Found user');
        console.log(user);
        return res.json(user)
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}




// Implement a new endpoint, that will update an account /:id
// check
exports.updateSingleClient = async (req, res) => {
    try {
        const user = await Client.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        console.log('Client Updated');
        console.log(user);
        return res.json(user)
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}



// End point that deletes a client
// Check
exports.deleteSingleClient = async (req, res) => {
    try {
        const user = await Client.findByIdAndDelete(req.params.id);
        console.log('Deleted client');
        console.log(user);
        return res.json(user)
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}



