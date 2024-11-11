import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

console.log(TOKEN, CLIENT_ID, CHANNEL_ID);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

// Register a slash command (like /ping)
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("No!");
  }
});

client.on("messageCreate", (message) => {
  console.log(message);
  console.log(`New message from ${message.author.tag}: ${message.content}`);
  if (
    message.content === "Hello bot" ||
    message.content === "hello bot" ||
    message.content === "Hello" ||
    message.content === "hello" ||
    message.content === "hi bot" ||
    message.content === "hi"
  ) {
    message.reply("Hello from the bot," + message.author.globalName);
  }
});

// Log in to Discord
client.login(TOKEN);

async function sendMessage(messageContent) {
  try {
    await client.login(TOKEN);

    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
      console.error("Channel not found.");
      return false;
    }

    const message = await channel.send(messageContent);
    console.log(`Message sent: ${message.content}`);
    return true;
  } catch (error) {
    console.error(`Error sending message: ${error}`);
    return false;
  }
}

export { client, sendMessage };
