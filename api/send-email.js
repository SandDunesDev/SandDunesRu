export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests allowed' });
    }
  
    const { email, selectedImageA, selectedImageB } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    const apiKey = process.env.UNISENDER_API_KEY;
    const senderEmail = process.env.UNISENDER_SENDER_EMAIL;
  
    const data = {
      api_key: apiKey,
      email: email,
      sender_email: senderEmail,
      sender_name: "Your Name",
      subject: "Your DuNes are here!",
      body: `You've selected:\nA: ${selectedImageA}\nB: ${selectedImageB}`,
      list_id: YOUR_LIST_ID_HERE,
      format: "plain"
    };
  
    try {
      const response = await fetch("https://api.unisender.com/ru/api/sendEmail?format=json", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data).toString()
      });
  
      const result = await response.json();
  
      if (result.result) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ message: result.error });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
  