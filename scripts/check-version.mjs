// Vérifie version.json avant qu'il parte chez les joueurs.
// Usage : node scripts/check-version.mjs [chemin]

import { readFileSync } from "node:fs";

const path = process.argv[2] ?? "version.json";
const errors = [];

let data;
try {
  data = JSON.parse(readFileSync(path, "utf8"));
} catch (e) {
  console.error(`${path} : JSON invalide (${e.message})`);
  process.exit(1);
}

const semver = /^\d+\.\d+\.\d+$/;
const known = ["version", "minVersion", "storeUrl", "message"];

for (const key of ["version", "minVersion", "storeUrl"]) {
  if (typeof data[key] !== "string" || data[key].trim() === "") {
    errors.push(`"${key}" manque ou est vide`);
  }
}

for (const key of ["version", "minVersion"]) {
  if (typeof data[key] === "string" && !semver.test(data[key])) {
    errors.push(`"${key}" doit ressembler à 2.0.1 (reçu "${data[key]}")`);
  }
}

if (semver.test(data.version) && semver.test(data.minVersion)) {
  const [a, b] = [data.minVersion, data.version].map((v) => v.split(".").map(Number));
  const diff = a.map((n, i) => n - b[i]).find((d) => d !== 0) ?? 0;
  if (diff > 0) {
    errors.push(`"minVersion" (${data.minVersion}) est plus récente que "version" (${data.version}) : tous les joueurs seraient bloqués`);
  }
}

if (typeof data.storeUrl === "string" && !data.storeUrl.startsWith("https://play.google.com/store/apps/details?id=")) {
  errors.push(`"storeUrl" doit pointer vers une fiche Google Play`);
}

if ("message" in data && typeof data.message !== "string") {
  errors.push(`"message" doit être du texte`);
}

for (const key of Object.keys(data)) {
  if (!known.includes(key)) errors.push(`champ inconnu "${key}" (faute de frappe ?)`);
}

if (errors.length) {
  console.error(`${path} :`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`${path} : ok (version ${data.version}, minimum ${data.minVersion})`);