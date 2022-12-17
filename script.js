
// Function For Displaying Time
var currTime = document.getElementById("current-time");

// function to update time and check the array constantly
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss;

  currTime.innerText = time;
  let t = setTimeout(function() {
    currentTime()
    if (alarm_List.includes(time)) {
      ringing(time);
    }
  }, 1000);
}

currentTime();




// If Hours, Minute or Second are Less Then 10
// Then formatTime function put '0' Before Single Digit

function formatTime(time) {
  if (time < 10 && time.length != 2) {
    return "0" + time;
  }
  return time;
}
const myList = document.querySelector(".set-alarms-list");

// Adding Alarm Input From Users
let alarm_List = [];
const userInput = document.querySelector(".user-input");
userInput.addEventListener("submit", function(e) {
  e.preventDefault();
  const hour = userInput.hour.value;
  const min = userInput.min.value;
  const sec = userInput.sec.value;
  let new_h = formatTime(hour);
  if (new_h === "0") {
    new_h = "00";
  }
  let new_m = formatTime(min);
  if (new_m === "0") {
    new_m = "00";
  }
  let new_s = formatTime(sec);
  if (new_s === "0") {
    new_s = "00";
  }

  const new_Alarm = `${new_h}:${new_m}:${new_s}`;
  if (isNaN(new_Alarm)) {
    if (!alarm_List.includes(new_Alarm)) {
      alarm_List.push(new_Alarm);
      shownew_Alarm(new_Alarm);
      addAlarm.reset();
    } else {
      alert(`Alarm for ${new_Alarm} already set. `);
    }
  } else {
    alert("Invalid Entered Time ");
  }
});


// Show new_Alarm Function & Add New Alarm In The New List with Delete Button
function shownew_Alarm(new_Alarm) {
  const html = `
        <li class = "time-list">
            <span class = "time" style="margin-right:50px;">${new_Alarm}</span>
            <button class = "deleteAlarm time-control" id = "delete-button" onclick = "remove(this.value)" value = ${new_Alarm}> Delete </button>
        </li>`;
  myList.innerHTML += html;
}


// Audio For Ring Alarm
const audio = new Audio("alarm.mp3");

// Adding loop to Continue Alarm
audio.loop = true;

// Rings Audio At The Alarm Time
function ringing() {
  audio.play();
  audio.play();

}

// Function for Stop The Alarm
const clearAlarm = () => {
  audio.pause();
  clearTimeout(alarmTimeout);

};

// function for Stop Tne Alarm

myList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
  }
});

// Remove Alarm List From Array When  deleteAlarms Button Is clicked
const remove = (value) => {
  let newList = alarm_List.filter((time) => time != value);
  // Clear Contents
  alarm_List.length = 0;
  alarm_List.push.apply(alarm_List, newList);
};
