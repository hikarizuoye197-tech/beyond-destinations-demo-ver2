/* =========================================================
   BEYOND DESTINATIONS — データ層(海外の旅行会社向け)
   商品データ / 料金表 / 写真 / プレースホルダー画像(SVG生成)
   ---------------------------------------------------------
   ※ 料金は説明資料(ブルビック決勝用 付録A6・A7)と同じ数字。
     写真はフリー素材のイメージで、本番では実写に差し替える想定。
   ========================================================= */

/* ---------- SVG風景アート生成(写真がない商品・読み込み失敗時) ---------- */

function bdSeededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/**
 * 山並みを想起させる多層レイヤーのSVGを生成し、
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

/* 商品別パレット(自然・生業を想起する落ち着いたトーン) */
const BD_PALETTES = {
  washi:  ["#dfe8dc", "#a8bfa0", "#6f9271", "#31543f"],
  sake:   ["#e9e2d6", "#c9a98c", "#9a7154", "#5c4633"],
  sauna:  ["#e2e8e6", "#9fb8b0", "#5f8679", "#2c4c42"],
  shibu:  ["#efe4d8", "#d2a77f", "#a86f45", "#6a3f24"],
};

/* ---------- 写真(フリー素材のイメージ) ---------- */
/* 出典は詳細ページの写真下に表示する。本番では権利処理済みの実写に差し替える。 */

const BD_PHOTOS = {
  "washi-1": { src: "img/washi-1.jpg", credit: "TR15336300101 / CC BY-SA 4.0 / Wikimedia Commons" },
  "washi-2": { src: "img/washi-2.jpg", credit: "TR15336300101 / CC BY-SA 4.0 / Wikimedia Commons" },
  "mino-street": { src: "img/mino-street.jpg", credit: "Asturio Cantabrio / CC BY-SA 4.0 / Wikimedia Commons" },
  "sake-brewery": { src: "img/sake-brewery.jpg", credit: "Asturio Cantabrio / CC BY-SA 4.0 / Wikimedia Commons" },
  "sake-bottles": { src: "img/sake-bottles.jpg", credit: "Asturio Cantabrio / CC BY-SA 4.0 / Wikimedia Commons" },
  "sake-tasting": { src: "img/sake-tasting.jpg", credit: "Gyutan lover / CC BY-SA 4.0 / Wikimedia Commons" },
  "sauna-1": { src: "img/sauna-1.jpg", credit: "Antti Leppänen / CC BY 4.0 / Wikimedia Commons" },
  "sauna-2": { src: "img/sauna-2.jpg", credit: "Periegetes / CC BY-SA 4.0 / Wikimedia Commons" },
  "shibu-2": { src: "img/shibu-2.jpg", credit: "漱石の猫 / CC BY-SA 4.0 / Wikimedia Commons" },
  /* 自分たちで撮った写真 */
  "sauna-river": { src: "img/sauna-river.jpg", credit: "BEYOND DESTINATIONS" },
  "shibu-own-1": { src: "img/shibu-own-1.jpg", credit: "BEYOND DESTINATIONS" },
  "shibu-own-2": { src: "img/shibu-own-2.jpg", credit: "BEYOND DESTINATIONS" },
};

/* ---------- 料金 ---------- */

/* 1日ツアー(酒蔵・岐阜駅発着)の1回あたり費用。付録A6・A7と同じ。
   perGuest は人数に比例する費用、perGroup は5名まで同じ費用。 */
const DAY_COSTS = {
  perGuest: { brewery: 30000, lunch: 15000 },
  perGroup: { car: 50000, guide: 55000, lunchCrew: 5000, hosting: 50000, survey: 20000, reserve: 10000 },
  agencyRate: 0.2, // 地域の旅行会社の手数料(手配分＋企画料の20%)
};

/**
 * 1日ツアーの料金を人数から計算する(1回目＝下見あり)。
 * 3名で合計 384,000円・1人 128,000円になる。
 */
function bdDayQuote(guests) {
  const g = DAY_COSTS.perGuest, k = DAY_COSTS.perGroup;
  const lines = {
    brewery: g.brewery * guests,
    car: k.car,
    guide: k.guide,
    lunch: g.lunch * guests + k.lunchCrew,
  };
  const arranged = lines.brewery + lines.car + lines.guide + lines.lunch;
  lines.hosting = k.hosting;
  lines.agency = Math.round((arranged + k.hosting) * DAY_COSTS.agencyRate);
  lines.survey = k.survey + k.reserve;
  const total = Object.values(lines).reduce((a, b) => a + b, 0);
  return { total, perGuest: Math.round(total / guests / 100) * 100 };
}

