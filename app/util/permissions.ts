import { PermissionFlagsBits, TextChannel } from "discord.js";
import { InsufficientPermissionsError } from "../errors";

/**
 * checkWebhookPermissions checks if the bot has sufficient permissions
 * to manage webhooks in the specific server and channel.
 * Otherwise, it throws an [InsufficientPermissionsError].
 */
export async function checkWebhookPermissions(channel: TextChannel) {
  // Server-wide permission check
  if (
    !channel.guild.members.me.permissions.has(PermissionFlagsBits.ManageWebhooks) ||
    !channel.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages) ||
    !channel.guild.members.me.permissions.has(PermissionFlagsBits.ViewChannel)
  ) {
    throw new InsufficientPermissionsError(
      "Bot doesn't have sufficient permissions in server " +
        channel.guild.name +
        ". Please check if the bot has the following permissions:" +
        "Manage Webhooks, Send Messages, View Channel"
    );
  }

  // Channel-specific permission check
  if (!channel.guild.members.me.permissionsIn(channel).has(PermissionFlagsBits.ManageWebhooks)) {
    throw new InsufficientPermissionsError(
      "Bot doesn't have sufficient permission in the channel. " +
        "Please check if the `Manage Webhooks` permission isn't being overridden" +
        " for the bot role in that specific channel."
    );
  }
}
