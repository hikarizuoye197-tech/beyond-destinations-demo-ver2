/* =========================================================
   BEYOND DESTINATIONS — 共通レイアウト & 各ページロジック
   ========================================================= */

/* localStorage が使えない環境(プライベートモード等)でも動くようにする */
function bdStore(key, value) {
  try {
    if (value === undefined) return JSON.parse(localStorage.getItem(key) || "null");
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    window.__bdMem = window.__bdMem || {};
    if (value === undefined) return window.__bdMem[key] ?? null;
    window.__bdMem[key] = value;
  }
  return null;
}

/* ---------- 共通ヘッダー / フッター ---------- */

function bdRenderChrome() {
  const header = document.getElementById("site-header");
  if (header) {
    const lang = bdLang();
    header.innerHTML = `
      <div class="demo-bar" data-i18n="demo.bar"></div>
      <div class="header-inner">
        <a class="brand" href="index.html">
          <span class="brand-name">BEYOND DESTINATIONS</span>
          <span class="brand-tag" data-i18n="brand.tag"></span>
        </a>
        <nav class="site-nav">
          <a href="experiences.html" data-i18n="nav.collection"></a>
          <a href="vision.html" data-i18n="nav.how"></a>
        </nav>
        <div class="lang-switch" role="group" aria-label="Language">
          ${BD_LANGS.map(
            (l) =>
              `<button class="lang-btn${l === lang ? " active" : ""}" data-lang="${l}">${l === "ja" ? "日本語" : "EN"}</button>`
          ).join("")}
        </div>
      </div>`;
    header.querySelectorAll(".lang-btn").forEach((btn) =>
      btn.addEventListener("click", () => bdSetLang(btn.dataset.lang))
    );
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <p class="footer-brand">BEYOND DESTINATIONS</p>
        <p class="footer-legal" data-i18n="footer.legal"></p>
        <p class="footer-copy" data-i18n="footer.copyright"></p>
      </div>`;
  }
}

/* ---------- 部品: 画像フォールバック ---------- */

/* 写真が読み込めない場合、SVGアートへ差し替える */
function bdImgTag(img, alt = "", attrs = "") {
  return `<img src="${img.src}" data-fallback="${img.fallback}" alt="${alt}" loading="lazy" ${attrs}>`;
}

function bdBindImgFallback(root = document) {
  root.querySelectorAll("img[data-fallback]").forEach((el) => {
    if (el.dataset.bound) return;
    el.dataset.bound = "1";
    el.addEventListener("error", () => {
      el.src = el.dataset.fallback;
      el.removeAttribute("data-fallback");
    }, { once: true });
  });
}

/* ---------- 部品: バッジ / 料金 / 体験カード ---------- */

function bdStatusBadge(exp) {
  return `<span class="status status-${exp.status}">${t("status." + exp.status)}</span>`;
}

function bdGroupText(exp) {
  return exp.minGuests === 1
    ? t("label.upTo", { max: exp.maxGuests })
    : t("label.guestsRange", { min: exp.minGuests, max: exp.maxGuests });
}

function bdPriceHTML(exp) {
  const from = bdFromPrice(exp);
  if (!from) return `<span class="exp-card-price muted">—</span>`;
  const pre = exp.kind === "day" && t("label.from") ? `<small>${t("label.from")} </small>` : "";
  return `<span class="exp-card-price">${pre}${bdYen(from)}<small> / ${t("label.perGuest")}</small></span>`;
}

function bdExpCard(exp) {
  const tx = bdExpText(exp);
  const img = bdExpImages(exp)[0];
  return `
    <a class="exp-card${exp.bookable ? "" : " is-prep"}" href="experience.html?id=${exp.id}">
      <div class="exp-card-img">${bdImgTag(img, tx.name)}${bdStatusBadge(exp)}</div>
      <div class="exp-card-body">
        <p class="exp-card-area">${tx.area}</p>
        <h3 class="exp-card-name">${tx.name}</h3>
        <p class="exp-card-tagline">${tx.tagline}</p>
        <p class="exp-card-kind">${t("kind." + exp.kind)}</p>
        <div class="exp-card-meta">
          ${bdPriceHTML(exp)}
          <span class="exp-card-group">${exp.maxGuests ? bdGroupText(exp) : ""}</span>
        </div>
      </div>
    </a>`;
}

/* 地域に残る割合の横棒(fill は 0→p% へアニメーション) */
function bdShareBar(p) {
  return `
    <div class="share">
      <div class="share-bar"><span class="share-fill" data-p="${p}"></span></div>
      <p class="share-num"><strong>${p}%</strong> ${t("label.localShare")}</p>
    </div>`;
}

function bdAnimateShare(root = document) {
  requestAnimationFrame(() =>
    setTimeout(() => root.querySelectorAll(".share-fill").forEach((el) => {
      el.style.width = el.dataset.p + "%";
    }), 300)
  );
}

/* ---------- ページ別処理 ---------- */

function bdPageIndex() {
  const share = document.getElementById("fact-local");
  if (share) share.textContent = bdDayQuote(3).localShare + "%";
  const pickup = document.getElementById("pickup-grid");
  if (!pickup) return;
  pickup.innerHTML = ["mino-washi", "sake-brewer", "sake-day"].map((id) => bdExpCard(bdGetExperience(id))).join("");
  bdBindImgFallback(pickup);
}

function bdPageList() {
  const grid = document.getElementById("exp-grid");
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  let current = params.get("kind") || "all";

  const render = () => {
    const list = current === "all" ? EXPERIENCES : EXPERIENCES.filter((e) => e.kind === current);
    grid.innerHTML = list.map(bdExpCard).join("");
    bdBindImgFallback(grid);
    document.querySelectorAll(".filter-btn").forEach((b) =>
      b.classList.toggle("active", b.dataset.kind === current)
    );
  };
  document.querySelectorAll(".filter-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      current = btn.dataset.kind;
      history.replaceState(null, "", current === "all" ? "experiences.html" : `?kind=${current}`);
      render();
    })
  );
  render();
}

/* 詳細ページ右側: 料金カード */
function bdSideCard(exp) {
  const tx = bdExpText(exp);
  if (!exp.bookable) {
    return `
      <div class="side-card">
        ${bdStatusBadge(exp)}
        <p class="side-prep">${t("detail.prep")}</p>
        <a class="btn btn-primary btn-block" href="booking.html?id=${exp.id}">${t("detail.interest")}</a>
      </div>`;
  }
  const meta = `
    <dl class="side-meta">
      <div><dt>${t("label.format")}</dt><dd>${t("kind." + exp.kind)}</dd></div>
      <div><dt>${t("label.duration")}</dt><dd>${exp.kind === "day" ? "9:30–15:30" : `${exp.hours} ${t("label.hours")}`}</dd></div>
      <div><dt>${t("label.group")}</dt><dd>${bdGroupText(exp)}</dd></div>
      <div><dt>${t("label.area")}</dt><dd>${tx.area}</dd></div>
    </dl>`;
  let price;
  if (exp.kind === "day") {
    const rows = [];
    for (let g = exp.minGuests; g <= exp.maxGuests; g++) {
      const q = bdDayQuote(g);
      rows.push(`<tr${g === 3 ? ' class="hl"' : ""}><td>${g}</td><td>${bdYen(q.total)}</td><td>${bdYen(q.perGuest)}</td></tr>`);
    }
    price = `
      <h3 class="breakdown-title">${t("detail.rates")}</h3>
      <table class="rates">
        <tr><th>${t("detail.rates.guests")}</th><th>${t("detail.rates.total")}</th><th>${t("detail.rates.per")}</th></tr>
        ${rows.join("")}
      </table>
      <p class="breakdown-note">${t("detail.rates.note")}</p>`;
  } else {
    price = `
      <p class="side-price-label">${t("detail.session.price")} · ${t("label.net")}</p>
      <p class="side-price">${bdYen(exp.price)}<small> / ${t("label.perGuest")}</small></p>
      <p class="breakdown-note">${t("detail.session.note")}</p>`;
  }
  return `
    <div class="side-card">
      ${bdStatusBadge(exp)}
      ${exp.kind === "day" ? "" : price}
      ${meta}
      ${exp.kind === "day" ? price : ""}
      <a class="btn btn-primary btn-block" href="booking.html?id=${exp.id}">${t("detail.request")}</a>
    </div>`;
}

/* 1日ツアーの「お金の行き先」 */
function bdWhereMoney(guests = 3) {
  const q = bdDayQuote(guests);
  const order = ["brewery", "car", "guide", "lunch", "agency", "hosting", "survey"];
  const localKeys = ["brewery", "car", "guide", "lunch", "agency"];
  return `
    <h2 class="section-title-sm">${t("detail.where")}</h2>
    <p class="where-lead">${t("detail.where.lead", { n: guests })}</p>
    <table class="breakdown where">
      ${order.map((k) => `<tr class="${localKeys.includes(k) ? "local" : ""}"><td>${t("detail.line." + k)}</td><td>${bdYen(q.lines[k])}</td></tr>`).join("")}
      <tr class="total"><td>${t("detail.rates.total")}</td><td>${bdYen(q.total)}</td></tr>
    </table>
    ${bdShareBar(q.localShare)}
    <p class="breakdown-note">${t("detail.where.local", { p: q.localShare })}</p>`;
}

function bdPageDetail() {
  const wrap = document.getElementById("detail-root");
  if (!wrap) return;
  const exp = bdGetExperience(new URLSearchParams(location.search).get("id"));
  if (!exp) { location.href = "experiences.html"; return; }
  const tx = bdExpText(exp);
  const imgs = bdExpImages(exp);
  document.title = `${tx.name} — BEYOND DESTINATIONS`;
  const credits = [...new Set(imgs.map((i) => i.credit).filter(Boolean))];

  let body = "";
  if (exp.kind === "day") {
    body += `
      <h2 class="section-title-sm">${t("detail.itinerary")}</h2>
      <ol class="itinerary">
        ${exp.itinerary.map((s) => `<li><time>${s.time}</time><span>${tx.itinerary[s.key]}</span></li>`).join("")}
      </ol>`;
  } else if (tx.steps) {
    body += `
      <h2 class="section-title-sm">${t("detail.steps")}</h2>
      <ol class="exp-steps">
        ${tx.steps.map((s, i) => `<li><span>${i + 1}</span>${s}</li>`).join("")}
      </ol>`;
  }
  if (tx.includes) {
    body += `
      <h2 class="section-title-sm">${t("detail.includes")}</h2>
      <ul class="highlight-list">${tx.includes.map((h) => `<li>${h}</li>`).join("")}</ul>`;
  }
  if (exp.photos.length) {
    body += `
      <div class="detail-gallery">${bdImgTag(imgs[1])}${bdImgTag(imgs[2])}</div>
      <p class="photo-credit">${t("detail.photoCredit")} ${credits.join(" · ")}</p>`;
  }
  if (exp.kind === "day") body += bdWhereMoney(3);
  if (exp.bookable) {
    body += `
      <div class="meet-note">
        <h3>${t("detail.meet.title")}</h3>
        <p>${t(exp.kind === "day" ? "detail.meet.day" : "detail.meet.session")}</p>
        ${tx.note ? `<p class="meet-status">${tx.note}</p>` : ""}
      </div>`;
  }

  wrap.innerHTML = `
    <div class="detail-hero">
      ${bdImgTag(imgs[0], tx.name)}
      <div class="detail-hero-overlay">
        <p class="detail-area">${tx.area}</p>
        <h1 class="detail-name">${tx.name}</h1>
        <p class="detail-tagline">${tx.tagline}</p>
      </div>
    </div>

    <div class="detail-cols">
      <div class="detail-main">
        <p class="detail-desc">${tx.desc}</p>
        ${body}
      </div>
      <aside class="detail-side">${bdSideCard(exp)}</aside>
    </div>`;
  bdBindImgFallback(wrap);
  bdAnimateShare(wrap);
}

/* ---------- 空き状況の問い合わせ(3ステップ) ---------- */

function bdPageBooking() {
  const root = document.getElementById("booking-root");
  if (!root) return;
  const exp = bdGetExperience(new URLSearchParams(location.search).get("id"));
  if (!exp) { location.href = "experiences.html"; return; }
  const tx = bdExpText(exp);
  const interest = !exp.bookable;
  const steps = interest ? ["req.step2", "req.step3"] : ["req.step1", "req.step2", "req.step3"];
  let step = 0;
  const state = {
    date1: "", date2: "", guests: Math.min(Math.max(exp.minGuests || 1, 3), exp.maxGuests || 3),
    language: "en", notes: "", agency: "", country: "", contact: "", email: "", ref: "",
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const summaryHTML = () => {
    const rows = interest ? "" : `
      <dl class="side-meta">
        <div><dt>${t("req.date1")}</dt><dd>${state.date1 || "—"}</dd></div>
        ${state.date2 ? `<div><dt>${t("req.date2")}</dt><dd>${state.date2}</dd></div>` : ""}
        <div><dt>${t("req.guests")}</dt><dd>${state.guests}</dd></div>
      </dl>
      <table class="breakdown">
        <tr class="total"><td>${t("req.estimate")}</td><td>${bdYen(bdRequestTotal(exp, state.guests))}</td></tr>
      </table>
      ${exp.kind === "day" ? bdShareBar(bdDayQuote(state.guests).localShare) : ""}`;
    return `
      <div class="side-card booking-summary">
        <h3>${t(interest ? "req.interestTitle" : "req.summary")}</h3>
        <p class="bs-name">${tx.name}</p>
        <p class="bs-area">${tx.area} · ${t("kind." + exp.kind)}</p>
        ${rows}
        <p class="breakdown-note">${t(interest ? "req.interestNote" : "req.nopay")}</p>
      </div>`;
  };

  const tripForm = () => {
    const min = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
    const opts = [];
    for (let g = exp.minGuests; g <= exp.maxGuests; g++)
      opts.push(`<option value="${g}"${state.guests === g ? " selected" : ""}>${g}</option>`);
    return `
      <div class="form-grid">
        <div class="form-row">
          <label>${t("req.date1")}<input type="date" id="f-date1" min="${min}" value="${state.date1}" required></label>
          <label>${t("req.date2")}<input type="date" id="f-date2" min="${min}" value="${state.date2}"></label>
        </div>
        <div class="form-row">
          <label>${t("req.guests")}<select id="f-guests">${opts.join("")}</select></label>
          <label>${t("req.language")}
            <select id="f-language">
              <option value="en"${state.language === "en" ? " selected" : ""}>${t("req.language.en")}</option>
              <option value="other"${state.language === "other" ? " selected" : ""}>${t("req.language.other")}</option>
            </select>
          </label>
        </div>
        <label>${t("req.notes")}<textarea id="f-notes" rows="4">${esc(state.notes)}</textarea></label>
      </div>`;
  };

  const agencyForm = () => `
    <div class="form-grid">
      <div class="form-row">
        <label>${t("req.agency")}<input type="text" id="f-agency" value="${esc(state.agency)}" required></label>
        <label>${t("req.country")}<input type="text" id="f-country" value="${esc(state.country)}"></label>
      </div>
      <div class="form-row">
        <label>${t("req.contact")}<input type="text" id="f-contact" value="${esc(state.contact)}" required></label>
        <label>${t("req.email")}<input type="email" id="f-email" value="${esc(state.email)}" required></label>
      </div>
      ${interest ? "" : `<label>${t("req.ref")}<input type="text" id="f-ref" value="${esc(state.ref)}"></label>`}
    </div>`;

  const reviewHTML = () => {
    const row = (k, v) => (v ? `<div><dt>${t(k)}</dt><dd>${esc(v)}</dd></div>` : "");
    return `
      <dl class="review">
        ${row("req.agency", state.agency)}${row("req.country", state.country)}
        ${row("req.contact", state.contact)}${row("req.email", state.email)}${row("req.ref", state.ref)}
        ${interest ? "" : row("req.language", t(state.language === "en" ? "req.language.en" : "req.language.other"))}
        ${interest ? "" : row("req.notes", state.notes)}
      </dl>
      <p class="dummy-note">${t("req.demo")}</p>`;
  };

  const render = () => {
    const key = steps[step];
    const form = key === "req.step1" ? tripForm() : key === "req.step2" ? agencyForm() : reviewHTML();
    const last = step === steps.length - 1;
    root.innerHTML = `
      <h1 class="page-title">${t(interest ? "req.interestTitle" : "req.title")}</h1>
      <ol class="steps">
        ${steps.map((k, i) => `<li class="${i === step ? "active" : i < step ? "done" : ""}"><span>${i + 1}</span>${t(k)}</li>`).join("")}
      </ol>
      <div class="booking-cols">
        <div class="booking-form">
          ${form}
          <div class="form-actions">
            ${step > 0 ? `<button class="btn btn-ghost" id="back">${t("req.back")}</button>` : "<span></span>"}
            <button class="btn btn-primary" id="${last ? "send" : "next"}">${t(last ? "req.send" : "req.next")}</button>
          </div>
        </div>
        ${summaryHTML()}
      </div>`;
    bdAnimateShare(root);

    const read = () => {
      const v = (id) => root.querySelector(id)?.value.trim();
      ["date1", "date2", "language", "notes", "agency", "country", "contact", "email", "ref"].forEach((k) => {
        const val = v("#f-" + k);
        if (val !== undefined) state[k] = val;
      });
      if (root.querySelector("#f-guests")) state.guests = Number(root.querySelector("#f-guests").value);
    };
    const invalid = () => {
      const req = [...root.querySelectorAll("input[required]")];
      const bad = req.find((el) => !el.checkValidity());
      if (bad) { bad.reportValidity(); return true; }
      return false;
    };

    root.querySelector("#f-guests")?.addEventListener("change", () => { read(); render(); });
    root.querySelector("#f-date1")?.addEventListener("change", () => { read(); render(); });
    root.querySelector("#back")?.addEventListener("click", () => { read(); step--; render(); });
    root.querySelector("#next")?.addEventListener("click", () => {
      read();
      if (invalid()) return;
      step++; render(); window.scrollTo({ top: 0 });
    });
    root.querySelector("#send")?.addEventListener("click", () => {
      const ref = "BD-" + new Date().getFullYear() + "-" + String(Math.floor(1000 + Math.random() * 9000));
      bdStore("bd-last-request", {
        expId: exp.id, ref, interest, guests: state.guests,
        total: interest ? 0 : bdRequestTotal(exp, state.guests),
      });
      location.href = "complete.html";
    });
  };
  render();
}

/* ---------- 受付完了ページ ---------- */

function bdPageComplete() {
  const root = document.getElementById("complete-root");
  if (!root) return;
  const req = bdStore("bd-last-request");
  const exp = req && bdGetExperience(req.expId);
  if (!exp) { location.href = "index.html"; return; }
  const tx = bdExpText(exp);

  if (req.interest) {
    root.innerHTML = `
      <p class="complete-kicker">${t("done.kicker")}</p>
      <h1 class="complete-title">${t("done.interest.title")}</h1>
      <p class="complete-body">${t("done.interest.body", { ref: `<strong>${req.ref}</strong>` })}</p>
      <p class="bs-name">${tx.name}</p>
      <div class="complete-actions">
        <a class="btn btn-primary" href="experiences.html">${t("done.another")}</a>
        <a class="btn btn-ghost" href="index.html">${t("done.home")}</a>
      </div>`;
    return;
  }

  const share = exp.kind === "day" ? `
    <div class="complete-share">
      <h2 class="section-title-sm">${t("done.local.title")}</h2>
      ${bdShareBar(bdDayQuote(req.guests).localShare)}
      <p class="breakdown-note">${bdDayQuote(req.guests).localShare}% ${t("done.local.body")}</p>
    </div>` : "";

  root.innerHTML = `
    <p class="complete-kicker">${t("done.kicker")}</p>
    <h1 class="complete-title">${t("done.title")}</h1>
    <p class="complete-body">${t("done.body", { ref: `<strong>${req.ref}</strong>` })}</p>

    <div class="complete-card">
      <p class="bs-name">${tx.name}</p>
      <p class="bs-area">${tx.area} · ${req.guests} ${t("label.guests")} · ${t("req.estimate")} ${bdYen(req.total)}</p>
    </div>

    <h2 class="section-title-sm">${t("done.next")}</h2>
    <ol class="timeline">
      ${[1, 2, 3, 4, 5].map((n) => `<li class="${n === 1 ? "done" : ""}"><span>${n}</span>${t("done.t" + n)}</li>`).join("")}
    </ol>
    ${share}

    <div class="complete-actions">
      <a class="btn btn-primary" href="experiences.html">${t("done.another")}</a>
      <a class="btn btn-ghost" href="index.html">${t("done.home")}</a>
    </div>`;
  bdAnimateShare(root);
}

/* ---------- 私たちについて ---------- */

function bdPageVision() {
  const hero = document.getElementById("vision-art-1");
  if (hero) { hero.src = BD_PHOTOS["mino-street"].src; hero.dataset.fallback = bdArt(101, BD_PALETTES.washi); }
  bdBindImgFallback();
}

/* ---------- 起動 ---------- */

document.addEventListener("DOMContentLoaded", () => {
  bdRenderChrome();
  applyI18n();
  switch (document.body.dataset.page) {
    case "index": bdPageIndex(); break;
    case "list": bdPageList(); break;
    case "detail": bdPageDetail(); break;
    case "booking": bdPageBooking(); break;
    case "complete": bdPageComplete(); break;
    case "vision": bdPageVision(); break;
  }
});
