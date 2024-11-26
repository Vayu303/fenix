const bcrypt = require("bcryptjs");

const plainPassword = "12345";
const hashedPassword =
  "$2a$10$unpcPKpB8rd.igLLWT.uNusgzG2VTav.TJkuBatjE6DOGI66cWuym"; // Dal log

bcrypt.compare(plainPassword, hashedPassword).then((result: boolean) => {
  console.log("Confronto manuale:", result); // Deve essere true
});
