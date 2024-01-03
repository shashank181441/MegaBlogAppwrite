import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const user = await this.account.createEmailSession(email, password);
            if (user) {
                return user
            } else {
                console.log("401, unauthenticated user");
            }
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current user:", user);
            return user;
        } catch (error) {
            console.log("error when getting current user out", error);
        }
        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("error when logging out");
        }
    }

}

const authService = new AuthService()

export default authService