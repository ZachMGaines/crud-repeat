import pool from '../utils/pool';
import Beer from './Beer';

export default class Car {
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
    INSERT INTO cars (name, price, color) VALUES ($1, $2, $3) RETURNING *`, [name, price, color]);

    return new Car(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM cars WHERE id = $1',
      [id]);
    if (!rows[0]) return null;

    return new Car(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM cars');
    return rows.map(row => new Car(row));
  }

  static async update(car, id) {
    const { rows } = await pool.query(
      `UPDATE cars
      SET name = $1, price = $2, color = $3
      WHERE id = $4
      RETURNING *`, [car.name, car.price, car.color, id]);
    return new Car(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM cars
    WHERE id = $1
    RETURNING *`, [id]);

    return new Car(rows[0]);
  }
}
