import {database, config, https} from 'firebase-functions';
import {initializeApp} from 'firebase-admin';

import CharacterHandlers from './modules/character';
import LocationHandlers from './modules/locations';
import StatisticsHandlers from './modules/statistics';
import DiscordHandlers from './modules/discord';
import { Aura } from '../../models/Discord';

const firebase = initializeApp();
const realTime = firebase.database();

const discord = new DiscordHandlers(realTime, config().aura as Aura)
const character = new CharacterHandlers(realTime);
const locations = new LocationHandlers(realTime);
const statistics = new StatisticsHandlers();

/**
 * Database Data Updates
 */
export const onAllianceUpdate = database.ref('characters/{userId}/allianceId')
    .onUpdate(locations.onAffiliationsUpdate);
export const onCorpUpdate = database.ref('characters/{userId}/corpId')
    .onUpdate(locations.onAffiliationsUpdate);
export const onCharacterCreate = database.ref('characters/{characterId}')
    .onCreate(character.onNewCharacter);
export const onCharacterLogin = database.ref('characters/{characterId}/sso')
    .onCreate(character.onCharacterLogin);
export const onStatisticCreate = database.ref('statistics/{eventId}')
    .onCreate(statistics.onNewAction);

/**
 * Discord Bot Updates
 */
export const onDiscordConnected = database.ref('discord/{userId}')
    .onCreate(discord.onNewAccount);
export const onDiscordCorpUpdate = database.ref('characters/{userId}/corpId')
    .onUpdate(discord.onCorpUpdate);
export const onTitlesUpdate = database.ref('characters/{userId}/titles')
    .onUpdate(discord.onTitlesUpdate);
export const onTitlesCreated = database.ref('characters/{userId}/titles')
    .onCreate(discord.onTitlesCreate);
export const onMainCharacterUpdated = database.ref('users/{userId}/mainId')
    .onUpdate(discord.onMainCharacterUpdated);
