(() => {
  // Sürüm 0.1 ile başlar; 0.2 … 0.99 sonrası 1.0 olur.
  const GAME_VERSION = window.__OT_VERSION || "0.26";

  const MAX_CODE = 6;
  const STEP_MS = 420;

  function boardSize() {
    const landscape = window.matchMedia("(orientation: landscape)").matches;
    if (landscape) return { cols: 10, rows: 6 };
    return { cols: 8, rows: 6 };
  }

  function midRow() {
    return Math.floor(boardSize().rows / 2);
  }

  const CHARACTERS = [
    {
      id: "elif",
      name: "Elif",
      sub: "Pembe fiyonklu",
      emoji: "👧",
      color: "#ffd6e0",
      skin: "#f6d7b0",
      hair: "#5c3317",
      clothes: "#ff8fab",
      legs: "#c73462",
    },
    {
      id: "can",
      name: "Can",
      sub: "Neşeli kahraman",
      emoji: "👦",
      color: "#d0ebff",
      skin: "#efc9a0",
      hair: "#3d2b1f",
      clothes: "#4dabf7",
      legs: "#1c7ed6",
    },
    {
      id: "lila",
      name: "Lila",
      sub: "Çiçekli saçlı",
      emoji: "👩",
      color: "#e5dbff",
      skin: "#f3c9a3",
      hair: "#6d4c9a",
      clothes: "#9775fa",
      legs: "#7048e8",
    },
    {
      id: "karamel",
      name: "Karamel",
      sub: "Minik patili",
      emoji: "🐱",
      color: "#ffe8cc",
      skin: "#e09f3e",
      hair: "#e09f3e",
      clothes: "#f4a261",
      legs: "#e09f3e",
    },
    {
      id: "ece",
      name: "Ece",
      sub: "Kızıl örgülü",
      emoji: "🧡",
      color: "#ffe0c2",
      skin: "#f8d4b8",
      hair: "#d9480f",
      clothes: "#ffd43b",
      legs: "#f59f00",
    },
    {
      id: "deniz",
      name: "Deniz",
      sub: "Dalgalı saçlı",
      emoji: "🌊",
      color: "#c5f6fa",
      skin: "#efc9a0",
      hair: "#0b7285",
      clothes: "#22b8cf",
      legs: "#0c8599",
    },
    {
      id: "pamuk",
      name: "Pamuk",
      sub: "Beyaz tavşan",
      emoji: "🐰",
      color: "#fff0f6",
      skin: "#fff8f0",
      hair: "#fff8f0",
      clothes: "#ffdeeb",
      legs: "#fcc2d7",
    },
    {
      id: "nane",
      name: "Nane",
      sub: "Nane yeşilli",
      emoji: "🌿",
      color: "#d3f9d8",
      skin: "#f6d7b0",
      hair: "#2b8a3e",
      clothes: "#69db7c",
      legs: "#37b24d",
    },
  ];

  const ROOMS = [
    {
      id: "yatak",
      name: "Yatak Odası",
      emoji: "🛏️",
      theme: "bedroom",
      furniture:
        '<div class="curtain"></div><div class="window"></div><div class="lamp"></div><div class="nightstand"></div><div class="bed"><i></i></div><div class="rug pink"></div>',
      toys: ["🧸", "🎀", "📚", "🧦", "🎈", "👗", "🪀", "👠", "🌙", "🧴", "👛", "🧸"],
    },
    {
      id: "oyun",
      name: "Oyun Odası",
      emoji: "🎲",
      theme: "playroom",
      furniture:
        '<div class="window"></div><div class="shelf"></div><div class="tent"></div><div class="blocks"></div><div class="rug mint"></div>',
      toys: ["🚗", "🧩", "🎨", "🤖", "🦄", "🚂", "🧱", "🪀", "🎯", "🎪", "🎲", "🪁"],
    },
    {
      id: "salon",
      name: "Salon",
      emoji: "🛋️",
      theme: "living",
      furniture:
        '<div class="window"></div><div class="tv"></div><div class="sofa"></div><div class="floor-lamp"></div><div class="rug lilac"></div>',
      toys: ["📚", "🖍️", "🧸", "⚽", "🎧", "🧩", "🎀", "🪀", "📱", "🌵", "🎮", "📷"],
    },
    {
      id: "bahce",
      name: "Bahçe",
      emoji: "🌳",
      theme: "garden",
      furniture:
        '<div class="sun"></div><div class="cloud-deco"></div><div class="tree"></div><div class="flowerbed"></div><div class="fence"></div><div class="sandbox"></div>',
      toys: ["⚽", "🪁", "🚲", "🪣", "🦋", "🏐", "🌸", "🧸", "🫧", "🌻", "🐛", "🪴"],
    },
    {
      id: "mutfak",
      name: "Mutfak",
      emoji: "🍳",
      theme: "kitchen",
      furniture:
        '<div class="fridge"></div><div class="stove"></div><div class="kitchen-table"></div><div class="cabinets"></div>',
      toys: ["🍎", "🍌", "🧁", "🍪", "🥄", "🥣", "🧸", "🥕", "🥛", "🍞", "🍇", "🍩"],
    },
    {
      id: "banyo",
      name: "Banyo",
      emoji: "🛁",
      theme: "bath",
      furniture:
        '<div class="tiles"></div><div class="tub"></div><div class="sink"></div><div class="mirror"></div><div class="towel"></div>',
      toys: ["🦆", "🫧", "🧴", "🧼", "🧸", "🚤", "🐚", "🪥", "🚿", "🐠", "💜", "🎀"],
    },
    {
      id: "plaj",
      name: "Plaj",
      emoji: "🏖️",
      theme: "beach",
      furniture:
        '<div class="sky-band"></div><div class="sun"></div><div class="water"></div><div class="umbrella"></div><div class="castle"></div>',
      toys: ["🐚", "🏐", "🪣", "🧸", "🍦", "🕶️", "🪁", "🐠", "🏖️", "🦋", "🌸", "🫧"],
    },
    {
      id: "atolye",
      name: "Atölye",
      emoji: "🛠️",
      theme: "workshop",
      furniture:
        '<div class="workbench"></div><div class="toolbox"></div><div class="pegboard"></div><div class="stool"></div>',
      toys: ["🚂", "🧱", "🚗", "🔧", "🧸", "🎨", "🪵", "⚙️", "🪁", "🤖", "🪀", "🎯"],
    },
  ];

  const BASKETS = [
    { id: "pembe", name: "Çilek sepet", color: "#ff8fab", rim: "#c73462" },
    { id: "mavi", name: "Gök sepet", color: "#74c0fc", rim: "#1c7ed6" },
    { id: "sari", name: "Limon sepet", color: "#ffe066", rim: "#f59f00" },
    { id: "yesil", name: "Elma sepet", color: "#8ce99a", rim: "#2f9e44" },
    { id: "mor", name: "Üzüm sepet", color: "#d0bfff", rim: "#7048e8" },
    { id: "turuncu", name: "Şeftali sepet", color: "#ffc078", rim: "#f76707" },
    { id: "kirmizi", name: "Kiraz sepet", color: "#ffa8a8", rim: "#e03131" },
    { id: "mint", name: "Nane sepet", color: "#96f2d7", rim: "#0ca678" },
  ];

  const MOVES = [
    { id: "up", label: "↑", name: "Yukarı", dx: 0, dy: -1 },
    { id: "down", label: "↓", name: "Aşağı", dx: 0, dy: 1 },
    { id: "left", label: "←", name: "Sola", dx: -1, dy: 0 },
    { id: "right", label: "→", name: "Sağa", dx: 1, dy: 0 },
  ];

  const DIR_MARK = `<svg class="dir-arrow" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" d="M12 2.8 20.6 13.4c.5.6.1 1.6-.7 1.6h-4.1v6.2c0 .9-.7 1.6-1.6 1.6h-3.4c-.9 0-1.6-.7-1.6-1.6v-6.2H4.1c-.8 0-1.2-1-.7-1.6L12 2.8z"/></svg>`;

  const BOT = {
    kolay: { delay: 1400, mistake: 0.4, stepMs: 560, label: "Kolay" },
    orta: { delay: 800, mistake: 0.12, stepMs: 420, label: "Orta" },
    zor: { delay: 350, mistake: 0, stepMs: 260, label: "Zor" },
  };

  const CHEERS = ["Aferin!", "Süper!", "Harika!", "Bravo!", "Yaşasın!", "Çok güzel!"];

  const ACTOR_HTML = `
    <div class="char-fit">
    <div class="char-shadow"></div>
    <div class="char-figure">
      <div class="char-hair-back"></div>
      <div class="char-ear left"></div>
      <div class="char-ear right"></div>
      <div class="char-head">
        <div class="char-blush left"></div>
        <div class="char-blush right"></div>
        <div class="char-eye left"><i></i></div>
        <div class="char-eye right"><i></i></div>
        <div class="char-nose"></div>
        <div class="char-smile"></div>
        <div class="char-bow"></div>
      </div>
      <div class="char-hair-front"></div>
      <div class="char-body">
        <div class="char-arm left"></div>
        <div class="char-arm right"></div>
        <div class="char-basket">
          <div class="basket-handle"></div>
          <div class="basket-body"><span class="basket-peek"></span></div>
        </div>
      </div>
      <div class="char-legs">
        <div class="char-leg left"></div>
        <div class="char-leg right"></div>
      </div>
    </div>
    <div class="char-label"></div>
    </div>
  `;

  const state = {
    screen: "home",
    pickStep: 1,
    pickKind: "character",
    players: { p1: null, p2: null },
    room: ROOMS[0],
    toys: [],
    cols: 8,
    rows: 6,
    ended: false,
    sound: localStorage.getItem("ot-sound") !== "off",
    completed: JSON.parse(localStorage.getItem("ot-done") || "[]"),
    vsBot: false,
    difficulty: localStorage.getItem("ot-diff") || "orta",
    botToken: null,
    turn: "p1",
    audio: null,
    run: { p1: null, p2: null },
    renameId: null,
    padSwipe: null,
    padSwiped: false,
    user: null,
    authMode: "login",
    parent: {
      limit: 0,
      usedMs: 0,
      day: "",
      lastTick: Date.now(),
    },
  };

  function emptyPlayer(id, startCol, startRow) {
    return {
      id,
      char: null,
      col: startCol,
      row: startRow,
      queue: [],
      running: false,
      collected: [],
      basket: null,
      isBot: false,
      stepIndex: -1,
    };
  }

  const $ = (id) => document.getElementById(id);
  const screens = {
    login: $("screen-login"),
    home: $("screen-home"),
    character: $("screen-character"),
    room: $("screen-room"),
    play: $("screen-play"),
    win: $("screen-win"),
  };

  function show(name) {
    state.screen = name;
    if (name !== "character") closeNameModal();
    Object.entries(screens).forEach(([key, el]) => {
      el.classList.toggle("active", key === name);
    });
    const app = document.getElementById("app");
    app.classList.toggle("playing", name === "play");
    const showBack = name !== "home" && name !== "win" && name !== "login";
    $("btn-back").hidden = !showBack;
    app.classList.toggle("has-back", showBack);
  }

  function goBack() {
    playTapSound();
    if (state.screen === "play") {
      stopRuns();
      renderRooms();
      show("room");
      return;
    }
    if (state.screen === "room") {
      state.pickStep = state.vsBot ? 1 : 2;
      state.pickKind = "basket";
      renderPicks();
      show("character");
      return;
    }
    if (state.screen !== "character") return;
    if (state.pickKind === "basket") {
      state.pickKind = "character";
      renderPicks();
      return;
    }
    if (state.pickStep === 2) {
      state.pickStep = 1;
      state.pickKind = "basket";
      renderPicks();
      return;
    }
    resetPicks();
    show("home");
  }

  function audioCtx() {
    if (!state.audio) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      state.audio = new Ctx();
    }
    if (state.audio.state === "suspended") state.audio.resume();
    return state.audio;
  }

  function tone(freq, dur, type = "sine", gain = 0.12) {
    if (!state.sound) return;
    const ctx = audioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  }

  function playCollectSound() {
    tone(523, 0.12, "triangle", 0.1);
    setTimeout(() => tone(659, 0.12, "triangle", 0.1), 80);
    setTimeout(() => tone(784, 0.18, "triangle", 0.1), 160);
  }

  function playWinSound() {
    [523, 659, 784, 1046].forEach((f, i) => {
      setTimeout(() => tone(f, 0.22, "triangle", 0.12), i * 140);
    });
  }

  function playTapSound() {
    tone(440, 0.08, "square", 0.05);
  }

  function playBumpSound() {
    tone(180, 0.12, "square", 0.06);
  }

  function saveDone() {
    if (!state.completed.includes(state.room.id)) {
      state.completed.push(state.room.id);
      localStorage.setItem("ot-done", JSON.stringify(state.completed));
    }
  }

  function loadCustomNames() {
    try {
      return JSON.parse(localStorage.getItem("ot-names") || "{}");
    } catch (err) {
      return {};
    }
  }

  function displayName(char) {
    if (!char) return "";
    const custom = loadCustomNames()[char.id];
    return (custom && String(custom).trim()) || char.name;
  }

  function cloneChar(char) {
    return { ...char, name: displayName(char) };
  }

  function cleanName(raw, fallback) {
    const name = String(raw || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 12);
    return name || fallback;
  }

  function saveCustomName(id, name) {
    const names = loadCustomNames();
    const fallback = CHARACTERS.find((c) => c.id === id)?.name || "Oyuncu";
    const next = cleanName(name, fallback);
    if (next === fallback) delete names[id];
    else names[id] = next;
    localStorage.setItem("ot-names", JSON.stringify(names));
    ["p1", "p2"].forEach((pid) => {
      const player = state.players[pid];
      if (player?.char?.id === id) player.char.name = next;
    });
    return next;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function openNameModal(charId) {
    const char = CHARACTERS.find((c) => c.id === charId);
    if (!char) return;
    state.renameId = charId;
    $("name-modal-title").textContent = `${displayName(char)} için yeni isim`;
    $("name-input").value = displayName(char);
    $("name-modal").hidden = false;
    requestAnimationFrame(() => {
      const input = $("name-input");
      input.focus();
      input.select();
    });
  }

  function closeNameModal() {
    state.renameId = null;
    $("name-modal").hidden = true;
  }

  function confirmNameModal() {
    if (!state.renameId) return;
    saveCustomName(state.renameId, $("name-input").value);
    closeNameModal();
    playTapSound();
    renderPicks();
  }

  function pickedChips() {
    const chips = [];
    ["p1", "p2"].forEach((id, index) => {
      const p = state.players[id];
      if (!p?.char) return;
      const basket = p.basket ? ` ${p.basket.name}` : "";
      chips.push(
        `<div class="picked-chip" style="background:${p.char.color}">${index + 1}. ${p.char.emoji} ${p.char.name}${basket}</div>`
      );
    });
    $("picked-row").innerHTML = chips.join("");
  }

  function miniChar(c) {
    return `<div class="mini-char" data-id="${c.id}" style="--skin:${c.skin};--hair:${c.hair};--clothes:${c.clothes}">
      <div class="mini-ear left"></div>
      <div class="mini-ear right"></div>
      <div class="mini-hair"></div>
      <div class="mini-head">
        <span class="mini-eye left"></span>
        <span class="mini-eye right"></span>
        <span class="mini-smile"></span>
      </div>
      <div class="mini-body"></div>
    </div>`;
  }

  function renderCharacters() {
    const taken = state.pickStep === 2 && state.players.p1?.char ? state.players.p1.char.id : null;
    $("character-grid").classList.add("picks");
    $("character-grid").innerHTML = CHARACTERS.map((c) => {
      const takenClass = taken === c.id ? "taken" : "";
      return `
        <div class="pick-card cute ${takenClass}" data-character="${c.id}" style="--card:${c.color}" ${
          taken === c.id ? "" : 'role="button" tabindex="0"'
        }>
          ${miniChar(c)}
          <button type="button" class="char-name" data-rename="${c.id}">${escapeHtml(
            displayName(c)
          )}</button>
          <span class="sub">${c.sub}</span>
        </div>`;
    }).join("");

    $("char-title").textContent = state.vsBot
      ? "Sen kimsin?"
      : state.pickStep === 1
        ? "1. oyuncu kim?"
        : "2. oyuncu kim?";
    $("char-hint").textContent = state.vsBot
      ? "Karakterini seç. İsme dokunursan adı değişir."
      : state.pickStep === 1
        ? "Solda oynayacak karakteri seç. İsme dokunursan adı değişir."
        : "Sağda oynayacak karakteri seç. İsme dokunursan adı değişir.";
    pickedChips();
  }

  function renderBaskets() {
    const player = state.pickStep === 1 ? state.players.p1 : state.players.p2;
    const taken = state.pickStep === 2 ? state.players.p1?.basket?.id : null;
    $("character-grid").classList.add("picks");
    $("character-grid").innerHTML = BASKETS.map(
      (b) => `
        <button class="pick-card cute" type="button" data-basket="${b.id}" ${
          taken === b.id ? "disabled" : ""
        } style="--card:${b.color}">
          <div class="basket-preview" style="--basket:${b.color}; --basket-rim:${b.rim}">
            <i class="handle"></i>
            <i class="body"></i>
            <i class="bow"></i>
          </div>
          <strong>${b.name}</strong>
          <span class="sub">Elde taşınır</span>
        </button>`
    ).join("");
    $("char-title").textContent = `${player.char.name} hangi sepeti alsın?`;
    $("char-hint").textContent = "Seçtiğin sepet sahnede karakterin elinde durur.";
    pickedChips();
  }

  function renderPicks() {
    if (state.pickKind === "basket") renderBaskets();
    else renderCharacters();
  }

  function renderRooms() {
    $("room-grid").innerHTML = ROOMS.map((r) => {
      const done = state.completed.includes(r.id);
      return `
        <button class="pick-card ${done ? "done" : ""}" type="button" data-room="${r.id}">
          <div class="avatar" style="background:#fff3e0">${r.emoji}</div>
          <strong>${r.name}</strong>
          <span class="sub">${r.toys.length} oyuncak${done ? " · ⭐" : ""}</span>
        </button>`;
    }).join("");
  }

  function styleActor(el, player) {
    const char = player.char;
    el.dataset.id = char.id;
    el.style.setProperty("--skin", char.skin);
    el.style.setProperty("--hair", char.hair);
    el.style.setProperty("--clothes", char.clothes);
    el.style.setProperty("--legs", char.legs);
    if (player.basket) {
      el.dataset.basket = player.basket.id;
      el.style.setProperty("--basket", player.basket.color);
      el.style.setProperty("--basket-rim", player.basket.rim);
    }
    el.querySelector(".char-label").textContent = char.name;
    placeActor(el, player);
  }

  function placeActor(el, player) {
    el.style.left = `${((player.col + 0.5) / state.cols) * 100}%`;
    el.style.top = `${((player.row + 0.5) / state.rows) * 100}%`;
  }

  function randomToyCells(count) {
    const blocked = new Set([
      `0,${midRow()}`,
      `${state.cols - 1},${midRow()}`,
    ]);
    const free = [];
    for (let row = 0; row < state.rows; row += 1) {
      for (let col = 0; col < state.cols; col += 1) {
        const key = `${col},${row}`;
        if (!blocked.has(key)) free.push({ col, row });
      }
    }
    for (let i = free.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [free[i], free[j]] = [free[j], free[i]];
    }
    return free.slice(0, count);
  }

  function startRoom(room) {
    if (timeIsUp()) {
      lockPlayTime();
      return;
    }
    stopRuns();
    const size = boardSize();
    state.cols = size.cols;
    state.rows = size.rows;
    state.room = room;
    state.ended = false;
    state.turn = "p1";
    state.players.p1 = {
      ...emptyPlayer("p1", 0, midRow()),
      char: state.players.p1.char,
      basket: state.players.p1.basket,
    };
    state.players.p2 = {
      ...emptyPlayer("p2", state.cols - 1, midRow()),
      char: state.players.p2.char,
      basket: state.players.p2.basket,
      isBot: state.players.p2.isBot,
    };

    const spots = randomToyCells(room.toys.length);
    state.toys = room.toys.map((emoji, index) => ({
      id: `${room.id}-${index}`,
      emoji,
      col: spots[index].col,
      row: spots[index].row,
    }));

    $("play-room-emoji").textContent = room.emoji;
    $("play-room-name").textContent = room.name;
    $("furniture").innerHTML = room.furniture;
    $("room-stage").className = `room-stage ${room.theme}`;

    renderBoard();
    renderDocks();
    updateScoreboard();
    show("play");
  }

  function syncCellFit() {
    const stage = $("room-stage");
    const cell = $("board")?.querySelector(".cell");
    if (!stage) return;
    stage.style.setProperty("--cols", String(state.cols));
    stage.style.setProperty("--rows", String(state.rows));
    if (!cell) return;
    const { width, height } = cell.getBoundingClientRect();
    if (!width || !height) return;
    const scale = Math.min(width / 58, (height - 4) / 108, 1);
    stage.style.setProperty("--piece-scale", String(Math.max(0.38, scale)));
  }

  function renderBoard() {
    const board = $("board");
    board.style.setProperty("--cols", state.cols);
    board.style.setProperty("--rows", state.rows);
    $("room-stage").style.setProperty("--cols", state.cols);
    $("room-stage").style.setProperty("--rows", state.rows);
    const cells = [];
    for (let row = 0; row < state.rows; row += 1) {
      for (let col = 0; col < state.cols; col += 1) {
        const toy = state.toys.find((t) => t.col === col && t.row === row);
        cells.push(
          `<div class="cell" data-col="${col}" data-row="${row}">${
            toy ? `<span class="cell-toy">${toy.emoji}</span>` : ""
          }</div>`
        );
      }
    }
    board.innerHTML = cells.join("");
    $("actors").innerHTML = `
      <div id="actor-p1" class="character actor" data-side="left">${ACTOR_HTML}</div>
      <div id="actor-p2" class="character actor" data-side="right">${ACTOR_HTML}</div>`;
    styleActor($("actor-p1"), state.players.p1);
    styleActor($("actor-p2"), state.players.p2);
    requestAnimationFrame(syncCellFit);
  }

  function refreshToys() {
    document.querySelectorAll(".cell").forEach((cell) => {
      const col = Number(cell.dataset.col);
      const row = Number(cell.dataset.row);
      const toy = state.toys.find((t) => t.col === col && t.row === row);
      cell.innerHTML = toy ? `<span class="cell-toy">${toy.emoji}</span>` : "";
    });
  }

  function toyPile(items) {
    if (!items.length) {
      return `<p class="toy-pile empty">Henüz oyuncak yok</p>`;
    }
    return `<div class="toy-pile">${items
      .map((t) => `<span title="oyuncak">${t.emoji}</span>`)
      .join("")}</div>`;
  }

  function playerSummary(player, extraClass = "", showToys = true) {
    const side = player.id === "p1" ? "1. oyuncu" : "2. oyuncu";
    const count = player.collected.length;
    return `
      <article class="player-card ${player.id} ${extraClass}">
        <div class="player-card-top">
          <span class="player-face" style="background:${player.char.color}">${player.char.emoji}</span>
          <div class="player-meta">
            <small>${player.isBot ? `Bot · ${BOT[state.difficulty].label}` : side}</small>
            <strong>${player.char.name}</strong>
          </div>
          <div class="player-points">
            <b>${count}</b>
            <small>oyuncak</small>
          </div>
        </div>
        ${showToys ? toyPile(player.collected) : ""}
      </article>`;
  }

  function renderDock(playerId) {
    const player = state.players[playerId];
    const side = playerId === "p1" ? "1. oyuncu" : "2. oyuncu";
    const keys = "Kaydır veya dokun";
    const myTurn = state.turn === playerId && !player.running && !state.ended;
    const queue = player.queue
      .map(
        (cmd, i) =>
          `<span class="code-chip dir-${cmd.id} ${player.stepIndex === i ? "current" : ""}">${DIR_MARK}</span>`
      )
      .join("");
    const countLabel = `${player.queue.length}/${MAX_CODE}`;
    const dock = $(`dock-${playerId}`);
    dock.classList.toggle("waiting", !myTurn && !player.running);
    dock.classList.toggle("active-turn", myTurn || player.running);

    dock.innerHTML = player.isBot
      ? `
      <p class="dock-side">Bot · ${BOT[state.difficulty].label}</p>
      <div class="code-queue">${
        queue || `<span class="code-empty">${myTurn ? "Bot 6 yön yazacak" : "Sıra rakipte"}</span>`
      }</div>
      <p class="bot-note">${player.running ? "Bot ilerliyor" : myTurn ? "Sıra botta" : "Bekliyor"} · ${countLabel}</p>
      <div class="collected-well" style="--basket:${player.basket?.color || "#fff6ea"}; --basket-rim:${player.basket?.rim || "#d4a574"}">
        <p class="collected-label">Toplananlar</p>
        ${
          player.collected.length
            ? `<div class="collected-toys">${player.collected
                .map((t) => `<span>${t.emoji}</span>`)
                .join("")}</div>`
            : `<p class="collected-empty">Toplanan oyuncaklar burada</p>`
        }
      </div>`
      : `
      <p class="dock-side">${side}${myTurn ? " · sıra sende" : player.running ? " · gidiyor" : " · bekle"}</p>
      <div class="code-queue" data-player="${playerId}">${
        queue || `<span class="code-empty">${myTurn ? "Kaydır veya oka dokun" : "Sıra rakipte"}</span>`
      }</div>
      <div class="code-pad" data-player="${playerId}">
        <span class="pad-gap"></span>
        <button type="button" class="code-btn dir-up" data-move="up" aria-label="Yukarı" ${
          !myTurn || player.queue.length >= MAX_CODE ? "disabled" : ""
        }>${DIR_MARK}</button>
        <span class="pad-gap"></span>
        <button type="button" class="code-btn dir-left" data-move="left" aria-label="Sola" ${
          !myTurn || player.queue.length >= MAX_CODE ? "disabled" : ""
        }>${DIR_MARK}</button>
        <span class="pad-hub" aria-hidden="true"></span>
        <button type="button" class="code-btn dir-right" data-move="right" aria-label="Sağa" ${
          !myTurn || player.queue.length >= MAX_CODE ? "disabled" : ""
        }>${DIR_MARK}</button>
        <span class="pad-gap"></span>
        <button type="button" class="code-btn dir-down" data-move="down" aria-label="Aşağı" ${
          !myTurn || player.queue.length >= MAX_CODE ? "disabled" : ""
        }>${DIR_MARK}</button>
        <span class="pad-gap"></span>
      </div>
      <div class="dock-actions">
        <button type="button" class="run-btn" data-run="${playerId}" ${
          !myTurn || player.queue.length !== MAX_CODE ? "disabled" : ""
        }>▶ Çalıştır (${countLabel})</button>
        <button type="button" class="erase-btn" data-erase="${playerId}" ${
          !myTurn || player.queue.length === 0 ? "disabled" : ""
        }><span aria-hidden="true">🧽</span> Sil</button>
      </div>
      <p class="dock-keys">${keys}</p>
      <div class="collected-well" style="--basket:${player.basket?.color || "#fff6ea"}; --basket-rim:${player.basket?.rim || "#d4a574"}">
        <p class="collected-label">Toplananlar</p>
        ${
          player.collected.length
            ? `<div class="collected-toys">${player.collected
                .map((t) => `<span>${t.emoji}</span>`)
                .join("")}</div>`
            : `<p class="collected-empty">Toplanan oyuncaklar burada</p>`
        }
      </div>
    `;
  }

  function renderDocks() {
    renderDock("p1");
    renderDock("p2");
  }

  function updateScoreboard() {
    const a = state.players.p1;
    const b = state.players.p2;
    const left = state.toys.length;
    const total = a.collected.length + b.collected.length + left;
    const p1w = total ? (a.collected.length / total) * 100 : 50;
    const p2w = total ? (b.collected.length / total) * 100 : 50;
    $("scoreboard").innerHTML = `
      ${playerSummary(a, "", false)}
      <div class="hud-mid">
        <div class="remain-chip">
          <span>🧸</span>
          <b>${left}</b>
          <small>kaldı</small>
        </div>
        <div class="vs-bar" aria-hidden="true">
          <i class="p1" style="width:${p1w}%"></i>
          <i class="left" style="width:${total ? (left / total) * 100 : 0}%"></i>
          <i class="p2" style="width:${p2w}%"></i>
        </div>
      </div>
      ${playerSummary(b, "", false)}
    `;
  }

  function addCommand(playerId, moveId) {
    const player = state.players[playerId];
    if (!player || player.running || player.isBot || state.ended) return;
    if (state.turn !== playerId) return;
    if (player.queue.length >= MAX_CODE) return;
    const move = MOVES.find((m) => m.id === moveId);
    if (!move) return;
    player.queue.push({ ...move });
    playTapSound();
    renderDock(playerId);
  }

  function eraseCommand(playerId) {
    const player = state.players[playerId];
    if (!player || player.running || player.isBot || state.ended) return;
    if (state.turn !== playerId) return;
    player.queue.pop();
    playTapSound();
    renderDock(playerId);
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function stopRuns() {
    if (state.botToken) state.botToken.cancelled = true;
    ["p1", "p2"].forEach((id) => {
      if (state.run[id]) {
        state.run[id].cancelled = true;
        state.run[id] = null;
      }
      if (state.players[id]) state.players[id].running = false;
    });
  }

  function botPath(fromCol, fromRow, toCol, toRow) {
    const key = (c, r) => `${c},${r}`;
    const start = key(fromCol, fromRow);
    const goal = key(toCol, toRow);
    const prev = { [start]: null };
    const queue = [[fromCol, fromRow]];
    while (queue.length) {
      const [c, r] = queue.shift();
      if (key(c, r) === goal) break;
      MOVES.forEach((move) => {
        const nc = c + move.dx;
        const nr = r + move.dy;
        const k = key(nc, nr);
        if (nc < 0 || nr < 0 || nc >= state.cols || nr >= state.rows) return;
        if (k in prev) return;
        prev[k] = { c, r, move };
        queue.push([nc, nr]);
      });
    }
    if (!(goal in prev)) return [];
    const moves = [];
    let cur = { c: toCol, r: toRow };
    while (prev[key(cur.c, cur.r)]) {
      const step = prev[key(cur.c, cur.r)];
      moves.unshift(step.move);
      cur = { c: step.c, r: step.r };
    }
    return moves;
  }

  function validMove(col, row, move) {
    const nc = col + move.dx;
    const nr = row + move.dy;
    return nc >= 0 && nr >= 0 && nc < state.cols && nr < state.rows;
  }

  function randomStep(col, row) {
    const opts = MOVES.filter((m) => validMove(col, row, m));
    return { ...(opts[Math.floor(Math.random() * opts.length)] || MOVES[0]) };
  }

  function botPlan(cfg) {
    const bot = state.players.p2;
    if (!bot) return [];
    let col = bot.col;
    let row = bot.row;
    let remaining = [...state.toys];
    const path = [];
    while (path.length < MAX_CODE) {
      remaining.sort(
        (a, b) =>
          Math.abs(a.col - col) +
          Math.abs(a.row - row) -
          (Math.abs(b.col - col) + Math.abs(b.row - row))
      );
      let target = remaining[0];
      if (cfg.mistake && Math.random() < cfg.mistake && remaining.length > 1) {
        target = remaining[1];
      }
      if (!target) {
        const step = randomStep(col, row);
        path.push(step);
        if (validMove(col, row, step)) {
          col += step.dx;
          row += step.dy;
        }
        continue;
      }
      if (target.col === col && target.row === row) {
        remaining = remaining.filter((t) => t.id !== target.id);
        continue;
      }
      const toToy = botPath(col, row, target.col, target.row);
      let step = toToy[0] || randomStep(col, row);
      if (cfg.mistake && Math.random() < cfg.mistake) step = randomStep(col, row);
      path.push({ ...step });
      if (validMove(col, row, step)) {
        col += step.dx;
        row += step.dy;
      }
      if (remaining.some((t) => t.col === col && t.row === row && t.id === target.id)) {
        remaining = remaining.filter((t) => t.id !== target.id);
      }
    }
    return path.slice(0, MAX_CODE);
  }

  async function playBotTurn() {
    if (!state.vsBot || state.ended || state.turn !== "p2") return;
    const cfg = BOT[state.difficulty] || BOT.orta;
    renderDocks();
    await wait(cfg.delay);
    if (state.ended || state.turn !== "p2") return;
    const plan = botPlan(cfg);
    while (plan.length < MAX_CODE) plan.push(randomStep(state.players.p2.col, state.players.p2.row));
    state.players.p2.queue = plan.slice(0, MAX_CODE);
    await runProgram("p2");
  }

  async function runProgram(playerId) {
    const player = state.players[playerId];
    if (!player || player.running || player.queue.length !== MAX_CODE || state.ended) return;
    if (state.turn !== playerId) return;

    const token = { cancelled: false };
    state.run[playerId] = token;
    player.running = true;
    const program = [...player.queue];
    renderDock(playerId);

    const stepMs = player.isBot
      ? (BOT[state.difficulty] || BOT.orta).stepMs
      : STEP_MS;
    const actor = $(`actor-${playerId}`);
    actor.classList.add("walking");

    for (let i = 0; i < program.length; i += 1) {
      if (token.cancelled || state.ended) break;
      player.stepIndex = i;
      renderDock(playerId);
      await stepMove(player, program[i]);
      if (token.cancelled || state.ended) break;
      maybeCollect(player);
      if (state.ended) break;
      await wait(stepMs);
    }

    actor.classList.remove("walking", "bump");
    player.queue = [];
    player.stepIndex = -1;
    player.running = false;
    if (state.run[playerId] === token) state.run[playerId] = null;
    if (!state.ended) {
      state.turn = playerId === "p1" ? "p2" : "p1";
      renderDocks();
      if (state.players[state.turn]?.isBot) playBotTurn();
    }
  }

  async function stepMove(player, move) {
    const nextCol = player.col + move.dx;
    const nextRow = player.row + move.dy;
    const actor = $(`actor-${player.id}`);
    if (nextCol < 0 || nextCol >= state.cols || nextRow < 0 || nextRow >= state.rows) {
      playBumpSound();
      actor.classList.add("bump");
      await wait(180);
      actor.classList.remove("bump");
      return;
    }
    player.col = nextCol;
    player.row = nextRow;
    placeActor(actor, player);
  }

  function maybeCollect(player) {
    const toyIndex = state.toys.findIndex(
      (t) => t.col === player.col && t.row === player.row
    );
    if (toyIndex < 0) return;

    const toy = state.toys[toyIndex];
    state.toys.splice(toyIndex, 1);
    player.collected.push(toy);

    const actor = $(`actor-${player.id}`);
    actor.classList.add("happy");
    const basket = actor.querySelector(".char-basket");
    const peek = actor.querySelector(".basket-peek");
    if (peek) peek.textContent = toy.emoji;
    if (basket) {
      basket.classList.add("catch");
      setTimeout(() => basket.classList.remove("catch"), 380);
    }
    setTimeout(() => actor.classList.remove("happy"), 400);
    playCollectSound();
    cheer(`${player.char.name}: ${toy.emoji}`);
    if (navigator.vibrate) navigator.vibrate(30);
    refreshToys();
    updateScoreboard();
    renderDock(player.id);

    if (state.toys.length === 0) finishMatch();
  }

  function cheer(text) {
    const el = $("cheer");
    el.textContent = text || CHEERS[Math.floor(Math.random() * CHEERS.length)];
    el.hidden = false;
    clearTimeout(cheer._t);
    cheer._t = setTimeout(() => {
      el.hidden = true;
    }, 700);
  }

  function finishMatch() {
    if (state.ended) return;
    state.ended = true;
    stopRuns();
    saveDone();
    playWinSound();

    const a = state.players.p1;
    const b = state.players.p2;
    const scoreA = a.collected.length;
    const scoreB = b.collected.length;

    let title;
    let text;
    let stars;
    if (scoreA > scoreB) {
      title = `${a.char.name} kazandı!`;
      text = `${a.char.emoji} ${scoreA} oyuncak topladı.`;
      stars = "⭐ ⭐ ⭐";
    } else if (scoreB > scoreA) {
      title = `${b.char.name} kazandı!`;
      text = `${b.char.emoji} ${scoreB} oyuncak topladı.`;
      stars = "⭐ ⭐ ⭐";
    } else {
      title = "Berabere!";
      text = "İkiniz de aynı sayıda oyuncak topladınız.";
      stars = "⭐ ⭐";
    }

    $("win-title").textContent = title;
    $("win-text").textContent = text;
    $("win-stars").textContent = stars;
    const sum = Math.max(1, scoreA + scoreB);
    $("win-scores").innerHTML = `
      <div class="vs-bar big" aria-hidden="true">
        <i class="p1" style="width:${(scoreA / sum) * 100}%"></i>
        <i class="p2" style="width:${(scoreB / sum) * 100}%"></i>
      </div>
      ${playerSummary(a, scoreA >= scoreB ? "winner" : "")}
      ${playerSummary(b, scoreB >= scoreA ? "winner" : "")}
    `;
    burstConfetti();
    setTimeout(() => show("win"), 450);
  }

  function burstConfetti() {
    const box = $("confetti");
    box.innerHTML = "";
    const bits = ["🎈", "⭐", "🧸", "🌸", "🎉", "💜", "💛", "🩵"];
    for (let i = 0; i < 28; i += 1) {
      const span = document.createElement("span");
      span.textContent = bits[i % bits.length];
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDelay = `${Math.random() * 0.8}s`;
      span.style.animationDuration = `${2 + Math.random()}s`;
      box.appendChild(span);
    }
  }

  function nextRoom() {
    const index = ROOMS.findIndex((r) => r.id === state.room.id);
    startRoom(ROOMS[(index + 1) % ROOMS.length]);
  }

  function updateSoundButton() {
    ["sound-btn", "sound-btn-play"].forEach((id) => {
      const btn = $(id);
      if (!btn) return;
      btn.textContent = state.sound ? "🔊" : "🔇";
      btn.classList.toggle("muted", !state.sound);
    });
  }

  function toggleSound() {
    state.sound = !state.sound;
    localStorage.setItem("ot-sound", state.sound ? "on" : "off");
    updateSoundButton();
    if (state.sound) playTapSound();
  }

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function parentStorageKey() {
    return `ot-parent-${state.user?.id || "guest"}`;
  }

  function saveParent() {
    if (!state.user) return;
    localStorage.setItem(
      parentStorageKey(),
      JSON.stringify({
        limit: state.parent.limit,
        usedMs: Math.floor(state.parent.usedMs),
        day: state.parent.day,
      })
    );
  }

  function loadParentSettings() {
    const day = todayKey();
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(parentStorageKey()) || "{}");
    } catch (err) {
      saved = {};
    }
    if (!saved.limit && !saved.day && localStorage.getItem("ot-limit")) {
      saved = {
        limit: Number(localStorage.getItem("ot-limit") || 0),
        usedMs: Number(localStorage.getItem("ot-used") || 0),
        day: localStorage.getItem("ot-day") || day,
      };
    }
    state.parent.day = day;
    state.parent.limit = Number(saved.limit || 0);
    state.parent.usedMs = saved.day === day ? Number(saved.usedMs || 0) : 0;
    state.parent.lastTick = Date.now();
    saveParent();
  }

  function rollParentDay() {
    const day = todayKey();
    if (state.parent.day !== day) {
      state.parent.day = day;
      state.parent.usedMs = 0;
      saveParent();
    }
  }

  function parentLimitMs() {
    return state.parent.limit * 60 * 1000;
  }

  function timeIsUp() {
    if (!state.parent.limit) return false;
    rollParentDay();
    return state.parent.usedMs >= parentLimitMs();
  }

  function sessionCounts() {
    return ["character", "room", "play", "win"].includes(state.screen);
  }

  function lockPlayTime() {
    stopRuns();
    $("time-lock").hidden = false;
  }

  function unlockPlayTime() {
    $("time-lock").hidden = true;
  }

  function tickParent() {
    rollParentDay();
    const now = Date.now();
    const last = state.parent.lastTick || now;
    const delta = now - last;
    state.parent.lastTick = now;
    if (document.hidden || !state.parent.limit || !$("time-lock").hidden) return;
    if (!sessionCounts()) return;
    state.parent.usedMs += delta;
    if (state.parent.usedMs >= parentLimitMs()) {
      state.parent.usedMs = parentLimitMs();
      saveParent();
      lockPlayTime();
    } else {
      saveParent();
    }
  }

  function openParentModal() {
    if (!state.user) {
      show("login");
      return;
    }
    playTapSound();
    $("parent-title").textContent = "Ebeveyn";
    $("parent-hint").textContent = "Bugün ne kadar oynasın?";
    $("parent-user").textContent = state.user.name ? `Hesap: ${state.user.name}` : "";
    $("parent-limits").hidden = false;
    document.querySelectorAll(".limit-btn").forEach((btn) => {
      btn.classList.toggle("on", Number(btn.dataset.limit) === state.parent.limit);
    });
    $("parent-modal").hidden = false;
  }

  function confirmParentModal() {
    closeParentModal();
  }

  function setParentLimit(minutes) {
    state.parent.limit = minutes;
    saveParent();
    document.querySelectorAll(".limit-btn").forEach((btn) => {
      btn.classList.toggle("on", Number(btn.dataset.limit) === minutes);
    });
    playTapSound();
    if (!timeIsUp()) unlockPlayTime();
    else lockPlayTime();
  }

  function closeParentModal() {
    $("parent-modal").hidden = true;
  }

  function hexFromBuffer(buf) {
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async function hashSecret(value, salt) {
    const data = new TextEncoder().encode(`${salt}:${value}`);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return hexFromBuffer(buf);
  }

  function nameKey(name) {
    return String(name || "")
      .trim()
      .toLocaleLowerCase("tr")
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]/g, "");
  }

  function readAccounts() {
    try {
      return JSON.parse(localStorage.getItem("ot-accounts") || "[]");
    } catch (err) {
      return [];
    }
  }

  function writeAccounts(list) {
    localStorage.setItem("ot-accounts", JSON.stringify(list));
  }

  function firebaseOn() {
    return Boolean(window.firebase && window.OT_FIREBASE?.apiKey);
  }

  function initFirebase() {
    if (!window.OT_FIREBASE?.apiKey || !window.firebase) return;
    if (firebase.apps && firebase.apps.length) return;
    firebase.initializeApp(window.OT_FIREBASE);
  }

  function setLoginError(text) {
    const el = $("login-error");
    if (!text) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = text;
  }

  function setAuthMode(mode) {
    state.authMode = mode;
    const register = mode === "register";
    $("login-tagline").textContent = register ? "Aile hesabı oluştur." : "Aile hesabınla gir.";
    $("btn-login").textContent = register ? "Kayıt ol" : "Giriş yap";
    $("btn-auth-mode").textContent = register ? "Hesabın var mı? Giriş yap" : "Hesabın yok mu? Kayıt ol";
    $("login-pass2-wrap").hidden = !register;
    $("login-pass2").required = register;
    $("login-pass").autocomplete = register ? "new-password" : "current-password";
    setLoginError("");
  }

  function enterApp(user) {
    state.user = user;
    localStorage.setItem("ot-session-user", JSON.stringify(user));
    loadParentSettings();
    if (timeIsUp()) lockPlayTime();
    else unlockPlayTime();
    show("home");
  }

  function logoutUser() {
    localStorage.removeItem("ot-session-user");
    state.user = null;
    closeParentModal();
    unlockPlayTime();
    if (firebaseOn()) {
      firebase.auth().signOut().catch(() => {});
    }
    $("login-pass").value = "";
    $("login-pass2").value = "";
    setAuthMode("login");
    show("login");
  }

  async function registerLocal(name, pass) {
    const key = nameKey(name);
    if (key.length < 2) throw new Error("İsim en az 2 harf olsun.");
    if (pass.length < 4) throw new Error("Şifre en az 4 karakter olsun.");
    const accounts = readAccounts();
    if (accounts.some((a) => a.key === key)) throw new Error("Bu isim alınmış. Giriş yap veya başka isim dene.");
    const salt = hexFromBuffer(crypto.getRandomValues(new Uint8Array(8)));
    const hash = await hashSecret(pass, salt);
    const user = { id: `local-${key}`, name: name.trim(), key, salt, hash, via: "password" };
    accounts.push(user);
    writeAccounts(accounts);
    return { id: user.id, name: user.name, via: "password" };
  }

  async function loginLocal(name, pass) {
    const key = nameKey(name);
    const accounts = readAccounts();
    const found = accounts.find((a) => a.key === key);
    if (!found) throw new Error("Bu isimle hesap yok. Kayıt ol.");
    const hash = await hashSecret(pass, found.salt);
    if (hash !== found.hash) throw new Error("Şifre uyuşmadı.");
    return { id: found.id, name: found.name, via: "password" };
  }

  async function registerFirebase(name, pass) {
    const key = nameKey(name);
    const email = `${key}@oyuncak-toplama.web.app`;
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, pass);
    await cred.user.updateProfile({ displayName: name.trim() });
    return { id: cred.user.uid, name: name.trim(), via: "password" };
  }

  async function loginFirebase(name, pass) {
    const key = nameKey(name);
    const email = `${key}@oyuncak-toplama.web.app`;
    const cred = await firebase.auth().signInWithEmailAndPassword(email, pass);
    return { id: cred.user.uid, name: cred.user.displayName || name.trim(), via: "password" };
  }

  async function submitAuth(event) {
    event.preventDefault();
    const name = $("login-name").value.trim();
    const pass = $("login-pass").value;
    const pass2 = $("login-pass2").value;
    setLoginError("");
    try {
      if (state.authMode === "register") {
        if (pass !== pass2) throw new Error("Şifreler aynı değil.");
        let user;
        if (firebaseOn()) {
          try {
            user = await registerFirebase(name, pass);
          } catch (err) {
            if (err.code === "auth/email-already-in-use") throw new Error("Bu isim alınmış. Giriş yap.");
            if (err.code === "auth/weak-password") throw new Error("Şifre en az 6 karakter olsun.");
            user = await registerLocal(name, pass);
          }
        } else {
          user = await registerLocal(name, pass);
        }
        playTapSound();
        enterApp(user);
        return;
      }
      let user;
      if (firebaseOn()) {
        try {
          user = await loginFirebase(name, pass);
        } catch (err) {
          user = await loginLocal(name, pass);
        }
      } else {
        user = await loginLocal(name, pass);
      }
      playTapSound();
      enterApp(user);
    } catch (err) {
      setLoginError(err.message || "Giriş olmadı.");
    }
  }

  function userFromFirebase(fbUser, via) {
    return {
      id: fbUser.uid,
      name: fbUser.displayName || fbUser.email || "Aile",
      via: via || (fbUser.providerData?.[0]?.providerId === "google.com" ? "google" : "password"),
    };
  }

  function friendlyAuthError(err) {
    const code = err && err.code;
    if (code === "auth/unauthorized-domain") {
      return "Bu adres Firebase'de yetkili değil. Authentication → Settings → Authorized domains içine salimoglu.github.io ekle.";
    }
    if (code === "auth/operation-not-allowed") {
      return "Google girişi kapalı. Firebase → Authentication → Sign-in method içinde Google'ı aç.";
    }
    if (code === "auth/popup-blocked" || code === "auth/popup-closed-by-user") {
      return "Google penceresi açılmadı. Tekrar dene.";
    }
    if (code === "auth/network-request-failed") {
      return "İnternet bağlantısı yok. Tekrar dene.";
    }
    if (code === "auth/internal-error" || code === "auth/configuration-not-found") {
      return "Google ayarı eksik. Firebase'de Google girişini açıp destek e-postasını kaydet.";
    }
    if (code === "auth/account-exists-with-different-credential") {
      return "Bu Gmail başka bir girişle kayıtlı. İsim ve şifre ile dene.";
    }
    return err?.message || "Gmail bağlantısı olmadı.";
  }

  function googleProvider() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("email");
    provider.addScope("profile");
    return provider;
  }

  async function loginWithGoogle() {
    setLoginError("");
    initFirebase();
    if (!firebaseOn()) {
      setLoginError("Firebase yüklenemedi. Sayfayı yenile veya isim ve şifre ile gir.");
      return;
    }
    $("btn-google").textContent = "Gmail açılıyor…";
    try {
      firebase.auth().languageCode = "tr";
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await firebase.auth().signInWithRedirect(googleProvider());
    } catch (err) {
      $("btn-google").textContent = "Gmail ile bağlan";
      setLoginError(friendlyAuthError(err));
    }
  }

  async function restoreSession() {
    initFirebase();
    if (firebaseOn()) {
      try {
        firebase.auth().languageCode = "tr";
        const cred = await firebase.auth().getRedirectResult();
        if (cred?.user) {
          playTapSound();
          enterApp(userFromFirebase(cred.user, "google"));
          return true;
        }
        if (firebase.auth().currentUser) {
          enterApp(userFromFirebase(firebase.auth().currentUser));
          return true;
        }
      } catch (err) {
        setAuthMode("login");
        show("login");
        setLoginError(friendlyAuthError(err));
        return false;
      }
    }
    try {
      const saved = JSON.parse(localStorage.getItem("ot-session-user") || "null");
      if (saved?.id && saved?.name) {
        enterApp(saved);
        return true;
      }
    } catch (err) {
      /* ignore */
    }
    setAuthMode("login");
    show("login");
    return false;
  }

  function resetPicks() {
    state.pickStep = 1;
    state.pickKind = "character";
    state.players = { p1: null, p2: null };
  }

  function assignBot() {
    const chars = CHARACTERS.filter((c) => c.id !== state.players.p1.char.id);
    const baskets = BASKETS.filter((b) => b.id !== state.players.p1.basket.id);
    const bot = emptyPlayer("p2", boardSize().cols - 1, midRow());
    bot.char = cloneChar(chars[Math.floor(Math.random() * chars.length)]);
    bot.basket = baskets[Math.floor(Math.random() * baskets.length)];
    bot.isBot = true;
    state.players.p2 = bot;
  }

  function beginPlay(vsBot) {
    if (!state.user) {
      show("login");
      return;
    }
    if (timeIsUp()) {
      lockPlayTime();
      return;
    }
    playTapSound();
    resetPicks();
    state.vsBot = vsBot;
    renderPicks();
    show("character");
  }

  function updateDiffButtons() {
    document.querySelectorAll(".diff-btn").forEach((btn) => {
      btn.classList.toggle("on", btn.dataset.diff === state.difficulty);
    });
  }

  function bind() {
    $("btn-play").addEventListener("click", () => beginPlay(false));
    $("btn-play-bot").addEventListener("click", () => beginPlay(true));
    $("btn-parent").addEventListener("click", openParentModal);
    $("btn-parent-play").addEventListener("click", openParentModal);
    $("btn-parent-lock").addEventListener("click", openParentModal);
    $("parent-ok").addEventListener("click", confirmParentModal);
    $("btn-logout").addEventListener("click", logoutUser);
    $("parent-modal").addEventListener("click", (e) => {
      if (e.target.id === "parent-modal") closeParentModal();
    });
    $("parent-limits").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-limit]");
      if (!btn) return;
      setParentLimit(Number(btn.dataset.limit));
    });
    $("login-form").addEventListener("submit", (e) => {
      submitAuth(e);
    });
    $("btn-auth-mode").addEventListener("click", () => {
      setAuthMode(state.authMode === "login" ? "register" : "login");
    });
    $("btn-google").addEventListener("click", loginWithGoogle);

    document.getElementById("diff-row").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-diff]");
      if (!btn) return;
      state.difficulty = btn.dataset.diff;
      localStorage.setItem("ot-diff", state.difficulty);
      updateDiffButtons();
      playTapSound();
    });

    $("btn-back").addEventListener("click", goBack);

    $("character-grid").addEventListener("click", (e) => {
      const rename = e.target.closest("[data-rename]");
      if (rename) {
        e.preventDefault();
        e.stopPropagation();
        playTapSound();
        openNameModal(rename.dataset.rename);
        return;
      }

      const basketBtn = e.target.closest("[data-basket]");
      if (basketBtn && !basketBtn.disabled) {
        const basket = BASKETS.find((b) => b.id === basketBtn.dataset.basket);
        playTapSound();
        if (state.pickStep === 1) {
          state.players.p1.basket = basket;
          if (state.vsBot) {
            assignBot();
            renderRooms();
            show("room");
          } else {
            state.pickStep = 2;
            state.pickKind = "character";
            renderPicks();
          }
        } else {
          state.players.p2.basket = basket;
          renderRooms();
          show("room");
        }
        return;
      }

      const btn = e.target.closest("[data-character]");
      if (!btn || btn.classList.contains("taken")) return;
      const char = CHARACTERS.find((c) => c.id === btn.dataset.character);
      playTapSound();
      if (state.pickStep === 1) {
        state.players.p1 = emptyPlayer("p1", 0, midRow());
        state.players.p1.char = cloneChar(char);
      } else {
        state.players.p2 = emptyPlayer("p2", boardSize().cols - 1, midRow());
        state.players.p2.char = cloneChar(char);
      }
      state.pickKind = "basket";
      renderPicks();
    });

    $("name-save").addEventListener("click", confirmNameModal);
    $("name-cancel").addEventListener("click", () => {
      closeNameModal();
    });
    $("name-modal").addEventListener("click", (e) => {
      if (e.target.id === "name-modal") closeNameModal();
    });
    $("name-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        confirmNameModal();
      } else if (e.key === "Escape") {
        closeNameModal();
      }
    });

    $("room-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-room]");
      if (!btn) return;
      playTapSound();
      startRoom(ROOMS.find((r) => r.id === btn.dataset.room));
    });

    document.addEventListener("click", (e) => {
      if (state.padSwiped) {
        state.padSwiped = false;
        return;
      }
      const moveBtn = e.target.closest("[data-move]");
      if (moveBtn) {
        addCommand(moveBtn.closest("[data-player]").dataset.player, moveBtn.dataset.move);
        return;
      }
      const runBtn = e.target.closest("[data-run]");
      if (runBtn) {
        runProgram(runBtn.dataset.run);
        return;
      }
      const eraseBtn = e.target.closest("[data-erase]");
      if (eraseBtn) eraseCommand(eraseBtn.dataset.erase);
    });

    $("btn-next-room").addEventListener("click", () => {
      playTapSound();
      nextRoom();
    });

    $("btn-replay").addEventListener("click", () => {
      playTapSound();
      startRoom(state.room);
    });

    $("btn-home").addEventListener("click", () => {
      resetPicks();
      state.vsBot = false;
      show("home");
    });

    $("sound-btn").addEventListener("click", toggleSound);
    $("sound-btn-play").addEventListener("click", toggleSound);

    document.addEventListener("pointerdown", (e) => {
      const pad = e.target.closest(".code-pad");
      if (!pad || state.screen !== "play") return;
      state.padSwipe = { x: e.clientX, y: e.clientY, player: pad.dataset.player };
      state.padSwiped = false;
    });
    document.addEventListener("pointerup", (e) => {
      const start = state.padSwipe;
      state.padSwipe = null;
      if (!start || state.screen !== "play") return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.hypot(dx, dy) < 28) return;
      const move = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
      state.padSwiped = true;
      addCommand(start.player, move);
    });
    document.addEventListener("pointercancel", () => {
      state.padSwipe = null;
    });

    document.addEventListener("keydown", (e) => {
      if (state.screen !== "play" || state.ended) return;
      const moves = {
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowDown: "down",
        ArrowRight: "right",
      };
      const actor = state.turn;
      if (moves[e.code]) {
        e.preventDefault();
        addCommand(actor, moves[e.code]);
      } else if (e.code === "Enter") {
        e.preventDefault();
        runProgram(actor);
      } else if (e.code === "Backspace" || e.code === "Delete") {
        e.preventDefault();
        eraseCommand(actor);
      }
    });

    document.addEventListener(
      "touchmove",
      (e) => {
        if (state.screen === "play") e.preventDefault();
      },
      { passive: false }
    );

    const stage = $("room-stage");
    if (window.ResizeObserver && stage) {
      new ResizeObserver(() => syncCellFit()).observe(stage);
    }
    window.addEventListener("resize", syncCellFit);
    document.addEventListener("visibilitychange", () => {
      tickParent();
      saveParent();
    });
    setInterval(tickParent, 1000);
  }

  $("version-badge").textContent = `v${GAME_VERSION}`;
  updateDiffButtons();
  renderPicks();
  renderRooms();
  updateSoundButton();
  bind();
  restoreSession();
})();
