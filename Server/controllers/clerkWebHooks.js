import User from '../models/User.js';
import { Webhook } from 'svix';

const clerkWebhook = async (req, res) => {
    try {
        // Create a new instance of the Webhook class with the secret key
        const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting Headers
        const headers = {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature']
        };

        // Verifying Headers
        await wHook.verify(JSON.stringify(req.body), headers);

        // Getting data from request body
        const { type, data } = req.body;

        const userData = {
            _id: data.id,
            userName: data.firstName + ' ' + data.lastName,
            email: data.emailAddresses[0].emailAddress,
            image: data.profileImageUrl,
        }

        // Handling different event types
        switch (type) {
            case 'user.created':
                // Create a new user in the database
                await User.create(userData);
                break;

            case 'user.updated':
                // Update existing user in the database
                await User.findByIdAndUpdate(data.id, userData);
                break;

            case 'user.deleted':
                // Delete user from the database
                await User.findByIdAndDelete(data.id);
                break;

            default:
               break;
        }

        res.json({success: true, message: 'Webhook processed successfully'});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }

}

export default clerkWebhook;