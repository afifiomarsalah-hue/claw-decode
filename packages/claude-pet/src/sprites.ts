// Extracted from Claude Code source — buddy/sprites.ts
// Each sprite is 5 lines tall, 12 wide. {E} = eye placeholder.
// Multiple frames per species for idle fidget animation.

export type Species =
  | 'duck' | 'goose' | 'blob' | 'cat' | 'dragon' | 'octopus' | 'owl'
  | 'penguin' | 'turtle' | 'snail' | 'ghost' | 'axolotl' | 'capybara'
  | 'cactus' | 'robot' | 'rabbit' | 'mushroom' | 'chonk';

export type Eye = '·' | '✦' | '×' | '◉' | '@' | '°';
export type Hat = 'none' | 'crown' | 'tophat' | 'propeller' | 'halo' | 'wizard' | 'beanie' | 'tinyduck';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export const SPECIES: Species[] = [
  'duck','goose','blob','cat','dragon','octopus','owl','penguin',
  'turtle','snail','ghost','axolotl','capybara','cactus','robot',
  'rabbit','mushroom','chonk',
];

export const EYES: Eye[] = ['·', '✦', '×', '◉', '@', '°'];
export const HATS: Hat[] = ['none','crown','tophat','propeller','halo','wizard','beanie','tinyduck'];
export const RARITIES: Rarity[] = ['common','uncommon','rare','epic','legendary'];

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 60, uncommon: 25, rare: 10, epic: 4, legendary: 1,
};

export const RARITY_STARS: Record<Rarity, string> = {
  common: '★', uncommon: '★★', rare: '★★★', epic: '★★★★', legendary: '★★★★★',
};

export const STAT_NAMES = ['DEBUGGING','PATIENCE','CHAOS','WISDOM','SNARK'] as const;
export type StatName = typeof STAT_NAMES[number];

export interface CompanionBones {
  rarity: Rarity;
  species: Species;
  eye: Eye;
  hat: Hat;
  shiny: boolean;
  stats: Record<StatName, number>;
}

const BODIES: Record<Species, string[][]> = {
  duck: [
    ['            ','    __      ','  <({E} )___  ','   (  ._>   ','    `--´    '],
    ['            ','    __      ','  <({E} )___  ','   (  ._>   ','    `--´~   '],
  ],
  goose: [
    ['            ','     ({E}>    ','     ||     ','   _(__)_   ','    ^^^^    '],
    ['            ','    ({E}>     ','     ||     ','   _(__)_   ','    ^^^^    '],
  ],
  blob: [
    ['            ','   .----.   ','  ( {E}  {E} )  ','  (      )  ','   `----´   '],
    ['            ','  .------.  ',' (  {E}  {E}  ) ',' (        ) ','  `------´  '],
  ],
  cat: [
    ['            ','   /\\_/\\    ','  ( {E}   {E})  ','  (  ω  )   ','  (")_(")   '],
    ['            ','   /\\_/\\    ','  ( {E}   {E})  ','  (  ω  )   ','  (")_(")~  '],
  ],
  dragon: [
    ['            ','  /^\\  /^\\  ',' <  {E}  {E}  > ',' (   ~~   ) ','  `-vvvv-´  '],
    ['            ','  /^\\  /^\\  ',' <  {E}  {E}  > ',' (        ) ','  `-vvvv-´  '],
  ],
  octopus: [
    ['            ','   .----.   ','  ( {E}  {E} )  ','  (______)  ','  /\\/\\/\\/\\  '],
    ['            ','   .----.   ','  ( {E}  {E} )  ','  (______)  ','  \\/\\/\\/\\/  '],
  ],
  owl: [
    ['            ','   /\\  /\\   ','  (({E})({E}))  ','  (  ><  )  ','   `----´   '],
    ['            ','   /\\  /\\   ','  (({E})({E}))  ','  (  ><  )  ','   .----.   '],
  ],
  penguin: [
    ['            ','  .---.     ','  ({E}>{E})     ',' /(   )\\    ','  `---´     '],
    ['            ','  .---.     ','  ({E}>{E})     ',' |(   )|    ','  `---´     '],
  ],
  turtle: [
    ['            ','   _,--._   ','  ( {E}  {E} )  ',' /[______]\\ ','  ``    ``  '],
    ['            ','   _,--._   ','  ( {E}  {E} )  ',' /[______]\\ ','   ``  ``   '],
  ],
  snail: [
    ['            ',' {E}    .--.  ','  \\  ( @ )  ','   \\_`--´   ','  ~~~~~~~   '],
    ['            ','  {E}   .--.  ','  |  ( @ )  ','   \\_`--´   ','  ~~~~~~~   '],
  ],
  ghost: [
    ['            ','   .----.   ','  / {E}  {E} \\  ','  |      |  ','  ~`~``~`~  '],
    ['            ','   .----.   ','  / {E}  {E} \\  ','  |      |  ','  `~`~~`~`  '],
  ],
  axolotl: [
    ['            ','}~(______)~{','}~({E} .. {E})~{','  ( .--. )  ','  (_/  \\_)  '],
    ['            ','~}(______){~','~}({E} .. {E}){~','  ( .--. )  ','  (_/  \\_)  '],
  ],
  capybara: [
    ['            ','  n______n  ',' ( {E}    {E} ) ',' (   oo   ) ','  `------´  '],
    ['            ','  n______n  ',' ( {E}    {E} ) ',' (   Oo   ) ','  `------´  '],
  ],
  cactus: [
    ['            ',' n  ____  n ',' | |{E}  {E}| | ',' |_|    |_| ','   |    |   '],
    ['            ','    ____    ',' n |{E}  {E}| n ',' |_|    |_| ','   |    |   '],
  ],
  robot: [
    ['            ','   .[||].   ','  [ {E}  {E} ]  ','  [ ==== ]  ','  `------´  '],
    ['            ','   .[||].   ','  [ {E}  {E} ]  ','  [ -==- ]  ','  `------´  '],
  ],
  rabbit: [
    ['            ','   (\\__/)   ','  ( {E}  {E} )  ',' =(  ..  )= ','  (")__(")  '],
    ['            ','   (|__/)   ','  ( {E}  {E} )  ',' =(  ..  )= ','  (")__(")  '],
  ],
  mushroom: [
    ['            ',' .-o-OO-o-. ','(__________)','   |{E}  {E}|   ','   |____|   '],
    ['            ',' .-O-oo-O-. ','(__________)','   |{E}  {E}|   ','   |____|   '],
  ],
  chonk: [
    ['            ','  /\\    /\\  ',' ( {E}    {E} ) ',' (   ..   ) ','  `------´  '],
    ['            ','  /\\    /|  ',' ( {E}    {E} ) ',' (   ..   ) ','  `------´  '],
  ],
};

const HAT_LINES: Record<Hat, string> = {
  none:      '',
  crown:     '   \\^^^/    ',
  tophat:    '   [___]    ',
  propeller: '    -+-     ',
  halo:      '   (   )    ',
  wizard:    '    /^\\     ',
  beanie:    '   (___)    ',
  tinyduck:  '    ,>      ',
};

export function renderSprite(bones: CompanionBones, frame = 0): string[] {
  const frames = BODIES[bones.species];
  const body = frames[frame % frames.length].map(line =>
    line.replaceAll('{E}', bones.eye),
  );
  const lines = [...body];
  if (bones.hat !== 'none' && !lines[0]!.trim()) {
    lines[0] = HAT_LINES[bones.hat];
  }
  if (!lines[0]!.trim() && frames.every(f => !f[0]!.trim())) lines.shift();
  return lines;
}
