import pool from '../utils/pool';


export default class Flower {
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
    INSERT INTO flowers (name, price, color) VALUES ($1, $2, $3) RETURNING *`, [name, price, color]);

    return new Flower(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM flowers WHERE id = $1',
      [id]);
    if (!rows[0]) return null;

    return new Flower(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM flowers');
    return rows.map(row => new Flower(row));
  }

  static async update(flower, id) {
    const { rows } = await pool.query(
      `UPDATE flowers
      SET name = $1, price = $2, color = $3
      WHERE id = $4
      RETURNING *`, [flower.name, flower.price, flower.color, id]);
    return new Flower(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM flowers
    WHERE id = $1
    RETURNING *`, [id]);

    return new Flower(rows[0]);
  }


}
