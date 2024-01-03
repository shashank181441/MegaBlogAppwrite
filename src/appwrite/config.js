import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client()
    databases
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, status, featuredImage, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredImage, status, userId
            }
            )
        } catch (error) {
            console.log("Error in appwrite/config.js/createPost ", error);
        }
    }

    async updatePost(slug, { title, content, status, featuredImage }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredImage, status
            })
        } catch (error) {
            console.log("Error in appwrite/config.js/updatePost ", error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug
            )
        } catch (error) {
            console.log("Error in appwrite/config.js/deletePost ", error);
        }
    }

    async getPost(slug) {
        try {
            const gettingPost = await this.databases.getDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug
            )
            console.log(gettingPost);
            gettingPost.slug = slug
            return gettingPost;
        } catch (error) {
            console.log("Error in appwrite/config.js/getPost ", error);
        }
    }


    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, queries
            )
        } catch (error) {
            console.log("Error in appwrite/config.js/getPost ", error);
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Error in appwrite/config.js/uploadFile ", error);
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Error in appwrite/config.js/deleteFile ", error);
        }
    }

    async getFilePreview(fileId) {
        try {
            return (this.bucket.getFilePreview(conf.appwriteBucketId, fileId)).href

        } catch (error) {
            console.error("Error in appwrite/config.js/getFilePreview", error);
            throw error
        }
    }
}

const service = new Service()

export default service