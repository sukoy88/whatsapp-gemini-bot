// index.js
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { generateReply } = require("./gemini");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("🔐 Scan QR untuk login:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ WhatsApp bot aktif!");
});

client.on("message", async (message) => {
  try {
    const isGroup = message.from.endsWith("@g.us");
    const isFromBot = message.fromMe;

    // Hanya balas jika dari chat pribadi dan bukan pesan dari bot sendiri
    if (isGroup || isFromBot || !message.body) return;

    console.log(`💬 Dari ${message.from}: ${message.body}`);

    const reply = await generateReply(message.body);
    await message.reply(reply);
  } catch (error) {
    console.error("❌ Error saat membalas:", error.message);
  }
});

client.initialize();
