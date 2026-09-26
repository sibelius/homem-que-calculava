export type Problem = {
  slug: string;
  title: string;
  tagline: string;
  story: string[];
  math: string[];
};

export const problems: Problem[] = [
  {
    slug: "35-camelos",
    title: "Os 35 camelos",
    tagline: "Três irmãos, uma herança impossível e um camelo emprestado.",
    story: [
      "No deserto, Beremiz e seu companheiro encontram três irmãos discutindo. O pai deixou 35 camelos: metade para o mais velho, um terço para o do meio e um nono para o mais novo.",
      "35 não se divide por 2, nem por 3, nem por 9. Beremiz então empresta o próprio camelo à herança — e a divisão fica perfeita. Ao final, ele recebe seu camelo de volta… e ainda ganha mais um.",
    ],
    math: [
      "O segredo está na soma das frações: 1/2 + 1/3 + 1/9 = 17/18. O testamento nunca distribuiu a herança inteira — sobra sempre 1/18.",
      "Com 36 camelos, cada parte fica inteira (18, 12 e 4), somando 34. Os 2 que sobram são exatamente o 1/18 de 36 que ninguém herdou: um volta a Beremiz, o outro é o seu pagamento. E cada irmão recebe mais do que receberia com 35.",
    ],
  },
  {
    slug: "oito-paes",
    title: "Os oito pães",
    tagline: "Quem deu mais pão merece mais moedas — mas quanto mais?",
    story: [
      "Beremiz tinha 5 pães e seu amigo, 3. Um xeque faminto encontrou os dois no caminho e os três dividiram igualmente os 8 pães.",
      "Em Bagdá, o xeque pagou 8 moedas de ouro. O amigo propôs 5 para Beremiz e 3 para si. Beremiz disse que o justo era 7 para ele e apenas 1 para o amigo.",
    ],
    math: [
      "Corte cada pão em 3 pedaços: são 24 pedaços, e cada pessoa comeu 8.",
      "Beremiz tinha 15 pedaços, comeu 8 e deu 7 ao xeque. O amigo tinha 9, comeu 8 e deu só 1. As 8 moedas pagam os 8 pedaços que o xeque comeu: 7 para Beremiz, 1 para o amigo.",
    ],
  },
  {
    slug: "21-vasos",
    title: "Os 21 vasos",
    tagline: "7 cheios, 7 pela metade, 7 vazios. Divida sem mexer no vinho.",
    story: [
      "Um homem deixou 21 vasos de vinho a três herdeiros: 7 cheios, 7 meio cheios e 7 vazios.",
      "Cada herdeiro deve receber o mesmo número de vasos e a mesma quantidade de vinho — sem passar vinho de um vaso para outro.",
    ],
    math: [
      "Há 7 + 3,5 = 10,5 vasos de vinho no total, então cada herdeiro deve receber 3,5 vasos de vinho e 7 vasos.",
      "Dois meio cheios equivalem a um cheio mais um vazio. Com essa troca, uma solução é: dois herdeiros recebem 2 cheios, 3 meios e 2 vazios; o terceiro recebe 3 cheios, 1 meio e 3 vazios.",
    ],
  },
  {
    slug: "xadrez",
    title: "A lenda do xadrez",
    tagline: "Um grão na primeira casa, dois na segunda… e o reino inteiro não basta.",
    story: [
      "Beremiz conta a lenda do rei Iadava, que ofereceu qualquer recompensa ao inventor do xadrez, o jovem Lahur Sessa.",
      "Sessa pediu apenas grãos de trigo: 1 na primeira casa do tabuleiro, 2 na segunda, 4 na terceira, dobrando até a 64ª. O rei achou o pedido modesto — até os calculistas fazerem as contas.",
    ],
    math: [
      "A casa n recebe 2ⁿ⁻¹ grãos. A soma de todas as casas é 2⁶⁴ − 1 = 18.446.744.073.709.551.615 grãos.",
      "Cada casa tem um grão a mais que todas as anteriores juntas. Isso é o crescimento exponencial: na escala linear, só as últimas casas são visíveis.",
    ],
  },
  {
    slug: "quatro-quatros",
    title: "Os quatro quatros",
    tagline: "Com exatamente quatro algarismos 4, escreva qualquer número.",
    story: [
      "Numa loja em Bagdá, Beremiz vê uma placa com quatro quatros e mostra que com eles, e as operações da aritmética, se escreve qualquer número de 0 a 10.",
      "O desafio vai muito além: quase todos os inteiros até 100 cabem em quatro quatros.",
    ],
    math: [
      "Vale soma, subtração, multiplicação, divisão, potência, raiz quadrada (√4 = 2), fatorial (4! = 24) e o decimal .4 — mas sempre com exatamente quatro algarismos 4.",
      "Toque num número para ver uma expressão. Cada expressão é calculada no seu navegador, na hora, para conferir o resultado.",
    ],
  },
  {
    slug: "numeros-amigos",
    title: "Os números amigos",
    tagline: "220 e 284: cada um é a soma dos divisores do outro.",
    story: [
      "Beremiz explica a um vizir que existem números que são amigos, como os pitagóricos já sabiam.",
      "Some os divisores próprios de 220 e obtenha 284. Some os de 284 e volte a 220.",
    ],
    math: [
      "Divisores próprios de 220: 1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110 — soma 284. Os de 284: 1, 2, 4, 71, 142 — soma 220.",
      "Quando a soma dá o próprio número, ele é perfeito (6, 28, 496, 8128). Experimente outros números para ver se formam um par.",
    ],
  },
  {
    slug: "divida-50",
    title: "A dívida de 50 dinares",
    tagline: "Pagou 50, mas a soma do que devia dá 51. Sumiu ou apareceu um dinar?",
    story: [
      "Um homem devia 50 dinares e pagou em quatro parcelas: 20, 15, 9 e 6. Depois de cada pagamento, anotou quanto ainda devia: 30, 15, 6 e 0.",
      "Somando a coluna do que ficou devendo, dá 51. Ele se convenceu de que devia um dinar a mais.",
    ],
    math: [
      "A coluna dos pagamentos soma 50, e esse é o total. A coluna do restante não tem motivo para dar 50: ela conta o mesmo dinheiro várias vezes, a cada linha.",
      "Mude as parcelas e veja: com as mesmas 50 moedas, a soma do restante pode dar praticamente qualquer valor.",
    ],
  },
  {
    slug: "perolas",
    title: "As pérolas do rajá",
    tagline: "Uma pérola e um sétimo do resto. Cada filha recebe o mesmo.",
    story: [
      "Um rajá deixou pérolas às filhas. A mais velha levou 1 pérola e um sétimo do restante. A segunda, 2 pérolas e um sétimo do que sobrou. A terceira, 3 e um sétimo — e assim por diante.",
      "No fim, todas receberam exatamente a mesma quantidade. Quantas pérolas e quantas filhas havia?",
    ],
    math: [
      "36 pérolas e 6 filhas, cada uma com 6. A primeira leva 1 + 35/7 = 6, deixando 30; a segunda leva 2 + 28/7 = 6, deixando 24; e assim por diante.",
      "Troque o 7 por qualquer k: sempre há (k − 1)² pérolas e k − 1 filhas com k − 1 pérolas cada.",
    ],
  },
  {
    slug: "macas",
    title: "As 90 maçãs",
    tagline: "Três irmãs, 50, 30 e 10 maçãs, mesmos preços, mesmo lucro.",
    story: [
      "Três irmãs levaram maçãs ao mercado: uma com 50, outra com 30, a mais nova com 10. As três venderam pelos mesmos preços e voltaram com a mesma quantia.",
      "Como?",
    ],
    math: [
      "De manhã vendiam a 7 maçãs por 1 dinar. À tarde, as maçãs que sobravam saíam a 3 dinares cada.",
      "50 = 7×7 + 1 → 7 + 3 = 10. 30 = 4×7 + 2 → 4 + 6 = 10. 10 = 1×7 + 3 → 1 + 9 = 10. Quem tem mais maçãs vende mais pelo preço barato e sobra menos para o preço caro.",
    ],
  },
  {
    slug: "abelhas",
    title: "O enxame de abelhas",
    tagline: "Um problema em verso do Lilavati, recitado por Beremiz.",
    story: [
      "A raiz quadrada da metade de um enxame voou para um jasmineiro. Oito nonos do enxame ficaram para trás. E um casal de abelhas zumbia numa flor de lótus.",
      "Quantas abelhas havia no enxame?",
    ],
    math: [
      "Chame o enxame de x: √(x/2) + 8x/9 + 2 = x.",
      "Só x = 72 fecha a conta: √36 = 6, 8/9 de 72 = 64, e 6 + 64 + 2 = 72. Arraste o controle e veja a balança se equilibrar só num ponto.",
    ],
  },
  {
    slug: "3025",
    title: "O número 3025",
    tagline: "Corte ao meio, some as metades, eleve ao quadrado: ele mesmo.",
    story: [
      "Beremiz nota uma curiosidade: 30 + 25 = 55, e 55² = 3025.",
      "Existem outros números de quatro algarismos assim?",
    ],
    math: [
      "Procurando todos os números de 1000 a 9999, só três têm essa propriedade: 2025, 3025 e 9801.",
      "No quadrado ao lado, as duas metades formam o lado e a área é o próprio número.",
    ],
  },
  {
    slug: "quadrado-magico",
    title: "Os quadrados mágicos",
    tagline: "Toda linha, coluna e diagonal dá a mesma soma.",
    story: [
      "Beremiz conta que os quadrados mágicos eram usados como amuletos e fascinavam matemáticos árabes e hindus.",
      "Em um quadrado mágico, os números de 1 a n² ficam dispostos de modo que toda linha, coluna e diagonal tenha a mesma soma.",
    ],
    math: [
      "A soma mágica de um quadrado n×n é n(n² + 1)/2: 15 para 3×3, 34 para 4×4, 65 para 5×5.",
      "Passe o mouse nas somas para destacar a linha, coluna ou diagonal. O 4×4 é o da gravura Melencolia I, de Dürer (1514): a linha de baixo traz o ano, 15 14.",
    ],
  },
];

export function getProblem(slug: string) {
  const index = problems.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return {
    problem: problems[index],
    index,
    prev: problems[index - 1],
    next: problems[index + 1],
  };
}
