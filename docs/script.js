// STATE
let cartCount = 0;
let currentTeam = "argentina";
let cartItems = [];

// TEAM DATA
const teamData = {
  argentina: {
    flag: "🇦🇷",
    name: "ARGENTINA",
    slogan: "Road to Glory",
    color: "#74b9ff",
    color2: "#0984e3",
    bg: "linear-gradient(135deg, #1a3a5c, #0d1f33)",
    bgImage: "argentina.jpg",
    stats: { wc: "3 World Cups", rank: "Rank #1", fan: "Fan Rating 98%" },
    legends: [
      { emoji: "messi.jpg", name: "Lionel Messi", desc: "8x Ballon d'Or winner. Led Argentina to 2022 World Cup glory. 800+ career goals. Undisputed GOAT." },
      { emoji: "maradona.jpg", name: "Diego Maradona", desc: "1986 World Cup winner & Golden Ball. Scored the Goal of the Century. A living legend of the beautiful game." }
    ],
    comments: ["💬 Vamos Argentina!", "💬 Messi is the GOAT!", "💬 Another World Cup soon! 🏆"],
    jerseys: [
      { img: "home argentina.jpeg", name: "Home Jersey", price: "$89.99" },
      { img: "away argentina.jpeg", name: "Away Jersey", price: "$84.99" },
      { img: "retro argentina.jpeg", name: "Retro 86 Jersey", price: "$99.99" }
    ],
    nextMatch: "vs Brazil • Jul 9 • 8:00 PM"
  },
  brazil: {
    flag: "🇧🇷",
    name: "BRAZIL",
    slogan: "The Beautiful Game",
    color: "#f9ca24",
    color2: "#f0932b",
    bg: "linear-gradient(135deg, #1a3a1a, #0d330d)",
    bgImage: "brazil.jpg",
    stats: { wc: "5 World Cups", rank: "Rank #5", fan: "Fan Rating 99%" },
    legends: [
      { emoji: "pele.jpg", name: "Pelé", desc: "3x World Cup winner. The King of Football. 1283 career goals." },
      { emoji: "ronaldino.jpg", name: "Ronaldinho", desc: "2x Ballon d'Or. Magic skills that defied physics." }
    ],
    comments: ["💬 Brasil é o melhor!", "💬 Pelé forever in our hearts!", "💬 The Samba style never dies! 🕺"],
    jerseys: [
      { img: "home brazil.jpeg", name: "Home Jersey", price: "$89.99" },
      { img: "away brazil.jpeg", name: "Away Jersey", price: "$84.99" },
      { img: "retro brazil.jpeg", name: "Retro 70 Jersey", price: "$109.99" }
    ],
    nextMatch: "vs France • Jul 12 • 7:00 PM"
  },
  france: {
    flag: "🇫🇷",
    name: "FRANCE",
    slogan: "Les Bleus Forever",
    color: "#a29bfe",
    color2: "#6c5ce7",
    bg: "linear-gradient(135deg, #1a1a3a, #0d0d33)",
    bgImage: "france.jpg",
    stats: { wc: "2 World Cups", rank: "Rank #2", fan: "Fan Rating 96%" },
    legends: [
      { emoji: "Zidane.jpg", name: "Zinedine Zidane", desc: "1998 World Cup winner. Ballon d'Or legend. The maestro." },
      { emoji: "Henry.jpg", name: "Thierry Henry", desc: "Arsenal's all-time top scorer. France's greatest striker." }
    ],
    comments: ["💬 Allez les Bleus!", "💬 Zidane was pure art!", "💬 France will win again! 🏆"],
    jerseys: [
      { img: "home france.jpeg", name: "Home Jersey", price: "$89.99" },
      { img: "away france.jpeg", name: "Away Jersey", price: "$84.99" },
      { img: "france retro.jpeg", name: "Retro 98 Jersey", price: "$104.99" }
    ],
    nextMatch: "vs Argentina • Jul 15 • 9:00 PM"
  }
};

// MATCH SCHEDULE
const matchSchedule = {
  argentina: [
    { date: "2026-07-04T07:30:00+05:30", opponent: "Cape Verde", location: "Miami", round: "Round of 32" }
  ],
  brazil: [
    { date: "2026-06-29T22:30:00+05:30", opponent: "Japan", location: "Houston", round: "Round of 32" },
    { date: "2026-07-05T05:30:00+05:30", opponent: "TBD", location: "New Jersey", round: "Round of 16" }
  ],
  france: [
    { date: "2026-07-01T06:30:00+05:30", opponent: "Sweden", location: "New Jersey", round: "Round of 32" },
    { date: "2026-07-06T04:30:00+05:30", opponent: "TBD", location: "Philadelphia", round: "Round of 16" }
  ]
};

