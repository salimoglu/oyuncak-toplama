(() => {
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
      toys: ["🚗", "🧩", "🎨", "🤖", "🦄", "🚂", "🧱", "🪀", "🎯", "🎪", "🪁", "🎲"],
    },
    {
      id: "salon",
      name: "Salon",
      emoji: "🛋️",
      theme: "living",
      furniture: '<div class="sofa"></div><div class="window"></div>',
      toys: ["📚", "🖍️", "🧸", "⚽", "🎧", "🧩", "🎀", "🪀", "📱", "🌵"],
    },
    {
      id: "bahce",
      name: "Bahçe",
      emoji: "🌳",
      theme: "garden",
      furniture: '<div class="sun"></div><div class="tree"></div>',
      toys: ["⚽", "🪁", "🚲", "🪣", "🦋", "🏐", "🫧", "🌸", "🧸", "🪀"],
    },
  ];

  const CHEERS = ["Aferin!", "Süper!", "Harika!", "Bravo!", "Yaşasın!", "Çok güzel!"];

  const state = {
    screen: "home",
    character: CHARACTERS[0],
    room: ROOMS[0],
    remaining: [],
    collected: [],
    walking: false,
    sound: localStorage.getItem("ot-sound") !== "off",
    completed: JSON.parse(localStorage.getItem("ot-done") || "[]"),
    audio: null,
  };

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

  function saveDone() {
    if (!state.completed.includes(state.room.id)) {
      state.completed.push(state.room.id);
      localStorage.setItem("ot-done", JSON.stringify(state.completed));
    }
  }

  function renderCharacters() {
    $("character-grid").innerHTML = CHARACTERS.map(
      (c) => `
      <button class="pick-card" type="button" data-character="${c.id}">
        <div class="avatar" style="background:${c.color}">${c.emoji}</div>
        <strong>${c.name}</strong>
        <span class="sub">${c.sub}</span>
      </button>`
    ).join("");
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

  function applyCharacter(char) {
    state.character = char;
    const el = $("character");
    el.dataset.id = char.id;
    el.style.setProperty("--skin", char.skin);
    el.style.setProperty("--hair", char.hair);
    el.style.setProperty("--clothes", char.clothes);
    el.style.setProperty("--legs", char.legs);
    $("char-label").textContent = char.name;
  }

  function randomPositions(count) {
    const spots = [];
    const tries = count * 20;
    let i = 0;
    while (spots.length < count && i < tries) {
      i += 1;
      const x = 12 + Math.random() * 62;
      const y = 28 + Math.random() * 42;
      const ok = spots.every((s) => Math.hypot(s.x - x, s.y - y) > 12);
      if (ok) spots.push({ x, y });
    }
    while (spots.length < count) {
      spots.push({
        x: 16 + (spots.length % 5) * 14,
        y: 32 + Math.floor(spots.length / 5) * 18,
      });
    }
    return spots;
  }

  function startRoom(room) {
    state.room = room;
    state.collected = [];
    const spots = randomPositions(room.toys.length);
    state.remaining = room.toys.map((emoji, index) => ({
      id: `${room.id}-${index}`,
      emoji,
      x: spots[index].x,
      y: spots[index].y,
    }));

    $("play-room-emoji").textContent = room.emoji;
    $("play-room-name").textContent = room.name;
    $("furniture").innerHTML = room.furniture;
    $("room-stage").className = `room-stage ${room.theme}`;
    $("box-pile").innerHTML = "";
    $("character").style.left = "18%";
    $("character").classList.remove("walking", "happy");
    $("finger-hint").hidden = false;
    updateScore();
    renderToys();
    show("play");
  }

  function renderToys() {
    $("toys").innerHTML = state.remaining
      .map(
        (t) =>
          `<button class="toy" type="button" data-id="${t.id}" style="left:${t.x}%; top:${t.y}%">${t.emoji}</button>`
      )
      .join("");
  }

  function updateScore() {
    const total = state.room.toys.length;
    $("score").textContent = `${state.collected.length} / ${total}`;
  }

  function cheer() {
    const el = $("cheer");
    el.textContent = CHEERS[Math.floor(Math.random() * CHEERS.length)];
    el.hidden = false;
    clearTimeout(cheer._t);
    cheer._t = setTimeout(() => {
      el.hidden = true;
    }, 700);
  }

  function collectToy(id) {
    if (state.walking) return;
    const toy = state.remaining.find((t) => t.id === id);
    if (!toy) return;

    $("finger-hint").hidden = true;
    playTapSound();

    const character = $("character");
    character.classList.add("walking");
    character.style.left = `${toy.x}%`;
    state.walking = true;

    const toyBtn = document.querySelector(`.toy[data-id="${id}"]`);

    setTimeout(() => {
      if (toyBtn) toyBtn.classList.add("gone");
      character.classList.remove("walking");
      character.classList.add("happy");
      playCollectSound();
      cheer();
      if (navigator.vibrate) navigator.vibrate(30);

      state.remaining = state.remaining.filter((t) => t.id !== id);
      state.collected.push(toy);
      $("box-pile").insertAdjacentHTML("beforeend", `<span>${toy.emoji}</span>`);
      updateScore();
      state.walking = false;

      setTimeout(() => character.classList.remove("happy"), 400);

      if (state.remaining.length === 0) {
        setTimeout(winRoom, 500);
      }
    }, 720);
  }

  function winRoom() {
    saveDone();
    playWinSound();
    $("win-title").textContent = "Oda tertemiz!";
    $("win-text").textContent = `${state.character.name} bütün oyuncakları topladı. Aferin!`;
    burstConfetti();
    show("win");
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
    const next = ROOMS[(index + 1) % ROOMS.length];
    startRoom(next);
  }

  function updateSoundButton() {
    const btn = $("sound-btn");
    btn.textContent = state.sound ? "🔊" : "🔇";
    btn.classList.toggle("muted", !state.sound);
  }

  function bind() {
    $("btn-play").addEventListener("click", () => {
      playTapSound();
      renderCharacters();
      show("character");
    });

    $("btn-back-home").addEventListener("click", () => show("home"));
    $("btn-back-character").addEventListener("click", () => {
      renderCharacters();
      show("character");
    });

    $("character-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-character]");
      if (!btn) return;
      const char = CHARACTERS.find((c) => c.id === btn.dataset.character);
      applyCharacter(char);
      playTapSound();
      renderRooms();
      show("room");
    });

    $("room-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-room]");
      if (!btn) return;
      const room = ROOMS.find((r) => r.id === btn.dataset.room);
      playTapSound();
      startRoom(room);
    });

    $("toys").addEventListener("pointerup", (e) => {
      const btn = e.target.closest(".toy");
      if (!btn) return;
      collectToy(btn.dataset.id);
    });

    $("btn-exit-play").addEventListener("click", () => {
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

    $("btn-home").addEventListener("click", () => show("home"));

    $("sound-btn").addEventListener("click", () => {
      state.sound = !state.sound;
      localStorage.setItem("ot-sound", state.sound ? "on" : "off");
      updateSoundButton();
      if (state.sound) playTapSound();
    });

    document.addEventListener(
      "touchmove",
      (e) => {
        if (state.screen === "play") e.preventDefault();
      },
      { passive: false }
    );
  }

  renderCharacters();
  renderRooms();
  applyCharacter(state.character);
  updateSoundButton();
  bind();
})();
