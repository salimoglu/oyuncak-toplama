(() => {
  // Sürüm 0.1 ile başlar; 0.2 … 0.99 sonrası 1.0 olur.
  const GAME_VERSION = "0.5";

  const COLS = 6;
  const ROWS = 5;
  const MAX_CODE = 6;
  const STEP_MS = 420;

  const CHARACTERS = [
    {
      id: "elif",
      name: "Elif",
      sub: "Pembe elbiseli",
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
      sub: "Mavi tişörtlü",
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
      sub: "Mor elbiseli",
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
      sub: "Sevimli kedi",
      emoji: "🐱",
      color: "#ffe8cc",
      skin: "#e09f3e",
      hair: "#e09f3e",
      clothes: "#f4a261",
      legs: "#e09f3e",
    },
  ];

  const ROOMS = [
    {
      id: "yatak",
      name: "Yatak Odası",
      emoji: "🛏️",
      theme: "bedroom",
      furniture: '<div class="window"></div><div class="bed"></div>',
      toys: ["🧸", "🎀", "📚", "🧦", "🎈", "👗", "🪀", "👠"],
    },
    {
      id: "oyun",
      name: "Oyun Odası",
      emoji: "🎲",
      theme: "playroom",
      furniture: '<div class="shelf"></div><div class="window"></div>',
      toys: ["🚗", "🧩", "🎨", "🤖", "🦄", "🚂", "🧱", "🪀", "🎯", "🎪"],
    },
    {
      id: "salon",
      name: "Salon",
      emoji: "🛋️",
      theme: "living",
      furniture: '<div class="sofa"></div><div class="window"></div>',
      toys: ["📚", "🖍️", "🧸", "⚽", "🎧", "🧩", "🎀", "🪀"],
    },
    {
      id: "bahce",
      name: "Bahçe",
      emoji: "🌳",
      theme: "garden",
      furniture: '<div class="sun"></div><div class="tree"></div>',
      toys: ["⚽", "🪁", "🚲", "🪣", "🦋", "🏐", "🌸", "🧸"],
    },
  ];

  const MOVES = [
    { id: "up", label: "↑", dx: 0, dy: -1 },
    { id: "down", label: "↓", dx: 0, dy: 1 },
    { id: "left", label: "←", dx: -1, dy: 0 },
    { id: "right", label: "→", dx: 1, dy: 0 },
  ];

  const CHEERS = ["Aferin!", "Süper!", "Harika!", "Bravo!", "Yaşasın!", "Çok güzel!"];

  const ACTOR_HTML = `
    <div class="char-shadow"></div>
    <div class="char-figure">
      <div class="char-hair-back"></div>
      <div class="char-head">
        <div class="char-blush left"></div>
        <div class="char-blush right"></div>
        <div class="char-eye left"></div>
        <div class="char-eye right"></div>
        <div class="char-smile"></div>
      </div>
      <div class="char-hair-front"></div>
      <div class="char-body">
        <div class="char-arm left"></div>
        <div class="char-arm right"></div>
      </div>
      <div class="char-legs">
        <div class="char-leg left"></div>
        <div class="char-leg right"></div>
      </div>
    </div>
    <div class="char-label"></div>
  `;

  const state = {
    screen: "home",
    pickStep: 1,
    players: { p1: null, p2: null },
    room: ROOMS[0],
    toys: [],
    ended: false,
    sound: localStorage.getItem("ot-sound") !== "off",
    completed: JSON.parse(localStorage.getItem("ot-done") || "[]"),
    audio: null,
    run: { p1: null, p2: null },
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
      stepIndex: -1,
    };
  }

  const $ = (id) => document.getElementById(id);
  const screens = {
    home: $("screen-home"),
    character: $("screen-character"),
    room: $("screen-room"),
    play: $("screen-play"),
    win: $("screen-win"),
  };

  function show(name) {
    state.screen = name;
    Object.entries(screens).forEach(([key, el]) => {
      el.classList.toggle("active", key === name);
    });
    document.getElementById("app").classList.toggle("playing", name === "play");
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

  function renderCharacters() {
    const taken = state.pickStep === 2 && state.players.p1 ? state.players.p1.char.id : null;
    $("character-grid").innerHTML = CHARACTERS.map((c) => {
      const disabled = taken === c.id ? "disabled" : "";
      return `
        <button class="pick-card" type="button" data-character="${c.id}" ${disabled}>
          <div class="avatar" style="background:${c.color}">${c.emoji}</div>
          <strong>${c.name}</strong>
          <span class="sub">${c.sub}</span>
        </button>`;
    }).join("");

    $("char-title").textContent = state.pickStep === 1 ? "1. oyuncu kim?" : "2. oyuncu kim?";
    $("char-hint").textContent =
      state.pickStep === 1 ? "Solda oynayacak karakteri seç." : "Sağda oynayacak karakteri seç.";

    const p1 = state.players.p1?.char;
    $("picked-row").innerHTML = p1
      ? `<div class="picked-chip" style="background:${p1.color}">1. ${p1.emoji} ${p1.name}</div>`
      : "";
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
    el.querySelector(".char-label").textContent = char.name;
    placeActor(el, player);
  }

  function placeActor(el, player) {
    el.style.left = `${((player.col + 0.5) / COLS) * 100}%`;
    el.style.top = `${((player.row + 0.5) / ROWS) * 100}%`;
  }

  function randomToyCells(count) {
    const blocked = new Set(["0,2", "5,2"]);
    const free = [];
    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
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
    stopRuns();
    state.room = room;
    state.ended = false;
    state.players.p1 = {
      ...emptyPlayer("p1", 0, 2),
      char: state.players.p1.char,
    };
    state.players.p2 = {
      ...emptyPlayer("p2", COLS - 1, 2),
      char: state.players.p2.char,
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

  function renderBoard() {
    const board = $("board");
    board.style.setProperty("--cols", COLS);
    board.style.setProperty("--rows", ROWS);
    const cells = [];
    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
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
      <div id="actor-p1" class="character actor">${ACTOR_HTML}</div>
      <div id="actor-p2" class="character actor">${ACTOR_HTML}</div>`;
    styleActor($("actor-p1"), state.players.p1);
    styleActor($("actor-p2"), state.players.p2);
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
            <small>${side}</small>
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
    const keys = playerId === "p1" ? "W A S D · E" : "Yön tuşları · Enter";
    const queue = player.queue
      .map(
        (cmd, i) =>
          `<span class="code-chip ${player.stepIndex === i ? "current" : ""}">${cmd.label}</span>`
      )
      .join("");

    $(`dock-${playerId}`).innerHTML = `
      <p class="dock-side">${side}</p>
      <div class="code-queue" data-player="${playerId}">${
        queue || '<span class="code-empty">Komut ekle</span>'
      }</div>
      <div class="code-pad" data-player="${playerId}">
        ${MOVES.map(
          (m) =>
            `<button type="button" class="code-btn" data-move="${m.id}" ${
              player.running || player.queue.length >= MAX_CODE ? "disabled" : ""
            }>${m.label}</button>`
        ).join("")}
      </div>
      <div class="dock-actions">
        <button type="button" class="run-btn" data-run="${playerId}" ${
          player.running || player.queue.length === 0 ? "disabled" : ""
        }>▶ Çalıştır</button>
        <button type="button" class="erase-btn" data-erase="${playerId}" ${
          player.running || player.queue.length === 0 ? "disabled" : ""
        }>⌫</button>
      </div>
      <p class="dock-keys">${keys}</p>
      <div class="collected-well">
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
    if (!player || player.running || state.ended) return;
    if (player.queue.length >= MAX_CODE) return;
    const move = MOVES.find((m) => m.id === moveId);
    if (!move) return;
    player.queue.push({ ...move });
    playTapSound();
    renderDock(playerId);
  }

  function eraseCommand(playerId) {
    const player = state.players[playerId];
    if (!player || player.running || state.ended) return;
    player.queue.pop();
    playTapSound();
    renderDock(playerId);
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function stopRuns() {
    ["p1", "p2"].forEach((id) => {
      if (state.run[id]) {
        state.run[id].cancelled = true;
        state.run[id] = null;
      }
      if (state.players[id]) state.players[id].running = false;
    });
  }

  async function runProgram(playerId) {
    const player = state.players[playerId];
    if (!player || player.running || player.queue.length === 0 || state.ended) return;

    const token = { cancelled: false };
    state.run[playerId] = token;
    player.running = true;
    const program = [...player.queue];
    renderDock(playerId);

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
      await wait(STEP_MS);
    }

    actor.classList.remove("walking", "bump");
    player.queue = [];
    player.stepIndex = -1;
    player.running = false;
    if (state.run[playerId] === token) state.run[playerId] = null;
    if (!state.ended) renderDock(playerId);
  }

  async function stepMove(player, move) {
    const nextCol = player.col + move.dx;
    const nextRow = player.row + move.dy;
    const actor = $(`actor-${player.id}`);
    if (nextCol < 0 || nextCol >= COLS || nextRow < 0 || nextRow >= ROWS) {
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

  function resetPicks() {
    state.pickStep = 1;
    state.players = { p1: null, p2: null };
  }

  function bind() {
    $("btn-play").addEventListener("click", () => {
      playTapSound();
      resetPicks();
      renderCharacters();
      show("character");
    });

    $("btn-back-home").addEventListener("click", () => {
      resetPicks();
      show("home");
    });

    $("btn-back-character").addEventListener("click", () => {
      state.pickStep = 2;
      renderCharacters();
      show("character");
    });

    $("character-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-character]");
      if (!btn || btn.disabled) return;
      const char = CHARACTERS.find((c) => c.id === btn.dataset.character);
      playTapSound();
      if (state.pickStep === 1) {
        state.players.p1 = emptyPlayer("p1", 0, 2);
        state.players.p1.char = char;
        state.pickStep = 2;
        renderCharacters();
      } else {
        state.players.p2 = emptyPlayer("p2", COLS - 1, 2);
        state.players.p2.char = char;
        renderRooms();
        show("room");
      }
    });

    $("room-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-room]");
      if (!btn) return;
      playTapSound();
      startRoom(ROOMS.find((r) => r.id === btn.dataset.room));
    });

    document.addEventListener("click", (e) => {
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

    $("btn-exit-play").addEventListener("click", () => {
      stopRuns();
      renderRooms();
      show("room");
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
      show("home");
    });

    $("sound-btn").addEventListener("click", toggleSound);
    $("sound-btn-play").addEventListener("click", toggleSound);

    document.addEventListener("keydown", (e) => {
      if (state.screen !== "play" || state.ended) return;
      const p1Moves = { KeyW: "up", KeyA: "left", KeyS: "down", KeyD: "right" };
      const p2Moves = {
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowDown: "down",
        ArrowRight: "right",
      };
      if (p1Moves[e.code]) {
        e.preventDefault();
        addCommand("p1", p1Moves[e.code]);
      } else if (p2Moves[e.code]) {
        e.preventDefault();
        addCommand("p2", p2Moves[e.code]);
      } else if (e.code === "KeyE") {
        e.preventDefault();
        runProgram("p1");
      } else if (e.code === "Enter") {
        e.preventDefault();
        runProgram("p2");
      } else if (e.code === "Backspace") {
        e.preventDefault();
        eraseCommand("p1");
      } else if (e.code === "Delete") {
        e.preventDefault();
        eraseCommand("p2");
      }
    });

    document.addEventListener(
      "touchmove",
      (e) => {
        if (state.screen === "play") e.preventDefault();
      },
      { passive: false }
    );
  }

  $("version-badge").textContent = `v${GAME_VERSION}`;
  renderCharacters();
  renderRooms();
  updateSoundButton();
  bind();
})();