// COUNTDOWN
let countdownInterval = null;

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const nextMatch = matchSchedule[currentTeam]?.[0];
    if (!nextMatch) return;

    const matchTime = new Date(nextMatch.date).getTime();
    const now = new Date().getTime();
    const diff = matchTime - now;

    const countdownEl = document.getElementById('countdown-display');
    if (!countdownEl) return;

    if (diff > 0) {
      const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs  = Math.floor((diff % (1000 * 60)) / 1000);

      countdownEl.innerHTML = `
        <div class="countdown-box">
          <div class="countdown-num">${days}</div>
          <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${hours}</div>
          <div class="countdown-label">Hours</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${mins}</div>
          <div class="countdown-label">Mins</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${secs}</div>
          <div class="countdown-label">Secs</div>
        </div>
      `;
    } else {
      countdownEl.innerHTML = `
        <div class="countdown-box" style="grid-column: 1/-1;">
          <div class="countdown-num">⚽</div>
          <div class="countdown-label">Match is LIVE!</div>
        </div>
      `;
    }
  }, 1000);
}

function updateNextMatch() {
  const nextMatch = matchSchedule[currentTeam]?.[0];
  if (!nextMatch) return;

  const date = new Date(nextMatch.date);
  const dateStr = date.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    month: 'short', day: 'numeric', year: 'numeric'
  });
  const timeStr = date.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  const data = teamData[currentTeam];
  data.nextMatch = `vs ${nextMatch.opponent} • ${dateStr} • ${timeStr}`;

  const matchInfoEl = document.getElementById('next-match-info');
  if (matchInfoEl) {
    matchInfoEl.innerHTML = `
      <div class="match-info-box glass">
        <p class="match-label">${nextMatch.round}</p>
        <p class="match-opponent">vs <strong>${nextMatch.opponent}</strong></p>
        <p class="match-time">📅 ${dateStr} | 🕐 ${timeStr} IST</p>
        <p class="match-location">📍 ${nextMatch.location}</p>
      </div>
    `;
  }
}

// FAN PASSION INDEX
let fanStats = {
  timeSpent: 0,
  teamSwitches: 0,
  cartAdds: 0,
  commentsPosted: 0
};

setInterval(() => {
  fanStats.timeSpent++;
  updateFanPassionIndex();
}, 1000);

function getFanRank() {
  const score =
    (fanStats.timeSpent * 0.5) +
    (fanStats.teamSwitches * 10) +
    (fanStats.cartAdds * 20) +
    (fanStats.commentsPosted * 15);

  if (score < 30)  return { rank: "Casual Fan",   icon: "⚪", level: 1, next: 30,  color: "#aaa" };
  if (score < 80)  return { rank: "Die-Hard Fan", icon: "🟡", level: 2, next: 80,  color: "#f9ca24" };
  if (score < 150) return { rank: "Ultras",        icon: "🔥", level: 3, next: 150, color: "#e17055" };
  if (score < 250) return { rank: "Super Fan",     icon: "⚡", level: 4, next: 250, color: "#a29bfe" };
  return               { rank: "Legend",           icon: "👑", level: 5, next: 250, color: "#f9ca24" };
}

function updateFanPassionIndex() {
  const el = document.getElementById('fan-passion-index');
  if (!el) return;

  const score =
    (fanStats.timeSpent * 0.5) +
    (fanStats.teamSwitches * 10) +
    (fanStats.cartAdds * 20) +
    (fanStats.commentsPosted * 15);

  const rank = getFanRank();
  const progress = rank.level === 5 ? 100 : Math.min((score / rank.next) * 100, 100);

  el.innerHTML = `
    <div class="fpi-header">
      <span class="fpi-icon">${rank.icon}</span>
      <span class="fpi-rank" style="color:${rank.color}">${rank.rank}</span>
      <span class="fpi-score">Score: ${Math.floor(score)}</span>
    </div>
    <div class="fpi-bar-bg">
      <div class="fpi-bar-fill" style="width:${progress}%; background:${rank.color}"></div>
    </div>
    <div class="fpi-milestones">
      ${['⚪','🟡','🔥','⚡','👑'].map((icon, i) => `
        <span class="fpi-milestone ${rank.level > i ? 'reached' : ''}">${icon}</span>
      `).join('')}
    </div>
    <p class="fpi-hint">
      ${rank.level === 5
        ? '🏆 Maximum fan status achieved!'
        : 'Keep interacting to reach the next rank!'}
    </p>
  `;
}

// FAN WALL
const cheerEmojis = ['⚽','🔥','🏆','👏','💪','🎉','🌟','❤️'];
let cheerInterval = null;

function initFanWall() {
  renderFanWall();
  startAutocheers();
}

