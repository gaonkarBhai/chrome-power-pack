chrome.alarms.create("focusTimer",{
    periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name === "focusTimer"){
        chrome.storage.local.get(["timer", "isRunning", "timeLimit"], (res) => {
          if (res.isRunning) {
            let timer = res.timer + 1;
            let isRunning = true;
            if (timer == 60 * res.timeLimit) {
              this.registration.showNotification("Focus Timer", {
                body: "Time to take a break!",
                icon: "./icon.png",
              });
              isRunning = false;
              timer = 0;
            }
            chrome.storage.local.set({ timer, isRunning });
            console.log(timer);
          }
        });
    }
})

chrome.storage.local.get(["timer", "isRunning", "timeLimit"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeLimit: "timeLimit" in res ? res.timeLimit : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});