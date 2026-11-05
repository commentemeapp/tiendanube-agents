#!/usr/bin/env node
// Comprueba que cada skill pasada como argumento exista en commentemeapp/tiendanube-skills, en
// la carpeta skills/ de la rama main (la que instala `npx skills add`). Lo usa verificar.sh.
//
//   node scripts/skills-existen.mjs tiendanube-webhooks tiendanube-catalog
//
// Código de salida: 0 si todas existen, 1 si alguna no existe, 2 si no se pudo consultar
// GitHub (sin red o con el límite de la API agotado): eso es "no verificado", nunca verde.
const REPO = "commentemeapp/tiendanube-skills";
const skills = process.argv.slice(2);
const cabeceras = { Accept: "application/vnd.github+json", "User-Agent": "tiendanube-agents/verificar" };
if (process.env.GITHUB_TOKEN) cabeceras.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

let publicadas;
try {
	const r = await fetch(`https://api.github.com/repos/${REPO}/contents/skills?ref=main`, {
		headers: cabeceras,
		signal: AbortSignal.timeout(15_000)
	});
	if (r.status === 404) {
		console.log(`${REPO} no tiene la carpeta skills/ en main (todavía no se promovió)`);
		process.exit(1);
	}
	if (!r.ok) throw new Error(`respondió ${r.status}`);
	publicadas = new Set((await r.json()).filter((x) => x.type === "dir").map((x) => x.name));
} catch (e) {
	console.log(`no se pudo consultar GitHub: ${e.message}`);
	process.exit(2);
}

const faltan = skills.filter((s) => !publicadas.has(s));
if (faltan.length) {
	console.log(`no existen en ${REPO} (main): ${faltan.join(", ")}`);
	process.exit(1);
}
console.log(`las ${skills.length} skills precargadas existen en ${REPO}`);