function postFanComment() {
  const input = document.getElementById('fan-comment-input');
  const text = input?.value?.trim();
  if (!text) return;

  const data = teamData[currentTeam];
  teamData[currentTeam].comments.unshift(`💬 ${text}`);
  fanStats.commentsPosted++;
  updateFanPassionIndex();

  input.value = '';
  renderFanWall();
  showToast(`${data.flag} Comment posted!`);
  spawnCheerBubble();
}

function spawnCheerBubble() {
  const container = document.getElementById('cheer-container');
  if (!container) return;

  const emoji = cheerEmojis[Math.floor(Math.random() * cheerEmojis.length)];
  const bubble = document.createElement('div');
  bubble.className = 'cheer-bubble';
  bubble.textContent = emoji;
  bubble.style.left = (10 + Math.random() * 80) + '%';
  bubble.style.color = teamData[currentTeam].color;
  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2500);
}

function startAutocheers() {
  if (cheerInterval) clearInterval(cheerInterval);
  cheerInterval = setInterval(() => {
    spawnCheerBubble();
  }, 1800);
}

function renderFanWall() {
  const grid = document.getElementById('comments-grid');
  if (!grid) return;
  const data = teamData[currentTeam];
  grid.innerHTML = data.comments.map(c => `
    <div class="comment-card glass">${c}</div>
  `).join('');
}

// SWITCH TEAM
function switchTeam(team) {
  currentTeam = team;
  const data = teamData[team];

  document.documentElement.style.setProperty('--team-color', data.color);
  document.documentElement.style.setProperty('--team-color-2', data.color2);
  document.documentElement.style.setProperty('--team-bg', data.bg);

  document.getElementById('team-name').textContent = data.name;
  document.getElementById('team-slogan').textContent = data.slogan;
  document.getElementById('stat-wc').textContent = data.stats.wc;
  document.getElementById('stat-rank').textContent = data.stats.rank;
  document.getElementById('stat-fan').textContent = data.stats.fan;

  const hero = document.getElementById('hero');
  hero.style.backgroundImage = `url('${data.bgImage}')`;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
  hero.style.backgroundRepeat = "no-repeat";

  document.getElementById('legend1-img').src = data.legends[0].emoji;
  document.getElementById('legend1-name').textContent = data.legends[0].name;
  document.getElementById('legend1-desc').textContent = data.legends[0].desc;
  document.getElementById('legend2-img').src = data.legends[1].emoji;
  document.getElementById('legend2-name').textContent = data.legends[1].name;
  document.getElementById('legend2-desc').textContent = data.legends[1].desc;

  const storeGrid = document.getElementById('store-grid');
  storeGrid.innerHTML = data.jerseys.map((j) =>
    `<div class="jersey-card glass">
      <img class="jersey-img" src="${j.img}" alt="${j.name}"/>
      <h3>${j.name}</h3>
      <p class="jersey-price">${j.price}</p>
      <button class="add-cart-btn" onclick="addToCart('${j.name}')">Add to Cart</button>
    </div>`
  ).join('');

  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active-team'));
  document.querySelector(`[data-team="${team}"]`).classList.add('active-team');

  ['legends-grid', 'comments-grid', 'store-grid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('fade-in');
      void el.offsetWidth;
      el.classList.add('fade-in');
    }
  });

  updateNextMatch();
  startCountdown();
  fanStats.teamSwitches++;
  renderFanWall();
  initFanWall();
}

// CART
function addToCart(itemName) {
  const data = teamData[currentTeam];
  const jersey = data.jerseys.find(j => j.name === itemName);
  const price = jersey ? parseFloat(jersey.price.replace('$', '')) : 0;

  const existing = cartItems.find(i => i.name === itemName && i.team === currentTeam);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name: itemName, price, team: currentTeam, qty: 1 });
  }

  cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = cartCount;
  showToast(`✓ ${itemName} added to cart!`);
  updateHypeMeter();
  renderCartItems();
  fanStats.cartAdds++;
}

function toggleCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  if (cartItems.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty 🛒</div>';
    totalEl.textContent = '$0.00';
    return;
  }

  container.innerHTML = cartItems.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${teamData[item.team].flag} ${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
      </div>
      <button class="cart-delete-btn" onclick="removeItem(${i})">🗑️</button>
    </div>
  `).join('');

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  totalEl.textContent = `$${total.toFixed(2)}`;
}

function changeQty(index, delta) {
  if (!cartItems[index]) return;
  cartItems[index].qty += delta;
  if (cartItems[index].qty <= 0) cartItems.splice(index, 1);
  cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = cartCount;
  updateHypeMeter();
  renderCartItems();
}

function removeItem(index) {
  if (!cartItems[index]) return;
  cartItems.splice(index, 1);
  cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = cartCount;
  updateHypeMeter();
  renderCartItems();
}

function proceedToCheckout() {
  if (cartItems.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  toggleCart();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('order-summary-text').textContent =
    `${itemCount} item(s) ordered for $${total.toFixed(2)}. Your gear is on its way!`;
  document.getElementById('match-countdown').textContent = getMatchCountdown();
  document.getElementById('order-popup').classList.add('open');
  triggerConfetti();
}

function closeOrderPopup() {
  document.getElementById('order-popup').classList.remove('open');
  cartItems = [];
  cartCount = 0;
  document.getElementById('cart-count').textContent = 0;
  updateHypeMeter();
  renderCartItems();
}

function getMatchCountdown() {
  const data = teamData[currentTeam];
  return `⏱️ Next Match: ${data.flag} ${data.nextMatch}`;
}

// TOAST
function showToast(message) {
  const toast = document.getElementById('toast');
  const data = teamData[currentTeam];
  toast.textContent = message;
  toast.style.background = data.color;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// HYPE METER
function updateHypeMeter() {
  const label = document.getElementById('hype-label');
  const bar = document.getElementById('hype-bar');

  if (cartCount === 0) {
    label.textContent = 'Casual Fan ⚪';
    bar.style.width = '0%';
  } else if (cartCount === 1) {
    label.textContent = 'Die-Hard Fan 🟡';
    bar.style.width = '40%';
  } else if (cartCount === 2) {
    label.textContent = 'Die-Hard Fan 🟡';
    bar.style.width = '70%';
  } else {
    label.textContent = 'Ultras Mode 🔥';
    bar.style.width = '100%';
    triggerConfetti();
  }
}

// CONFETTI
function triggerConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#f9ca24', '#74b9ff', '#a29bfe', '#ff7675', '#55efc4', '#fd79a8'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-10px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay = Math.random() * 1 + 's';
    piece.style.width = (Math.random() * 8 + 6) + 'px';
    piece.style.height = (Math.random() * 8 + 6) + 'px';
    container.appendChild(piece);
  }
  setTimeout(() => container.innerHTML = '', 4000);
}

// INIT
switchTeam('argentina');
    jerseys: [
      { img: "home argentina.jpeg", name: "Home Jersey", price: "$89.99" },
      { img: "away argentina.jpeg", name: "Away Jersey", price: "$84.99" },
      { img: "retro argentina.jpeg", name: "Retro 86 Jersey", price: "$99.99" }
    ],

    nextMatch: "vs Brazil • Jul 9 • 8:00 PM"
  },

  brazil: {
    flag: "🇧🇷",
    name: "BRAZIL",
    slogan: "The Beautiful Game",
    color: "#f9ca24",
    color2: "#f0932b",
    bg: "linear-gradient(135deg, #1a3a1a, #0d330d)",
    bgImage: "brazil.jpg",

    stats: { wc: "5 World Cups", rank: "Rank #5", fan: "Fan Rating 99%" },

    legends: [
      {
        img: "pele.jpg",
        name: "Pelé",
        desc: "3x World Cup winner. King of Football."
      },
      {
        img: "ronaldinho.jpg",
        name: "Ronaldinho",
        desc: "Magic skills that brought joy to football."
      }
    ],

    comments: ["💬 Brasil é o melhor!", "💬 Pelé forever!", "💬 Samba football 🔥"],

    jerseys: [
      { img: "home brazil.jpeg", name: "Home Jersey", price: "$89.99" },
      { img: "away brazil.jpeg", name: "Away Jersey", price: "$84.99" },
      { img: "retro brazil.jpeg", name: "Retro 70 Jersey", price: "$109.99" }
    ],

    nextMatch: "vs France • Jul 12 • 7:00 PM"
  },

  france: {
    flag: "🇫🇷",
    name: "FRANCE",
    slogan: "Les Bleus Forever",
    color: "#a29bfe",
    color2: "#6c5ce7",
    bg: "linear-gradient(135deg, #1a1a3a, #0d0d33)",
    bgImage: "france.jpg",

    stats: { wc: "2 World Cups", rank: "Rank #2", fan: "Fan Rating 96%" },

    legends: [
      {
        img: "Zidane.jpg",
        name: "Zinedine Zidane",
        desc: "1998 World Cup winner. Midfield maestro."
      },
      {
        img: "Henry.jpg",
        name: "Thierry Henry",
        desc: "France legend & Arsenal top scorer."
      }
    ],

    comments: ["💬 Allez les Bleus!", "💬 Zidane magic!", "💬 France will win! 🏆"],

    jerseys: [
      { img: "home france.jpeg", name: "Home Jersey", price: "$89.99" },
      { img: "away france.jpeg", name: "Away Jersey", price: "$84.99" }, // FIXED
      { img: "france retro.jpeg", name: "Retro 98 Jersey", price: "$104.99" }
    ],

    nextMatch: "vs Argentina • Jul 15 • 9:00 PM"
  }
};

// =====================
// MATCH SCHEDULE
// =====================
const matchSchedule = {
  argentina: [
    { date: "2026-07-04T07:30:00+05:30", opponent: "Cape Verde", location: "Miami", round: "Round of 32" }
  ],
  brazil: [
    { date: "2026-06-29T22:30:00+05:30", opponent: "Japan", location: "Houston", round: "Round of 32" }
  ],
  france: [
    { date: "2026-07-01T06:30:00+05:30", opponent: "Sweden", location: "New Jersey", round: "Round of 32" }
  ]
};

// =====================
// COUNTDOWN
// =====================
let countdownInterval = null;

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const nextMatch = matchSchedule[currentTeam]?.[0];
    const el = document.getElementById("countdown-display");
    if (!nextMatch || !el) return;

    const diff = new Date(nextMatch.date).getTime() - Date.now();

    if (diff <= 0) {
      el.innerHTML = `<div class="countdown-box">⚽ Match is LIVE!</div>`;
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    el.innerHTML = `
      <div class="countdown-box"><div>${d}</div><small>Days</small></div>
      <div class="countdown-box"><div>${h}</div><small>Hours</small></div>
      <div class="countdown-box"><div>${m}</div><small>Mins</small></div>
      <div class="countdown-box"><div>${s}</div><small>Secs</small></div>
    `;
  }, 1000);
}

// =====================
// SWITCH TEAM
// =====================
function switchTeam(team) {
  currentTeam = team;
  const data = teamData[team];

  document.documentElement.style.setProperty("--team-color", data.color);
  document.documentElement.style.setProperty("--team-color-2", data.color2);
  document.documentElement.style.setProperty("--team-bg", data.bg);

  document.getElementById("team-name").textContent = data.name;
  document.getElementById("team-slogan").textContent = data.slogan;

  document.getElementById("stat-wc").textContent = data.stats.wc;
  document.getElementById("stat-rank").textContent = data.stats.rank;
  document.getElementById("stat-fan").textContent = data.stats.fan;

  const hero = document.getElementById("hero");
  hero.style.backgroundImage = `url('${data.bgImage}')`;

  // LEGENDS FIX
  document.getElementById("legend1-img").src = data.legends[0].img;
  document.getElementById("legend1-name").textContent = data.legends[0].name;
  document.getElementById("legend1-desc").textContent = data.legends[0].desc;

  document.getElementById("legend2-img").src = data.legends[1].img;
  document.getElementById("legend2-name").textContent = data.legends[1].name;
  document.getElementById("legend2-desc").textContent = data.legends[1].desc;

  // STORE
  const store = document.getElementById("store-grid");
  store.innerHTML = data.jerseys.map(j => `
    <div class="jersey-card glass">
      <img src="${j.img}" />
      <h3>${j.name}</h3>
      <p>${j.price}</p>
      <button onclick="addToCart('${j.name}')">Add to Cart</button>
    </div>
  `).join("");

  startCountdown();
}

// =====================
// CART
// =====================
function addToCart(name) {
  const data = teamData[currentTeam];
  const item = data.jerseys.find(j => j.name === name);

  const existing = cartItems.find(i => i.name === name && i.team === currentTeam);

  if (existing) existing.qty++;
  else cartItems.push({ name, price: parseFloat(item.price.slice(1)), team: currentTeam, qty: 1 });

  cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cart-count").textContent = cartCount;

  showToast(`${name} added!`);
  renderCartItems();
}

// =====================
// CART RENDER
// =====================
function renderCartItems() {
  const box = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!cartItems.length) {
    box.innerHTML = "Cart empty";
    totalEl.textContent = "$0";
    return;
  }

  let total = 0;

  box.innerHTML = cartItems.map((i, idx) => {
    total += i.price * i.qty;

    return `
      <div>
        ${teamData[i.team].flag} ${i.name}
        <button onclick="changeQty(${idx}, -1)">-</button>
        ${i.qty}
        <button onclick="changeQty(${idx}, 1)">+</button>
      </div>
    `;
  }).join("");

  totalEl.textContent = `$${total.toFixed(2)}`;
}

function changeQty(i, d) {
  cartItems[i].qty += d;
  if (cartItems[i].qty <= 0) cartItems.splice(i, 1);

  cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cart-count").textContent = cartCount;

  renderCartItems();
}

// =====================
// TOAST
// =====================
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

// =====================
// INIT
// =====================
switchTeam("argentina");    stats: { wc: "5 World Cups", rank: "Rank #5", fan: "Fan Rating 99%" },
    legends: [
      { emoji: "pele.jpg", name: "Pelé", desc: "3x World Cup winner. The King of Football. 1283 career goals." },
      { emoji: "ronaldino.jpg", name: "Ronaldinho", desc: "2x Ballon d'Or. Magic skills that defied physics." }
    ],
    comments: ["💬 Brasil é o melhor!", "💬 Pelé forever in our hearts!", "💬 The Samba style never dies! 🕺"],
    jerseys: [
      { img: "home brazil.jpeg", name: "Home Jersey", price: "$89.99" },
      { img: "away brazil.jpeg", name: "Away Jersey", price: "$84.99" },
      { img: "retro brazil.jpeg", name: "Retro 70 Jersey", price: "$109.99" }
    ],
    nextMatch: "vs France • Jul 12 • 7:00 PM"
  },
  france: {
    flag: "🇫🇷",
    name: "FRANCE",
    slogan: "Les Bleus Forever",
    color: "#a29bfe",
    color2: "#6c5ce7",
    bg: "linear-gradient(135deg, #1a1a3a, #0d0d33)",
    bgImage: "france.jpg",
    stats: { wc: "2 World Cups", rank: "Rank #2", fan: "Fan Rating 96%" },
    legends: [
      { emoji: "Zidane.jpg", name: "Zinedine Zidane", desc: "1998 World Cup winner. Ballon d'Or legend. The maestro." },
      { emoji: "Henry.jpg", name: "Thierry Henry", desc: "Arsenal's all-time top scorer. France's greatest striker." }
    ],
    comments: ["💬 Allez les Bleus!", "💬 Zidane was pure art!", "💬 France will win again! 🏆"],
    jerseys: [
      { img: "home france.jpeg", name: "Home Jersey", price: "$89.99" },
      { img: "away france .jpeg", name: "Away Jersey", price: "$84.99" },
      { img: "france retro.jpeg", name: "Retro 98 Jersey", price: "$104.99" }
    ],
    nextMatch: "vs Argentina • Jul 15 • 9:00 PM"
  }
};

// MATCH SCHEDULE
const matchSchedule = {
  argentina: [
    { date: "2026-07-04T07:30:00+05:30", opponent: "Cape Verde", location: "Miami", round: "Round of 32" }
  ],
  brazil: [
    { date: "2026-06-29T22:30:00+05:30", opponent: "Japan", location: "Houston", round: "Round of 32" },
    { date: "2026-07-05T05:30:00+05:30", opponent: "TBD", location: "New Jersey", round: "Round of 16" }
  ],
  france: [
    { date: "2026-07-01T06:30:00+05:30", opponent: "Sweden", location: "New Jersey", round: "Round of 32" },
    { date: "2026-07-06T04:30:00+05:30", opponent: "TBD", location: "Philadelphia", round: "Round of 16" }
  ]
};

// COUNTDOWN
let countdownInterval = null;

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const nextMatch = matchSchedule[currentTeam]?.[0];
    if (!nextMatch) return;

    const matchTime = new Date(nextMatch.date).getTime();
    const now = new Date().getTime();
    const diff = matchTime - now;

    const countdownEl = document.getElementById('countdown-display');
    if (!countdownEl) return;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      countdownEl.innerHTML = `
        <div class="countdown-box">
          <div class="countdown-num">${days}</div>
          <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${hours}</div>
          <div class="countdown-label">Hours</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${mins}</div>
          <div class="countdown-label">Mins</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-num">${secs}</div>
          <div class="countdown-label">Secs</div>
        </div>
      `;
    } else {
      countdownEl.innerHTML = `
        <div class="countdown-box" style="grid-column: 1/-1;">
          <div class="countdown-num">⚽</div>
          <div class="countdown-label">Match is LIVE!</div>
        </div>
      `;
    }
  }, 1000);
}

function updateNextMatch() {
  const nextMatch = matchSchedule[currentTeam]?.[0];
  if (!nextMatch) return;

  const date = new Date(nextMatch.date);
  const dateStr = date.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    month: 'short', day: 'numeric', year: 'numeric'
  });
  const timeStr = date.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  const data = teamData[currentTeam];
  data.nextMatch = `vs ${nextMatch.opponent} • ${dateStr} • ${timeStr}`;

  const matchInfoEl = document.getElementById('next-match-info');
  if (matchInfoEl) {
    matchInfoEl.innerHTML = `
      <div class="match-info-box glass">
        <p class="match-label">${nextMatch.round}</p>
        <p class="match-opponent">vs <strong>${nextMatch.opponent}</strong></p>
        <p class="match-time">📅 ${dateStr} | 🕐 ${timeStr} IST</p>
        <p class="match-location">📍 ${nextMatch.location}</p>
      </div>
    `;
  }
}

// FAN PASSION INDEX
let fanStats = {
  timeSpent: 0,
  teamSwitches: 0,
  cartAdds: 0,
  commentsPosted: 0
};

setInterval(() => {
  fanStats.timeSpent++;
  updateFanPassionIndex();
}, 1000);

function getFanRank() {
  const score =
    (fanStats.timeSpent * 0.5) +
    (fanStats.teamSwitches * 10) +
    (fanStats.cartAdds * 20) +
    (fanStats.commentsPosted * 15);

  if (score < 30)  return { rank: "Casual Fan",   icon: "⚪", level: 1, next: 30,  color: "#aaa" };
  if (score < 80)  return { rank: "Die-Hard Fan", icon: "🟡", level: 2, next: 80,  color: "#f9ca24" };
  if (score < 150) return { rank: "Ultras",        icon: "🔥", level: 3, next: 150, color: "#e17055" };
  if (score < 250) return { rank: "Super Fan",     icon: "⚡", level: 4, next: 250, color: "#a29bfe" };
  return               { rank: "Legend",           icon: "👑", level: 5, next: 250, color: "#f9ca24" };
}

function updateFanPassionIndex() {
  const el = document.getElementById('fan-passion-index');
  if (!el) return;

  const score =
    (fanStats.timeSpent * 0.5) +
    (fanStats.teamSwitches * 10) +
    (fanStats.cartAdds * 20) +
    (fanStats.commentsPosted * 15);

  const rank = getFanRank();
  const progress = rank.level === 5 ? 100 : Math.min((score / rank.next) * 100, 100);

  el.innerHTML = `
    <div class="fpi-header">
      <span class="fpi-icon">${rank.icon}</span>
      <span class="fpi-rank" style="color:${rank.color}">${rank.rank}</span>
      <span class="fpi-score">Score: ${Math.floor(score)}</span>
    </div>
    <div class="fpi-bar-bg">
      <div class="fpi-bar-fill" style="width:${progress}%; background:${rank.color}"></div>
    </div>
    <div class="fpi-milestones">
      ${['⚪','🟡','🔥','⚡','👑'].map((icon, i) => `
        <span class="fpi-milestone ${rank.level > i ? 'reached' : ''}">${icon}</span>
      `).join('')}
    </div>
    <p class="fpi-hint">
      ${rank.level === 5
        ? '🏆 Maximum fan status achieved!'
        : 'Keep interacting to reach the next rank!'}
    </p>
  `;
}

// FAN WALL
const cheerEmojis = ['⚽','🔥','🏆','👏','💪','🎉','🌟','❤️'];
let cheerInterval = null;

function initFanWall() {
  renderFanWall();
  startAutocheers();
}

function postFanComment() {
  const input = document.getElementById('fan-comment-input');
  const text = input?.value?.trim();
  if (!text) return;

  const data = teamData[currentTeam];
  teamData[currentTeam].comments.unshift(`💬 ${text}`);
  fanStats.commentsPosted++;
  updateFanPassionIndex();

  input.value = '';
  renderFanWall();
  showToast(`${data.flag} Comment posted!`);
  spawnCheerBubble();
}

function spawnCheerBubble() {
  const container = document.getElementById('cheer-container');
  if (!container) return;

  const emoji = cheerEmojis[Math.floor(Math.random() * cheerEmojis.length)];
  const bubble = document.createElement('div');
  bubble.className = 'cheer-bubble';
  bubble.textContent = emoji;
  bubble.style.left = (10 + Math.random() * 80) + '%';
  bubble.style.color = teamData[currentTeam].color;
  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2500);
}

function startAutocheers() {
  if (cheerInterval) clearInterval(cheerInterval);
  cheerInterval = setInterval(() => {
    spawnCheerBubble();
  }, 1800);
}

function renderFanWall() {
  const grid = document.getElementById('comments-grid');
  if (!grid) return;
  const data = teamData[currentTeam];
  grid.innerHTML = data.comments.map(c => `
    <div class="comment-card glass">${c}</div>
  `).join('');
}

// SWITCH TEAM
function switchTeam(team) {
  currentTeam = team;
  const data = teamData[team];

  document.documentElement.style.setProperty('--team-color', data.color);
  document.documentElement.style.setProperty('--team-color-2', data.color2);
  document.documentElement.style.setProperty('--team-bg', data.bg);

  document.getElementById('team-name').textContent = data.name;
  document.getElementById('team-slogan').textContent = data.slogan;
  document.getElementById('stat-wc').textContent = data.stats.wc;
  document.getElementById('stat-rank').textContent = data.stats.rank;
  document.getElementById('stat-fan').textContent = data.stats.fan;

  const hero = document.getElementById('hero');
  hero.style.backgroundImage = `url('${data.bgImage}')`;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
  hero.style.backgroundRepeat = "no-repeat";

  document.getElementById('legend1-img').src = data.legends[0].emoji;
  document.getElementById('legend1-name').textContent = data.legends[0].name;
  document.getElementById('legend1-desc').textContent = data.legends[0].desc;
  document.getElementById('legend2-img').src = data.legends[1].emoji;
  document.getElementById('legend2-name').textContent = data.legends[1].name;
  document.getElementById('legend2-desc').textContent = data.legends[1].desc;

  const storeGrid = document.getElementById('store-grid');
  storeGrid.innerHTML = data.jerseys.map((j) =>
    `<div class="jersey-card glass">
      <img class="jersey-img" src="${j.img}" alt="${j.name}"/>
      <h3>${j.name}</h3>
      <p class="jersey-price">${j.price}</p>
      <button class="add-cart-btn" onclick="addToCart('${j.name}')">Add to Cart</button>
    </div>`
  ).join('');

  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active-team'));
  document.querySelector(`[data-team="${team}"]`).classList.add('active-team');

  ['legends-grid', 'comments-grid', 'store-grid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('fade-in');
      void el.offsetWidth;
      el.classList.add('fade-in');
    }
  });

  updateNextMatch();
  startCountdown();
  fanStats.teamSwitches++;
  renderFanWall();
  initFanWall();
}

// CART
function addToCart(itemName) {
  const data = teamData[currentTeam];
  const jersey = data.jerseys.find(j => j.name === itemName);
  const price = jersey ? parseFloat(jersey.price.replace('$', '')) : 0;

  const existing = cartItems.find(i => i.name === itemName && i.team === currentTeam);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name: itemName, price, team: currentTeam, qty: 1 });
  }

  cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = cartCount;
  showToast(`✓ ${itemName} added to cart!`);
  updateHypeMeter();
  renderCartItems();
  fanStats.cartAdds++;
}

function toggleCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  if (cartItems.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty 🛒</div>';
    totalEl.textContent = '$0.00';
    return;
  }

  container.innerHTML = cartItems.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${teamData[item.team].flag} ${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
      </div>
      <button class="cart-delete-btn" onclick="removeItem(${i})">🗑️</button>
    </div>
  `).join('');

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  totalEl.textContent = `$${total.toFixed(2)}`;
}

