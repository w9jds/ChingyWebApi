import { DiscordClientId, DiscordSecret, DiscordRedirect } from '../config/config';
import { Tokens, DiscordUser } from '../../models/discord';
import fetch, { Response } from 'node-fetch';

export const validate = async (code: string): Promise<Tokens> => {
    const response: Response = await fetch(`https://discordapp.com/api/oauth2/token?client_id=${DiscordClientId}&client_secret=${DiscordSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${DiscordRedirect}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return await response.json() as Tokens;
}

export const getCurrentUser = async (accessToken: string): Promise<DiscordUser> => {
    const response: Response = await fetch(`https://discordapp.com/api/v6/users/@me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return await response.json() as DiscordUser;
}
