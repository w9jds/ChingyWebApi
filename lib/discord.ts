import { DiscordClientId, DiscordSecret, DiscordRedirect } from '../config/config';
import { Tokens, User } from '../models/discord';

export const validate = async (code: string) => {
    let response = await fetch(`https://discordapp.com/api/oauth2/token?client_id=${DiscordClientId}&client_secret=${DiscordSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${DiscordRedirect}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return await response.json() as Tokens;
}

export const refresh = async (refreshToken: string) => {
    let response = await fetch(`https://discordapp.com/api/oauth2/token?client_id=${DiscordClientId}&client_secret=${DiscordSecret}&grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=${DiscordRedirect}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return await response.json() as Tokens;
}

export const revoke = async () => {

}

export const getCurrentUser = async (accessToken: string) => {
    let response = await fetch(`https://discordapp.com/api/v6/users/@me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return await response.json() as User;
}