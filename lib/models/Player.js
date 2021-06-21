import pool from '../utils/pool';

export default class Player {
  id;
  name;
  team;
  age;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.team = row.team;
    this.age = row.age;
  }

  static async insert({ name, team, age }) {
    const { rows } = await pool.query(`
    INSERT INTO players (name, team, age) VALUES ($1, $2, $3) RETURNING *`, [name, team, age]);

    return new Player(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT * FROM players WHERE id = $1`, [id]);
    if (!rows[0]) return null;

    return new Player(rows[0]);
  }



}