function changeQty(index, delta) {
  if (!cartItems[index]) return;
  cartItems[index].qty += delta;
  if (cartItems[index].qty <= 0) cartItems.splice(index, 1);
  cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = cartCount;
  updateHypeMeter();
  renderCartItems();
}

function removeItem(index) {
  if (!cartItems[index]) return;
  cartItems.splice(index, 1);
  cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = cartCount;
  updateHypeMeter();
  renderCartItems();
}

function proceedToCheckout() {
  if (cartItems.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  toggleCart();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('order-summary-text').textContent =
    `${itemCount} item(s) ordered for $${total.toFixed(2)}. Your gear is on its way!`;
  document.getElementById('match-countdown').textContent = getMatchCountdown();
  document.getElementById('order-popup').classList.add('open');
  triggerConfetti();
}

function closeOrderPopup() {
  document.getElementById('order-popup').classList.remove('open');
  cartItems = [];
  cartCount = 0;
  document.getElementById('cart-count').textContent = 0;
  updateHypeMeter();
  renderCartItems();
}

function getMatchCountdown() {
  const data = teamData[currentTeam];
  return `⏱️ Next Match: ${data.flag} ${data.nextMatch}`;
}

// TOAST
function showToast(message) {
  const toast = document.getElementById('toast');
  const data = teamData[currentTeam];
  toast.textContent = message;
  toast.style.background = data.color;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// HYPE METER
function updateHypeMeter() {
  const label = document.getElementById('hype-label');
  const bar = document.getElementById('hype-bar');

  if (cartCount === 0) {
    label.textContent = 'Casual Fan ⚪';
    bar.style.width = '0%';
  } else if (cartCount === 1) {
    label.textContent = 'Die-Hard Fan 🟡';
    bar.style.width = '40%';
  } else if (cartCount === 2) {
    label.textContent = 'Die-Hard Fan 🟡';
    bar.style.width = '70%';
  } else {
    label.textContent = 'Ultras Mode 🔥';
    bar.style.width = '100%';
    triggerConfetti();
  }
}

// CONFETTI
function triggerConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#f9ca24', '#74b9ff', '#a29bfe', '#ff7675', '#55efc4', '#fd79a8'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-10px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay = Math.random() * 1 + 's';
    piece.style.width = (Math.random() * 8 + 6) + 'px';
    piece.style.height = (Math.random() * 8 + 6) + 'px';
    container.appendChild(piece);
  }
  setTimeout(() => container.innerHTML = '', 4000);
}

// INIT
switchTeam('argentina');
