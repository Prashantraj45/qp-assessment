import SqlBaseCrudRepository from '../base/sql-base-crud.repo';
import { User } from '../models/user.model';
import { UserInterface } from '../repo-interfaces/user-repo.interface';
import * as Mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import { DBENUM, TableBank } from 'src/common/constans';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Mylogger from 'src/common/myLogger';
import { v4 as uuidv4 } from 'uuid';
import { Token } from '../models/tokens.model';

@Injectable()
export class SqlUserRepository
  extends SqlBaseCrudRepository<User>
  implements UserInterface
{
  constructor(@Inject(DBENUM) mysql: Mysql.Pool) {
    super(TableBank.users, mysql);
  }

  async create(
    user: Partial<User> & { password: string },
  ): Promise<{ userId: string }> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.user_id = uuidv4();
      const [result] = await this.execute(
        `INSERT INTO ${this.table} (user_id, name, email, password_hash) VALUES (?, ?, ?, ?)`,
        [user.user_id, user.name, user.email, hashedPassword],
      );
      return { userId: (result as any).insertId };
    } catch (error) {
      Mylogger.error(`Query Failed: ${error} | Error: ${error.message}`);
      throw new HttpException(
        'error creating user',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }

  async update(
    user: Partial<User> & { password: string },
  ): Promise<{ updated: boolean }> {
    try {
      let hashedPassword = await bcrypt.hash(user.password, 10);
      await this.execute(
        `UPDATE ${this.table} SET name = ?, email = ?, password_hash = COALESCE(?, password_hash) WHERE user_id = ?`,
        [user.name, user.email, hashedPassword, user.user_id],
      );
      return { updated: true };
    } catch (error) {
      return { updated: false };
    }
  }

  async delete(userId: number): Promise<boolean> {
    const connection = await this.mysql.getConnection();
    try {
      const [result] = await connection.execute(
        `DELETE FROM ${this.table} WHERE user_id = ?`,
        [userId],
      );
      connection.release();
      return (result as any).affectedRows > 0;
    } catch (error) {
      connection.release();
      throw error;
    }
  }

  async getDetailsById(userId: string): Promise<User | null> {
    try {
      const [rows] = await this.execute<User>(
        `SELECT user_id, name, email, password_hash FROM ${this.table} WHERE user_id = ?`,
        [userId],
      );
      if (!rows?.user_id) return null;
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async comparePassword(
    userId: string,
    plainPassword: string,
  ): Promise<boolean> {
    const user = await this.getDetailsById(userId);
    if (!user || !user.password_hash) {
      return false;
    }
    return bcrypt.compare(plainPassword, user.password_hash);
  }
  async getAccessToken(query: {
    userId: string;
    password: string;
  }): Promise<{ token: string } | null> {
    const user = await this.getDetailsById(query.userId);
    if (!user) {
      return null;
    }
    const isPasswordMatch = await this.comparePassword(
      query.userId,
      query.password,
    );
    if (!isPasswordMatch) {
      return null;
    }
    const querytoCall = 'SELECT * from tokens where user_id = ?';
    const [result] = await this.execute<Token>(querytoCall, [query.userId]);
    const oldToken = result?.access_token;
    const newToken = uuidv4();
    if (oldToken && result?.expires_at) {
      const currentTime = new Date();
      const expiresAt = new Date(result.expires_at);
      if (currentTime < expiresAt) {
        return { token: oldToken };
      }
      else {
        await this.execute('UPDATE tokens SET access_token = ? WHERE user_id = ?', [
            newToken,
            query.userId,
          ]);
        return { token: newToken };
      }
    }
    await this.execute('INSERT INTO tokens (user_id, access_token) VALUES (?, ?)', [
      query.userId,
      newToken,
    ]);
    return { token: newToken };
  }
}
