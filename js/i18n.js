/* =========================================================
   BEYOND DESTINATIONS — i18n (ja / en / fr)
   ========================================================= */

const BD_LANGS = ["ja", "en", "fr"];

const STRINGS = {
  /* ---------------- 日本語 ---------------- */
  ja: {
    "brand.tag": "サステナブル・トラベル・プラットフォーム",
    "nav.experiences": "体験を探す",
    "nav.vision": "ビジョン",
    "nav.book": "予約する",

    "badge.meetLocal": "現地集合・現地解散",
    "label.score": "サステナブル総合スコア",
    "label.scoreShort": "サステナブル度",
    "label.co2": "CO2削減量",
    "label.return": "地域還元額",
    "label.perPerson": "お一人あたり",
    "label.duration": "所要時間",
    "label.hours": "時間",
    "label.groupSize": "定員",
    "label.people": "名",
    "label.area": "開催地",

    "hero.kicker": "東海圏の、まだ知られていない日本へ",
    "hero.title": "旅が、土地の未来になる。",
    "hero.lead":
      "職人の工房、棚田、海。BEYOND DESTINATIONS は、観光地図に載らない地域の生業を訪ねる体験予約プラットフォームです。あなたの一回の旅が、その土地のサステナブル度を高めていきます。",
    "hero.cta.explore": "体験を探す",
    "hero.cta.vision": "私たちのビジョン",

    "index.concept.kicker": "コンセプト",
    "index.concept.title": "消費ではなく、循環する旅を。",
    "index.concept.body":
      "すべての体験は現地集合・現地解散。旅行者は土地に直接入り、代金の8割はその地域の作り手へ還元されます。体験ごとに「サステナブル度」を可視化し、旅の選択そのものが地域の持続可能性を育てる仕組みです。",
    "index.feature1.title": "サステナブル・スコア",
    "index.feature1.body": "CO2削減量と地域還元額から、体験ごとの持続可能性を100点満点で可視化します。",
    "index.feature2.title": "地域への還元",
    "index.feature2.body": "体験料金の80%が職人・生産者など地元事業者へ直接還元されます。",
    "index.feature3.title": "土地が満ちていく",
    "index.feature3.body": "予約が完了するたび、その市町村のサステナブル度が上昇し、地図が色づいていきます。",
    "index.pickup.kicker": "おすすめの体験",
    "index.pickup.title": "生業に触れる、三つの入口。",
    "index.pickup.more": "すべての体験を見る",
    "index.visionstrip.title": "なぜ、私たちは「目的地の先」へ行くのか。",
    "index.visionstrip.cta": "ビジョンを読む",

    "list.title": "体験を探す",
    "list.lead": "東海圏の職人・農林水産業・アクティビティ。すべて現地集合・現地解散の体験です。",
    "filter.all": "すべて",
    "filter.craft": "職人",
    "filter.agri": "農林水産業",
    "filter.cycling": "サイクリング",
    "card.viewDetail": "詳細を見る",

    "detail.breakdown.title": "価格の内訳",
    "detail.breakdown.fee": "体験料金",
    "detail.breakdown.return": "うち地域還元額(80%)",
    "detail.breakdown.platform": "うちプラットフォーム運営費(20%)",
    "detail.breakdown.co2": "CO2削減見込み",
    "detail.breakdown.note":
      "地域還元額は、体験を提供する職人・生産者・地元事業者へ直接支払われる金額です。",
    "detail.meet.title": "集合・解散について",
    "detail.meet.body":
      "この体験は現地集合・現地解散です。集合場所までの交通・宿泊は含まれません。予約確定後、集合場所の詳細をご案内します。",
    "detail.highlights": "体験のハイライト",
    "detail.score.contribute": "この体験を予約すると、開催地のサステナブル度が上昇します。",
    "detail.book": "この体験を予約する",
    "detail.gallery": "体験のようす",

    "booking.title": "予約",
    "booking.step1": "日時・人数",
    "booking.step2": "予約者情報",
    "booking.step3": "決済",
    "booking.date": "希望日",
    "booking.guests": "人数",
    "booking.name": "お名前",
    "booking.email": "メールアドレス",
    "booking.country": "お住まいの国",
    "booking.card": "カード番号",
    "booking.cardName": "カード名義",
    "booking.expiry": "有効期限",
    "booking.cvc": "セキュリティコード",
    "booking.dummyNote": "※ これはプロトタイプです。決済は実際には行われません。",
    "booking.summary": "ご予約内容",
    "booking.total": "合計金額",
    "booking.totalReturn": "うち地域への還元額",
    "booking.totalCo2": "CO2削減見込み",
    "booking.next": "次へ進む",
    "booking.back": "戻る",
    "booking.pay": "決済して予約を確定する",
    "booking.meetReminder": "現地集合・現地解散の体験です。集合場所までの移動手配は含まれません。",

    "complete.kicker": "ご予約ありがとうございます",
    "complete.title": "あなたの旅が、土地を満たしはじめました。",
    "complete.body":
      "予約確定のメールをお送りしました。当日は現地集合となります。集合場所の詳細はメールをご確認ください。",
    "complete.muniProgress": "のサステナブル度",
    "complete.contribution": "今回のご予約による上昇分",
    "complete.co2": "この旅で削減されるCO2",
    "complete.return": "地域の作り手へ届く金額",
    "complete.backHome": "トップへ戻る",
    "complete.another": "ほかの体験を探す",

    "vision.kicker": "私たちのビジョン",
    "vision.title": "その旅は、\n土地の未来になる。",
    "vision.statement":
      "サステナブルツーリズムの普及。持続可能なかたちで日本を旅してもらうことを通じて、世界の旅行者に「本来の日本」を体験してもらう。それが私たちの使命です。",
    "vision.problem.kicker": "課題",
    "vision.problem.title": "観光は、土地を消費してきた。",
    "vision.problem.body":
      "有名観光地への一極集中は、オーバーツーリズムと風景の均質化を生みました。行列と混雑の先にあるのは、どの街でも同じ土産物と、疲弊していく地域です。一方で、その隣の町には、千年続く手仕事や、海と生きる暮らしが、誰にも知られないまま息づいています。",
    "vision.honrai.kicker": "本来の日本",
    "vision.honrai.title": "まだ名前のない風景へ。",
    "vision.honrai.body":
      "和紙を漉く手、炎を見つめる鍛冶職人、夜明けの定置網。私たちが届けたいのは、観光のために作られた日本ではなく、生業として続いてきた日本です。BEYOND DESTINATIONS は、東海圏の職人・農林水産業の現場を旅の目的地に変え、その価値を正当な対価とともに未来へつなぎます。",
    "vision.score.kicker": "仕組み",
    "vision.score.title": "選ぶことが、支えることになる。",
    "vision.score.body":
      "すべての体験には、CO2削減量と地域還元額にもとづく「サステナブル・スコア」が表示されます。あなたが体験を選ぶたび、その市町村のサステナブル度が上昇していく。旅の一つひとつの選択が、土地の持続可能性を育てる投票になります。",
    "vision.cta": "体験を探しにいく",

    "footer.legal":
      "すべての体験は現地集合・現地解散です。宿泊・移動手配は取り扱っておりません。",
    "footer.copyright": "© 2026 BEYOND DESTINATIONS",
  },

  /* ---------------- English ---------------- */
  en: {
    "brand.tag": "Sustainable Travel Platform",
    "nav.experiences": "Experiences",
    "nav.vision": "Our Vision",
    "nav.book": "Book",

    "badge.meetLocal": "Meet & disperse on site",
    "label.score": "Sustainability Score",
    "label.scoreShort": "Sustainability",
    "label.co2": "CO2 saved",
    "label.return": "Returned to the region",
    "label.perPerson": "per person",
    "label.duration": "Duration",
    "label.hours": "hours",
    "label.groupSize": "Group size",
    "label.people": "guests",
    "label.area": "Location",

    "hero.kicker": "Into the undiscovered Japan of the Tokai region",
    "hero.title": "Travel that becomes the future of a place.",
    "hero.lead":
      "Artisan workshops, terraced rice fields, the sea. BEYOND DESTINATIONS is a booking platform for experiences that don't appear on tourist maps. Each journey you take raises the sustainability of the land itself.",
    "hero.cta.explore": "Explore experiences",
    "hero.cta.vision": "Our vision",

    "index.concept.kicker": "Concept",
    "index.concept.title": "Not consumption — circulation.",
    "index.concept.body":
      "Every experience starts and ends on site. Travellers step directly into the land, and 80% of every fee goes back to the local makers. Each experience carries a visible sustainability score, so the very act of choosing your journey nurtures the region.",
    "index.feature1.title": "Sustainability Score",
    "index.feature1.body": "CO2 savings and local return combined into a single score out of 100 for every experience.",
    "index.feature2.title": "Return to the region",
    "index.feature2.body": "80% of every experience fee goes directly to artisans, farmers and local businesses.",
    "index.feature3.title": "The land fills up",
    "index.feature3.body": "Every completed booking raises the sustainability level of its municipality, colouring the map.",
    "index.pickup.kicker": "Featured experiences",
    "index.pickup.title": "Three doorways into living crafts.",
    "index.pickup.more": "See all experiences",
    "index.visionstrip.title": "Why we travel beyond destinations.",
    "index.visionstrip.cta": "Read our vision",

    "list.title": "Explore experiences",
    "list.lead": "Artisans, farming and fishing, and outdoor rides across the Tokai region. All experiences meet and disperse on site.",
    "filter.all": "All",
    "filter.craft": "Artisans",
    "filter.agri": "Farming & Fishing",
    "filter.cycling": "Cycling",
    "card.viewDetail": "View details",

    "detail.breakdown.title": "Price breakdown",
    "detail.breakdown.fee": "Experience fee",
    "detail.breakdown.return": "Returned to the region (80%)",
    "detail.breakdown.platform": "Platform operations (20%)",
    "detail.breakdown.co2": "Estimated CO2 saved",
    "detail.breakdown.note":
      "The regional return is paid directly to the artisans, producers and local businesses who host your experience.",
    "detail.meet.title": "Meeting & dispersal",
    "detail.meet.body":
      "This experience meets and disperses on site. Transport to the meeting point and accommodation are not included. Full meeting details are sent after booking.",
    "detail.highlights": "Highlights",
    "detail.score.contribute": "Booking this experience raises the sustainability level of its municipality.",
    "detail.book": "Book this experience",
    "detail.gallery": "Scenes from the experience",

    "booking.title": "Booking",
    "booking.step1": "Date & guests",
    "booking.step2": "Your details",
    "booking.step3": "Payment",
    "booking.date": "Preferred date",
    "booking.guests": "Guests",
    "booking.name": "Full name",
    "booking.email": "Email address",
    "booking.country": "Country of residence",
    "booking.card": "Card number",
    "booking.cardName": "Name on card",
    "booking.expiry": "Expiry",
    "booking.cvc": "CVC",
    "booking.dummyNote": "※ This is a prototype. No actual payment will be processed.",
    "booking.summary": "Your booking",
    "booking.total": "Total",
    "booking.totalReturn": "Returned to the region",
    "booking.totalCo2": "Estimated CO2 saved",
    "booking.next": "Continue",
    "booking.back": "Back",
    "booking.pay": "Pay and confirm booking",
    "booking.meetReminder": "This experience meets and disperses on site. Transport to the meeting point is not included.",

    "complete.kicker": "Thank you for your booking",
    "complete.title": "Your journey has begun to fill the land.",
    "complete.body":
      "A confirmation email is on its way. The experience meets on site — please check the email for meeting details.",
    "complete.muniProgress": " — Sustainability level",
    "complete.contribution": "Raised by this booking",
    "complete.co2": "CO2 saved by this journey",
    "complete.return": "Delivered to local makers",
    "complete.backHome": "Back to top",
    "complete.another": "Explore more experiences",

    "vision.kicker": "Our Vision",
    "vision.title": "Travel that becomes\nthe future of a place.",
    "vision.statement":
      "Our mission is to spread sustainable tourism — inviting travellers from around the world to experience the true Japan, by travelling it in a way that lets it endure.",
    "vision.problem.kicker": "The problem",
    "vision.problem.title": "Tourism has been consuming places.",
    "vision.problem.body":
      "Concentration on famous destinations has produced overtourism and uniform streetscapes. Beyond the queues lie the same souvenirs in every town — and exhausted communities. Meanwhile, in the town next door, thousand-year-old crafts and lives lived with the sea continue, known to no one.",
    "vision.honrai.kicker": "The true Japan",
    "vision.honrai.title": "Toward landscapes not yet named.",
    "vision.honrai.body":
      "Hands pulling washi paper, a smith watching the flame, fixed nets at dawn. What we offer is not a Japan built for tourism, but the Japan that has endured as livelihood. BEYOND DESTINATIONS turns the workshops, farms and fisheries of the Tokai region into destinations — and passes their value on, fairly paid, to the future.",
    "vision.score.kicker": "How it works",
    "vision.score.title": "To choose is to sustain.",
    "vision.score.body":
      "Every experience displays a sustainability score built from CO2 savings and regional return. Each time you choose an experience, the sustainability level of its municipality rises. Every choice in your journey becomes a vote for the land's future.",
    "vision.cta": "Explore experiences",

    "footer.legal":
      "All experiences meet and disperse on site. We do not arrange accommodation or transport.",
    "footer.copyright": "© 2026 BEYOND DESTINATIONS",
  },

  /* ---------------- Français ---------------- */
  fr: {
    "brand.tag": "Plateforme de voyage durable",
    "nav.experiences": "Expériences",
    "nav.vision": "Notre vision",
    "nav.book": "Réserver",

    "badge.meetLocal": "Rendez-vous et fin sur place",
    "label.score": "Score de durabilité",
    "label.scoreShort": "Durabilité",
    "label.co2": "CO2 évité",
    "label.return": "Reversé à la région",
    "label.perPerson": "par personne",
    "label.duration": "Durée",
    "label.hours": "heures",
    "label.groupSize": "Participants",
    "label.people": "pers.",
    "label.area": "Lieu",

    "hero.kicker": "Vers le Japon méconnu de la région de Tokai",
    "hero.title": "Un voyage qui devient l'avenir d'un territoire.",
    "hero.lead":
      "Ateliers d'artisans, rizières en terrasses, la mer. BEYOND DESTINATIONS est une plateforme de réservation d'expériences absentes des cartes touristiques. Chaque voyage élève la durabilité du territoire lui-même.",
    "hero.cta.explore": "Découvrir les expériences",
    "hero.cta.vision": "Notre vision",

    "index.concept.kicker": "Concept",
    "index.concept.title": "Non pas consommer — faire circuler.",
    "index.concept.body":
      "Chaque expérience commence et se termine sur place. Le voyageur entre directement dans le territoire, et 80 % du prix revient aux artisans locaux. Chaque expérience affiche son score de durabilité : choisir son voyage, c'est déjà nourrir la région.",
    "index.feature1.title": "Score de durabilité",
    "index.feature1.body": "CO2 évité et retombées locales réunis en un score sur 100 pour chaque expérience.",
    "index.feature2.title": "Retour à la région",
    "index.feature2.body": "80 % du prix de chaque expérience revient directement aux artisans, agriculteurs et acteurs locaux.",
    "index.feature3.title": "Le territoire se remplit",
    "index.feature3.body": "Chaque réservation élève le niveau de durabilité de sa commune et colore la carte.",
    "index.pickup.kicker": "Expériences à la une",
    "index.pickup.title": "Trois portes vers des savoir-faire vivants.",
    "index.pickup.more": "Voir toutes les expériences",
    "index.visionstrip.title": "Pourquoi voyager au-delà des destinations.",
    "index.visionstrip.cta": "Lire notre vision",

    "list.title": "Découvrir les expériences",
    "list.lead": "Artisans, agriculture et pêche, balades à vélo dans la région de Tokai. Toutes les expériences commencent et se terminent sur place.",
    "filter.all": "Toutes",
    "filter.craft": "Artisans",
    "filter.agri": "Agriculture & pêche",
    "filter.cycling": "Vélo",
    "card.viewDetail": "Voir le détail",

    "detail.breakdown.title": "Détail du prix",
    "detail.breakdown.fee": "Prix de l'expérience",
    "detail.breakdown.return": "Reversé à la région (80 %)",
    "detail.breakdown.platform": "Frais de plateforme (20 %)",
    "detail.breakdown.co2": "CO2 évité (estimation)",
    "detail.breakdown.note":
      "La part régionale est versée directement aux artisans, producteurs et acteurs locaux qui vous accueillent.",
    "detail.meet.title": "Rendez-vous et fin",
    "detail.meet.body":
      "Cette expérience commence et se termine sur place. Le transport jusqu'au point de rendez-vous et l'hébergement ne sont pas inclus. Les détails vous seront envoyés après réservation.",
    "detail.highlights": "Points forts",
    "detail.score.contribute": "Réserver cette expérience élève le niveau de durabilité de sa commune.",
    "detail.book": "Réserver cette expérience",
    "detail.gallery": "Scènes de l'expérience",

    "booking.title": "Réservation",
    "booking.step1": "Date & participants",
    "booking.step2": "Vos coordonnées",
    "booking.step3": "Paiement",
    "booking.date": "Date souhaitée",
    "booking.guests": "Participants",
    "booking.name": "Nom complet",
    "booking.email": "Adresse e-mail",
    "booking.country": "Pays de résidence",
    "booking.card": "Numéro de carte",
    "booking.cardName": "Titulaire de la carte",
    "booking.expiry": "Expiration",
    "booking.cvc": "CVC",
    "booking.dummyNote": "※ Ceci est un prototype. Aucun paiement réel ne sera effectué.",
    "booking.summary": "Votre réservation",
    "booking.total": "Total",
    "booking.totalReturn": "Reversé à la région",
    "booking.totalCo2": "CO2 évité (estimation)",
    "booking.next": "Continuer",
    "booking.back": "Retour",
    "booking.pay": "Payer et confirmer",
    "booking.meetReminder": "Cette expérience commence et se termine sur place. Le transport jusqu'au point de rendez-vous n'est pas inclus.",

    "complete.kicker": "Merci pour votre réservation",
    "complete.title": "Votre voyage commence à remplir le territoire.",
    "complete.body":
      "Un e-mail de confirmation vous a été envoyé. Le rendez-vous a lieu sur place — consultez l'e-mail pour les détails.",
    "complete.muniProgress": " — Niveau de durabilité",
    "complete.contribution": "Gagné grâce à cette réservation",
    "complete.co2": "CO2 évité par ce voyage",
    "complete.return": "Versé aux artisans locaux",
    "complete.backHome": "Retour à l'accueil",
    "complete.another": "Découvrir d'autres expériences",

    "vision.kicker": "Notre vision",
    "vision.title": "Un voyage qui devient\nl'avenir d'un territoire.",
    "vision.statement":
      "Notre mission : diffuser le tourisme durable — inviter les voyageurs du monde entier à découvrir le Japon véritable, en le parcourant d'une manière qui lui permette de durer.",
    "vision.problem.kicker": "Le constat",
    "vision.problem.title": "Le tourisme a consommé les territoires.",
    "vision.problem.body":
      "La concentration sur les destinations célèbres a produit le surtourisme et l'uniformisation des paysages. Au bout des files d'attente : les mêmes souvenirs dans chaque ville, et des communautés épuisées. Pendant ce temps, dans la ville voisine, des savoir-faire millénaires et des vies liées à la mer continuent, ignorés de tous.",
    "vision.honrai.kicker": "Le Japon véritable",
    "vision.honrai.title": "Vers des paysages encore sans nom.",
    "vision.honrai.body":
      "Des mains qui étirent le papier washi, un forgeron face à la flamme, les filets fixes à l'aube. Ce que nous offrons n'est pas un Japon construit pour le tourisme, mais le Japon qui a perduré comme métier. BEYOND DESTINATIONS fait des ateliers, fermes et pêcheries de Tokai des destinations — et transmet leur valeur, justement rémunérée, à l'avenir.",
    "vision.score.kicker": "Le mécanisme",
    "vision.score.title": "Choisir, c'est soutenir.",
    "vision.score.body":
      "Chaque expérience affiche un score de durabilité fondé sur le CO2 évité et les retombées régionales. Chaque fois que vous choisissez une expérience, le niveau de durabilité de sa commune s'élève. Chaque choix de voyage devient un vote pour l'avenir du territoire.",
    "vision.cta": "Découvrir les expériences",

    "footer.legal":
      "Toutes les expériences commencent et se terminent sur place. Nous ne proposons ni hébergement ni transport.",
    "footer.copyright": "© 2026 BEYOND DESTINATIONS",
  },
};

/* ---------- helpers ---------- */

function bdLang() {
  const saved = localStorage.getItem("bd-lang");
  return BD_LANGS.includes(saved) ? saved : "ja";
}

function bdSetLang(lang) {
  if (!BD_LANGS.includes(lang)) return;
  localStorage.setItem("bd-lang", lang);
  location.reload();
}

function t(key) {
  const lang = bdLang();
  return STRINGS[lang][key] ?? STRINGS.ja[key] ?? key;
}

/* data-i18n / data-i18n-html 属性を持つ要素へ一括適用 */
function applyI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml).replace(/\n/g, "<br>");
  });
  document.documentElement.lang = bdLang();
}

function bdYen(n) {
  return "¥" + Number(n).toLocaleString("ja-JP");
}
