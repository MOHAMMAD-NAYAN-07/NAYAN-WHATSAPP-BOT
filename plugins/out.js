module.exports = {
    config: {
        name: "leavegroup",
        aliases: ["leavegrp", "exitgroup", "out"],
        description: "Leave a WhatsApp group.",
        usages: [`${global.config.PREFIX}leavegroup`],
        permission: 2,
        prefix: "both",
        category: "Group Management",
        credit: "Developed by Mohammad Nayan",
    },
    start: async ({ event, api, args }) => {
        const { threadId, isGroup } = event;

        if (!isGroup) {
            await api.sendMessage(threadId, { text: "This command can only be used in a group." });
            return;
        }

        try {
            
            const grpData = (await global.data.get("userGroupData.json")) || { users: [], groups: [] };

            
            const updatedGroups = grpData.groups.filter((id) => id !== threadId);
            grpData.groups = updatedGroups;

            
            await global.data.set("userGroupData.json", grpData);

            
            await api.groupLeave(threadId);
        } catch (error) {
            await api.sendMessage(threadId, {
                text: `Failed to leave the group. Error: ${error.message}`,
            });
            console.error("Error leaving the group:", error);
        }
    },
};
