import { auth, database } from "firebase-admin";
import { EventContext, Change } from 'firebase-functions';

export default class AuthHandlers {

    constructor(private firebase: database.Database) {}

    public onRolesChanged = async (change: Change<database.DataSnapshot>, context?: EventContext) => {
        const newRoles = change.after.val() as string[];
        // const oldRoles = change.before.val() as string[];

        if (newRoles && newRoles.indexOf('Director')) {
            await auth().setCustomUserClaims(context.params.userId, {
                director: true,
                recruiter: true,
                leadership: true
            });
        }
        
        if (!newRoles || newRoles.indexOf('Director') < 0) {
            await auth().setCustomUserClaims(context.params.userId, {
                director: false,
                recruiter: false,
                leadership: false
            });
        }
    }
}