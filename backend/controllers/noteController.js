const MeetingNote = require("../models/MeetingNote");

const activeSessions = {};

/**
 * Start recording: /notes start
 */
exports.startRecording = async (req, res) => {
  try {
    const { channel_id, user_id, user_name } = req.body;

    if (!channel_id) {
      return res.json({
        message: "❌ This command must be used inside a channel.",
      });
    }

    // Check if already active
    if (activeSessions[channel_id]) {
      return res.json({
        message:
          "⚠️ A meeting session is already active here.\nUse `/notes end` to finish it.",
      });
    }

    // Create new active session
    activeSessions[channel_id] = {
      start_time: new Date(),
      messages: [],
      participants: new Set([user_id]),
    };

    return res.json({
      message: `✅ Meeting notes started!\n\n📝 I'm now capturing all messages.\n⏰ Started at: ${new Date().toLocaleString()}`,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: "❌ Error starting meeting notes." });
  }
};

/**
 * Capture all incoming messages
 * This is called by BOT message handler
 */
exports.handleIncomingMessage = async (req, res) => {
  try {
    const { channel_id, user_id, user_name, text } = req.body;

    // Only capture if a session exists
    if (!activeSessions[channel_id]) {
      return res.json({ status: "ignored" });
    }

    // Save message to active session
    activeSessions[channel_id].messages.push({
      sender: user_id,
      sender_name: user_name,
      text,
      timestamp: new Date(),
    });

    activeSessions[channel_id].participants.add(user_id);

    return res.json({ status: "captured" });
  } catch (err) {
    console.error(err);
    res.json({ status: "error" });
  }
};

/**
 * Stop recording & summarize: /notes end
 */
exports.stopRecording = async (req, res) => {
  try {
    const { channel_id } = req.body;

    // No active session
    if (!activeSessions[channel_id]) {
      return res.json({
        message:
          "❌ No active meeting session. Start one using `/notes start`.",
      });
    }

    const session = activeSessions[channel_id];
    const end_time = new Date();

    const allMessages = session.messages;
    const participants = Array.from(session.participants);

    // If no messages captured
    if (allMessages.length === 0) {
      delete activeSessions[channel_id];

      await MeetingNote.create({
        channel_id,
        start_time: session.start_time,
        end_time,
        summary: "No messages captured during this meeting.",
        participants,
      });

      return res.json({
        message: "📭 Meeting ended — but no messages were captured.",
      });
    }

    // Generate summary (simple version - later add AI callback)
    const summaryText =
      `📝 Meeting Summary\n\n` +
      `Messages: ${allMessages.length}\n` +
      `Duration: ${session.start_time.toLocaleTimeString()} - ${end_time.toLocaleTimeString()}`;

    // Save to DB
    const note = await MeetingNote.create({
      channel_id,
      start_time: session.start_time,
      end_time,
      summary: summaryText,
      participants,
      key_decisions: [],
      action_items: [],
    });
    note.save();
    // Clear active session
    delete activeSessions[channel_id];

    return res.json({
      message:
        `✅ **Meeting Summary**\n\n` +
        `⏰ ${session.start_time.toLocaleTimeString()} - ${end_time.toLocaleTimeString()}\n` +
        `👥 Participants: ${participants.length}\n\n` +
        `📝 Summary:\n${summaryText}\n\n` +
        `💡 No key decisions or action items identified.`,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: "❌ Error ending meeting notes." });
  }
};
