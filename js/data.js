/* =========================================================
   BEYOND DESTINATIONS — データ層
   体験データ / 市町村データ / プレースホルダー画像(SVG生成)
   ---------------------------------------------------------
   ※ 写真は本番では実写に差し替える想定。プロトタイプでは
     オフラインでも崩れないよう、SVGで生成した風景アートを使用。
   ========================================================= */

/* ---------- SVG風景アート生成(疑似写真プレースホルダー) ---------- */

function bdSeededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/**
 * 山並み・棚田・海などを想起させる多層レイヤーのSVGを生成し、
 * data URI として返す。palette: [空, 遠景, 中景, 近景]
 */
function bdArt(seed, palette, opts = {}) {
  const rnd = bdSeededRandom(seed);
  const W = 800, H = 560;
  const [sky, far, mid, near] = palette;
  let layers = "";
  const layerColors = [far, mid, near];
  layerColors.forEach((color, i) => {
    const base = 200 + i * 110 + rnd() * 40;
    let d = `M0,${H} L0,${base}`;
    const steps = 5 + Math.floor(rnd() * 3);
    for (let sIdx = 1; sIdx <= steps; sIdx++) {
      const x = (W / steps) * sIdx;
      const y = base - 60 + rnd() * 120;
      const cx = x - W / steps / 2;
      const cy = base - 80 + rnd() * 160;
      d += ` Q${cx.toFixed(0)},${cy.toFixed(0)} ${x.toFixed(0)},${y.toFixed(0)}`;
    }
    d += ` L${W},${H} Z`;
    layers += `<path d="${d}" fill="${color}" opacity="${0.85 + i * 0.05}"/>`;
  });
  const sunX = 120 + rnd() * 560;
  const sunY = 90 + rnd() * 80;
  const mist = opts.mist !== false
    ? `<rect x="0" y="${H - 220}" width="${W}" height="220" fill="url(#mist${seed})"/>` : "";
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<defs>` +
    `<linearGradient id="skyg${seed}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${sky}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>` +
    `<linearGradient id="mist${seed}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.35"/></linearGradient>` +
    `</defs>` +
    `<rect width="${W}" height="${H}" fill="url(#skyg${seed})"/>` +
    `<circle cx="${sunX.toFixed(0)}" cy="${sunY.toFixed(0)}" r="46" fill="#ffffff" opacity="0.55"/>` +
    layers + mist +
    `</svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

/* カテゴリ別パレット(自然・生業を想起する落ち着いたトーン) */
const BD_PALETTES = {
  washi:   ["#dfe8dc", "#a8bfa0", "#6f9271", "#31543f"],
  pottery: ["#e9e2d6", "#c9a98c", "#9a7154", "#5c4633"],
  forge:   ["#e2e4e6", "#a9b4b8", "#6d7f85", "#37474d"],
  sea:     ["#dceaea", "#9dc4c0", "#5f938f", "#2f5f58"],
  tanada:  ["#e4ecd9", "#b3cc8f", "#7ba05b", "#3f6635"],
  cycle:   ["#e0ebe3", "#a5c9a8", "#649b6d", "#2f5c44"],
};

/* ---------- 市町村データ ---------- */
/* silhouette: 200x200 viewBox の抽象化シルエットパス(プロトタイプ用) */

const MUNICIPALITIES = {
  mino: {
    id: "mino",
    baseProgress: 34,
    name: { ja: "岐阜県 美濃市", en: "Mino City, Gifu", fr: "Mino, Gifu" },
    silhouette:
      "M96,14 C128,8 158,26 172,52 C188,80 184,116 168,142 C154,166 128,188 98,186 C66,184 36,164 24,134 C12,104 20,68 42,44 C58,26 72,18 96,14 Z",
  },
  tokoname: {
    id: "tokoname",
    baseProgress: 41,
    name: { ja: "愛知県 常滑市", en: "Tokoname City, Aichi", fr: "Tokoname, Aichi" },
    silhouette:
      "M108,10 C134,18 148,44 150,72 C152,98 144,120 148,146 C151,168 138,188 114,190 C88,192 70,176 62,152 C52,124 56,96 52,68 C48,40 64,16 88,12 C95,10 101,9 108,10 Z",
  },
  seki: {
    id: "seki",
    baseProgress: 38,
    name: { ja: "岐阜県 関市", en: "Seki City, Gifu", fr: "Seki, Gifu" },
    silhouette:
      "M60,22 C90,10 124,14 150,32 C176,50 188,82 178,110 C168,138 140,148 118,164 C96,180 68,190 44,176 C20,162 14,130 22,102 C30,72 34,34 60,22 Z",
  },
  nishio: {
    id: "nishio",
    baseProgress: 29,
    name: { ja: "愛知県 西尾市", en: "Nishio City, Aichi", fr: "Nishio, Aichi" },
    silhouette:
      "M92,12 C122,6 154,20 168,46 C182,72 176,102 164,128 C154,150 160,176 138,186 C114,196 88,184 68,168 C46,150 26,128 28,100 C30,70 40,38 66,24 C74,20 84,14 92,12 Z",
  },
  ena: {
    id: "ena",
    baseProgress: 46,
    name: { ja: "岐阜県 恵那市", en: "Ena City, Gifu", fr: "Ena, Gifu" },
    silhouette:
      "M100,8 C126,16 136,42 152,62 C170,84 192,100 186,128 C180,156 152,168 126,178 C102,188 74,192 52,176 C30,160 24,130 30,104 C36,78 48,56 66,38 C76,28 88,16 100,8 Z",
  },
  mihama: {
    id: "mihama",
    baseProgress: 25,
    name: { ja: "愛知県 美浜町", en: "Mihama Town, Aichi", fr: "Mihama, Aichi" },
    silhouette:
      "M104,12 C126,20 134,46 138,72 C142,100 150,126 142,152 C134,178 116,192 94,188 C72,184 62,162 58,136 C54,108 50,80 58,54 C66,28 84,6 104,12 Z",
  },
};

/* ---------- 体験データ ---------- */
/* price: 1人あたり(円) / co2: 1人あたり削減見込み(kg) / score: 100点満点 */

const EXPERIENCES = [
  {
    id: "mino-washi",
    category: "craft",
    muni: "mino",
    price: 30000,
    score: 92,
    co2: 12.4,
    duration: 3.5,
    capacity: 6,
    seeds: [11, 12, 13],
    palette: "washi",
    t: {
      ja: {
        name: "美濃手すき和紙 — 千三百年の紙を漉く",
        tagline: "ユネスコ無形文化遺産の技を、職人の工房で。",
        desc:
          "清流・板取川の水で育まれた美濃和紙。人間国宝の系譜を継ぐ工房で、原料の楮(こうぞ)に触れ、簀桁(すけた)を揺らし、あなた自身の一枚を漉き上げます。",
        highlights: ["現役職人による手すき指導", "原料処理から乾燥までの全工程見学", "漉いた和紙はその場でお持ち帰り"],
      },
      en: {
        name: "Mino Washi — Pulling Paper with 1,300 Years of History",
        tagline: "A UNESCO-listed craft, learned inside a working studio.",
        desc:
          "Mino washi is raised on the clear waters of the Itadori River. In a studio carrying the lineage of Living National Treasures, you will handle raw kozo fibre, rock the bamboo screen, and pull a sheet of your own.",
        highlights: ["Hands-on guidance from a working artisan", "See every step from raw fibre to drying", "Take your finished sheet home"],
      },
      fr: {
        name: "Washi de Mino — 1 300 ans de papier entre vos mains",
        tagline: "Un savoir-faire classé à l'UNESCO, dans un atelier en activité.",
        desc:
          "Le washi de Mino naît des eaux claires de la rivière Itadori. Dans un atelier héritier de Trésors nationaux vivants, vous manierez la fibre de kozo, bercerez le tamis de bambou et tirerez votre propre feuille.",
        highlights: ["Encadrement par un artisan en activité", "Toutes les étapes, de la fibre au séchage", "Repartez avec votre feuille"],
      },
    },
  },
  {
    id: "seki-hamono",
    category: "craft",
    muni: "seki",
    price: 36000,
    score: 90,
    co2: 11.8,
    duration: 4,
    capacity: 4,
    seeds: [21, 22, 23],
    palette: "forge",
    t: {
      ja: {
        name: "関の刃物鍛冶 — 炎と鋼の仕事場へ",
        tagline: "七百年続く刀鍛冶の町で、小刀を鍛える。",
        desc:
          "鎌倉時代から刀匠が集った関市。現役の鍛冶職人とともに火床(ほど)の前に立ち、鋼を熱し、打ち、研ぎ上げて、世界にひとつの小刀を仕上げます。",
        highlights: ["火造りから研ぎまでを職人と一対一で", "鍛えた小刀はお持ち帰り", "刃物ミュージアム入館付き"],
      },
      en: {
        name: "Seki Blades — Into the Workshop of Fire and Steel",
        tagline: "Forge a small knife in a town of 700 years of swordsmiths.",
        desc:
          "Swordsmiths have gathered in Seki since the Kamakura era. Standing at the forge beside a working smith, you will heat, hammer and polish your own small knife — one that exists nowhere else.",
        highlights: ["One-on-one forging and sharpening with a smith", "Take your forged knife home", "Blade museum admission included"],
      },
      fr: {
        name: "Lames de Seki — L'atelier du feu et de l'acier",
        tagline: "Forgez un couteau dans une ville de forgerons depuis 700 ans.",
        desc:
          "Depuis l'époque de Kamakura, les forgerons de sabres se rassemblent à Seki. Aux côtés d'un forgeron en activité, vous chaufferez, martèlerez et polirez votre propre couteau — unique au monde.",
        highlights: ["Forge et affûtage en tête-à-tête avec un artisan", "Repartez avec votre couteau", "Entrée au musée de la coutellerie incluse"],
      },
    },
  },
  {
    id: "tokoname-yaki",
    category: "craft",
    muni: "tokoname",
    price: 28000,
    score: 88,
    co2: 9.6,
    duration: 3,
    capacity: 8,
    seeds: [31, 32, 33],
    palette: "pottery",
    t: {
      ja: {
        name: "常滑焼 — 土と窯の路地を歩き、轆轤を回す",
        tagline: "日本六古窯のまちで、朱泥の急須づくり。",
        desc:
          "煙突と登窯の残る「やきもの散歩道」を職人と歩き、工房で轆轤(ろくろ)に向かいます。千年の産地・常滑の土に触れ、朱泥の器を自らの手で形にします。",
        highlights: ["職人と歩くやきもの散歩道", "電動轆轤での作陶体験", "焼成後、作品を海外発送可能"],
      },
      en: {
        name: "Tokoname Ware — Lanes of Clay, and the Potter's Wheel",
        tagline: "Shape red-clay ware in one of Japan's Six Ancient Kilns.",
        desc:
          "Walk the Pottery Footpath of chimneys and climbing kilns with an artisan, then sit at the wheel in their studio. Touch the clay of a thousand-year-old kiln town and shape your own vessel.",
        highlights: ["Walk the Pottery Footpath with an artisan", "Throw on the potter's wheel", "Fired pieces shipped worldwide"],
      },
      fr: {
        name: "Céramique de Tokoname — Ruelles d'argile et tour de potier",
        tagline: "Façonnez la terre rouge dans l'un des Six Fours Anciens du Japon.",
        desc:
          "Parcourez le Sentier de la céramique, entre cheminées et fours à flanc de colline, puis installez-vous au tour dans l'atelier. Touchez l'argile d'une ville potière millénaire et façonnez votre pièce.",
        highlights: ["Promenade guidée par un artisan", "Initiation au tour de potier", "Expédition internationale des pièces cuites"],
      },
    },
  },
  {
    id: "mikawa-teichiami",
    category: "agri",
    muni: "nishio",
    price: 30000,
    score: 94,
    co2: 14.2,
    duration: 5,
    capacity: 6,
    seeds: [41, 42, 43],
    palette: "sea",
    t: {
      ja: {
        name: "三河湾 定置網漁 — 夜明けの海に出る",
        tagline: "漁師の船に乗り、揚がったばかりの魚を浜で味わう。",
        desc:
          "早朝、三河湾の定置網へ漁師とともに出港します。網を揚げ、魚を選り分け、港に戻ったら獲れたての魚を浜料理に。海と生きる暮らしを、一日かけて体に刻む体験です。",
        highlights: ["現役漁師の船に同乗", "揚げたての魚を浜で調理・実食", "持続可能な定置網漁の仕組みを学ぶ"],
      },
      en: {
        name: "Mikawa Bay Fixed-Net Fishing — Out to Sea at Dawn",
        tagline: "Board a fisherman's boat, then taste the catch on the shore.",
        desc:
          "At first light, sail out to the fixed nets of Mikawa Bay with working fishermen. Haul the nets, sort the catch, and back in port, cook the morning's fish shore-style. A full day inside a life lived with the sea.",
        highlights: ["Ride aboard a working fishing boat", "Cook and eat the fresh catch on the shore", "Learn how fixed-net fishing stays sustainable"],
      },
      fr: {
        name: "Pêche au filet fixe dans la baie de Mikawa — En mer à l'aube",
        tagline: "Embarquez avec les pêcheurs, puis goûtez la prise sur le rivage.",
        desc:
          "Aux premières lueurs, partez vers les filets fixes de la baie de Mikawa avec des pêcheurs en activité. Relevez les filets, triez la prise, puis cuisinez le poisson du matin au port. Une journée entière dans une vie liée à la mer.",
        highlights: ["À bord d'un vrai bateau de pêche", "Cuisine et dégustation de la prise sur place", "Comprendre la durabilité du filet fixe"],
      },
    },
  },
  {
    id: "ena-tanada",
    category: "agri",
    muni: "ena",
    price: 26000,
    score: 95,
    co2: 13.5,
    duration: 4,
    capacity: 10,
    seeds: [51, 52, 53],
    palette: "tanada",
    t: {
      ja: {
        name: "坂折棚田 — 四百年の石積みで米をつくる",
        tagline: "「日本の棚田百選」の風景の中へ、農家とともに。",
        desc:
          "戦国時代から積み上げられた石積みの棚田・坂折。季節ごとの農作業(田植え・草取り・稲刈り)を農家と行い、棚田米のおにぎりを畦道でいただきます。景観を守ることが、そのまま体験になります。",
        highlights: ["季節の農作業を農家と体験", "棚田米の昼食つき", "石積み保全の現場を学ぶ"],
      },
      en: {
        name: "Sakaori Rice Terraces — Farming on 400-Year-Old Stone Walls",
        tagline: "Step into one of Japan's 100 finest terraced landscapes.",
        desc:
          "The stone-walled terraces of Sakaori have been stacked since the Sengoku era. Work the season's tasks — planting, weeding, harvest — alongside local farmers, then eat terrace-grown rice onigiri on the ridge paths. Keeping the landscape alive is the experience.",
        highlights: ["Seasonal farm work with local farmers", "Lunch of terrace-grown rice", "See stone-wall conservation up close"],
      },
      fr: {
        name: "Rizières en terrasses de Sakaori — Cultiver sur 400 ans de murets",
        tagline: "Entrez dans l'un des 100 plus beaux paysages de rizières du Japon.",
        desc:
          "Les terrasses de pierre de Sakaori s'empilent depuis l'époque Sengoku. Participez aux travaux de saison — repiquage, désherbage, moisson — aux côtés des agriculteurs, puis dégustez des onigiri de riz des terrasses sur les diguettes. Préserver le paysage, c'est l'expérience même.",
        highlights: ["Travaux agricoles de saison avec les fermiers", "Déjeuner de riz des terrasses", "La conservation des murets de pierre"],
      },
    },
  },
  {
    id: "chita-cycling",
    category: "cycling",
    muni: "mihama",
    price: 24000,
    score: 85,
    co2: 16.8,
    duration: 6,
    capacity: 8,
    seeds: [61, 62, 63],
    palette: "cycle",
    t: {
      ja: {
        name: "知多半島 海辺サイクリング — 漁村と醸造のまちを繋ぐ",
        tagline: "海沿い40km。土地の恵みを味わいながら走る。",
        desc:
          "美浜の海岸線から半島の漁村・味噌蔵・酒蔵をつなぐガイドライドです。E-bikeでゆったりと走り、立ち寄る先々で土地の生産者と言葉を交わします。移動そのものがゼロエミッションの旅になります。",
        highlights: ["E-bike・ヘルメット込み", "漁村・醸造蔵での試食つき", "地元ガイドの伴走"],
      },
      en: {
        name: "Chita Peninsula Seaside Ride — Fishing Villages and Brewing Towns",
        tagline: "40 km along the coast, tasting the land as you go.",
        desc:
          "A guided e-bike ride linking Mihama's coastline with the peninsula's fishing villages, miso warehouses and sake breweries. Ride at an easy pace, and meet the producers at every stop. The journey itself is zero-emission.",
        highlights: ["E-bike and helmet included", "Tastings at fishing villages and breweries", "Accompanied by a local guide"],
      },
      fr: {
        name: "Péninsule de Chita à vélo — Villages de pêcheurs et brasseries",
        tagline: "40 km le long de la côte, en goûtant le terroir.",
        desc:
          "Une sortie guidée en vélo électrique reliant le littoral de Mihama aux villages de pêcheurs, entrepôts de miso et brasseries de saké de la péninsule. Roulez à un rythme paisible et rencontrez les producteurs à chaque étape. Le trajet lui-même est zéro émission.",
        highlights: ["Vélo électrique et casque inclus", "Dégustations chez les producteurs", "Accompagnement par un guide local"],
      },
    },
  },
];

/* ---------- データアクセスヘルパー ---------- */

const RETURN_RATE = 0.8; // 地域還元率(手数料20%)

function bdGetExperience(id) {
  return EXPERIENCES.find((e) => e.id === id) || null;
}

function bdExpText(exp) {
  return exp.t[bdLang()] || exp.t.ja;
}

function bdMuniName(muniId) {
  const m = MUNICIPALITIES[muniId];
  return m ? (m.name[bdLang()] || m.name.ja) : "";
}

function bdExpImages(exp) {
  return exp.seeds.map((s) => bdArt(s, BD_PALETTES[exp.palette]));
}

/* ---------- 市町村サステナブル度の進捗管理(localStorage) ---------- */

function bdMuniProgress(muniId) {
  const stored = JSON.parse(localStorage.getItem("bd-muni-progress") || "{}");
  return stored[muniId] ?? MUNICIPALITIES[muniId].baseProgress;
}

/**
 * 予約完了時に市町村のサステナブル度を加算する(ダミー計算)。
 * 上昇分 = 人数 × (スコア/100) × 1.6pt、上限99%
 */
function bdAddMuniProgress(muniId, guests, score) {
  const stored = JSON.parse(localStorage.getItem("bd-muni-progress") || "{}");
  const current = stored[muniId] ?? MUNICIPALITIES[muniId].baseProgress;
  const gain = Math.round(guests * (score / 100) * 1.6 * 10) / 10;
  const next = Math.min(99, Math.round((current + gain) * 10) / 10);
  stored[muniId] = next;
  localStorage.setItem("bd-muni-progress", JSON.stringify(stored));
  return { before: current, after: next, gain: Math.round((next - current) * 10) / 10 };
}
