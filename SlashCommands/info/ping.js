const slashCommand = require("../../Structures/SlashCommand");
const { MessageEmbed } = require("discord.js")

module.exports = new slashCommand({
  name: "ping",
  description: "Get client ws ping",
  type: "CHAT_INPUT",
  run: async ({ client, interaction }) => {
    const Pinging = new MessageEmbed()
    .setTitle("PINGING...")
    .addField("Websocket Ping", "> Pinging. . .", true)
    .addField("API Ping", "> Pinging. . .", true)
    .addField("Message Edit Ping", "> Pinging. . .", true)
    .setColor(client.colors.invis);
    interaction.channel.sendTyping()
  const embed = await interaction.channel.send({ embeds: [Pinging] });
  const websocket = (interaction.createdTimestamp - Date.now()).toLocaleString();
  const api = client.ws.ping.toLocaleString();
  const msgedit = Math.round(embed.createdAt - interaction.createdAt).toLocaleString();

  const Emojis = {
    bad: "🔴",
    good: "🟡",
    excellent: "🟢"
  }

  const websocketPing =
    websocket <= 100
      ? Emojis.excellent
      : websocket <= 200
      ? Emojis.good
      : Emojis.bad;
  const apiPing =
    api <= 100
      ? Emojis.excellent
      : api <= 200
      ? Emojis.good
      : Emojis.bad;
  const edit =
    msgedit <= 100
    ? Emojis.excellent
    : msgedit <= 200
    ? Emojis.good
    : Emojis.bad;

  setTimeout(() => {
    const Pong = new MessageEmbed()
      .setTitle("Pong 🏓")
      .addField("Websocket Ping", `> ${websocketPing} ${websocket}`, true)
      .addField("API Ping", `> ${apiPing} ${api}`, true)
      .addField("Message Edit Ping", `> ${edit} ${msgedit}`, true)
      .setColor(client.colors.invis);
    interaction.reply({ embeds: [Pong] });
    embed.delete();
  }, 5500);
},
});