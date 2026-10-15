/**
 * Placeholder imagery (Unsplash). Swap for licensed expedition photography before launch.
 * `u(id)` returns a base URL; next/image appends sizing.
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export const img = {
  snowRidge: u("1418985991508-e47386d96a71"),
  oceanDusk: u("1439405326854-014607f694d7"),
  snowPeaks: u("1454496522488-7a8e488e8606"),
  snowflake: u("1457269449834-928af64c684d"),
  peaksAboveCloud: u("1458668383970-8ddd3927deed"),
  gentooRock: u("1462888210965-cdf193fb74de"),
  glacier: u("1483921020237-2ff51e8e4b22"),
  redParka: u("1491555103944-7c647fd857e6"),
  icebergsReflect: u("1494564605686-2e931f77a8e2"),
  cloudSea: u("1506905925346-21bda4d32df4"),
  snowHut: u("1517299321609-52687d1bc55a"),
  kingPenguinLight: u("1517783999520-f068d7431a60"),
  nightPeaks: u("1519681393784-d120267933ba"),
  underwater: u("1530053969600-caed2596d242"),
  sky: u("1548266652-99cf27701ced"),
  penguinsSnow: u("1551415923-a2297c7fda79"),
  kingPenguins: u("1551986782-d0169b3f8fa7"),
  wave: u("1559827260-dc66d52bef19"),
  humpback: u("1568430462989-44163eb1752f"),
  fjordReflect: u("1580137189272-c9379f8864fd"),
  penguinWalk: u("1598439210625-5067c578f3f6"),
  mistyPeaks: u("1505765050516-f72dcac9c60e"),
  boatNight: u("1534447677768-be436bb09401"),
  shipDark: u("1569263979104-865ab7cd8d13"),
  tent: u("1476041800959-2f6bb412c8ce"),
} as const;

export type ImageKey = keyof typeof img;
