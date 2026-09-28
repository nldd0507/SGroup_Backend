import pool from "../config/db.config.js";

export const createManyDocuments = async (userId, documents) => {
    const query = `
    INSERT INTO user_documents (user_id, file_name, file_url, file_type, file_size)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, user_id, file_name, file_url, file_type, file_size, created_at;
  `;
    const savedDocs = [];
    for (const doc of documents) {
        const { rows } = await pool.query(query, [
            userId,
            doc.fileName,
            doc.fileUrl,
            doc.fileType,
            doc.fileSize
        ]);
        savedDocs.push(rows[0]);
    }
    return savedDocs;
};
