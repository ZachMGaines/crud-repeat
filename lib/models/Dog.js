import pool from '../utils/pool';


export default class Dog {
  id;
  name;
  price;
  color;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.price = row.price;
    this.color = row.color;
  }

  static async insert({ name, price, color }) {
    const { rows } = await pool.query(`
    INSERT INTO dogs (name, price, color) VALUES ($1, $2, $3) RETURNING *`, [name, price, color]);

    return new Dog(rows[0]);
  }
}
