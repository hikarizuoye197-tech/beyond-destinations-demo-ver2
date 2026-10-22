/* =========================================================
   BEYOND DESTINATIONS — i18n (en / ja)
   海外の旅行会社向けのため、英語を既定にする
   ========================================================= */

const BD_LANGS = ["en", "ja"];

const STRINGS = {
  /* ---------------- English ---------------- */
  en: {
    "demo.bar": "DEMO — sample trade site. No real bookings are made and nothing is sent.",
    "brand.tag": "Gifu, Japan — for travel agencies",
    "nav.collection": "Collection",
    "nav.how": "How we work",
    "nav.request": "Request availability",

    "status.pilot": "Pilot run",
    "status.talks": "In discussion",
    "status.planned": "Planned",
    "status.prep": "In preparation",
    "kind.session": "Experience only — meet on site",
    "kind.day": "Private day — car & guide",
    "label.from": "from",
    "label.perGuest": "per guest",
    "label.net": "Net rate",
    "label.duration": "Duration",
    "label.hours": "hours",
    "label.group": "Group",
    "label.guestsRange": "{min}–{max} guests",
    "label.upTo": "up to {max} guests",
    "label.guests": "guests",
    "label.area": "Area",
    "label.format": "Format",
    "label.localShare": "stays with local businesses",

    "hero.kicker": "For travel agencies & travel designers · Gifu, Japan",
    "hero.title": "The Japan your clients can't book anywhere else.",
    "hero.lead":
      "Master papermakers, sake brewers, a sauna deep in the mountains. In Gifu we build private, small-group time with the people who keep these crafts alive — and make it bookable for your agency.",
    "hero.cta.collection": "View the collection",
    "hero.cta.how": "How we work with agencies",

    "facts.group.v": "3",
    "facts.group": "guests per session, at most",
    "facts.hours.v": "2h",
    "facts.hours": "with the maker — not a show",
    "facts.local": "of a private day goes to local businesses",
    "facts.licensed": "Arranged through a registered travel agency in Gifu",

    "why.kicker": "Why work with us",
    "why.title": "People, not attractions.",
    "why.1.title": "Access you can't get by walking in",
    "why.1.body": "We build trust with makers who have no booking button and no English desk. Your clients meet the person, not a visitor centre.",
    "why.2.title": "Small, private, unhurried",
    "why.2.body": "One group at a time, three guests at most. Time to ask questions, try the work, and talk — the way your clients want to travel.",
    "why.3.title": "Money that stays local",
    "why.3.body": "We show you where every yen goes. Most of the price is paid to the makers, drivers, guides and restaurants of the region.",

    "how.kicker": "Booking",
    "how.title": "Four steps from request to the day.",
    "how.1.title": "Send a request",
    "how.1.body": "Choose an experience, your preferred dates and group size.",
    "how.2.title": "We check with the maker",
    "how.2.body": "We confirm availability directly with the maker within 48 hours.",
    "how.3.title": "Quotation & contract",
    "how.3.body": "Our registered partner agency in Gifu issues the quotation and invoice.",
    "how.4.title": "Your clients meet the maker",
    "how.4.body": "We send a guest briefing, then host the day on site.",

    "pickup.kicker": "The collection",
    "pickup.title": "Start with paper and sake.",
    "pickup.more": "See the full collection",

    "strip.title": "Gifu receives just 1.1% of Japan's foreign guest nights.",
    "strip.body": "Your clients get there before everyone else does.",
    "strip.source": "Source: Japan Tourism Agency, Overnight Travel Statistics 2025 (preliminary).",
    "strip.cta": "How we work",

    "list.title": "The collection",
    "list.lead": "Experiences in Gifu, built with the makers. All rates are net to your agency and exclude your commission.",
    "filter.all": "All",
    "filter.session": "Experience only",
    "filter.day": "Private day",

    "detail.steps": "How the time is spent",
    "detail.itinerary": "The day",
    "detail.includes": "Included",
    "detail.photoCredit": "Photos are illustrative.",
    "detail.rates": "Net rates by group size",
    "detail.rates.guests": "Guests",
    "detail.rates.total": "Per group",
    "detail.rates.per": "Per guest",
    "detail.rates.note": "Net to your agency. Your commission is not included. Rates are pilot rates and may change.",
    "detail.where": "Where the money goes",
    "detail.where.lead": "For a group of {n}, per run:",
    "detail.line.brewery": "Brewery session (paid in full to the brewery)",
    "detail.line.car": "Chauffeur-driven car, 8 hours",
    "detail.line.guide": "Interpreter-guide, 8 hours",
    "detail.line.lunch": "Lunch, including guide and driver",
    "detail.line.agency": "Registered travel agency in Gifu (arrangement fee)",
    "detail.line.hosting": "Beyond Destinations (planning & hosting)",
    "detail.line.survey": "Site visit & contingency",
    "detail.where.local": "{p}% goes to local businesses — the brewery, drivers, guide, restaurant and travel agency.",
    "detail.session.price": "Pilot rate",
    "detail.session.note": "Net to your agency. Your commission is not included. Guests meet at the studio or brewery; transport is not included — add the private day or your own arrangements.",
    "detail.meet.title": "How arrangements work",
    "detail.meet.session": "Experience only: guests meet on site and leave from there. We coordinate the session with the maker.",
    "detail.meet.day": "Private day: transport and arrangements are made by our partner, a registered travel agency in Gifu, in line with Japan's Travel Agency Act.",
    "detail.request": "Request availability",
    "detail.interest": "Register interest",
    "detail.prep": "This experience is being prepared with its hosts. Rates and dates are not yet available.",

    "req.title": "Request availability",
    "req.step1": "Trip",
    "req.step2": "Your agency",
    "req.step3": "Review",
    "req.date1": "Preferred date",
    "req.date2": "Alternative date (optional)",
    "req.guests": "Number of guests",
    "req.language": "Guide language",
    "req.language.en": "English",
    "req.language.other": "Other (tell us in the notes)",
    "req.notes": "About your clients (dietary needs, mobility, interests)",
    "req.agency": "Agency name",
    "req.country": "Country",
    "req.contact": "Your name",
    "req.email": "Email",
    "req.ref": "Your booking reference (optional)",
    "req.next": "Next",
    "req.back": "Back",
    "req.send": "Send request",
    "req.summary": "Request summary",
    "req.estimate": "Estimated net total",
    "req.nopay": "No payment now. We confirm with the maker within 48 hours, then our registered partner agency sends the quotation and invoice.",
    "req.demo": "This is a demo. Nothing you enter is sent anywhere.",
    "req.interestTitle": "Register interest",
    "req.interestNote": "We will contact you when this experience opens for booking.",

    "done.kicker": "Request received",
    "done.title": "Thank you. We'll check with the maker.",
    "done.body": "Your reference is {ref}. You will hear from us within 48 hours.",
    "done.next": "What happens next",
    "done.t1": "Request received",
    "done.t2": "Availability confirmed with the maker — within 48 hours",
    "done.t3": "Quotation and invoice from our registered partner agency",
    "done.t4": "Guest briefing sent",
    "done.t5": "The day — we host your clients on site",
    "done.local.title": "Where this trip's money goes",
    "done.local.body": "of the estimated total stays with local businesses in Gifu.",
    "done.another": "Back to the collection",
    "done.home": "Home",
    "done.interest.title": "Thank you. We'll be in touch.",
    "done.interest.body": "Your reference is {ref}. We will contact you as soon as this experience opens.",

    "how.page.kicker": "How we work",
    "how.page.title": "We connect Gifu's makers\nwith travel agencies abroad.",
    "how.page.lead":
      "Travellers are searching for the real thing, and the region has it. What's missing is the door between them. We are that door.",
    "how.role.kicker": "Our role",
    "how.role.title": "Who does what",
    "how.role.makers": "Local makers",
    "how.role.makers.sub": "Artisans, brewers, inns",
    "how.role.bd.sub": "Turns their time into an experience you can sell",
    "how.role.you": "Your agency",
    "how.role.you.sub": "Builds the journey for your clients",
    "how.role.partner": "Transport and arrangements are made by a registered travel agency in Gifu, in line with Japan's Travel Agency Act.",
    "how.origin.kicker": "Why we started",
    "how.origin.quote": "“Tourism that places no burden on residents —\nand brings money to them.”",
    "how.origin.body":
      "That is what residents told us during university fieldwork on tourism. In Japan, only 4.5% of what international visitors spend goes to experiences — the one thing local people can offer themselves. We want more of the journey to reach them.",
    "how.origin.source": "Source: Japan Tourism Agency, International Visitor Survey 2025 (experiences = entertainment & services).",
    "how.road.kicker": "Roadmap",
    "how.road.title": "From experiences to Gifu's front door.",
    "how.road.1.title": "Now — Build experiences",
    "how.road.1.body": "Washi and sake experiences with the makers. Paid pilot with international students.",
    "how.road.2.title": "Next — Partner with agencies abroad",
    "how.road.2.body": "Propose directly to travel agencies abroad and sign our first partner.",
    "how.road.3.title": "Then — Gifu's DMC",
    "how.road.3.body": "Become a land operator, then a DMC: one point of contact for travel in Gifu.",
    "how.team.kicker": "Contact",
    "how.team.name": "Hikari Sano — Founder",
    "how.team.body": "Gifu University, Faculty of Regional Studies. Researching tourism development and overtourism.",
    "how.cta": "View the collection",

    "footer.legal":
      "Experience-only sessions: guests meet on site. Private days with transport are arranged by a registered travel agency in Gifu.",
    "footer.copyright": "© 2026 BEYOND DESTINATIONS",
  },

  /* ---------------- 日本語 ---------------- */
  ja: {
    "demo.bar": "デモ — 見本のサイトです。実際の予約はされず、入力内容も送信されません。",
    "brand.tag": "岐阜 — 海外の旅行会社のみなさまへ",
    "nav.collection": "体験一覧",
    "nav.how": "私たちについて",
    "nav.request": "空き状況を問い合わせる",

    "status.pilot": "試験実施済み",
    "status.talks": "相談中",
    "status.planned": "組み立て中",
    "status.prep": "準備中",
    "kind.session": "体験のみ — 現地集合・現地解散",
    "kind.day": "貸切の1日 — 車・ガイドつき",
    "label.from": "",
    "label.perGuest": "1名あたり",
    "label.net": "卸値",
    "label.duration": "所要時間",
    "label.hours": "時間",
    "label.group": "人数",
    "label.guestsRange": "{min}〜{max}名",
    "label.upTo": "最大{max}名",
    "label.guests": "名",
    "label.area": "場所",
    "label.format": "形式",
    "label.localShare": "が地域の事業者へ",

    "hero.kicker": "海外の旅行会社・旅のデザイナーのみなさまへ ・ 岐阜",
    "hero.title": "ほかでは予約できない日本を、\nお客様に。",
    "hero.lead":
      "和紙の職人、酒蔵の造り手、山奥のサウナ。岐阜で、技と暮らしを守る人と過ごす少人数の時間をつくり、旅行会社のみなさまが予約できる形にしています。",
    "hero.cta.collection": "体験一覧を見る",
    "hero.cta.how": "旅行会社との進め方",

    "facts.group.v": "3名",
    "facts.group": "1回の最大人数",
    "facts.hours.v": "2時間",
    "facts.hours": "つくり手と過ごす時間",
    "facts.local": "貸切の1日の代金のうち、地域の事業者へ",
    "facts.licensed": "手配は、旅行業の登録を持つ岐阜の旅行会社が行います",

    "why.kicker": "選ばれる理由",
    "why.title": "観光施設ではなく、人に会う。",
    "why.1.title": "ふらりと行っても会えない人",
    "why.1.body": "予約ボタンも英語の窓口もない職人と、信頼を築いています。お客様が会うのは、施設ではなく、その人です。",
    "why.2.title": "少人数・貸切・ゆっくり",
    "why.2.body": "1回1組、最大3名。質問し、手を動かし、話す時間があります。",
    "why.3.title": "お金が地域に残る",
    "why.3.body": "代金の行き先をすべてお見せします。大部分は、地域の職人・運転手・ガイド・飲食店に支払われます。",

    "how.kicker": "予約の流れ",
    "how.title": "問い合わせから当日まで、4ステップ。",
    "how.1.title": "問い合わせを送る",
    "how.1.body": "体験・希望日・人数を選んで送ります。",
    "how.2.title": "つくり手に確認",
    "how.2.body": "48時間以内に、つくり手に直接、空きを確認します。",
    "how.3.title": "見積もり・契約",
    "how.3.body": "提携する岐阜の旅行会社(旅行業の登録あり)が、見積もりと請求書を出します。",
    "how.4.title": "当日、つくり手に会う",
    "how.4.body": "お客様向けの案内を送り、当日は私たちが現地で迎えます。",

    "pickup.kicker": "体験一覧",
    "pickup.title": "まずは、和紙と日本酒から。",
    "pickup.more": "すべての体験を見る",

    "strip.title": "岐阜の外国人の宿泊は、日本全体のわずか1.1%。",
    "strip.body": "だからこそ、ほかの誰よりも先に。",
    "strip.source": "出典：観光庁「宿泊旅行統計調査」2025年(速報値)",
    "strip.cta": "私たちについて",

    "list.title": "体験一覧",
    "list.lead": "つくり手と一緒につくった、岐阜の体験。料金はすべて旅行会社さま向けの卸値で、御社の手数料は含みません。",
    "filter.all": "すべて",
    "filter.session": "体験のみ",
    "filter.day": "貸切の1日",

    "detail.steps": "過ごし方",
    "detail.itinerary": "1日の流れ",
    "detail.includes": "含まれるもの",
    "detail.photoCredit": "写真はイメージです。",
    "detail.rates": "人数ごとの卸値",
    "detail.rates.guests": "人数",
    "detail.rates.total": "1回",
    "detail.rates.per": "1名あたり",
    "detail.rates.note": "旅行会社さま向けの卸値で、御社の手数料は含みません。試験的な料金のため、変わることがあります。",
    "detail.where": "お金の行き先",
    "detail.where.lead": "{n}名・1回あたり：",
    "detail.line.brewery": "酒蔵の体験料(全額を酒蔵へ)",
    "detail.line.car": "ハイヤー(8時間)",
    "detail.line.guide": "通訳ガイド(8時間)",
    "detail.line.lunch": "昼食(ガイド・運転手の分を含む)",
    "detail.line.agency": "岐阜の旅行会社(手配の手数料)",
    "detail.line.hosting": "BEYOND DESTINATIONS(企画・当日の案内)",
    "detail.line.survey": "下見・予備",
    "detail.where.local": "{p}%が、酒蔵・車・ガイド・飲食店・旅行会社など地域の事業者に支払われます。",
    "detail.session.price": "試験的な料金",
    "detail.session.note": "旅行会社さま向けの卸値で、御社の手数料は含みません。工房・酒蔵に現地集合です。移動は含まないため、貸切の1日か御社の手配と組み合わせてください。",
    "detail.meet.title": "手配のしくみ",
    "detail.meet.session": "体験のみ：お客様は現地に集合し、現地で解散します。つくり手との調整は私たちが行います。",
    "detail.meet.day": "貸切の1日：車と手配は、旅行業法にもとづき、旅行業の登録を持つ岐阜の旅行会社が行います。",
    "detail.request": "空き状況を問い合わせる",
    "detail.interest": "関心を登録する",
    "detail.prep": "受け入れ先と準備中の体験です。料金と日程はまだ決まっていません。",

    "req.title": "空き状況の問い合わせ",
    "req.step1": "旅の内容",
    "req.step2": "御社の情報",
    "req.step3": "確認",
    "req.date1": "希望日",
    "req.date2": "第2希望日(任意)",
    "req.guests": "人数",
    "req.language": "ガイドの言語",
    "req.language.en": "英語",
    "req.language.other": "その他(備考に記入)",
    "req.notes": "お客様について(食事の制限・歩行・関心など)",
    "req.agency": "旅行会社名",
    "req.country": "国",
    "req.contact": "ご担当者名",
    "req.email": "メールアドレス",
    "req.ref": "御社の予約番号(任意)",
    "req.next": "次へ",
    "req.back": "戻る",
    "req.send": "問い合わせを送る",
    "req.summary": "問い合わせ内容",
    "req.estimate": "卸値の合計(目安)",
    "req.nopay": "この時点でのお支払いはありません。48時間以内につくり手に確認し、提携する旅行会社から見積もりと請求書をお送りします。",
    "req.demo": "デモのため、入力内容はどこにも送信されません。",
    "req.interestTitle": "関心の登録",
    "req.interestNote": "受け付けを始めたら、ご連絡します。",

    "done.kicker": "問い合わせを受け付けました",
    "done.title": "ありがとうございます。つくり手に確認します。",
    "done.body": "受付番号は {ref} です。48時間以内にご連絡します。",
    "done.next": "このあとの流れ",
    "done.t1": "問い合わせの受け付け",
    "done.t2": "つくり手に空きを確認 — 48時間以内",
    "done.t3": "提携する旅行会社から見積もり・請求書",
    "done.t4": "お客様向けの案内をお送りする",
    "done.t5": "当日 — 私たちが現地でお迎えする",
    "done.local.title": "この旅のお金の行き先",
    "done.local.body": "が、岐阜の地域の事業者に残ります(目安)。",
    "done.another": "体験一覧に戻る",
    "done.home": "トップへ",
    "done.interest.title": "ありがとうございます。ご連絡します。",
    "done.interest.body": "受付番号は {ref} です。受け付けを始めたら、すぐにご連絡します。",

    "how.page.kicker": "私たちについて",
    "how.page.title": "岐阜のつくり手と、\n海外の旅行会社をつなぐ。",
    "how.page.lead":
      "旅行者は本物を探し、地域には本物がある。足りないのは、二つをつなぐ扉です。私たちが、その扉になります。",
    "how.role.kicker": "私たちの役割",
    "how.role.title": "だれが、なにをするか",
    "how.role.makers": "地域の担い手",
    "how.role.makers.sub": "職人・酒蔵・宿",
    "how.role.bd.sub": "その時間を、売れる体験にする",
    "how.role.you": "海外の旅行会社",
    "how.role.you.sub": "お客様の旅をつくる",
    "how.role.partner": "車と手配は、旅行業法にもとづき、旅行業の登録を持つ岐阜の旅行会社が行います。",
    "how.origin.kicker": "はじまり",
    "how.origin.quote": "「住民に負担のない形で、\n住民にお金が入る観光を。」",
    "how.origin.body":
      "ゼミの聞き取り調査で、住民の方から言われた言葉です。訪日客の消費のうち、住民でも始められる「体験」に使われるのは4.5%だけ。旅のお金が、もっと住民に届くようにしたいと考えています。",
    "how.origin.source": "出典：観光庁「インバウンド消費動向調査 2025年」(体験＝娯楽等サービス費)",
    "how.road.kicker": "これから",
    "how.road.title": "体験づくりから、岐阜の旅の窓口へ。",
    "how.road.1.title": "いま — 体験をつくる",
    "how.road.1.body": "美濃和紙・酒蔵と体験づくり。留学生と有償で試験実施。",
    "how.road.2.title": "次 — 海外の旅行会社と提携",
    "how.road.2.body": "海外の旅行会社に直接提案し、提携の1社目をつくる。",
    "how.road.3.title": "その先 — 岐阜のDMCに",
    "how.road.3.body": "ランドオペレーター、そしてDMCへ。岐阜の旅の窓口になる。",
    "how.team.kicker": "お問い合わせ",
    "how.team.name": "代表 佐野 ひかり",
    "how.team.body": "岐阜大学 地域科学部。観光振興と観光公害を研究。",
    "how.cta": "体験一覧を見る",

    "footer.legal":
      "体験のみの商品は現地集合・現地解散です。車つきの貸切の1日は、旅行業の登録を持つ岐阜の旅行会社が手配します。",
    "footer.copyright": "© 2026 BEYOND DESTINATIONS",
  },
};

/* ---------- helpers ---------- */

function bdLang() {
  let saved = null;
  try { saved = localStorage.getItem("bd-lang"); } catch (e) { /* 保存できない環境では既定の英語 */ }
  return BD_LANGS.includes(saved) ? saved : "en";
}

function bdSetLang(lang) {
  if (!BD_LANGS.includes(lang)) return;
  try { localStorage.setItem("bd-lang", lang); } catch (e) { /* 無視 */ }
  location.reload();
}

/* vars を渡すと {name} を差し込む */
function t(key, vars) {
  const lang = bdLang();
  let s = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  return s;
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
  return "¥" + Number(n).toLocaleString("en-US");
}
