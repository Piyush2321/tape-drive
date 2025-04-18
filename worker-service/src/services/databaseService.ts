import mysql from 'mysql2/promise';
import { logger } from '../utils/logger';

export class DatabaseService {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'tape_storage',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async updateUploadStatus(fileId: number, status: 'processing' | 'completed' | 'failed', tapeLocation?: string, tapeNumber?: string): Promise<void> {
    try {
      const connection = await this.pool.getConnection();
      
      try {
        if (status === 'completed' && tapeLocation && tapeNumber) {
          await connection.query(
            'UPDATE upload_details SET status = ?, tape_location = ?, tape_number = ? WHERE id = ?',
            [status, tapeLocation, tapeNumber, fileId]
          );
        } else {
          await connection.query(
            'UPDATE upload_details SET status = ? WHERE id = ?',
            [status, fileId]
          );
        }
        
        logger.info(`Updated upload status for file ${fileId} to ${status}`);
      } finally {
        connection.release();
      }
    } catch (error) {
      logger.error(`Failed to update upload status for file ${fileId}:`, error);
      throw error;
    }
  }

  async getUserEmail(fileId: number): Promise<string> {
    try {
      const connection = await this.pool.getConnection();
      
      try {
        const [rows] = await connection.query(
          'SELECT u.email FROM upload_details ud JOIN users u ON ud.user_name = u.name WHERE ud.id = ?',
          [fileId]
        );

        if (!rows || (rows as any[]).length === 0) {
          throw new Error(`User not found for file ${fileId}`);
        }

        return (rows as any[])[0].email;
      } finally {
        connection.release();
      }
    } catch (error) {
      logger.error(`Failed to get user email for file ${fileId}:`, error);
      throw error;
    }
  }
} 