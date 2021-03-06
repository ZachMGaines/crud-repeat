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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM dogs WHERE id = $1',
      [id]);
    if (!rows[0]) return null;

    return new Dog(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM dogs');
    return rows.map(row => new Dog(row));
  }

  static async update(dog, id) {
    const { rows } = await pool.query(
      `UPDATE dogs
      SET name = $1, price = $2, color = $3
      WHERE id = $4
      RETURNING *`, [dog.name, dog.price, dog.color, id]);
    return new Dog(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
  DELETE FROM dogs
  WHERE id = $1
  RETURNING *`, [id]);

    return new Dog(rows[0]);
  }

}
