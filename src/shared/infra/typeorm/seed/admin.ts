import { hashSync } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = hashSync("admin", 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `
  );

  await connection.close;
}

create().then(() => console.log("Userd admin created!"));
