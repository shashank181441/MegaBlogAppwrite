const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf

// VITE_APPWRITE_URL = https://cloud.appwrite.io/v1
// VITE_APPWRITE_PROJECT_ID = 6590f722791fa898ac2c
// VITE_APPWRITE_DATABASE_ID = 6590f7b33d272e619d32
// VITE_APPWRITE_COLLECTION_ID = 6590f7c423d365fbc2e4
// VITE_APPWRITE_BUCKET_ID = 6590f8b9b78ae29c6eab