const saveBtn = document.getElementById("save");
const Input = document.getElementById("time-limit");

saveBtn.addEventListener("change", (e) => {
  const value = e.target.value;
  if (value < 1 || value > 60) {
    Input.value = 25;
  }
});

saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timeLimit: Input.value,
    timer: 0,
    isRunning: false,
  });
});


chrome.storage.local.get(["timeLimit"], (result) => {
    Input.value = result.timeLimit;
})