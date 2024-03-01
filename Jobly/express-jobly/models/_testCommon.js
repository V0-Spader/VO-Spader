import { hash } from "bcrypt";

import { query, end } from "../db.js";
import { BCRYPT_WORK_FACTOR } from "../config";

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await query("DELETE FROM companies");
  // noinspection SqlWithoutWhere
  await query("DELETE FROM users");

  await query(`
    INSERT INTO companies(handle, name, num_employees, description, logo_url)
    VALUES ('c1', 'C1', 1, 'Desc1', 'http://c1.img'),
           ('c2', 'C2', 2, 'Desc2', 'http://c2.img'),
           ('c3', 'C3', 3, 'Desc3', 'http://c3.img')`);

  await query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await hash("password1", BCRYPT_WORK_FACTOR),
        await hash("password2", BCRYPT_WORK_FACTOR),
      ]);
}

async function commonBeforeEach() {
  await query("BEGIN");
}

async function commonAfterEach() {
  await query("ROLLBACK");
}

async function commonAfterAll() {
  await end();
}


export default {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};