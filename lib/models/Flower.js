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
}
