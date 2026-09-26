import type { ComponentType } from "react";
import Amicable from "./Amicable";
import Apples from "./Apples";
import Bees from "./Bees";
import Breads from "./Breads";
import Camels from "./Camels";
import Chess from "./Chess";
import Debt from "./Debt";
import Fours from "./Fours";
import MagicSquare from "./MagicSquare";
import Pearls from "./Pearls";
import Square3025 from "./Square3025";
import Vases from "./Vases";

export const visualizations: Record<string, ComponentType> = {
  "35-camelos": Camels,
  "oito-paes": Breads,
  "21-vasos": Vases,
  xadrez: Chess,
  "quatro-quatros": Fours,
  "numeros-amigos": Amicable,
  "divida-50": Debt,
  perolas: Pearls,
  macas: Apples,
  abelhas: Bees,
  "3025": Square3025,
  "quadrado-magico": MagicSquare,
};
