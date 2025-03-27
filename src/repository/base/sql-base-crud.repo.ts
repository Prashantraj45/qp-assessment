// base/sql-base-crud.repo.ts
import * as Mysql from 'mysql2/promise';
import Mylogger from 'src/common/myLogger';

export default class SqlBaseCrudRepository<M> {
  protected table: string;
  protected mysql: Mysql.Pool;

  constructor(table: string, mysql: Mysql.Pool) {
    this.table = table;
    this.mysql = mysql;
  }

  async execute<T>(query: string, params: any[] = []): Promise<T[]> {
    const connection = await this.mysql.getConnection();
    try {
      Mylogger.info(`Executing Query: ${query} | Params: ${JSON.stringify(params)}`);
      const [rows] = await connection.execute(query, params);
      return rows as T[];
    } catch (error) {
      Mylogger.error(`Query Failed: ${query} | Params: ${JSON.stringify(params)} | Error: ${error.message}`);
      throw error;
    } finally {
      connection.release();
    }
  }

  async insertOne<T>(data: Partial<T>): Promise<number> {
    const keys = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');

    const query = `INSERT INTO ${this.table} (${keys}) VALUES (${placeholders})`;
    const result = await this.execute<{ insertId: number }>(query, values);
    
    return result[0].insertId;
  }

  async insertMany<T>(data: Partial<T>[]): Promise<number[]> {
    if (data.length === 0) return [];

    const keys = Object.keys(data[0]).join(', ');
    const valuesArray = data.map(Object.values);
    const placeholders = `(${new Array(Object.keys(data[0]).length).fill('?').join(', ')})`;
    const query = `INSERT INTO ${this.table} (${keys}) VALUES ${valuesArray.map(() => placeholders).join(', ')}`;

    const flattenedValues = valuesArray.flat();
    const result = await this.execute<{ insertId: number }>(query, flattenedValues);
    
    return result.map((r) => r.insertId);
  }

  async updateOne<T>(id: number, data: Partial<T>): Promise<boolean> {
    const updates = Object.keys(data).map((key) => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    const query = `UPDATE ${this.table} SET ${updates} WHERE id = ?`;
    const result = await this.execute<{ affectedRows: number }>(query, values);
    
    return result[0].affectedRows > 0;
  }

  async findById<T>(id: number): Promise<T | null> {
    const query = `SELECT * FROM ${this.table} WHERE id = ?`;
    const result = await this.execute<T>(query, [id]);

    return result.length ? result[0] : null;
  }
}
