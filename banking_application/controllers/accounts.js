
const Account = require('../database/models/account');
const assert = require('assert');



//Endpoint for all accounts
// check
exports.getAllAccounts = async (req, res) => {
    console.log('HIT THE ROUTE')
    try {
        // 1. return accounts from database instead
        const accounts = await Account.find({});
        return res.json(accounts)
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    };
}

//Endpoint for adding account
// check
exports.addAccount = async (req, res) => {
    const account = new Account({
        client_id: req.body.client_id,
        balance: req.body.balance,
        alias: req.body.alias
    });

    try {
        console.log('New account successfully created');
        await account.save();
        return res.json(account);
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}


// Implement a new endpoint, that will be able to return a specific account by id. 
// check
exports.getSingleAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        console.log('Found account');
        console.log(account);
        return res.json(account)
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}


// Endpoint for returning a the balance of a specified account '/:id/balance'
// check
exports.getBalanceOfSingleAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        console.log('Found account');
        console.log(account);
        return res.json({ balance: account.balance })
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}

// Implement a new endpoint, that will update an account  '/transfer'
/*exports.transferBetweenAccounts = async (req, res) => {
    const { toAccount: toAccountId, fromAccount: fromAccountId, amount } = req.body;

    try {
        const toAccount = await Account.findOneAndUpdate({ _id: toAccountId }, { $inc: { balance: +amount } }, { new: true });
        const fromAccount = await Account.findOneAndUpdate({ _id: fromAccountId }, { $inc: { balance: -amount } }, { new: true });

        const infoObj = {
            amount: amount,
            fromAccount: fromAccount,
            toAccount: toAccount
        }

        console.log('Account balances Updated');
        console.log(infoObj);
        return res.json(infoObj)
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}*/



// Implement a new endpoint, that will update an account using MongoDB transactions
exports.transferBetweenAccounts = async (req, res) => {
    const { toAccount: toAccountId, fromAccount: fromAccountId, amount } = req.body;

    try {

        const session = await Account.startSession();
        await session.withTransaction(async () => {

            const oldToAccount = await Account.findById({ _id: toAccountId });
            const oldFromAccount = await Account.findById({ _id: fromAccountId });

            const newToAccount = await Account.findOneAndUpdate({ _id: toAccountId }, { $inc: { balance: +amount } }, { new: true });
            const newFromAccount = await Account.findOneAndUpdate({ _id: fromAccountId }, { $inc: { balance: -amount } }, { new: true });

            const checkFromBalance = oldFromAccount.balance - amount === newFromAccount.balance;
            const checkToBalance = oldToAccount.balance + amount === newToAccount.balance

            assert.ok(checkFromBalance);
            assert.ok(checkToBalance);
        });

        session.endSession();

        return res.json({
            message: 'Transaction succesful'
        })

    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}

// Implement a new endpoint, that will update an account '/:id'
// check
exports.updateSingleAccount = async (req, res) => {
    try {
        const account = await Account.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        console.log('Account Updated');
        console.log(account);
        return res.json(account)
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}

// Implement a new endpoint, that will be able to return a specific account by id.  '/:id'
// check
exports.deleteSingleAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        console.log('Deleted client');
        console.log(account);
        return res.json(account)
    } catch (error) {
        console.error({ message: error })
        return res.status(500).json({
            error: error
        })
    }
}



