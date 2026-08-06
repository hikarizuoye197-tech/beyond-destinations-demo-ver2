/* =========================================================
   BEYOND DESTINATIONS — 共通レイアウト & 各ページロジック
   ========================================================= */

/* ---------- 共通ヘッダー / フッター ---------- */

function bdRenderChrome() {
  const header = document.getElementById("site-header");
  if (header) {
    const lang = bdLang();
    header.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="index.html">
          <span class="brand-name">BEYOND DESTINATIONS</span>
          <span class="brand-tag" data-i18n="brand.tag"></span>
        </a>
        <nav class="site-nav">
          <a href="experiences.html" data-i18n="nav.experiences"></a>
          <a href="vision.html" data-i18n="nav.vision"></a>
        </nav>
        <div class="lang-switch" role="group" aria-label="Language">
          ${BD_LANGS.map(
            (l) =>
              `<button class="lang-btn${l === lang ? " active" : ""}" data-lang="${l}">${l.toUpperCase()}</button>`
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

/* 仮写真(外部リンク)が読み込めない場合、SVGアートへ差し替える */
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

/* ---------- 部品: スコアリング / 体験カード ---------- */

function bdScoreRing(score, size = 84) {
  const r = 34, c = 2 * Math.PI * r;
  const filled = (c * score) / 100;
  return `
    <div class="score-ring" style="width:${size}px;height:${size}px">
      <svg viewBox="0 0 84 84">
        <circle cx="42" cy="42" r="${r}" class="ring-bg"/>
        <circle cx="42" cy="42" r="${r}" class="ring-fg"
          stroke-dasharray="${filled.toFixed(1)} ${c.toFixed(1)}"
          transform="rotate(-90 42 42)"/>
      </svg>
      <div class="score-num"><strong>${score}</strong><span>/100</span></div>
    </div>`;
}

function bdExpCard(exp) {
  const tx = bdExpText(exp);
  const img = bdExpImages(exp)[0];
  return `
    <a class="exp-card" href="experience.html?id=${exp.id}" data-category="${exp.category}">
      <div class="exp-card-img">${bdImgTag(img, tx.name)}</div>
      <div class="exp-card-body">
        <p class="exp-card-area">${bdMuniName(exp.muni)}</p>
        <h3 class="exp-card-name">${tx.name}</h3>
        <p class="exp-card-tagline">${tx.tagline}</p>
        <div class="exp-card-meta">
          <span class="exp-card-price">${bdYen(exp.price)}<small> / ${t("label.perPerson")}</small></span>
          <span class="exp-card-score"><i></i>${t("label.scoreShort")} ${exp.score}</span>
        </div>
      </div>
    </a>`;
}

/* ---------- ページ別処理 ---------- */

function bdPageIndex() {
  const pickup = document.getElementById("pickup-grid");
  if (!pickup) return;
  const featured = ["mino-washi", "ena-tanada", "mikawa-teichiami"];
  pickup.innerHTML = featured.map((id) => bdExpCard(bdGetExperience(id))).join("");
  bdBindImgFallback(pickup);
  const heroArt = document.getElementById("hero-art");
  if (heroArt) heroArt.src = bdArt(7, BD_PALETTES.tanada);
  const stripArt = document.getElementById("vision-strip-art");
  if (stripArt) stripArt.src = bdArt(77, BD_PALETTES.washi);
}

function bdPageList() {
  const grid = document.getElementById("exp-grid");
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  let current = params.get("cat") || "all";

  const render = () => {
    const list =
      current === "all" ? EXPERIENCES : EXPERIENCES.filter((e) => e.category === current);
    grid.innerHTML = list.map(bdExpCard).join("");
    bdBindImgFallback(grid);
    document.querySelectorAll(".filter-btn").forEach((b) =>
      b.classList.toggle("active", b.dataset.cat === current)
    );
  };
  document.querySelectorAll(".filter-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      current = btn.dataset.cat;
      history.replaceState(null, "", current === "all" ? "experiences.html" : `?cat=${current}`);
      render();
    })
  );
  render();
}

function bdPageDetail() {
  const wrap = document.getElementById("detail-root");
  if (!wrap) return;
  const exp = bdGetExperience(new URLSearchParams(location.search).get("id"));
  if (!exp) { location.href = "experiences.html"; return; }
  const tx = bdExpText(exp);
  const imgs = bdExpImages(exp);
  const ret = Math.round(exp.price * RETURN_RATE);
  document.title = `${tx.name} — BEYOND DESTINATIONS`;

  wrap.innerHTML = `
    <div class="detail-hero">
      ${bdImgTag(imgs[0], tx.name)}
      <div class="detail-hero-overlay">
        <p class="detail-area">${bdMuniName(exp.muni)}</p>
        <h1 class="detail-name">${tx.name}</h1>
        <p class="detail-tagline">${tx.tagline}</p>
      </div>
    </div>

    <div class="detail-cols">
      <div class="detail-main">
        <span class="badge-meet">${t("badge.meetLocal")}</span>
        <p class="detail-desc">${tx.desc}</p>

        <h2 class="section-title-sm">${t("detail.gallery")}</h2>
        <div class="detail-gallery">
          ${bdImgTag(imgs[1])}${bdImgTag(imgs[2])}
        </div>
        <p class="photo-credit">${t("detail.photoCredit")}</p>

        <h2 class="section-title-sm">${t("detail.highlights")}</h2>
        <ul class="highlight-list">
          ${tx.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>

        <div class="meet-note">
          <h3>${t("detail.meet.title")}</h3>
          <p>${t("detail.meet.body")}</p>
        </div>
      </div>

      <aside class="detail-side">
        <div class="side-card">
          <p class="side-price">${bdYen(exp.price)}<small> / ${t("label.perPerson")}</small></p>
          <dl class="side-meta">
            <div><dt>${t("label.duration")}</dt><dd>${exp.duration} ${t("label.hours")}</dd></div>
            <div><dt>${t("label.groupSize")}</dt><dd>〜${exp.capacity} ${t("label.people")}</dd></div>
            <div><dt>${t("label.area")}</dt><dd>${bdMuniName(exp.muni)}</dd></div>
          </dl>

          <div class="side-score">
            ${bdScoreRing(exp.score)}
            <div>
              <p class="side-score-label">${t("label.score")}</p>
              <p class="side-score-note">${t("detail.score.contribute")}</p>
            </div>
          </div>

          <h3 class="breakdown-title">${t("detail.breakdown.title")}</h3>
          <table class="breakdown">
            <tr><td>${t("detail.breakdown.fee")}</td><td>${bdYen(exp.price)}</td></tr>
            <tr class="sub"><td>${t("detail.breakdown.return")}</td><td>${bdYen(ret)}</td></tr>
            <tr class="sub"><td>${t("detail.breakdown.platform")}</td><td>${bdYen(exp.price - ret)}</td></tr>
            <tr class="co2"><td>${t("detail.breakdown.co2")}</td><td>-${exp.co2} kg</td></tr>
          </table>
          <p class="breakdown-note">${t("detail.breakdown.note")}</p>

          <a class="btn btn-primary btn-block" href="booking.html?id=${exp.id}">${t("detail.book")}</a>
          <p class="side-meet">${t("badge.meetLocal")}</p>
        </div>
      </aside>
    </div>`;
  bdBindImgFallback(wrap);
}

/* ---------- 予約フロー(3ステップ) ---------- */

function bdPageBooking() {
  const root = document.getElementById("booking-root");
  if (!root) return;
  const exp = bdGetExperience(new URLSearchParams(location.search).get("id"));
  if (!exp) { location.href = "experiences.html"; return; }
  const tx = bdExpText(exp);
  let step = 1;
  const state = { date: "", guests: 2, name: "", email: "", country: "" };

  const totals = () => {
    const total = exp.price * state.guests;
    return { total, ret: Math.round(total * RETURN_RATE), co2: (exp.co2 * state.guests).toFixed(1) };
  };

  const summaryHTML = () => {
    const { total, ret, co2 } = totals();
    return `
      <div class="side-card booking-summary">
        <h3>${t("booking.summary")}</h3>
        <p class="bs-name">${tx.name}</p>
        <p class="bs-area">${bdMuniName(exp.muni)}</p>
        <dl class="side-meta">
          <div><dt>${t("booking.date")}</dt><dd>${state.date || "—"}</dd></div>
          <div><dt>${t("booking.guests")}</dt><dd>${state.guests} ${t("label.people")}</dd></div>
        </dl>
        <table class="breakdown">
          <tr><td>${bdYen(exp.price)} × ${state.guests}</td><td>${bdYen(total)}</td></tr>
          <tr class="total"><td>${t("booking.total")}</td><td>${bdYen(total)}</td></tr>
          <tr class="sub"><td>${t("booking.totalReturn")}</td><td>${bdYen(ret)}</td></tr>
          <tr class="co2"><td>${t("booking.totalCo2")}</td><td>-${co2} kg</td></tr>
        </table>
        <p class="breakdown-note">${t("detail.breakdown.note")}</p>
        <p class="side-meet">${t("booking.meetReminder")}</p>
      </div>`;
  };

  const stepsHTML = () =>
    `<ol class="steps">
      ${[1, 2, 3].map((n) =>
        `<li class="${n === step ? "active" : n < step ? "done" : ""}">
          <span>${n}</span>${t("booking.step" + n)}</li>`).join("")}
    </ol>`;

  const render = () => {
    let form = "";
    if (step === 1) {
      const today = new Date();
      const min = new Date(today.getTime() + 3 * 86400000).toISOString().slice(0, 10);
      form = `
        <div class="form-grid">
          <label>${t("booking.date")}
            <input type="date" id="f-date" min="${min}" value="${state.date}" required>
          </label>
          <label>${t("booking.guests")}
            <select id="f-guests">
              ${Array.from({ length: exp.capacity }, (_, i) =>
                `<option value="${i + 1}"${state.guests === i + 1 ? " selected" : ""}>${i + 1}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="form-actions">
          <span></span>
          <button class="btn btn-primary" id="next">${t("booking.next")}</button>
        </div>`;
    } else if (step === 2) {
      form = `
        <div class="form-grid">
          <label>${t("booking.name")}<input type="text" id="f-name" value="${state.name}" required></label>
          <label>${t("booking.email")}<input type="email" id="f-email" value="${state.email}" required></label>
          <label>${t("booking.country")}<input type="text" id="f-country" value="${state.country}"></label>
        </div>
        <div class="form-actions">
          <button class="btn btn-ghost" id="back">${t("booking.back")}</button>
          <button class="btn btn-primary" id="next">${t("booking.next")}</button>
        </div>`;
    } else {
      form = `
        <div class="form-grid">
          <label>${t("booking.card")}<input type="text" inputmode="numeric" placeholder="4242 4242 4242 4242" id="f-card"></label>
          <label>${t("booking.cardName")}<input type="text" id="f-cardname"></label>
          <div class="form-row">
            <label>${t("booking.expiry")}<input type="text" placeholder="MM/YY" id="f-exp"></label>
            <label>${t("booking.cvc")}<input type="text" inputmode="numeric" placeholder="123" id="f-cvc"></label>
          </div>
        </div>
        <p class="dummy-note">${t("booking.dummyNote")}</p>
        <div class="form-actions">
          <button class="btn btn-ghost" id="back">${t("booking.back")}</button>
          <button class="btn btn-primary" id="pay">${t("booking.pay")}</button>
        </div>`;
    }

    root.innerHTML = `
      <h1 class="page-title">${t("booking.title")}</h1>
      ${stepsHTML()}
      <div class="booking-cols">
        <div class="booking-form">${form}</div>
        ${summaryHTML()}
      </div>`;

    const read = () => {
      const g = (id) => root.querySelector(id);
      if (g("#f-date")) state.date = g("#f-date").value;
      if (g("#f-guests")) state.guests = Number(g("#f-guests").value);
      if (g("#f-name")) state.name = g("#f-name").value.trim();
      if (g("#f-email")) state.email = g("#f-email").value.trim();
      if (g("#f-country")) state.country = g("#f-country").value.trim();
    };

    root.querySelector("#f-guests")?.addEventListener("change", () => { read(); render(); });
    root.querySelector("#f-date")?.addEventListener("change", read);

    root.querySelector("#back")?.addEventListener("click", () => { read(); step--; render(); });
    root.querySelector("#next")?.addEventListener("click", () => {
      read();
      if (step === 1 && !state.date) { root.querySelector("#f-date").reportValidity(); return; }
      if (step === 2 && (!state.name || !state.email || !/.+@.+\..+/.test(state.email))) {
        (!state.name ? root.querySelector("#f-name") : root.querySelector("#f-email")).reportValidity();
        return;
      }
      step++; render(); window.scrollTo({ top: 0 });
    });
    root.querySelector("#pay")?.addEventListener("click", () => {
      read();
      const { total, ret, co2 } = totals();
      const progress = bdAddMuniProgress(exp.muni, state.guests, exp.score);
      localStorage.setItem("bd-last-booking", JSON.stringify({
        expId: exp.id, date: state.date, guests: state.guests,
        total, ret, co2, progress,
      }));
      location.href = "complete.html";
    });
  };
  render();
}

/* ---------- 決済完了ページ(市町村が満ちていく演出) ---------- */

function bdPageComplete() {
  const root = document.getElementById("complete-root");
  if (!root) return;
  const booking = JSON.parse(localStorage.getItem("bd-last-booking") || "null");
  if (!booking) { location.href = "index.html"; return; }
  const exp = bdGetExperience(booking.expId);
  const muni = MUNICIPALITIES[exp.muni];
  const { before, after, gain } = booking.progress;

  root.innerHTML = `
    <p class="complete-kicker">${t("complete.kicker")}</p>
    <h1 class="complete-title">${t("complete.title")}</h1>
    <p class="complete-body">${t("complete.body")}</p>

    <div class="muni-stage">
      <svg viewBox="0 0 200 200" class="muni-svg" aria-hidden="true">
        <defs>
          <clipPath id="muni-clip"><path d="${muni.silhouette}"/></clipPath>
          <linearGradient id="muni-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stop-color="#2e5c44"/>
            <stop offset="1" stop-color="#8fbb7f"/>
          </linearGradient>
        </defs>
        <path d="${muni.silhouette}" class="muni-base"/>
        <g clip-path="url(#muni-clip)">
          <rect id="muni-fill" x="0" y="200" width="200" height="200" fill="url(#muni-grad)"/>
          <path id="muni-wave" d="" fill="#ffffff" opacity="0.18"/>
        </g>
        <path d="${muni.silhouette}" class="muni-outline"/>
      </svg>
      <div class="muni-info">
        <p class="muni-name">${bdMuniName(exp.muni)}<span>${t("complete.muniProgress")}</span></p>
        <p class="muni-percent"><strong id="muni-num">${before.toFixed(1)}</strong>%</p>
        <p class="muni-gain">+${gain.toFixed(1)}pt <span>${t("complete.contribution")}</span></p>
      </div>
    </div>

    <div class="complete-stats">
      <div class="stat"><p class="stat-label">${t("complete.co2")}</p><p class="stat-value">-${booking.co2} kg</p></div>
      <div class="stat"><p class="stat-label">${t("complete.return")}</p><p class="stat-value">${bdYen(booking.ret)}</p></div>
    </div>

    <div class="complete-actions">
      <a class="btn btn-primary" href="experiences.html">${t("complete.another")}</a>
      <a class="btn btn-ghost" href="index.html">${t("complete.backHome")}</a>
    </div>`;

  /* 満ちていくアニメーション: before% → after% をイージングで描画 */
  const fillRect = root.querySelector("#muni-fill");
  const wave = root.querySelector("#muni-wave");
  const num = root.querySelector("#muni-num");
  const yFor = (p) => 200 - p * 2;
  const DURATION = 2600, DELAY = 700;
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  /* タブ非表示中は進行させないため、実際に描画されたフレームの経過時間のみ積算する */
  let elapsed = -DELAY;
  let last = null;

  function frame(now) {
    if (last !== null) elapsed += Math.min(now - last, 50);
    last = now;
    const raw = Math.min(1, Math.max(0, elapsed / DURATION));
    const p = before + (after - before) * ease(raw);
    const y = yFor(p);
    fillRect.setAttribute("y", y.toFixed(2));
    /* 水面のゆらぎ */
    const wobble = Math.sin(now / 260) * 2.4;
    wave.setAttribute(
      "d",
      `M0,${(y + wobble).toFixed(1)} Q50,${(y - 4 + wobble).toFixed(1)} 100,${(y + wobble).toFixed(1)} T200,${(y + wobble).toFixed(1)} L200,${(y + 8).toFixed(1)} L0,${(y + 8).toFixed(1)} Z`
    );
    num.textContent = p.toFixed(1);
    requestAnimationFrame(frame); // 到達後も水面のゆらぎは継続
  }
  requestAnimationFrame(frame);
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
    case "vision": {
      const v1 = document.getElementById("vision-art-1");
      const v2 = document.getElementById("vision-art-2");
      const v3 = document.getElementById("vision-art-3");
      if (v1) v1.src = bdArt(101, BD_PALETTES.tanada);
      if (v2) v2.src = bdArt(102, BD_PALETTES.sea);
      if (v3) v3.src = bdArt(103, BD_PALETTES.washi);
      break;
    }
  }
});
