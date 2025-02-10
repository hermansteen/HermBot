const { SlashCommandBuilder } = require("discord.js");
let wol = require("wake_on_lan");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wakeonlan")
    .setDescription("Wake a device on your network with Wake-On-LAN")
    .addStringOption((option) =>
      option
        .setName("device")
        .setDescription("Which device do you want to wake?")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply("Wake-On-LAN command received!");

    if (interaction.options.getString("device") === "gaming") {
      try {
        wol.wake(process.env.BIGPCMAC, function (result) {
          console.log(result);
          interaction.editReply("The packet has been sent!");
        });
      } catch (error) {
        console.log(error);
        interaction.editReply(
          "An error occurred while trying to wake the device. \n\n" + error
        );
      }
    }
  },
};
