(() => {
  // Sürüm 0.1 ile başlar; 0.2 … 0.99 sonrası 1.0 olur.
  const GAME_VERSION = window.__OT_VERSION || "0.56";

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

  const SKY_TOY_EMOJIS = [...new Set(ROOMS.flatMap((room) => room.toys))];
  const SKY_TOY_MAX = 14;
  let skyToyCount = 0;
  let skyToyTimer = 0;

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
  const DRESS_CHEERS = ["Çok şık!", "Harika kombin!", "Aferin!", "Ne güzel!", "Masal gibi!", "İşte bu!"];

  const DOLLS = [
    { id: "elif", name: "Elif", skin: "#f6d7b0", hair: "#5c3317", onesie: "#ffb3c6", hairStyle: "pig" },
    { id: "can", name: "Can", skin: "#efc9a0", hair: "#3d2b1f", onesie: "#74c0fc", hairStyle: "short" },
    { id: "lila", name: "Lila", skin: "#f3c9a3", hair: "#6d4c9a", onesie: "#d0bfff", hairStyle: "long" },
    { id: "ece", name: "Ece", skin: "#f8d4b8", hair: "#d9480f", onesie: "#ffe066", hairStyle: "braid" },
    { id: "deniz", name: "Deniz", skin: "#efc9a0", hair: "#0b7285", onesie: "#99e9f2", hairStyle: "bangs" },
    { id: "nane", name: "Nane", skin: "#f6d7b0", hair: "#2b8a3e", onesie: "#8ce99a", hairStyle: "bun" },
  ];

  const DRESS_CATS = [
    { id: "hair", label: "Saç", emoji: "💇" },
    { id: "dress", label: "Elbise", emoji: "👗" },
    { id: "hat", label: "Şapka", emoji: "👒" },
    { id: "shoes", label: "Ayak", emoji: "👟" },
    { id: "bag", label: "Çanta", emoji: "👜" },
  ];

  const DRESS_ITEMS = {
    hair: [
      { id: "pig", name: "İki örgü" },
      { id: "short", name: "Kısa" },
      { id: "long", name: "Uzun" },
      { id: "braid", name: "Örgü" },
      { id: "bun", name: "Topuz" },
      { id: "pony", name: "Atkuyruğu" },
      { id: "curl", name: "Dalgalı" },
      { id: "bangs", name: "Kare" },
    ],
    dress: [
      { id: "", name: "Tişört" },
      { id: "princess", name: "Prenses" },
      { id: "bindalli", name: "Bindallı" },
      { id: "sailor", name: "Denizci" },
      { id: "sun", name: "Güneş" },
      { id: "mint", name: "Nane" },
      { id: "starry", name: "Yıldız" },
    ],
    hat: [
      { id: "", name: "Yok" },
      { id: "bow", name: "Fiyonk" },
      { id: "fes", name: "Fes" },
      { id: "yemeni", name: "Yemeni" },
      { id: "flowers", name: "Çiçek" },
      { id: "beanie", name: "Bere" },
      { id: "glasses", name: "Gözlük" },
    ],
    shoes: [
      { id: "", name: "Çorap" },
      { id: "sneakers", name: "Spor" },
      { id: "boots", name: "Bot" },
      { id: "maryjane", name: "Babet" },
      { id: "sandal", name: "Sandalet" },
      { id: "rain", name: "Yağmur" },
      { id: "yemeni", name: "Yemeni" },
    ],
    bag: [
      { id: "", name: "Yok" },
      { id: "backpack", name: "Okul" },
      { id: "purse", name: "Omuz" },
      { id: "tote", name: "Bez" },
      { id: "kilim", name: "Kilim" },
      { id: "sport", name: "Spor" },
      { id: "nazar", name: "Nazar" },
    ],
  };

  const EMPTY_WEAR = {
    hair: "",
    hairColor: "",
    eyes: "",
    dress: "",
    hat: "",
    shoes: "",
    bag: "",
  };

  const HAIR_COLORS = [
    { id: "#5c3317", name: "Kahve" },
    { id: "#2b2118", name: "Siyah" },
    { id: "#e8c547", name: "Sarı" },
    { id: "#c2410c", name: "Kızıl" },
    { id: "#6d4c9a", name: "Mor" },
    { id: "#0b7285", name: "Deniz" },
    { id: "#f783ac", name: "Pembe" },
  ];

  const EYE_COLORS = [
    { id: "#5c3317", name: "Kahve" },
    { id: "#1c7ed6", name: "Mavi" },
    { id: "#2f9e44", name: "Yeşil" },
    { id: "#b8860b", name: "Ela" },
    { id: "#495057", name: "Gri" },
  ];

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

  const DOLL_HTML = `
    <div class="doll-frame"></div>
    <div class="doll-name"></div>
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
    pickFrom: null,
    padSwipe: null,
    padSwiped: false,
    dress: {
      babyId: "elif",
      cat: "hair",
      wear: { ...EMPTY_WEAR },
    },
    user: null,
    authMode: "login",
    parent: {
      limit: 0,
      usedMs: 0,
      day: "",
      lastTick: Date.now(),
      verified: false,
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
    hub: $("screen-hub"),
    home: $("screen-home"),
    character: $("screen-character"),
    room: $("screen-room"),
    play: $("screen-play"),
    dress: $("screen-dress"),
    win: $("screen-win"),
  };

  const homePull = {
    wheel: 0,
    wheelIdle: 0,
    drag: null,
    reloading: false,
  };

  function resetHomePull() {
    homePull.wheel = 0;
    homePull.drag = null;
    window.clearTimeout(homePull.wheelIdle);
    const hint = $("pull-refresh");
    if (hint) {
      hint.classList.remove("show", "ready");
      hint.style.removeProperty("--pull-y");
    }
    [screens.hub, screens.home].forEach((el) => {
      if (!el) return;
      el.classList.remove("pulling");
      el.style.transform = "";
    });
  }

  function pullScreenEl() {
    if (state.screen === "hub") return screens.hub;
    if (state.screen === "home") return screens.home;
    return null;
  }

  function canHomePull() {
    return state.screen === "hub" || state.screen === "home";
  }

  function showHomePull(amount, need) {
    const hint = $("pull-refresh");
    const text = $("pull-refresh-text");
    const home = pullScreenEl();
    if (!home) return;
    const t = Math.min(1, Math.max(0, amount / need));
    hint.classList.add("show");
    hint.classList.toggle("ready", t >= 1);
    hint.style.setProperty("--pull-y", `${6 + t * 16}px`);
    home.classList.add("pulling");
    home.style.transform = `translateY(${Math.round(t * 28)}px)`;
    text.textContent = t >= 1 ? "Yenileniyor" : "Yenile";
  }

  function reloadHome() {
    if (homePull.reloading) return;
    homePull.reloading = true;
    showHomePull(1, 1);
    location.reload();
  }

  function show(name) {
    state.screen = name;
    if (name !== "character") closeNameModal();
    Object.entries(screens).forEach(([key, el]) => {
      if (el) el.classList.toggle("active", key === name);
    });
    const app = document.getElementById("app");
    app.classList.toggle("playing", name === "play");
    const showBack = name !== "hub" && name !== "win" && name !== "login";
    $("btn-back").hidden = !showBack;
    app.classList.toggle("has-back", showBack);
    renderAccount();
    if (name === "login") closeAccountMenu();
    if (name === "home" || name === "login" || name === "hub") startSkyToys();
    else stopSkyToys();
    if (name !== "home" && name !== "hub") resetHomePull();
  }

  function skyToysOn() {
    return state.screen === "home" || state.screen === "login" || state.screen === "hub";
  }

  function stopSkyToys() {
    if (skyToyTimer) {
      clearInterval(skyToyTimer);
      skyToyTimer = 0;
    }
    const box = $("sky-toys");
    if (box) {
      box.hidden = true;
      box.replaceChildren();
    }
    skyToyCount = 0;
  }

  function startSkyToys() {
    const box = $("sky-toys");
    if (!box) return;
    box.hidden = false;
    while (skyToyCount < SKY_TOY_MAX) spawnSkyToy();
    if (!skyToyTimer) {
      skyToyTimer = window.setInterval(() => {
        if (skyToysOn() && skyToyCount < SKY_TOY_MAX) spawnSkyToy();
      }, 650);
    }
  }

  function spawnSkyToy() {
    const box = $("sky-toys");
    if (!box || !skyToysOn() || skyToyCount >= SKY_TOY_MAX) return;
    const el = document.createElement("span");
    el.className = "sky-toy";
    el.textContent = SKY_TOY_EMOJIS[Math.floor(Math.random() * SKY_TOY_EMOJIS.length)];
    const x = 6 + Math.random() * 88;
    const y = 8 + Math.random() * 78;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
    el.style.setProperty("--size", `${1.5 + Math.random() * 1.7}rem`);
    el.style.setProperty("--dur", `${7 + Math.random() * 9}s`);
    el.style.setProperty("--dx", `${Math.random() * 28 - 14}vw`);
    el.style.setProperty("--dy", `${-(16 + Math.random() * 26)}vh`);
    el.style.setProperty("--spin", `${Math.random() * 28 - 14}deg`);
    box.appendChild(el);
    skyToyCount += 1;
    window.setTimeout(() => popSkyToy(el), 3200 + Math.random() * 7000);
  }

  function popSkyToy(el) {
    const box = $("sky-toys");
    if (!el?.isConnected || el.classList.contains("pop")) return;
    if (box && skyToysOn()) {
      const toy = el.getBoundingClientRect();
      const area = box.getBoundingClientRect();
      const burst = document.createElement("span");
      burst.className = "sky-pop";
      burst.style.left = `${((toy.left + toy.width / 2 - area.left) / area.width) * 100}%`;
      burst.style.top = `${((toy.top + toy.height / 2 - area.top) / area.height) * 100}%`;
      box.appendChild(burst);
      window.setTimeout(() => burst.remove(), 450);
    }
    el.classList.add("pop");
    window.setTimeout(() => {
      el.remove();
      skyToyCount = Math.max(0, skyToyCount - 1);
      if (skyToysOn() && skyToyCount < SKY_TOY_MAX) spawnSkyToy();
    }, 420);
  }

  function goBack() {
    playTapSound();
    if (state.screen === "dress" || state.screen === "home") {
      resetPicks();
      show("hub");
      return;
    }
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
    if (state.pickFrom === "room") {
      state.pickFrom = null;
      renderRooms();
      show("room");
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

  function picksComplete() {
    const p1 = state.players.p1?.char && state.players.p1?.basket;
    if (!p1) return false;
    if (state.vsBot) return true;
    return Boolean(state.players.p2?.char && state.players.p2?.basket);
  }

  function editPick(playerId) {
    if (playerId === "p2" && state.vsBot) return;
    if (playerId === "p2" && !state.players.p1?.char) return;
    if (state.screen === "room") state.pickFrom = "room";
    state.pickStep = playerId === "p1" ? 1 : 2;
    state.pickKind = "character";
    playTapSound();
    renderPicks();
    show("character");
  }

  function pickSlotHtml(id, who, side, choosing) {
    const p = state.players[id];
    const locked = state.vsBot && id === "p2";
    const isOn =
      choosing &&
      ((state.pickStep === 1 && id === "p1") || (state.pickStep === 2 && id === "p2"));
    const editAttr = locked ? "" : `data-edit="${id}" role="button"`;
    if (!p?.char) {
      return `<div class="pick-slot ${id} empty ${isOn ? "on" : ""} ${locked ? "locked" : ""}" ${editAttr}>
        <span class="pick-slot-side">${side}</span>
        <span class="pick-ghost" aria-hidden="true"></span>
        <strong>${who}</strong>
        <small>Seç</small>
      </div>`;
    }
    const basketNote = p.basket ? `<small>${escapeHtml(p.basket.name)}</small>` : "<small>Değiştir</small>";
    return `<div class="pick-slot ${id} filled ${isOn ? "on" : ""} ${locked ? "locked" : ""}" ${editAttr}>
      <span class="pick-slot-side">${side}</span>
      ${miniChar(p.char, p.basket, id === "p2" ? "right" : "left")}
      <strong>${escapeHtml(p.char.name)}</strong>
      ${basketNote}
    </div>`;
  }

  function pickedChips(choosing = true) {
    const leftWho = state.vsBot ? "Sen" : "1. oyuncu";
    const rightWho = state.vsBot ? "Bot" : "2. oyuncu";
    const html = `
      ${pickSlotHtml("p1", leftWho, "Sol", choosing)}
      <div class="pick-vs" aria-hidden="true">↔</div>
      ${pickSlotHtml("p2", rightWho, "Sağ", choosing)}
    `;
    document.querySelectorAll(".pick-stage").forEach((el) => {
      el.innerHTML = html;
    });
  }

  function miniChar(c, basket, side = "left") {
    const basketStyle = basket
      ? `--basket:${basket.color};--basket-rim:${basket.rim};`
      : "";
    return `<div class="character portrait ${basket ? "has-basket" : ""}" data-id="${c.id}" data-side="${side}" style="--skin:${c.skin};--hair:${c.hair};--clothes:${c.clothes};--legs:${c.legs};${basketStyle}">
      ${ACTOR_HTML}
    </div>`;
  }

  function renderCharacters() {
    const other = state.pickStep === 1 ? state.players.p2 : state.players.p1;
    const taken = other?.char?.id || null;
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
      ? "Karakterini seç. Soldaki karaktere dokunursan sonra da değiştirebilirsin."
      : "Karaktere dokunarak seç. Soldaki veya sağdaki oluşuma dokunursan karakteri ve sepeti değişir.";
    pickedChips();
  }

  function renderBaskets() {
    const player = state.pickStep === 1 ? state.players.p1 : state.players.p2;
    const other = state.pickStep === 1 ? state.players.p2 : state.players.p1;
    const taken = other?.basket?.id || null;
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
    $("char-hint").textContent = "Seçtiğin sepet karakterin elinde durur. Oluşuma dokunursan tekrar değiştirebilirsin.";
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
    pickedChips(false);
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
    const vsBot = state.vsBot;
    const side = vsBot
      ? player.isBot
        ? `Bot · ${BOT[state.difficulty].label}`
        : "Sen"
      : player.id === "p1"
        ? "1. oyuncu"
        : "2. oyuncu";
    const count = player.collected.length;
    const badge = extraClass.includes("winner")
      ? `<span class="win-badge">Kazandı</span>`
      : "";
    return `
      <article class="player-card ${player.id} ${extraClass}">
        ${badge}
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
    const keys = "Kaydır veya dokun";
    const myTurn = state.turn === playerId && !player.running && !state.ended;
    const queue = Array.from({ length: MAX_CODE }, (_, i) => {
      const cmd = player.queue[i];
      if (!cmd) return `<span class="code-chip empty" aria-hidden="true"></span>`;
      return `<span class="code-chip dir-${cmd.id} ${player.stepIndex === i ? "current" : ""}">${DIR_MARK}</span>`;
    }).join("");
    const countLabel = `${player.queue.length}/${MAX_CODE}`;
    const dock = $(`dock-${playerId}`);
    dock.classList.toggle("waiting", !myTurn && !player.running);
    dock.classList.toggle("active-turn", myTurn || player.running);

    dock.innerHTML = player.isBot
      ? `
      <p class="dock-side">Bot · ${BOT[state.difficulty].label}</p>
      <div class="code-queue">${queue}</div>
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
      <div class="code-queue" data-player="${playerId}">${queue}</div>
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

    const a = state.players.p1;
    const b = state.players.p2;
    const scoreA = a.collected.length;
    const scoreB = b.collected.length;
    const vsBot = state.vsBot;
    let outcome = "tie";
    if (scoreA > scoreB) outcome = "p1";
    else if (scoreB > scoreA) outcome = "p2";

    let result = "Berabere";
    let resultKind = "tie";
    let title;
    let text;
    let stars;
    let celebrate = false;

    if (vsBot) {
      if (outcome === "p1") {
        result = "Sen kazandın";
        resultKind = "you";
        title = `${a.char.name} kazandı!`;
        text = `Sen ${scoreA} oyuncak · Bot ${scoreB} oyuncak`;
        stars = "⭐ ⭐ ⭐";
        celebrate = true;
      } else if (outcome === "p2") {
        result = "Bot kazandı";
        resultKind = "bot";
        title = `Bot (${b.char.name}) kazandı`;
        text = `Bot ${scoreB} oyuncak topladı. Sen ${scoreA} topladın.`;
        stars = "🤖";
        celebrate = false;
      } else {
        result = "Berabere";
        resultKind = "tie";
        title = "İkiniz de aynı sayıdasınız";
        text = `Sen ${scoreA} oyuncak · Bot ${scoreB} oyuncak`;
        stars = "⭐ ⭐";
      }
    } else if (outcome === "p1") {
      result = "1. oyuncu kazandı";
      resultKind = "you";
      title = `${a.char.name} kazandı!`;
      text = `${a.char.name} ${scoreA} oyuncak · ${b.char.name} ${scoreB} oyuncak`;
      stars = "⭐ ⭐ ⭐";
      celebrate = true;
    } else if (outcome === "p2") {
      result = "2. oyuncu kazandı";
      resultKind = "bot";
      title = `${b.char.name} kazandı!`;
      text = `${b.char.name} ${scoreB} oyuncak · ${a.char.name} ${scoreA} oyuncak`;
      stars = "⭐ ⭐ ⭐";
      celebrate = true;
    } else {
      result = "Berabere";
      resultKind = "tie";
      title = "İkiniz de aynı sayıdasınız";
      text = `${a.char.name} ${scoreA} oyuncak · ${b.char.name} ${scoreB} oyuncak`;
      stars = "⭐ ⭐";
    }

    const card = $("win-card");
    card.classList.remove("you-won", "bot-won", "tie-game");
    card.classList.add(outcome === "tie" ? "tie-game" : outcome === "p1" ? "you-won" : "bot-won");
    const resultEl = $("win-result");
    resultEl.textContent = result;
    resultEl.className = `win-result ${resultKind}`;
    $("win-title").textContent = title;
    $("win-text").textContent = text;
    $("win-stars").textContent = stars;
    const sum = Math.max(1, scoreA + scoreB);
    $("win-scores").innerHTML = `
      <div class="vs-bar big" aria-hidden="true">
        <i class="p1" style="width:${(scoreA / sum) * 100}%"></i>
        <i class="p2" style="width:${(scoreB / sum) * 100}%"></i>
      </div>
      ${playerSummary(a, outcome === "p1" ? "winner" : outcome === "p2" ? "loser" : "")}
      ${playerSummary(b, outcome === "p2" ? "winner" : outcome === "p1" ? "loser" : "")}
    `;
    if (celebrate) {
      playWinSound();
      burstConfetti();
    } else {
      $("confetti").innerHTML = "";
    }
    recordHistoryGame({
      t: Date.now(),
      vsBot: Boolean(vsBot),
      outcome: vsBot ? (outcome === "p1" ? "win" : outcome === "p2" ? "loss" : "tie") : outcome,
      scoreA,
      scoreB,
      room: state.room?.name || "",
      roomEmoji: state.room?.emoji || "",
      p1: a.char?.name || "1. oyuncu",
      p2: vsBot ? "Bot" : b.char?.name || "2. oyuncu",
    });
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

  function dateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function todayKey() {
    return dateKey(new Date());
  }

  function normalizeDayKey(raw) {
    const parts = String(raw || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some((n) => !n)) return String(raw || "");
    return `${parts[0]}-${String(parts[1]).padStart(2, "0")}-${String(parts[2]).padStart(2, "0")}`;
  }

  function sameDayKey(a, b) {
    return normalizeDayKey(a) === normalizeDayKey(b);
  }

  const HISTORY_DAYS = 31;

  function historyStorageKey() {
    return `ot-history-${state.user?.id || "guest"}`;
  }

  function readHistory() {
    try {
      return JSON.parse(localStorage.getItem(historyStorageKey()) || "{}");
    } catch (err) {
      return {};
    }
  }

  function cutoffDayKey() {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - (HISTORY_DAYS - 1));
    return dateKey(d);
  }

  function pruneHistory(data) {
    const cutoff = cutoffDayKey();
    const next = {};
    Object.keys(data || {}).forEach((key) => {
      const day = normalizeDayKey(key);
      if (day >= cutoff) next[day] = data[key];
    });
    return next;
  }

  function writeHistory(data) {
    if (!state.user) return;
    localStorage.setItem(historyStorageKey(), JSON.stringify(pruneHistory(data)));
  }

  function emptyDayRecord() {
    return { playMs: 0, games: [] };
  }

  function dayRecord(all, day) {
    const key = normalizeDayKey(day);
    const rec = all[key] || emptyDayRecord();
    if (!Array.isArray(rec.games)) rec.games = [];
    rec.playMs = Number(rec.playMs || 0);
    all[key] = rec;
    return rec;
  }

  function saveTodayPlayMs() {
    if (!state.user) return;
    const all = readHistory();
    const rec = dayRecord(all, todayKey());
    rec.playMs = Math.max(rec.playMs, Math.floor(state.parent.usedMs || 0));
    writeHistory(all);
  }

  function recordHistoryGame(entry) {
    if (!state.user) return;
    const all = readHistory();
    const rec = dayRecord(all, todayKey());
    rec.playMs = Math.max(rec.playMs, Math.floor(state.parent.usedMs || 0));
    rec.games.push(entry);
    writeHistory(all);
  }

  function lastDayKeys() {
    const keys = [];
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    for (let i = 0; i < HISTORY_DAYS; i += 1) {
      keys.push(dateKey(d));
      d.setDate(d.getDate() - 1);
    }
    return keys;
  }

  function formatPlayMs(ms) {
    const total = Math.max(0, Math.floor(Number(ms) || 0));
    const mins = Math.floor(total / 60000);
    if (mins < 1) return total < 10000 ? "0 dk" : "1 dk";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h) return m ? `${h} sa ${m} dk` : `${h} sa`;
    return `${m} dk`;
  }

  function formatDayTitle(key) {
    const today = todayKey();
    if (key === today) return "Bugün";
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - 1);
    if (key === dateKey(d)) return "Dün";
    const [y, mo, da] = key.split("-").map(Number);
    const date = new Date(y, mo - 1, da);
    const weekdays = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    return `${da} ${months[mo - 1]} ${weekdays[date.getDay()]}`;
  }

  function gameResultLabel(game) {
    if (game.vsBot) {
      if (game.outcome === "win") return { text: "Kazandı", kind: "win" };
      if (game.outcome === "loss") return { text: "Kaybetti", kind: "loss" };
      return { text: "Berabere", kind: "tie" };
    }
    if (game.outcome === "p1") return { text: `${game.p1} kazandı`, kind: "win" };
    if (game.outcome === "p2") return { text: `${game.p2} kazandı`, kind: "win" };
    return { text: "Berabere", kind: "tie" };
  }

  function summarizeGames(games) {
    let win = 0;
    let loss = 0;
    let tie = 0;
    (games || []).forEach((game) => {
      if (game.vsBot) {
        if (game.outcome === "win") win += 1;
        else if (game.outcome === "loss") loss += 1;
        else tie += 1;
      } else if (game.outcome === "tie") tie += 1;
    });
    return { win, loss, tie, count: (games || []).length };
  }

  function renderStats() {
    const boxToday = $("stats-today");
    const boxDays = $("stats-days");
    if (!boxToday || !boxDays) return;
    const all = readHistory();
    const today = todayKey();
    const todayRec = dayRecord(all, today);
    todayRec.playMs = Math.max(todayRec.playMs, Math.floor(state.parent.usedMs || 0));
    const todaySum = summarizeGames(todayRec.games);
    boxToday.innerHTML = `
      <div class="stats-chip"><b>${escapeHtml(formatPlayMs(todayRec.playMs))}</b><span>bugün süre</span></div>
      <div class="stats-chip"><b>${todaySum.count}</b><span>bugün oyun</span></div>
      <div class="stats-chip"><b>${todaySum.win}</b><span>bugün kazandı</span></div>
    `;

    const keys = lastDayKeys().filter((key) => {
      if (key === today) return true;
      const rec = all[key];
      return rec && (Number(rec.playMs) > 0 || (rec.games && rec.games.length));
    });
    const hasAny = keys.some((key) => {
      const rec = all[key];
      return rec && (rec.playMs > 0 || (rec.games && rec.games.length));
    });
    if (!hasAny) {
      boxDays.innerHTML = `<p class="stats-empty">Henüz kayıt yok. Oyun bitince burada görünür.</p>`;
      return;
    }

    boxDays.innerHTML = keys
      .map((key) => {
        const rec = all[key] || emptyDayRecord();
        const games = [...(rec.games || [])].reverse();
        const sum = summarizeGames(games);
        const empty = !rec.playMs && !games.length;
        const meta = empty
          ? "Oyun yok"
          : [
              `${sum.count} oyun`,
              sum.win ? `${sum.win} kazandı` : "",
              sum.loss ? `${sum.loss} kaybetti` : "",
              sum.tie ? `${sum.tie} berabere` : "",
            ]
              .filter(Boolean)
              .join(" · ");
        const rows = games
          .map((game) => {
            const result = gameResultLabel(game);
            const mode = game.vsBot ? "Bota karşı" : "İki kişi";
            const score = `${game.scoreA}-${game.scoreB}`;
            const room = [game.roomEmoji, game.room].filter(Boolean).join(" ");
            return `<div class="stats-game">
              <span class="stats-result ${result.kind}">${escapeHtml(result.text)} · ${escapeHtml(score)}</span>
              <small>${escapeHtml(mode)}${room ? ` · ${escapeHtml(room)}` : ""} · ${escapeHtml(game.p1)} / ${escapeHtml(game.p2)}</small>
            </div>`;
          })
          .join("");
        return `<article class="stats-day${empty ? " empty" : ""}">
          <div class="stats-day-head">
            <strong>${escapeHtml(formatDayTitle(key))}</strong>
            <span>${escapeHtml(formatPlayMs(rec.playMs))}</span>
          </div>
          <p class="stats-day-meta">${escapeHtml(meta)}</p>
          ${rows}
        </article>`;
      })
      .join("");
  }

  function closeStatsModal() {
    const modal = $("stats-modal");
    if (modal) modal.hidden = true;
  }

  function openStatsModal() {
    if (!state.user) {
      show("login");
      return;
    }
    playTapSound();
    closeAccountMenu();
    closeParentModal();
    renderStats();
    $("stats-modal").hidden = false;
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
    saveTodayPlayMs();
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
    state.parent.usedMs = sameDayKey(saved.day, day) ? Number(saved.usedMs || 0) : 0;
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
    return Boolean(state.user) && state.screen !== "login";
  }

  function remainingMs() {
    if (!state.parent.limit || !state.user) return 0;
    rollParentDay();
    return Math.max(0, parentLimitMs() - state.parent.usedMs);
  }

  function formatRemaining(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function markAccountTimes() {
    document.querySelectorAll("#account-times [data-limit]").forEach((btn) => {
      btn.classList.toggle("on", Number(btn.dataset.limit) === state.parent.limit);
    });
  }

  function renderTimeLeft() {
    const show = Boolean(state.user && state.parent.limit && state.screen !== "login");
    const left = remainingMs();
    const text = formatRemaining(left);
    const low = show && left <= 2 * 60 * 1000;
    ["time-left", "play-time-left"].forEach((id) => {
      const el = $(id);
      if (!el) return;
      el.hidden = !show;
      el.classList.toggle("low", low);
      const label = el.querySelector(".time-left-text");
      if (label) label.textContent = text;
    });
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
    const counting =
      !document.hidden &&
      $("time-lock").hidden &&
      $("parent-modal").hidden &&
      sessionCounts();
    if (counting) {
      state.parent.usedMs += delta;
      if (state.parent.limit && state.parent.usedMs >= parentLimitMs()) {
        state.parent.usedMs = parentLimitMs();
        saveParent();
        lockPlayTime();
      } else {
        saveParent();
      }
    }
    renderTimeLeft();
  }

  function setParentPinError(text) {
    const el = $("parent-pin-error");
    if (!el) return;
    if (!text) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = text;
  }

  function renderParentModal() {
    const gated = timeIsUp() && !state.parent.verified;
    const google = state.user?.via === "google";
    $("parent-title").textContent = gated ? "Ebeveyn" : "Süre";
    $("parent-hint").textContent = gated
      ? google
        ? "Devam etmek için Gmail ile onayla."
        : "Devam etmek için aile şifresini yaz."
      : "Bugün ne kadar oynasın?";
    $("parent-user").textContent = state.user?.email || state.user?.name || "";
    $("parent-pin-form").hidden = !gated || google;
    $("parent-google").hidden = !gated || !google;
    $("parent-limits").hidden = gated;
    $("parent-actions").hidden = gated;
    document.querySelectorAll(".limit-btn").forEach((btn) => {
      btn.classList.toggle("on", Number(btn.dataset.limit) === state.parent.limit);
    });
    if (gated && !google) {
      $("parent-pin").value = "";
      setParentPinError("");
      setTimeout(() => $("parent-pin").focus(), 50);
    }
  }

  function openParentModal() {
    if (!state.user) {
      show("login");
      return;
    }
    playTapSound();
    closeAccountMenu();
    state.parent.verified = !timeIsUp();
    renderParentModal();
    $("parent-modal").hidden = false;
  }

  function confirmParentModal() {
    closeParentModal();
  }

  function setParentLimit(minutes) {
    const wasLocked = !$("time-lock").hidden;
    state.parent.limit = minutes;
    saveParent();
    document.querySelectorAll(".limit-btn").forEach((btn) => {
      btn.classList.toggle("on", Number(btn.dataset.limit) === minutes);
    });
    playTapSound();
    if (!timeIsUp()) {
      unlockPlayTime();
      if (wasLocked) closeParentModal();
    } else {
      lockPlayTime();
      if (!$("parent-modal").hidden) renderParentModal();
    }
    markAccountTimes();
    renderTimeLeft();
    closeAccountMenu();
  }

  function closeParentModal() {
    state.parent.verified = false;
    setParentPinError("");
    $("parent-modal").hidden = true;
    if (timeIsUp()) lockPlayTime();
  }

  async function checkLocalPass(name, pass) {
    const key = nameKey(name);
    const accounts = readAccounts();
    const found = accounts.find((a) => a.key === key);
    if (!found) return false;
    const hash = await hashSecret(pass, found.salt);
    return hash === found.hash;
  }

  async function verifyParentPassword(pass) {
    const user = state.user;
    if (!user) throw new Error("Önce giriş yap.");
    if (!pass) throw new Error("Şifre yaz.");
    if (await checkLocalPass(user.name, pass)) return;
    if (firebaseOn()) {
      const email = user.email || `${nameKey(user.name)}@oyuncak-toplama.web.app`;
      try {
        const current = firebase.auth().currentUser;
        if (current) {
          const cred = firebase.auth.EmailAuthProvider.credential(email, pass);
          await current.reauthenticateWithCredential(cred);
          return;
        }
        await firebase.auth().signInWithEmailAndPassword(email, pass);
        return;
      } catch (err) {
        if (err && !String(err.code || "").startsWith("auth/")) throw err;
      }
    }
    throw new Error("Şifre uyuşmadı.");
  }

  async function submitParentPin(event) {
    event.preventDefault();
    setParentPinError("");
    try {
      await verifyParentPassword($("parent-pin").value);
      state.parent.verified = true;
      $("parent-pin").value = "";
      playTapSound();
      renderParentModal();
    } catch (err) {
      setParentPinError(err.message || "Şifre uyuşmadı.");
    }
  }

  async function confirmParentGoogle() {
    setParentPinError("");
    $("parent-google").textContent = "Gmail açılıyor…";
    try {
      initFirebase();
      if (!firebaseOn()) throw new Error("Firebase yüklenemedi. Sayfayı yenile.");
      const provider = googleProvider();
      const current = firebase.auth().currentUser;
      if (current) {
        await current.reauthenticateWithPopup(provider);
      } else {
        const cred = await firebase.auth().signInWithPopup(provider);
        if (cred.user.uid !== state.user.id) throw new Error("Başka bir Gmail seçildi.");
      }
      state.parent.verified = true;
      playTapSound();
      renderParentModal();
    } catch (err) {
      setParentPinError(friendlyAuthError(err));
    } finally {
      $("parent-google").textContent = "Gmail ile onayla";
    }
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
    $("login-pass").autocomplete = "new-password";
    $("login-name").autocomplete = "off";
    setLoginError("");
  }

  function firstName(name) {
    return String(name || "Aile").trim().split(/\s+/)[0];
  }

  function closeAccountMenu() {
    const menu = $("account-menu");
    const btn = $("btn-account");
    if (!menu || !btn) return;
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  }

  function toggleAccountMenu() {
    const menu = $("account-menu");
    const btn = $("btn-account");
    const open = menu.hidden;
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      markAccountTimes();
      playTapSound();
    }
  }

  function renderAccount() {
    const wrap = $("account-wrap");
    const user = state.user;
    if (!wrap) return;
    if (!user || state.screen === "login") {
      wrap.hidden = true;
      closeAccountMenu();
      renderTimeLeft();
      return;
    }
    wrap.hidden = false;
    $("account-name").textContent = firstName(user.name);
    const photo = $("account-photo");
    const initial = $("account-initial");
    if (user.photo) {
      photo.src = user.photo;
      photo.hidden = false;
      initial.hidden = true;
    } else {
      photo.removeAttribute("src");
      photo.hidden = true;
      initial.hidden = false;
      initial.textContent = firstName(user.name).charAt(0).toUpperCase();
    }
    markAccountTimes();
    renderTimeLeft();
  }

  function enterApp(user) {
    state.user = user;
    localStorage.setItem("ot-session-user", JSON.stringify(user));
    loadParentSettings();
    if (timeIsUp()) lockPlayTime();
    else unlockPlayTime();
    renderAccount();
    show("hub");
  }

  function logoutUser() {
    saveParent();
    localStorage.removeItem("ot-session-user");
    state.user = null;
    closeStatsModal();
    closeParentModal();
    closeAccountMenu();
    unlockPlayTime();
    if (firebaseOn()) {
      firebase.auth().signOut().catch(() => {});
    }
    $("login-pass").value = "";
    $("login-pass2").value = "";
    setAuthMode("login");
    show("login");
    stripAutofill();
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
    if (!(await checkLocalPass(name, pass))) throw new Error("Şifre uyuşmadı.");
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
    $("login-name").readOnly = false;
    $("login-pass").readOnly = false;
    $("login-pass2").readOnly = false;
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
    const google = fbUser.providerData?.find((p) => p.providerId === "google.com");
    return {
      id: fbUser.uid,
      name: fbUser.displayName || google?.displayName || fbUser.email || "Aile",
      email: fbUser.email || google?.email || "",
      photo: fbUser.photoURL || google?.photoURL || "",
      via: via || (google ? "google" : "password"),
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

  function waitForFirebaseUser(ms) {
    return new Promise((resolve) => {
      if (!firebaseOn()) {
        resolve(null);
        return;
      }
      if (firebase.auth().currentUser) {
        resolve(firebase.auth().currentUser);
        return;
      }
      let done = false;
      const finish = (user) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        unsub();
        resolve(user || null);
      };
      const unsub = firebase.auth().onAuthStateChanged((user) => {
        if (user) finish(user);
      });
      const timer = setTimeout(() => finish(firebase.auth().currentUser), ms);
    });
  }

  let autofillGuardBound = false;
  function stripAutofill() {
    const name = $("login-name");
    const pass = $("login-pass");
    const pass2 = $("login-pass2");
    [name, pass, pass2].forEach((el) => {
      el.value = "";
      el.readOnly = true;
    });
    const unlock = (el) => {
      el.readOnly = false;
    };
    if (!autofillGuardBound) {
      autofillGuardBound = true;
      [name, pass, pass2].forEach((el) => {
        el.addEventListener("focus", () => unlock(el));
        el.addEventListener("pointerdown", () => unlock(el));
      });
    }
    setTimeout(() => {
      if (document.activeElement !== name) name.value = "";
      if (document.activeElement !== pass) pass.value = "";
    }, 400);
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
      const provider = googleProvider();
      try {
        const cred = await firebase.auth().signInWithPopup(provider);
        $("btn-google").textContent = "Gmail ile bağlan";
        playTapSound();
        enterApp(userFromFirebase(cred.user, "google"));
        return;
      } catch (err) {
        const needRedirect =
          err.code === "auth/popup-blocked" ||
          err.code === "auth/operation-not-supported-in-this-environment";
        if (!needRedirect) throw err;
      }
      sessionStorage.setItem("ot-google-pending", "1");
      await firebase.auth().signInWithRedirect(provider);
    } catch (err) {
      sessionStorage.removeItem("ot-google-pending");
      $("btn-google").textContent = "Gmail ile bağlan";
      setLoginError(friendlyAuthError(err));
    }
  }

  async function restoreSession() {
    initFirebase();
    if (firebaseOn()) {
      const pending = sessionStorage.getItem("ot-google-pending") === "1";
      $("login-tagline").textContent = pending ? "Gmail ile bağlanıyor…" : "Giriş kontrol ediliyor…";
      try {
        firebase.auth().languageCode = "tr";
        try {
          const result = await firebase.auth().getRedirectResult();
          if (result?.user) {
            sessionStorage.removeItem("ot-google-pending");
            enterApp(userFromFirebase(result.user, "google"));
            return true;
          }
        } catch (err) {
          sessionStorage.removeItem("ot-google-pending");
          setLoginError(friendlyAuthError(err));
        }
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) return;
          sessionStorage.removeItem("ot-google-pending");
          const next = userFromFirebase(user);
          if (state.screen === "login" || !state.user || state.user.id !== next.id) {
            enterApp(next);
            return;
          }
          state.user = { ...state.user, ...next };
          localStorage.setItem("ot-session-user", JSON.stringify(state.user));
          renderAccount();
        });
        const fbUser = await waitForFirebaseUser(pending ? 5000 : 1800);
        if (fbUser) {
          sessionStorage.removeItem("ot-google-pending");
          enterApp(userFromFirebase(fbUser));
          return true;
        }
      } catch (err) {
        setLoginError(friendlyAuthError(err));
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
    stripAutofill();
    return false;
  }

  function loadDressSave() {
    try {
      const saved = JSON.parse(localStorage.getItem("ot-dress") || "null");
      if (saved?.babyId && DOLLS.some((d) => d.id === saved.babyId)) {
        state.dress.babyId = saved.babyId;
      }
      if (saved?.wear && typeof saved.wear === "object") {
        state.dress.wear = { ...EMPTY_WEAR };
        Object.keys(EMPTY_WEAR).forEach((key) => {
          if (typeof saved.wear[key] === "string") state.dress.wear[key] = saved.wear[key];
        });
        if (!state.dress.wear.dress && saved.wear.top === "bindalli") {
          state.dress.wear.dress = "bindalli";
        }
      }
      if (saved?.cat && DRESS_ITEMS[saved.cat]) state.dress.cat = saved.cat;
    } catch (err) {
      /* ignore */
    }
  }

  function saveDress() {
    localStorage.setItem(
      "ot-dress",
      JSON.stringify({ babyId: state.dress.babyId, cat: state.dress.cat, wear: state.dress.wear })
    );
  }

  function dressItem(cat, id) {
    return (DRESS_ITEMS[cat] || []).find((item) => item.id === id) || (DRESS_ITEMS[cat] || [])[0];
  }

  function currentDoll() {
    return DOLLS.find((d) => d.id === state.dress.babyId) || DOLLS[0];
  }

  function dollName(doll) {
    return displayName({ id: doll.id, name: doll.name });
  }

  function svgWrap(viewBox, inner, cls = "") {
    return `<svg class="${cls}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" focusable="false">${inner}</svg>`;
  }

  function wornHair() {
    return state.dress.wear.hair || currentDoll().hairStyle;
  }

  function wornHairColor() {
    return state.dress.wear.hairColor || currentDoll().hair;
  }

  function wornEyes() {
    return state.dress.wear.eyes || "#5c3317";
  }

  const KID_HEAD = { x: 100, y: 54 };

  function shadeHex(hex, amt) {
    const n = String(hex || "#888888").replace("#", "");
    if (n.length !== 6) return hex;
    const ch = (i) => Math.max(0, Math.min(255, Math.round(parseInt(n.slice(i, i + 2), 16) * amt)));
    return `#${ch(0).toString(16).padStart(2, "0")}${ch(2).toString(16).padStart(2, "0")}${ch(4).toString(16).padStart(2, "0")}`;
  }

  function outfitPalette() {
    const dress = state.dress.wear.dress || "";
    const shirt = currentDoll().onesie;
    const map = {
      "": { main: shirt, dark: shadeHex(shirt, 0.72), light: "#fff8f0", extra: "#ffe066" },
      princess: { main: "#ff5d8f", dark: "#c2255c", light: "#ffc2d4", extra: "#ffe066" },
      bindalli: { main: "#c2255c", dark: "#862e9c", light: "#ffd43b", extra: "#fff" },
      sailor: { main: "#1c7ed6", dark: "#1864ab", light: "#fff", extra: "#c92a2a" },
      sun: { main: "#fab005", dark: "#e67700", light: "#ffe066", extra: "#ff8fab" },
      mint: { main: "#51cf66", dark: "#2f9e44", light: "#d3f9d8", extra: "#fff" },
      starry: { main: "#7048e8", dark: "#5f3dc4", light: "#b197fc", extra: "#ffe066" },
    };
    return map[dress] || map[""];
  }

  let artSeq = 0;
  let P = null;

  function tintHex(hex, amt) {
    const n = String(hex || "#888888").replace("#", "");
    if (n.length !== 6) return hex;
    const ch = (i) => {
      const v = parseInt(n.slice(i, i + 2), 16);
      return Math.max(0, Math.min(255, Math.round(v + (255 - v) * amt))).toString(16).padStart(2, "0");
    };
    return `#${ch(0)}${ch(2)}${ch(4)}`;
  }

  function beginPaint(skin, hair, shirt, eye) {
    artSeq += 1;
    const id = `ot${artSeq}`;
    const pal = outfitPalette();
    P = {
      id,
      pal,
      skin,
      hair,
      shirt,
      eye,
      g(name) {
        return `url(#${id}-${name})`;
      },
      defs: `<defs>
        <radialGradient id="${id}-skin" cx=".36" cy=".3" r=".75">
          <stop offset="0" stop-color="${tintHex(skin, 0.22)}"/>
          <stop offset=".62" stop-color="${skin}"/>
          <stop offset="1" stop-color="${shadeHex(skin, 0.86)}"/>
        </radialGradient>
        <linearGradient id="${id}-limb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${shadeHex(skin, 0.82)}"/>
          <stop offset=".42" stop-color="${tintHex(skin, 0.14)}"/>
          <stop offset="1" stop-color="${shadeHex(skin, 0.78)}"/>
        </linearGradient>
        <linearGradient id="${id}-hair" x1=".15" y1="0" x2=".9" y2="1">
          <stop offset="0" stop-color="${tintHex(hair, 0.34)}"/>
          <stop offset=".42" stop-color="${hair}"/>
          <stop offset="1" stop-color="${shadeHex(hair, 0.56)}"/>
        </linearGradient>
        <linearGradient id="${id}-hair2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${tintHex(hair, 0.22)}"/>
          <stop offset="1" stop-color="${shadeHex(hair, 0.68)}"/>
        </linearGradient>
        <linearGradient id="${id}-shirt" x1=".15" y1="0" x2=".2" y2="1">
          <stop offset="0" stop-color="${tintHex(shirt, 0.3)}"/>
          <stop offset=".5" stop-color="${shirt}"/>
          <stop offset="1" stop-color="${shadeHex(shirt, 0.7)}"/>
        </linearGradient>
        <linearGradient id="${id}-shorts" x1="0" y1="0" x2=".15" y2="1">
          <stop offset="0" stop-color="${tintHex(shirt, 0.08)}"/>
          <stop offset="1" stop-color="${shadeHex(shirt, 0.6)}"/>
        </linearGradient>
        <linearGradient id="${id}-cloth" x1=".2" y1="0" x2=".85" y2="1">
          <stop offset="0" stop-color="${tintHex(pal.main, 0.32)}"/>
          <stop offset=".46" stop-color="${pal.main}"/>
          <stop offset="1" stop-color="${shadeHex(pal.main, 0.66)}"/>
        </linearGradient>
        <linearGradient id="${id}-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${tintHex(pal.light, 0.25)}"/>
          <stop offset="1" stop-color="${pal.light}"/>
        </linearGradient>
        <linearGradient id="${id}-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${tintHex(pal.dark, 0.2)}"/>
          <stop offset="1" stop-color="${shadeHex(pal.dark, 0.72)}"/>
        </linearGradient>
        <radialGradient id="${id}-iris" cx=".35" cy=".3" r=".72">
          <stop offset="0" stop-color="${tintHex(eye, 0.5)}"/>
          <stop offset=".52" stop-color="${eye}"/>
          <stop offset="1" stop-color="${shadeHex(eye, 0.42)}"/>
        </radialGradient>
        <linearGradient id="${id}-shoe" x1="0" y1="0" x2=".2" y2="1">
          <stop offset="0" stop-color="${tintHex(pal.main, 0.36)}"/>
          <stop offset="1" stop-color="${shadeHex(pal.main, 0.68)}"/>
        </linearGradient>
        <linearGradient id="${id}-bag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${tintHex(pal.main, 0.34)}"/>
          <stop offset=".5" stop-color="${pal.main}"/>
          <stop offset="1" stop-color="${shadeHex(pal.main, 0.62)}"/>
        </linearGradient>
        <radialGradient id="${id}-nazar" cx=".38" cy=".32" r=".7">
          <stop offset="0" stop-color="#74c0fc"/>
          <stop offset=".5" stop-color="#1c7ed6"/>
          <stop offset="1" stop-color="#1864ab"/>
        </radialGradient>
        <linearGradient id="${id}-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffe066"/>
          <stop offset="1" stop-color="#f08c00"/>
        </linearGradient>
        <linearGradient id="${id}-leather" x1=".1" y1="0" x2=".4" y2="1">
          <stop offset="0" stop-color="#b07a3a"/>
          <stop offset="1" stop-color="#4a2e12"/>
        </linearGradient>
        <linearGradient id="${id}-rain" x1=".15" y1="0" x2=".4" y2="1">
          <stop offset="0" stop-color="#ffe066"/>
          <stop offset="1" stop-color="#e67700"/>
        </linearGradient>
      </defs>`,
    };
    return P;
  }

  function hairShine(cx, cy) {
    return `<ellipse cx="${cx - 9}" cy="${cy - 26}" rx="8" ry="3.6" fill="#fff" opacity=".22" transform="rotate(-30 ${cx - 9} ${cy - 26})"/>`;
  }

  function hairStrands(cx, cy) {
    const s = shadeHex(P.hair, 0.48);
    return `<g fill="none" stroke="${s}" stroke-width="1.05" opacity=".3" stroke-linecap="round">
      <path d="M${cx - 14} ${cy - 28} Q${cx - 18} ${cy - 16} ${cx - 8} ${cy - 11}"/>
      <path d="M${cx} ${cy - 32} Q${cx - 2} ${cy - 18} ${cx + 2} ${cy - 12}"/>
      <path d="M${cx + 12} ${cy - 27} Q${cx + 16} ${cy - 16} ${cx + 8} ${cy - 11}"/>
    </g>${hairShine(cx, cy)}`;
  }

  function hairBow(x, y) {
    return `<ellipse cx="${x - 5.4}" cy="${y}" rx="5.6" ry="4.4" fill="${P.g("cloth")}"/>
      <ellipse cx="${x + 5.4}" cy="${y}" rx="5.6" ry="4.4" fill="${P.g("cloth")}"/>
      <ellipse cx="${x - 6}" cy="${y - 1.2}" rx="2.4" ry="1.4" fill="#fff" opacity=".28"/>
      <circle cx="${x}" cy="${y}" r="2.5" fill="${P.g("dark")}"/>
      <circle cx="${x - 0.6}" cy="${y - 0.7}" r="0.8" fill="#fff" opacity=".45"/>`;
  }

  function braidRope(x, y0, dir) {
    let out = "";
    for (let i = 0; i < 8; i += 1) {
      const y = y0 + i * 8.5;
      const ox = dir * (i % 2 === 0 ? 2.4 : -2.4);
      out += `<ellipse cx="${x + ox}" cy="${y}" rx="6.4" ry="5.8" fill="${i % 2 ? P.g("hair2") : P.g("hair")}"/>
        <ellipse cx="${x + ox - 1.6}" cy="${y - 1.4}" rx="2.2" ry="1.5" fill="#fff" opacity=".18"/>`;
    }
    out += `<circle cx="${x}" cy="${y0 + 70}" r="4.6" fill="${P.g("cloth")}"/>
      <circle cx="${x - 0.8}" cy="${y0 + 68.6}" r="1.6" fill="#fff" opacity=".4"/>`;
    return out;
  }

  function hairCrown(cx, cy) {
    const L = cx - 30;
    const R = cx + 30;
    const earY = cy + 8;
    return `M${L} ${earY} C${L - 3} ${cy - 8} ${cx - 16} ${cy - 36} ${cx} ${cy - 35} C${cx + 16} ${cy - 36} ${R + 3} ${cy - 8} ${R} ${earY}`;
  }

  function hairHelmet(cx, cy, kind) {
    const L = cx - 30;
    const R = cx + 30;
    const earY = cy + 8;
    const crown = hairCrown(cx, cy);
    let line = "";
    if (kind === "high") {
      line = `C${cx + 24} ${cy - 6} ${cx + 12} ${cy - 18} ${cx} ${cy - 19} C${cx - 12} ${cy - 18} ${cx - 24} ${cy - 6} ${L} ${earY}`;
    } else if (kind === "part") {
      line = `L${cx + 24} ${cy - 11} Q${cx + 11} ${cy - 17} ${cx} ${cy - 21} Q${cx - 11} ${cy - 17} ${cx - 24} ${cy - 11} L${L} ${earY}`;
    } else if (kind === "bangs") {
      line = `L${cx + 25} ${cy - 12} L${cx + 18} ${cy - 11} L${cx + 12} ${cy - 13} L${cx + 5} ${cy - 11} L${cx} ${cy - 13} L${cx - 5} ${cy - 11} L${cx - 12} ${cy - 13} L${cx - 18} ${cy - 11} L${cx - 25} ${cy - 12} L${L} ${earY}`;
    } else if (kind === "short") {
      line = `L${cx + 24} ${cy - 12} L${cx + 17} ${cy - 16} L${cx + 10} ${cy - 12} L${cx + 3} ${cy - 16} L${cx - 4} ${cy - 12} L${cx - 11} ${cy - 16} L${cx - 18} ${cy - 12} L${cx - 24} ${cy - 15} L${L} ${earY}`;
    } else if (kind === "sweep") {
      line = `L${cx + 24} ${cy - 16} Q${cx + 6} ${cy - 10} ${cx - 8} ${cy - 13} Q${cx - 18} ${cy - 14} ${cx - 24} ${cy - 12} L${L} ${earY}`;
    } else if (kind === "wave") {
      line = `Q${cx + 18} ${cy - 8} ${cx + 10} ${cy - 13} Q${cx} ${cy - 9} ${cx - 10} ${cy - 13} Q${cx - 18} ${cy - 8} ${L} ${earY}`;
    } else {
      line = `C${cx + 24} ${cy - 6} ${cx + 12} ${cy - 16} ${cx} ${cy - 17} C${cx - 12} ${cy - 16} ${cx - 24} ${cy - 6} ${L} ${earY}`;
    }
    return `<path d="${crown} ${line}Z" fill="${P.g("hair")}"/>${hairStrands(cx, cy)}`;
  }

  function babyHairs(cx, cy) {
    return `<g stroke="${P.hair}" stroke-width="1.15" fill="none" stroke-linecap="round" opacity=".75">
      <path d="M${cx - 7} ${cy - 19} L${cx - 9} ${cy - 15}"/>
      <path d="M${cx + 2} ${cy - 19} L${cx + 5} ${cy - 15}"/>
      <path d="M${cx + 10} ${cy - 18} L${cx + 12} ${cy - 14}"/>
    </g>`;
  }

  function lockShape(d) {
    return `<path d="${d}" fill="${P.g("hair")}"/>`;
  }

  function hairBack(style, color, cx, cy) {
    if (style === "pig") {
      return `${lockShape(`M${cx - 22} ${cy - 2} C${cx - 44} ${cy + 6} ${cx - 48} ${cy + 36} ${cx - 36} ${cy + 64} Q${cx - 28} ${cy + 48} ${cx - 30} ${cy + 22} C${cx - 30} ${cy + 8} ${cx - 18} ${cy + 2} ${cx - 22} ${cy - 2}Z`)}
        ${lockShape(`M${cx + 22} ${cy - 2} C${cx + 44} ${cy + 6} ${cx + 48} ${cy + 36} ${cx + 36} ${cy + 64} Q${cx + 28} ${cy + 48} ${cx + 30} ${cy + 22} C${cx + 30} ${cy + 8} ${cx + 18} ${cy + 2} ${cx + 22} ${cy - 2}Z`)}
        <path d="M${cx - 34} ${cy + 16} Q${cx - 40} ${cy + 36} ${cx - 34} ${cy + 54}" stroke="${shadeHex(color, 0.55)}" stroke-width="1.4" fill="none" opacity=".35"/>
        <path d="M${cx + 34} ${cy + 16} Q${cx + 40} ${cy + 36} ${cx + 34} ${cy + 54}" stroke="${shadeHex(color, 0.55)}" stroke-width="1.4" fill="none" opacity=".35"/>
        ${hairBow(cx - 24, cy - 4)}${hairBow(cx + 24, cy - 4)}`;
    }
    if (style === "short") {
      return `<path d="M${cx - 8} ${cy - 34} Q${cx - 4} ${cy - 44} ${cx + 1} ${cy - 34}Z" fill="${P.g("hair")}"/>
        <path d="M${cx + 8} ${cy - 33} Q${cx + 16} ${cy - 42} ${cx + 16} ${cy - 32}Z" fill="${P.g("hair")}"/>`;
    }
    if (style === "long") {
      return `<path d="M${cx - 34} ${cy + 86} C${cx - 46} ${cy + 42} ${cx - 40} ${cy + 4} ${cx - 28} ${cy - 8} L${cx - 30} ${cy + 8} C${cx - 36} ${cy + 36} ${cx - 24} ${cy + 70} ${cx - 20} ${cy + 88}Z" fill="${P.g("hair2")}"/>
        <path d="M${cx + 34} ${cy + 86} C${cx + 46} ${cy + 42} ${cx + 40} ${cy + 4} ${cx + 28} ${cy - 8} L${cx + 30} ${cy + 8} C${cx + 36} ${cy + 36} ${cx + 24} ${cy + 70} ${cx + 20} ${cy + 88}Z" fill="${P.g("hair")}"/>
        <path d="M${cx - 30} ${cy + 20} Q${cx - 38} ${cy + 50} ${cx - 24} ${cy + 80}" stroke="#fff" stroke-width="2" opacity=".12" fill="none"/>
        <path d="M${cx + 30} ${cy + 20} Q${cx + 38} ${cy + 50} ${cx + 24} ${cy + 80}" stroke="#fff" stroke-width="2" opacity=".12" fill="none"/>`;
    }
    if (style === "braid") {
      return `${braidRope(cx - 28, cy + 10, -1)}${braidRope(cx + 28, cy + 10, 1)}`;
    }
    if (style === "bun") {
      return `<ellipse cx="${cx}" cy="${cy - 38}" rx="14.5" ry="12.5" fill="${P.g("hair")}"/>
        <ellipse cx="${cx - 2}" cy="${cy - 40}" rx="8" ry="6" fill="${P.g("hair2")}"/>
        <ellipse cx="${cx - 4}" cy="${cy - 42}" rx="4" ry="2.4" fill="#fff" opacity=".24"/>
        <circle cx="${cx + 11}" cy="${cy - 30}" r="3.3" fill="${P.g("cloth")}"/>
        <circle cx="${cx + 10.4}" cy="${cy - 31}" r="1.1" fill="#fff" opacity=".4"/>`;
    }
    if (style === "pony") {
      return `<path d="M${cx + 8} ${cy - 26} C${cx + 34} ${cy - 34} ${cx + 50} ${cy + 8} ${cx + 40} ${cy + 66} Q${cx + 32} ${cy + 36} ${cx + 26} ${cy + 6} C${cx + 22} ${cy - 14} ${cx + 10} ${cy - 22} ${cx + 8} ${cy - 26}Z" fill="${P.g("hair")}"/>
        <path d="M${cx + 18} ${cy - 8} C${cx + 34} ${cy + 8} ${cx + 36} ${cy + 32} ${cx + 30} ${cy + 58}" stroke="#fff" stroke-width="2.4" fill="none" opacity=".16"/>
        <circle cx="${cx + 14}" cy="${cy - 26}" r="4.2" fill="${P.g("cloth")}"/>
        <circle cx="${cx + 13.2}" cy="${cy - 27.2}" r="1.4" fill="#fff" opacity=".45"/>`;
    }
    if (style === "curl") {
      return `<path d="M${cx - 36} ${cy + 46} C${cx - 48} ${cy + 18} ${cx - 38} ${cy - 4} ${cx - 28} ${cy - 8} C${cx - 40} ${cy + 16} ${cx - 28} ${cy + 36} ${cx - 22} ${cy + 50}Z" fill="${P.g("hair2")}"/>
        <path d="M${cx + 36} ${cy + 46} C${cx + 48} ${cy + 18} ${cx + 38} ${cy - 4} ${cx + 28} ${cy - 8} C${cx + 40} ${cy + 16} ${cx + 28} ${cy + 36} ${cx + 22} ${cy + 50}Z" fill="${P.g("hair")}"/>`;
    }
    return `<path d="M${cx - 32} ${cy + 28} C${cx - 36} ${cy + 8} ${cx - 30} ${cy - 8} ${cx - 28} ${cy - 8} C${cx - 34} ${cy + 10} ${cx - 24} ${cy + 24} ${cx - 18} ${cy + 32}Z" fill="${P.g("hair2")}"/>
      <path d="M${cx + 32} ${cy + 28} C${cx + 36} ${cy + 8} ${cx + 30} ${cy - 8} ${cx + 28} ${cy - 8} C${cx + 34} ${cy + 10} ${cx + 24} ${cy + 24} ${cx + 18} ${cy + 32}Z" fill="${P.g("hair")}"/>`;
  }

  function hairFront(style, color, cx, cy) {
    if (style === "short") {
      return `${hairHelmet(cx, cy, "short")}
        <path d="M${cx - 27} ${cy + 2} Q${cx - 28} ${cy + 12} ${cx - 24} ${cy + 16}" stroke="${P.g("hair")}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <path d="M${cx + 27} ${cy + 2} Q${cx + 28} ${cy + 12} ${cx + 24} ${cy + 16}" stroke="${P.g("hair")}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
    }
    if (style === "bangs") return hairHelmet(cx, cy, "bangs");
    if (style === "bun" || style === "pony") return `${hairHelmet(cx, cy, "high")}${babyHairs(cx, cy)}`;
    if (style === "long") {
      return `${hairHelmet(cx, cy, "sweep")}
        <path d="M${cx - 26} ${cy - 4} C${cx - 30} ${cy + 14} ${cx - 28} ${cy + 30} ${cx - 20} ${cy + 38}" stroke="${P.g("hair")}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    }
    if (style === "curl") return hairHelmet(cx, cy, "wave");
    return hairHelmet(cx, cy, "part");
  }

  function eyeOne(x, y) {
    return `<ellipse cx="${x}" cy="${y}" rx="6.5" ry="7.5" fill="#fff" stroke="#3d2b1f" stroke-width="1.25"/>
      <ellipse cx="${x}" cy="${y + 0.7}" rx="4.3" ry="4.8" fill="${P.g("iris")}"/>
      <circle cx="${x}" cy="${y + 1}" r="2.15" fill="#1a120c"/>
      <circle cx="${x - 1.7}" cy="${y - 1.7}" r="1.45" fill="#fff"/>
      <circle cx="${x + 1.5}" cy="${y - 0.2}" r="0.7" fill="#fff" opacity=".7"/>
      <path d="M${x - 6.4} ${y - 4.8} Q${x} ${y - 8.2} ${x + 6.4} ${y - 4.8}" stroke="#3d2b1f" stroke-width="1.45" fill="none" stroke-linecap="round"/>`;
  }

  function headSvg(skin, eye, cx, cy) {
    return `<ellipse cx="${cx - 26}" cy="${cy + 2}" rx="6.2" ry="8.2" fill="${P.g("limb")}"/>
      <ellipse cx="${cx + 26}" cy="${cy + 2}" rx="6.2" ry="8.2" fill="${P.g("limb")}"/>
      <ellipse cx="${cx - 26}" cy="${cy + 1}" rx="2.4" ry="3.2" fill="${shadeHex(skin, 0.86)}" opacity=".45"/>
      <ellipse cx="${cx + 26}" cy="${cy + 1}" rx="2.4" ry="3.2" fill="${shadeHex(skin, 0.86)}" opacity=".45"/>
      <ellipse cx="${cx}" cy="${cy + 2}" rx="28" ry="31" fill="${P.g("skin")}"/>
      <ellipse cx="${cx - 8}" cy="${cy - 6}" rx="12" ry="9" fill="#fff" opacity=".14"/>
      <ellipse cx="${cx - 12}" cy="${cy + 11}" rx="6.2" ry="3.4" fill="#ff8fab" opacity=".38"/>
      <ellipse cx="${cx + 12}" cy="${cy + 11}" rx="6.2" ry="3.4" fill="#ff8fab" opacity=".38"/>
      <path d="M${cx - 16} ${cy - 12} Q${cx - 10} ${cy - 15.2} ${cx - 4} ${cy - 12.2}" stroke="${shadeHex(P.hair, 0.72)}" stroke-width="1.55" fill="none" stroke-linecap="round"/>
      <path d="M${cx + 4} ${cy - 12.2} Q${cx + 10} ${cy - 15.2} ${cx + 16} ${cy - 12}" stroke="${shadeHex(P.hair, 0.72)}" stroke-width="1.55" fill="none" stroke-linecap="round"/>
      ${eyeOne(cx - 9, cy - 1)}${eyeOne(cx + 9, cy - 1)}
      <ellipse cx="${cx}" cy="${cy + 8.6}" rx="3.3" ry="2.5" fill="${shadeHex(skin, 0.82)}" opacity=".55"/>
      <ellipse cx="${cx}" cy="${cy + 7.6}" rx="1.6" ry="1" fill="#fff" opacity=".25"/>
      <path d="M${cx - 6.5} ${cy + 16.2} Q${cx} ${cy + 21.4} ${cx + 6.5} ${cy + 16.2}" fill="#e85a7a" opacity=".18"/>
      <path d="M${cx - 6} ${cy + 16} Q${cx} ${cy + 20.6} ${cx + 6} ${cy + 16}" stroke="#c73462" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <path d="M${cx - 2.4} ${cy + 17.4} Q${cx} ${cy + 19} ${cx + 2.4} ${cy + 17.4}" stroke="#fff" stroke-width="1" fill="none" opacity=".45"/>`;
  }

  function kidBody(shirt, skin, dressed) {
    const neck = `<rect x="93" y="80" width="14" height="16" rx="5" fill="${P.g("limb")}"/>`;
    const arms = `<rect x="58" y="98" width="13" height="74" rx="6.5" fill="${P.g("limb")}" transform="rotate(12 64.5 98)"/>
      <rect x="129" y="98" width="13" height="74" rx="6.5" fill="${P.g("limb")}" transform="rotate(-12 135.5 98)"/>
      <ellipse cx="54" cy="170" rx="7" ry="6.4" fill="${P.g("skin")}" transform="rotate(12 54 170)"/>
      <ellipse cx="146" cy="170" rx="7" ry="6.4" fill="${P.g("skin")}" transform="rotate(-12 146 170)"/>`;
    const legs = `<rect x="78" y="198" width="16" height="112" rx="8" fill="${P.g("limb")}"/>
      <rect x="106" y="198" width="16" height="112" rx="8" fill="${P.g("limb")}"/>
      <rect x="81" y="210" width="4" height="70" rx="2" fill="#fff" opacity=".12"/>
      <rect x="109" y="210" width="4" height="70" rx="2" fill="#fff" opacity=".12"/>`;
    if (dressed) return `${neck}${arms}${legs}`;
    return `${neck}${arms}
      <path d="M72 94 L88 94 L80 120 L58 108 Q62 94 72 94Z" fill="${P.g("shirt")}"/>
      <path d="M128 94 L112 94 L120 120 L142 108 Q138 94 128 94Z" fill="${P.g("shirt")}"/>
      <path d="M74 94 L126 94 L130 168 L70 168Z" fill="${P.g("shirt")}"/>
      <path d="M88 94 L112 94 L110 108 L90 108Z" fill="#fff" opacity=".22"/>
      <path d="M118 110 L128 166 L122 166Z" fill="#000" opacity=".08"/>
      <path d="M72 164 L128 164 L126 202 L104 202 L100 174 L96 202 L74 202Z" fill="${P.g("shorts")}"/>
      <path d="M100 174 L104 202 L96 202Z" fill="#000" opacity=".1"/>
      ${legs}`;
  }

  function skirtShade() {
    return `<path d="M118 152 L152 256 Q100 274 100 266 Q112 206 118 152Z" fill="#000" opacity=".12"/>
      <path d="M82 152 L48 256 Q100 274 100 266 Q88 206 82 152Z" fill="#fff" opacity=".13"/>`;
  }

  function dressSvg(id) {
    if (!id) return "";
    if (id === "princess") {
      return `<path d="M72 94 L88 94 L82 122 L60 110Z" fill="${P.g("light")}"/>
        <path d="M128 94 L112 94 L118 122 L140 110Z" fill="${P.g("light")}"/>
        <path d="M78 94 L122 94 L124 150 L76 150Z" fill="${P.g("light")}"/>
        <path d="M76 148 L124 148 L160 262 Q100 284 40 262Z" fill="${P.g("cloth")}"/>
        ${skirtShade()}
        <path d="M78 148 L122 148 L126 160 L74 160Z" fill="${P.g("gold")}"/>
        <circle cx="100" cy="122" r="5.4" fill="#fff"/>
        <circle cx="99" cy="120.6" r="1.8" fill="#ffe066"/>`;
    }
    if (id === "bindalli") {
      return `<path d="M78 94 L122 94 L124 148 L76 148Z" fill="${P.g("dark")}"/>
        <path d="M76 146 L124 146 L154 258 Q100 276 46 258Z" fill="${P.g("cloth")}"/>
        ${skirtShade()}
        <rect x="78" y="144" width="44" height="7" rx="2" fill="${P.g("gold")}"/>
        <circle cx="88" cy="178" r="3.4" fill="${P.g("gold")}"/>
        <circle cx="112" cy="198" r="3.4" fill="${P.g("gold")}"/>
        <circle cx="96" cy="220" r="2.8" fill="${P.g("gold")}"/>
        <circle cx="118" cy="238" r="2.8" fill="${P.g("gold")}"/>`;
    }
    if (id === "sailor") {
      return `<path d="M78 94 L122 94 L148 250 Q100 266 52 250Z" fill="${P.g("cloth")}"/>
        ${skirtShade()}
        <path d="M80 94 L120 94 L116 132 L84 132Z" fill="#fff"/>
        <path d="M90 94 L110 94 L108 118 L92 118Z" fill="${P.g("dark")}"/>
        <rect x="94" y="132" width="12" height="10" rx="5" fill="#c92a2a"/>
        <rect x="72" y="188" width="56" height="7" rx="2" fill="#fff"/>`;
    }
    if (id === "sun") {
      return `<path d="M78 94 L122 94 L124 148 L76 148Z" fill="${P.g("light")}"/>
        <path d="M76 146 L124 146 L158 258 Q100 278 42 258Z" fill="${P.g("cloth")}"/>
        ${skirtShade()}
        <circle cx="90" cy="186" r="6.2" fill="#ff8fab"/>
        <circle cx="88.8" cy="184.4" r="2" fill="#fff" opacity=".45"/>
        <circle cx="114" cy="210" r="5.2" fill="#fff"/>
        <circle cx="98" cy="232" r="4.2" fill="#ff8fab"/>`;
    }
    if (id === "mint") {
      return `<path d="M78 94 L122 94 L124 148 L76 148Z" fill="${P.g("light")}"/>
        <path d="M76 146 L124 146 L154 256 Q100 274 46 256Z" fill="${P.g("cloth")}"/>
        ${skirtShade()}
        <path d="M64 228 Q100 246 136 228" stroke="#fff" stroke-width="6" fill="none" opacity=".45"/>`;
    }
    if (id === "starry") {
      return `<path d="M78 94 L122 94 L124 148 L76 148Z" fill="${P.g("light")}"/>
        <path d="M76 146 L124 146 L158 258 Q100 278 42 258Z" fill="${P.g("cloth")}"/>
        ${skirtShade()}
        <polygon points="88,184 91,193 101,193 93,199 96,208 88,202 80,208 83,199 75,193 85,193" fill="${P.g("gold")}"/>
        <circle cx="116" cy="214" r="3.6" fill="#fff"/>
        <circle cx="102" cy="236" r="2.8" fill="${P.g("gold")}"/>`;
    }
    return "";
  }

  function flowerAt(x, y, petal, center) {
    return `<circle cx="${x - 4.6}" cy="${y}" r="4.1" fill="${petal}"/>
      <circle cx="${x + 4.6}" cy="${y}" r="4.1" fill="${petal}"/>
      <circle cx="${x}" cy="${y - 4.6}" r="4.1" fill="${petal}"/>
      <circle cx="${x}" cy="${y + 4.6}" r="4.1" fill="${petal}"/>
      <circle cx="${x}" cy="${y}" r="3.1" fill="${center}"/>
      <circle cx="${x - 0.8}" cy="${y - 1}" r="1.1" fill="#fff" opacity=".4"/>`;
  }

  function hatSvg(id, cx, cy) {
    const pal = P.pal;
    if (!id) return "";
    if (id === "bow") {
      return `<ellipse cx="${cx - 9}" cy="${cy - 32}" rx="8.4" ry="7.2" fill="${P.g("cloth")}"/>
        <ellipse cx="${cx + 9}" cy="${cy - 32}" rx="8.4" ry="7.2" fill="${P.g("cloth")}"/>
        <ellipse cx="${cx - 10}" cy="${cy - 34}" rx="3.2" ry="2" fill="#fff" opacity=".28"/>
        <circle cx="${cx}" cy="${cy - 32}" r="4.3" fill="${P.g("dark")}"/>`;
    }
    if (id === "fes") {
      return `<rect x="${cx - 16}" y="${cy - 46}" width="32" height="16" rx="3" fill="#c92a2a"/>
        <rect x="${cx - 14}" y="${cy - 44}" width="10" height="12" rx="2" fill="#fff" opacity=".16"/>
        <rect x="${cx - 18}" y="${cy - 50}" width="36" height="5" rx="2" fill="#e03131"/>
        <circle cx="${cx + 18}" cy="${cy - 48}" r="3.4" fill="#222"/>
        <path d="M${cx + 20} ${cy - 46} Q${cx + 28} ${cy - 40} ${cx + 26} ${cy - 32}" stroke="#222" stroke-width="2" fill="none"/>`;
    }
    if (id === "yemeni") {
      return `<path d="M${cx - 34} ${cy - 6} Q${cx} ${cy - 48} ${cx + 34} ${cy - 6} Q${cx} ${cy - 18} ${cx - 34} ${cy - 6}Z" fill="#fff"/>
        <path d="M${cx - 20} ${cy - 22} Q${cx} ${cy - 40} ${cx + 20} ${cy - 22}" stroke="#000" opacity=".08" stroke-width="6" fill="none"/>
        <path d="M${cx - 34} ${cy - 6} Q${cx - 16} ${cy - 36} ${cx} ${cy - 32}" stroke="#e03131" stroke-width="8" fill="none"/>
        <path d="M${cx + 34} ${cy - 6} Q${cx + 16} ${cy - 36} ${cx} ${cy - 32}" stroke="#e03131" stroke-width="8" fill="none"/>`;
    }
    if (id === "flowers") {
      return `${flowerAt(cx - 16, cy - 30, pal.main, "#fff")}${flowerAt(cx, cy - 36, pal.extra, "#f08c00")}${flowerAt(cx + 16, cy - 30, pal.light, pal.dark)}`;
    }
    if (id === "beanie") {
      return `<path d="M${cx - 30} ${cy - 12} Q${cx} ${cy - 48} ${cx + 30} ${cy - 12}Z" fill="${P.g("cloth")}"/>
        <path d="M${cx - 18} ${cy - 28} Q${cx - 8} ${cy - 40} ${cx} ${cy - 36}" stroke="#fff" stroke-width="3" fill="none" opacity=".22"/>
        <rect x="${cx - 30}" y="${cy - 16}" width="60" height="7" rx="3" fill="${P.g("light")}"/>
        <circle cx="${cx}" cy="${cy - 46}" r="6.2" fill="${P.g("gold")}"/>
        <circle cx="${cx - 1.4}" cy="${cy - 47.4}" r="2" fill="#fff" opacity=".4"/>`;
    }
    if (id === "glasses") {
      return `<rect x="${cx - 24}" y="${cy - 8}" width="18" height="12" rx="3" fill="#74c0fc" fill-opacity=".18" stroke="#3d2b1f" stroke-width="2.5"/>
        <rect x="${cx + 6}" y="${cy - 8}" width="18" height="12" rx="3" fill="#74c0fc" fill-opacity=".18" stroke="#3d2b1f" stroke-width="2.5"/>
        <line x1="${cx - 6}" y1="${cy - 2}" x2="${cx + 6}" y2="${cy - 2}" stroke="#3d2b1f" stroke-width="2.5"/>
        <path d="M${cx - 21} ${cy - 6} L${cx - 12} ${cy - 5}" stroke="#fff" stroke-width="1.2" opacity=".45"/>`;
    }
    return "";
  }

  function shoeOne(kind, cx, cy) {
    const pal = P.pal;
    const k = kind === "slipper" ? "sandal" : kind;
    const sole = `<ellipse cx="${cx + 2}" cy="${cy + 7}" rx="14.2" ry="5.4" fill="#3d3d3d"/>
      <ellipse cx="${cx + 2}" cy="${cy + 5.6}" rx="13.2" ry="4.4" fill="#dee2e6"/>`;
    if (k === "sneakers") {
      return `${sole}
        <path d="M${cx - 12} ${cy + 4} Q${cx - 12} ${cy - 10} ${cx + 2} ${cy - 10} Q${cx + 14} ${cy - 10} ${cx + 14} ${cy + 4}Z" fill="${P.g("shoe")}"/>
        <path d="M${cx - 8} ${cy - 2} Q${cx + 2} ${cy - 8} ${cx + 12} ${cy - 1}" fill="#fff" opacity=".22"/>
        <path d="M${cx - 4} ${cy - 2} Q${cx + 8} ${cy - 6} ${cx + 12} ${cy + 2}" stroke="${pal.light}" stroke-width="2" fill="none"/>
        <circle cx="${cx - 2}" cy="${cy - 2}" r="1.35" fill="#fff"/>
        <circle cx="${cx + 4}" cy="${cy - 2}" r="1.35" fill="#fff"/>
        <rect x="${cx - 3}" y="${cy + 3}" width="12" height="2.2" rx="1" fill="#fff" opacity=".7"/>`;
    }
    if (k === "boots") {
      return `<path d="M${cx - 10} ${cy - 22} L${cx - 11} ${cy + 4} Q${cx - 8} ${cy + 10} ${cx + 4} ${cy + 8} Q${cx + 14} ${cy + 6} ${cx + 12} ${cy - 22} Q${cx} ${cy - 16} ${cx - 10} ${cy - 22}Z" fill="${P.g("leather")}"/>
        <path d="M${cx - 7} ${cy - 18} L${cx - 6} ${cy - 2}" stroke="#fff" stroke-width="2.2" opacity=".16"/>
        <rect x="${cx - 11}" y="${cy - 8}" width="23" height="4" rx="1" fill="#5c3d1a"/>
        <ellipse cx="${cx + 1}" cy="${cy + 8}" rx="14" ry="5" fill="#3d2410"/>`;
    }
    if (k === "maryjane") {
      return `${sole}
        <path d="M${cx - 11} ${cy + 4} Q${cx - 10} ${cy - 8} ${cx + 2} ${cy - 8} Q${cx + 13} ${cy - 6} ${cx + 13} ${cy + 4}Z" fill="${P.g("shoe")}"/>
        <path d="M${cx - 6} ${cy - 4} Q${cx + 2} ${cy - 7} ${cx + 10} ${cy - 2}" fill="#fff" opacity=".2"/>
        <rect x="${cx - 8}" y="${cy - 2}" width="16" height="3.4" rx="1.6" fill="${P.g("light")}"/>
        <circle cx="${cx + 6}" cy="${cy}" r="1.7" fill="${P.g("gold")}"/>`;
    }
    if (k === "sandal") {
      return `${sole}
        <path d="M${cx - 8} ${cy + 2} Q${cx} ${cy - 8} ${cx + 10} ${cy + 2}" fill="none" stroke="${P.g("shoe")}" stroke-width="3.3" stroke-linecap="round"/>
        <path d="M${cx - 6} ${cy + 5} L${cx + 8} ${cy + 4}" stroke="${P.g("shoe")}" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    if (k === "rain") {
      return `<path d="M${cx - 10} ${cy - 20} L${cx - 11} ${cy + 4} Q${cx - 6} ${cy + 10} ${cx + 4} ${cy + 8} Q${cx + 14} ${cy + 6} ${cx + 12} ${cy - 20}Z" fill="${P.g("rain")}"/>
        <path d="M${cx - 6} ${cy - 16} L${cx - 5} ${cy - 2}" stroke="#fff" stroke-width="2.6" opacity=".28"/>
        <rect x="${cx - 11}" y="${cy - 6}" width="23" height="4" rx="1" fill="#fff" opacity=".55"/>
        <ellipse cx="${cx + 1}" cy="${cy + 8}" rx="14" ry="5" fill="#c92a2a"/>`;
    }
    if (k === "yemeni") {
      return `<path d="M${cx - 12} ${cy + 4} Q${cx - 16} ${cy - 8} ${cx - 2} ${cy - 10} Q${cx + 16} ${cy - 2} ${cx + 12} ${cy + 6} Q${cx} ${cy + 12} ${cx - 12} ${cy + 4}Z" fill="#d9480f"/>
        <path d="M${cx - 2} ${cy - 8} Q${cx + 10} ${cy - 2} ${cx + 8} ${cy + 4}" stroke="${P.g("gold")}" stroke-width="1.7" fill="none"/>
        <ellipse cx="${cx + 2}" cy="${cy + 7}" rx="12" ry="3.4" fill="#7c2d12" opacity=".4"/>`;
    }
    return `<ellipse cx="${cx}" cy="${cy + 5}" rx="11.4" ry="5.3" fill="#fff"/>
      <rect x="${cx - 8}" y="${cy - 2}" width="16" height="6" rx="3" fill="${P.g("shoe")}"/>
      <rect x="${cx - 8}" y="${cy + 1}" width="16" height="2" fill="#fff" opacity=".45"/>`;
  }

  function shoesSvg(kind) {
    return `${shoeOne(kind, 86, 314)}${shoeOne(kind, 114, 314)}`;
  }

  function bagSvg(id) {
    const pal = P.pal;
    if (!id || id === "nazar") return "";
    if (id === "backpack") {
      return `<path d="M62 108 Q58 118 58 148" fill="none" stroke="${pal.dark}" stroke-width="4" stroke-linecap="round"/>
        <path d="M86 108 Q90 118 90 148" fill="none" stroke="${pal.dark}" stroke-width="4" stroke-linecap="round"/>
        <rect x="60" y="120" width="6" height="36" rx="2" fill="${P.g("dark")}"/>
        <rect x="56" y="118" width="32" height="40" rx="7" fill="${P.g("bag")}"/>
        <rect x="62" y="126" width="20" height="12" rx="3" fill="${P.g("light")}"/>
        <path d="M64 122 L80 122" stroke="#fff" stroke-width="1.6" opacity=".35"/>
        <circle cx="72" cy="148" r="3.2" fill="${P.g("gold")}"/>
        <circle cx="71.2" cy="147" r="1" fill="#fff" opacity=".45"/>`;
    }
    if (id === "purse") {
      return `<path d="M128 108 Q162 108 158 188" fill="none" stroke="${pal.dark}" stroke-width="3" stroke-linecap="round"/>
        <rect x="138" y="176" width="28" height="22" rx="6" fill="${P.g("bag")}"/>
        <path d="M140 176 Q152 164 164 176" fill="${P.g("dark")}"/>
        <path d="M142 180 L160 180" stroke="#fff" stroke-width="1.2" opacity=".25"/>
        <circle cx="152" cy="186" r="2.4" fill="${P.g("gold")}"/>`;
    }
    if (id === "tote") {
      return `<path d="M140 176 Q146 162 152 176" fill="none" stroke="${pal.dark}" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M156 176 Q162 162 168 176" fill="none" stroke="${pal.dark}" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M136 176 L172 176 L168 210 L140 210Z" fill="${P.g("light")}"/>
        <path d="M160 178 L166 208 L154 208Z" fill="#000" opacity=".08"/>
        <rect x="146" y="186" width="16" height="10" rx="2" fill="${P.g("bag")}"/>`;
    }
    if (id === "kilim") {
      return `<path d="M128 112 Q160 120 156 188" fill="none" stroke="#7c4a03" stroke-width="3" stroke-linecap="round"/>
        <rect x="140" y="174" width="28" height="26" rx="3" fill="#c92a2a"/>
        <rect x="140" y="174" width="7" height="26" fill="${P.g("gold")}"/>
        <rect x="154" y="174" width="7" height="26" fill="#2f9e44"/>
        <rect x="161" y="174" width="7" height="26" fill="#1c7ed6"/>
        <path d="M141 199 L167 199" stroke="#fff" stroke-width="2" opacity=".25"/>`;
    }
    if (id === "sport") {
      return `<path d="M126 168 Q150 158 174 176" fill="none" stroke="${pal.dark}" stroke-width="3.2" stroke-linecap="round"/>
        <rect x="128" y="174" width="44" height="20" rx="10" fill="${P.g("bag")}"/>
        <ellipse cx="130" cy="184" rx="5" ry="9" fill="${P.g("dark")}"/>
        <ellipse cx="170" cy="184" rx="5" ry="9" fill="${P.g("dark")}"/>
        <rect x="142" y="178" width="16" height="6" rx="3" fill="${P.g("light")}"/>
        <circle cx="136" cy="184" r="2.4" fill="${P.g("gold")}"/>`;
    }
    return "";
  }

  function nazarSvg() {
    return `<circle cx="100" cy="128" r="8.6" fill="${P.g("nazar")}"/>
      <circle cx="100" cy="128" r="5.4" fill="#fff"/>
      <circle cx="100" cy="128" r="3.2" fill="${P.g("nazar")}"/>
      <circle cx="100" cy="128" r="1.5" fill="#222"/>
      <circle cx="97.6" cy="125.6" r="1.5" fill="#fff" opacity=".55"/>`;
  }

  function dollArtSvg() {
    const doll = currentDoll();
    const skin = doll.skin;
    const shirt = doll.onesie;
    const hair = wornHairColor();
    const eyes = wornEyes();
    const style = wornHair();
    const wear = state.dress.wear;
    const cx = KID_HEAD.x;
    const cy = KID_HEAD.y;
    const dressed = Boolean(wear.dress);
    const bag = wear.bag;
    beginPaint(skin, hair, shirt, eyes);
    return svgWrap(
      "0 0 200 360",
      `${P.defs}<ellipse cx="100" cy="348" rx="50" ry="9" fill="#5a3228" opacity=".18"/>
      ${hairBack(style, hair, cx, cy)}
      ${bag === "backpack" ? bagSvg("backpack") : ""}
      ${kidBody(shirt, skin, dressed)}
      ${dressSvg(wear.dress)}
      ${shoesSvg(wear.shoes)}
      ${headSvg(skin, eyes, cx, cy)}
      ${hairFront(style, hair, cx, cy)}
      ${hatSvg(wear.hat, cx, cy)}
      ${bag && bag !== "backpack" && bag !== "nazar" ? bagSvg(bag) : ""}
      ${bag === "nazar" ? nazarSvg() : ""}`,
      "doll-svg"
    );
  }

  function miniFaceSvg(doll) {
    const hx = KID_HEAD.x;
    const hy = KID_HEAD.y;
    beginPaint(doll.skin, doll.hair, doll.onesie, "#5c3317");
    return svgWrap(
      "52 8 96 92",
      `${P.defs}${hairBack(doll.hairStyle, doll.hair, hx, hy)}${headSvg(doll.skin, "#5c3317", hx, hy)}${hairFront(doll.hairStyle, doll.hair, hx, hy)}`,
      "mini-svg"
    );
  }

  function noneMark() {
    return `<circle cx="32" cy="32" r="18" fill="#fff6ea" stroke="#e9ecef" stroke-width="3"/>
      <path d="M22 22 L42 42" stroke="#faa2c1" stroke-width="4" stroke-linecap="round"/>`;
  }

  function itemPreviewHtml(cat, item) {
    const id = item.id || "none";
    const doll = currentDoll();
    const hair = wornHairColor();
    const eyes = wornEyes();
    const hx = KID_HEAD.x;
    const hy = KID_HEAD.y;
    beginPaint(doll.skin, hair, doll.onesie, eyes);
    const defs = P.defs;
    if (cat === "hair") {
      return `<span class="pv-svg-wrap">${svgWrap("32 0 136 150", `${defs}${hairBack(id, hair, hx, hy)}${headSvg(doll.skin, eyes, hx, hy)}${hairFront(id, hair, hx, hy)}`)}</span>`;
    }
    if (cat === "dress") {
      const inner = id === "none" ? kidBody(doll.onesie, doll.skin, false) : `${kidBody(doll.onesie, doll.skin, true)}${dressSvg(id)}`;
      return `<span class="pv-svg-wrap">${svgWrap("40 86 120 202", `${defs}${inner}`)}</span>`;
    }
    if (cat === "hat") {
      if (id === "none") return `<span class="pv-svg-wrap">${svgWrap("0 0 64 64", noneMark())}</span>`;
      return `<span class="pv-svg-wrap">${svgWrap("48 0 104 86", `${defs}${hairBack(wornHair(), hair, hx, hy)}${headSvg(doll.skin, eyes, hx, hy)}${hairFront(wornHair(), hair, hx, hy)}${hatSvg(id, hx, hy)}`)}</span>`;
    }
    if (cat === "shoes") {
      const kind = id === "none" ? "" : id;
      return `<span class="pv-svg-wrap">${svgWrap("64 278 72 50", `${defs}${shoesSvg(kind)}`)}</span>`;
    }
    if (cat === "bag") {
      if (id === "none") return `<span class="pv-svg-wrap">${svgWrap("0 0 64 64", noneMark())}</span>`;
      if (id === "nazar") return `<span class="pv-svg-wrap">${svgWrap("86 114 28 28", `${defs}${nazarSvg()}`)}</span>`;
      if (id === "backpack") return `<span class="pv-svg-wrap">${svgWrap("50 104 42 60", `${defs}${bagSvg(id)}`)}</span>`;
      if (id === "sport") return `<span class="pv-svg-wrap">${svgWrap("120 154 56 46", `${defs}${bagSvg(id)}`)}</span>`;
      return `<span class="pv-svg-wrap">${svgWrap("126 158 50 58", `${defs}${bagSvg(id)}`)}</span>`;
    }
    return "";
  }

  function dollHtml(doll, extraClass = "") {
    return `<div class="doll ${extraClass}" data-id="${doll.id}">
      ${DOLL_HTML}
    </div>`;
  }

  function renderDressBaby() {
    const doll = currentDoll();
    const box = $("dress-baby");
    if (!box) return;
    box.innerHTML = dollHtml(doll, "stage");
    const frame = box.querySelector(".doll-frame");
    if (frame) frame.innerHTML = dollArtSvg();
    const label = box.querySelector(".doll-name");
    if (label) label.textContent = dollName(doll);
  }

  function renderDressBabies() {
    $("dress-babies").innerHTML = DOLLS.map((d) => {
      const on = d.id === state.dress.babyId ? "on" : "";
      return `<button type="button" class="dress-face ${on}" data-baby="${d.id}" aria-label="${escapeHtml(
        dollName(d)
      )}">${miniFaceSvg(d)}</button>`;
    }).join("");
  }

  function renderDressCats() {
    $("dress-cats").innerHTML = DRESS_CATS.map((cat) => {
      const on = cat.id === state.dress.cat ? "on" : "";
      return `<button type="button" class="dress-tab ${on}" data-cat="${cat.id}" role="tab" aria-selected="${
        cat.id === state.dress.cat
      }"><span aria-hidden="true">${cat.emoji}</span>${cat.label}</button>`;
    }).join("");
  }

  function renderDressItems() {
    const cat = state.dress.cat;
    const current = cat === "hair" ? wornHair() : state.dress.wear[cat] || "";
    $("dress-items").innerHTML = DRESS_ITEMS[cat]
      .map((item) => {
        const on = item.id === current ? "on" : "";
        return `<button type="button" class="dress-item ${on}" data-item="${item.id}">
          ${itemPreviewHtml(cat, item)}
          <strong>${item.name}</strong>
        </button>`;
      })
      .join("");
  }

  function renderDressSwatches() {
    const row = $("dress-swatches");
    if (!row) return;
    if (state.dress.cat !== "hair") {
      row.hidden = true;
      row.innerHTML = "";
      return;
    }
    row.hidden = false;
    const hairOn = wornHairColor();
    const eyeOn = wornEyes();
    row.innerHTML = `<span class="swatch-label">Saç</span>${HAIR_COLORS.map(
      (c) =>
        `<button type="button" class="swatch ${c.id === hairOn ? "on" : ""}" data-kind="hairColor" data-swatch="${c.id}" aria-label="${c.name}" style="background:${c.id}"></button>`
    ).join("")}<span class="swatch-label">Göz</span>${EYE_COLORS.map(
      (c) =>
        `<button type="button" class="swatch ${c.id === eyeOn ? "on" : ""}" data-kind="eyes" data-swatch="${c.id}" aria-label="${c.name}" style="background:${c.id}"></button>`
    ).join("")}`;
  }

  function renderDress() {
    renderDressBaby();
    renderDressBabies();
    renderDressCats();
    renderDressSwatches();
    renderDressItems();
  }

  function showDressCheer() {
    const cheer = $("dress-cheer");
    if (!cheer) return;
    cheer.textContent = DRESS_CHEERS[Math.floor(Math.random() * DRESS_CHEERS.length)];
    cheer.hidden = false;
    window.clearTimeout(showDressCheer.timer);
    showDressCheer.timer = window.setTimeout(() => {
      cheer.hidden = true;
    }, 1400);
  }

  function wearItem(id) {
    const cat = state.dress.cat;
    const item = dressItem(cat, id);
    if (!item) return;
    if (cat === "hair") {
      state.dress.wear.hair = item.id;
    } else if (state.dress.wear[cat] === item.id) {
      state.dress.wear[cat] = "";
    } else {
      state.dress.wear[cat] = item.id;
    }
    saveDress();
    renderDressBaby();
    renderDressItems();
    if (cat === "hair" || state.dress.wear[cat]) showDressCheer();
  }

  function randomOutfit() {
    const pick = (cat) => {
      const items = DRESS_ITEMS[cat].filter((entry) => entry.id);
      return items[Math.floor(Math.random() * items.length)].id;
    };
    state.dress.wear = {
      hair: pick("hair"),
      hairColor: HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].id,
      eyes: EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)].id,
      dress: pick("dress"),
      hat: pick("hat"),
      shoes: pick("shoes"),
      bag: pick("bag"),
    };
    saveDress();
    renderDress();
    showDressCheer();
    playWinSound();
  }

  function startDressUp() {
    if (timeIsUp()) {
      lockPlayTime();
      return;
    }
    loadDressSave();
    renderDress();
    show("dress");
  }

  function resetPicks() {
    state.pickStep = 1;
    state.pickKind = "character";
    state.pickFrom = null;
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
    $("hub-game-toys").addEventListener("click", () => {
      if (timeIsUp()) {
        lockPlayTime();
        return;
      }
      playTapSound();
      show("home");
    });
    $("hub-game-dress").addEventListener("click", () => {
      playTapSound();
      startDressUp();
    });
    $("dress-babies").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-baby]");
      if (!btn) return;
      playTapSound();
      state.dress.babyId = btn.dataset.baby;
      saveDress();
      renderDress();
    });
    $("dress-cats").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      playTapSound();
      state.dress.cat = btn.dataset.cat;
      saveDress();
      renderDressCats();
      renderDressSwatches();
      renderDressItems();
    });
    $("dress-swatches").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-swatch]");
      if (!btn) return;
      playTapSound();
      state.dress.wear[btn.dataset.kind] = btn.dataset.swatch;
      saveDress();
      renderDressBaby();
      renderDressSwatches();
      renderDressItems();
    });
    $("dress-items").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-item]");
      if (!btn) return;
      playTapSound();
      wearItem(btn.dataset.item);
    });
    $("dress-random").addEventListener("click", () => {
      playTapSound();
      randomOutfit();
    });
    $("btn-play").addEventListener("click", () => beginPlay(false));
    $("btn-play-bot").addEventListener("click", () => beginPlay(true));
    $("btn-parent-play").addEventListener("click", openParentModal);
    $("btn-parent-lock").addEventListener("click", openParentModal);
    $("parent-ok").addEventListener("click", confirmParentModal);
    $("parent-pin-form").addEventListener("submit", submitParentPin);
    $("parent-google").addEventListener("click", confirmParentGoogle);
    $("btn-account-history").addEventListener("click", (e) => {
      e.stopPropagation();
      openStatsModal();
    });
    $("btn-parent-history").addEventListener("click", openStatsModal);
    $("stats-ok").addEventListener("click", closeStatsModal);
    $("stats-modal").addEventListener("click", (e) => {
      if (e.target.id === "stats-modal") closeStatsModal();
    });
    $("btn-account").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleAccountMenu();
    });
    $("account-times").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-limit]");
      if (!btn) return;
      e.stopPropagation();
      setParentLimit(Number(btn.dataset.limit));
    });
    $("btn-account-logout").addEventListener("click", logoutUser);
    $("account-photo").addEventListener("error", () => {
      $("account-photo").hidden = true;
      $("account-initial").hidden = false;
      $("account-initial").textContent = firstName(state.user?.name).charAt(0).toUpperCase();
    });
    document.addEventListener("click", (e) => {
      if (!$("account-wrap")?.contains(e.target)) closeAccountMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("stats-modal")?.hidden) {
        closeStatsModal();
        return;
      }
      if (!$("parent-modal")?.hidden) {
        closeParentModal();
        return;
      }
      closeAccountMenu();
    });
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

    const onSlot = (e) => {
      const slot = e.target.closest("[data-edit]");
      if (!slot) return;
      e.preventDefault();
      editPick(slot.dataset.edit);
    };
    $("picked-row").addEventListener("click", onSlot);
    $("room-picked").addEventListener("click", onSlot);

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
            state.pickFrom = null;
            renderRooms();
            show("room");
          } else if (picksComplete()) {
            state.pickFrom = null;
            renderRooms();
            show("room");
          } else {
            state.pickStep = 2;
            state.pickKind = "character";
            renderPicks();
          }
        } else {
          state.players.p2.basket = basket;
          state.pickFrom = null;
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
        const keepP2 = state.players.p2;
        state.players.p1 = emptyPlayer("p1", 0, midRow());
        state.players.p1.char = cloneChar(char);
        if (keepP2) state.players.p2 = keepP2;
      } else {
        const keepBot = Boolean(state.players.p2?.isBot);
        state.players.p2 = emptyPlayer("p2", boardSize().cols - 1, midRow());
        state.players.p2.char = cloneChar(char);
        state.players.p2.isBot = keepBot;
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
      if (!$("time-lock")?.hidden || document.querySelector(".name-modal:not([hidden])")) return;
      if (e.target.closest("input, textarea, [contenteditable]")) return;
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
        if (state.screen !== "play") return;
        if (!$("time-lock")?.hidden || document.querySelector(".name-modal:not([hidden])")) return;
        if (e.target.closest("input, textarea, [contenteditable]")) return;
        e.preventDefault();
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

    const WHEEL_NEED = 280;
    const DRAG_NEED = 90;
    window.addEventListener(
      "wheel",
      (e) => {
        if (!canHomePull() || homePull.reloading) return;
        if (e.target.closest(".account-menu") || document.querySelector(".name-modal:not([hidden])")) return;
        const dy =
          e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
        if (dy <= 0) {
          if (homePull.wheel > 0) {
            homePull.wheel = Math.max(0, homePull.wheel + dy);
            if (homePull.wheel === 0) resetHomePull();
            else showHomePull(homePull.wheel, WHEEL_NEED);
          }
          return;
        }
        e.preventDefault();
        homePull.wheel += dy;
        showHomePull(homePull.wheel, WHEEL_NEED);
        window.clearTimeout(homePull.wheelIdle);
        homePull.wheelIdle = window.setTimeout(() => {
          if (homePull.wheel >= WHEEL_NEED) reloadHome();
          else resetHomePull();
        }, 280);
        if (homePull.wheel >= WHEEL_NEED) reloadHome();
      },
      { passive: false }
    );
    document.addEventListener("pointerdown", (e) => {
      if (!canHomePull() || homePull.reloading) return;
      if (document.querySelector(".name-modal:not([hidden])")) return;
      if (e.target.closest("button, a, input, .account-menu, .diff-row")) return;
      homePull.drag = { y: e.clientY, id: e.pointerId };
    });
    document.addEventListener(
      "pointermove",
      (e) => {
        if (!homePull.drag || e.pointerId !== homePull.drag.id) return;
        const dy = e.clientY - homePull.drag.y;
        if (dy <= 8) return;
        e.preventDefault();
        showHomePull(dy, DRAG_NEED);
      },
      { passive: false }
    );
    document.addEventListener("pointerup", (e) => {
      if (!homePull.drag || e.pointerId !== homePull.drag.id) return;
      const dy = e.clientY - homePull.drag.y;
      homePull.drag = null;
      if (dy >= DRAG_NEED) reloadHome();
      else resetHomePull();
    });
    document.addEventListener("pointercancel", () => {
      if (!homePull.drag) return;
      homePull.drag = null;
      resetHomePull();
    });
  }

  $("version-badge").textContent = `v${GAME_VERSION}`;
  updateDiffButtons();
  renderPicks();
  renderRooms();
  updateSoundButton();
  bind();
  restoreSession();
})();
