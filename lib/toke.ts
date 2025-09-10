const { StreamChat } = require('stream-chat');

module.exports = async function (req, res) {
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;
    const payload = JSON.parse(req.payload);
    const { userId, name, email } = payload;

    if (!userId || !name || !email) {
        return res.json({ error: 'Missing userId, name, or email' }, 400);
    }

    try {
        const serverClient = StreamChat.getInstance(apiKey, apiSecret);
        await serverClient.upsertUser({ id: userId, name, email });
        const token = serverClient.createToken(userId, Math.floor(Date.now() / 1000) + (60 * 60));
        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.json({ error: 'Failed to generate token or upsert user' }, 500);
    }
};