/* ---------- 商品データ ---------- */
/* kind: "session"＝体験のみ(現地集合・現地解散) / "day"＝車・ガイドつきの1日
   status: pilot＝試験実施済み / talks＝事業者と相談中 / planned＝組み立て中 / prep＝準備中 */

const EXPERIENCES = [
  {
    id: "mino-washi",
    kind: "session",
    status: "pilot",
    price: 30000,
    hours: 2,
    minGuests: 1,
    maxGuests: 3,
    photos: ["washi-1", "washi-2", "mino-street"],
    seed: 11,
    palette: "washi",
    bookable: true,
    t: {
      en: {
        area: "Mino City, Gifu",
        name: "Mino Washi — Make paper with a master papermaker",
        tagline: "Not a craft-centre workshop. Two hours at the vat with the maker.",
        desc:
          "Hon-minoshi, the paper of Mino, was inscribed by UNESCO in 2014. We are arranging sessions with a papermaker who has worked with artists from abroad. Your clients visit the studio, pull sheets alongside the maker, and hear the stories behind the work — with no other visitors in the room.",
        steps: ["Visit the studio", "Pull paper with the maker", "Hear the work and the craft"],
        includes: ["Private session with the papermaker (2 hours)", "Materials, and the sheets your clients make", "Interpreter on request"],
        note: "Pilot session run with international students in September 2026. Maker and schedule being finalised.",
      },
      ja: {
        area: "岐阜県 美濃市",
        name: "美濃和紙 — 職人と紙を漉く",
        tagline: "観光施設の体験ではなく、職人と向き合う2時間。",
        desc:
          "本美濃紙は2014年にユネスコ無形文化遺産に登録されました。海外のアーティストと協業してきた職人と、体験を調整しています。工房を訪ね、職人と一緒に紙を漉き、作品と技の話を聞きます。ほかの観光客はいません。",
        steps: ["工房を訪ねる", "職人と紙を漉く", "作品と技の話を聞く"],
        includes: ["職人との少人数の時間(2時間)", "材料費・漉いた紙", "通訳(ご希望に応じて)"],
        note: "2026年9月に留学生と有償で試験実施。職人・日程は調整中です。",
      },
    },
  },
  {
    id: "sake-brewer",
    kind: "session",
    status: "talks",
    price: 30000,
    hours: 2,
    minGuests: 1,
    maxGuests: 3,
    photos: ["sake-brewery", "sake-bottles", "sake-tasting"],
    seed: 21,
    palette: "sake",
    bookable: true,
    t: {
      en: {
        area: "Gifu Prefecture",
        name: "Sake — Taste with the brewer, inside the brewery",
        tagline: "Not a tasting counter. A small-group tasting led by the person who makes it.",
        desc:
          "Gifu's breweries draw on mountain water and generations of family craft. Your clients walk the brewery, learn how the sake is made, and taste side by side with the brewer. We are opening our first sessions with a brewery in Tajimi.",
        steps: ["Visit the brewery", "Learn how it is made", "Taste with the brewer"],
        includes: ["Brewery visit led by the brewer (2 hours)", "Tasting flight", "Interpreter on request"],
        note: "In discussion with breweries. Content and rate will be set with the brewery.",
      },
      ja: {
        area: "岐阜県",
        name: "日本酒 — 酒蔵で、造り手と味わう",
        tagline: "観光客向けの試飲ではなく、造り手が案内する少人数の利き酒。",
        desc:
          "山の水と、代々受け継がれた家の技。酒蔵を訪ねて、蔵で造りを知り、造り手と一緒に飲み比べます。まずは多治見の酒蔵と最初の体験をつくります。",
        steps: ["酒蔵を訪ねる", "蔵で造りを知る", "造り手と飲み比べ"],
        includes: ["造り手による蔵の案内(2時間)", "飲み比べ", "通訳(ご希望に応じて)"],
        note: "酒蔵と相談中です。内容と料金は酒蔵と決めます。",
      },
    },
  },
  {
    id: "sake-day",
    kind: "day",
    status: "planned",
    hours: 6,
    minGuests: 2,
    maxGuests: 5,
    photos: ["sake-tasting", "sake-brewery", "sake-bottles"],
    seed: 31,
    palette: "sake",
    bookable: true,
    itinerary: [
      { time: "9:30", key: "pickup" },
      { time: "10:30", key: "brewery" },
      { time: "13:00", key: "lunch" },
      { time: "15:30", key: "return" },
    ],
    t: {
      en: {
        area: "From Gifu Station",
        name: "A private day in sake country — chauffeur & guide",
        tagline: "Door to door from Gifu Station: the brewery, a local lunch, and back by mid-afternoon.",
        desc:
          "A full private day built around the sake session. A licensed chauffeur-driven car and an interpreter-guide stay with your clients all day. Transport and arrangements are made by our partner, a registered travel agency in Gifu.",
        itinerary: {
          pickup: "Pick-up at Gifu Station by private car",
          brewery: "Sake brewery — tour and tasting with the brewer (2 hours)",
          lunch: "Lunch at a local restaurant",
          return: "Back at Gifu Station",
        },
        includes: [
          "Brewery session with the brewer",
          "Chauffeur-driven car, licensed for paid passenger transport (8 hours)",
          "Interpreter-guide for the whole day",
          "Lunch at a local restaurant",
          "Arrangement by a registered travel agency in Gifu",
        ],
        note: "Rates below are for the first run and include a site visit. Later runs are slightly lower.",
      },
      ja: {
        area: "岐阜駅発着",
        name: "酒蔵をめぐる1日 — 車・ガイドつきの貸切",
        tagline: "岐阜駅から酒蔵、地元の昼食、そして15時半ごろに岐阜駅へ。",
        desc:
          "酒蔵の体験を中心にした、貸切の1日です。緑ナンバーのハイヤーと通訳ガイドが1日同行します。車と手配は、旅行業の登録を持つ岐阜の旅行会社が行います。",
        itinerary: {
          pickup: "岐阜駅をハイヤーで出発",
          brewery: "酒蔵 — 造り手の案内で蔵を見る・利き酒(2時間)",
          lunch: "地元の料理店で昼食",
          return: "岐阜駅に戻る",
        },
        includes: [
          "造り手による酒蔵の体験",
          "ハイヤー(緑ナンバー・8時間)",
          "通訳ガイド(1日同行)",
          "地元の料理店での昼食",
          "旅行業の登録を持つ岐阜の旅行会社による手配",
        ],
        note: "下の料金は1回目(下見を含む)の料金です。2回目からは少し下がります。",
      },
    },
  },
  {
    id: "mountain-sauna",
    kind: "session",
    status: "prep",
    photos: ["sauna-river", "sauna-1", "sauna-2"],
    seed: 41,
    palette: "sauna",
    bookable: false,
    t: {
      en: {
        area: "Gifu Prefecture",
        name: "A sauna deep in the mountains",
        tagline: "In the forest, far from any tour route.",
        desc: "We are preparing this experience with its hosts. Register your interest and we will send details when it opens.",
      },
      ja: {
        area: "岐阜県",
        name: "山奥のサウナ",
        tagline: "観光ルートから遠く離れた、森の中で。",
        desc: "受け入れ先と準備中です。ご関心をお寄せいただければ、受け付けを始めたときにご案内します。",
      },
    },
  },
  {
    id: "kakishibu",
    kind: "session",
    status: "prep",
    photos: ["shibu-own-1", "shibu-own-2", "shibu-2"],
    seed: 51,
    palette: "shibu",
    bookable: false,
    t: {
      en: {
        area: "Yamagata City, Gifu",
        name: "Kakishibu — a thousand years of persimmon dye",
        tagline: "Fermented persimmon tannin that dyes and protects paper and cloth.",
        desc: "We are preparing this experience with the maker. Register your interest and we will send details when it opens.",
      },
      ja: {
        area: "岐阜県 山県市",
        name: "千年の柿渋",
        tagline: "紙や布を染め、守ってきた、発酵させた渋柿の液。",
        desc: "つくり手と準備中です。ご関心をお寄せいただければ、受け付けを始めたときにご案内します。",
      },
    },
  },
];

/* ---------- データアクセスヘルパー ---------- */

function bdGetExperience(id) {
  return EXPERIENCES.find((e) => e.id === id) || null;
}

function bdExpText(exp) {
  return exp.t[bdLang()] || exp.t.en;
}

/* 各商品の画像: 写真があればそれを使い、失敗時用にSVGアートを添える */
function bdExpImages(exp) {
  const art = (i) => bdArt(exp.seed + i, BD_PALETTES[exp.palette]);
  if (!exp.photos.length) return [0, 1, 2].map((i) => ({ src: art(i), fallback: art(i), credit: "" }));
  return exp.photos.map((key, i) => ({ src: BD_PHOTOS[key].src, fallback: art(i), credit: BD_PHOTOS[key].credit }));
}

/* 一覧・カードに出す「〜から」の料金(1人あたり) */
function bdFromPrice(exp) {
  if (exp.kind === "day") return bdDayQuote(exp.maxGuests).perGuest;
  return exp.price || null;
}

/* 予約リクエストの合計(目安) */
function bdRequestTotal(exp, guests) {
  if (exp.kind === "day") return bdDayQuote(guests).total;
  return exp.price * guests;
}
