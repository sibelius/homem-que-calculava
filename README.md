# O Homem que Calculava — visualizado

Os problemas de Beremiz Samir, do livro de Malba Tahan (1938), transformados em visualizações interativas.

Problemas: os 35 camelos, os oito pães, os 21 vasos, a lenda do xadrez, os quatro quatros, os números amigos,
a dívida de 50 dinares, as pérolas do rajá, as 90 maçãs, o enxame de abelhas, o número 3025 e os quadrados mágicos.

```bash
pnpm install
pnpm dev
```

- `src/lib/problems.ts` — textos (história e matemática) de cada problema
- `src/components/viz/` — uma visualização interativa por problema (React + SVG, sem dependências extras)
