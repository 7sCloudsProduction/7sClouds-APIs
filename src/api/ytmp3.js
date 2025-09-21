const axios = require('axios');

module.exports = function(app) {
    // Fungsi untuk panggil API YouTube MP3
    async function downloadYTMP3(url) {
        const { data } = await axios.get('https://api-furina.vercel.app/download/ytmp3', {
            params: { url }
        });
        return data;
    }

    // Route API /download/ytmp3
    app.get('/download/ytmp3', async (req, res) => {
        try {
            const { url } = req.query;
            if (!url) {
                return res.status(400).json({ status: false, error: 'URL is required' });
            }

            const response = await downloadYTMP3(url);

            if (!response.status || !response.result) {
                return res.status(500).json({ status: false, error: 'Furina API failed' });
            }

            const result = response.result;

            res.status(200).json({
                status: true,
                vid: result.vid,
                title: result.title,
                ftype: result.ftype,
                fquality: result.fquality,
                download_link: result.dlink,
                thumbnail: result.thumbnail,
                creator: response.creator
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
}