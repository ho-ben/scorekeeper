const STORAGE_KEY = "scorekeeper-state";

const teamCards = [...document.querySelectorAll("[data-team-card]")];
const resetButton = document.getElementById("resetScores");

const defaultState = [
  { name: "Blue Team", score: 0 },
  { name: "Gold Team", score: 0 },
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultState;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== teamCards.length) {
      return defaultState;
    }

    return parsed.map((team, index) => ({
      name: typeof team.name === "string" && team.name.trim() ? team.name : defaultState[index].name,
      score: Number.isFinite(team.score) ? team.score : defaultState[index].score,
    }));
  } catch {
    return defaultState;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render(state) {
  teamCards.forEach((card, index) => {
    card.querySelector(".team-name").textContent = state[index].name;
    card.querySelector("[data-score]").textContent = state[index].score;
  });
}

let state = loadState();
render(state);

teamCards.forEach((card, index) => {
  const teamName = card.querySelector(".team-name");

  card.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }

    const delta = button.dataset.action === "increment" ? 1 : -1;
    state[index].score += delta;
    render(state);
    saveState(state);
  });

  teamName.addEventListener("blur", () => {
    const nextName = teamName.textContent.trim() || defaultState[index].name;
    state[index].name = nextName;
    render(state);
    saveState(state);
  });
});

resetButton.addEventListener("click", () => {
  state = defaultState.map((team) => ({ ...team }));
  render(state);
  saveState(state);
});
