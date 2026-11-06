# Changelog

Todos los cambios de tiendanube-agents. El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y las versiones siguen [SemVer](https://semver.org/lang/es/).

## [Sin publicar]

## [0.2.0] - 2026-11-06

### Agregado

- Versiones de los agentes para Gemini CLI (extensión con `gemini-extension.json` y `agents/` en la raíz),
  Codex (`adaptadores/codex/`), GitHub Copilot (`adaptadores/copilot/`) y Cursor (`adaptadores/cursor/`), generadas
  desde los agentes de Claude Code con `scripts/exportar.mjs`.
- El gate comprueba que esas versiones coinciden con su fuente.

Los agentes de Claude Code no cambian.

## [0.1.0] - 2026-11-05

### Agregado

- Seis subagentes: `tiendanube-explorer`, `tiendanube-reviewer`, `tiendanube-qa`, `tiendanube-integration-architect`,
  `tiendanube-docs-researcher` y `tiendanube-store-operator`.
- Tres servidores MCP en `.mcp.json`: `tiendanube` (`npx -y @commenteme/tiendanube-mcp`) y el Admin MCP oficial por
  marca, `tiendanube-admin` y `nuvemshop-admin`.
- `scripts/verificar.sh`, `scripts/probar-mcp.mjs` y `scripts/skills-existen.mjs`, y el CI que los corre.
