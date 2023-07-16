import * as alt from 'alt-server';
import * as crc from '@stuyk/cross-resource-cache';

crc.database.onReady(() => {});

const UPDATE_FREQUENCY_MS = 5000;
const keysToUpdate = ['pos', 'health', 'armour'];
const loggedInUsers: Array<number> = [];

let isSavingPlayerData = false;

alt.on('crc-spawn-spawned', (player: alt.Player) => {
    const exists = loggedInUsers.find((x) => x === player.id);
    if (exists) {
        return;
    }

    loggedInUsers.push(player.id);
});

function updateData(player: alt.Player) {
    if (!player || !player.valid) {
        return;
    }

    const dataToSave = {};
    for (let key of keysToUpdate) {
        dataToSave[key] = player[key];
    }

    crc.data.setValues(player, dataToSave);
}

function updateUsers() {
    if (isSavingPlayerData) {
        return;
    }

    isSavingPlayerData = true;

    for (let player of alt.Player.all) {
        if (loggedInUsers.findIndex((x) => x === player.id) === -1) {
            continue;
        }

        updateData(player);
    }

    isSavingPlayerData = false;
}

alt.on('playerDisconnect', (player: alt.Player) => {
    const id = player.id;

    for (let i = loggedInUsers.length - 1; i >= 0; i--) {
        if (loggedInUsers[i] !== id) {
            continue;
        }

        loggedInUsers.splice(i, 1);
    }
});

alt.setInterval(updateUsers, UPDATE_FREQUENCY_MS);
