let userRepo = new UserRepository(userData);
let hydration = new Hydration(hydrationData);
let sleep = new Sleep(sleepData);
let activity = new Activity(activityData);

const userName = document.querySelector('.user-name');
const userAddress = document.querySelector('.user-address');
const userEmail = document.querySelector('.user-email');
const userStride = document.querySelector('.user-stride-length');
const userStepGoal = document.querySelector('.user-step-goal');
const userGoalAverage = document.querySelector('.step-goal-average');
const friendsList = document.querySelector('.friends-list');
const stepComparison = document.querySelector('.step-goal-comparison');
const dayHydrationBox = document.querySelector('.h-day-info');
const sleepHrCurrentDay = document.querySelector('.sleep-hours-current-day');
const sleepHrDay6 = document.querySelector('.S-Hr-6');
const sleepHrDay5 = document.querySelector('.S-Hr-5');
const sleepHrDay4 = document.querySelector('.S-Hr-4');
const sleepHrDay3 = document.querySelector('.S-Hr-3');
const sleepHrDay2 = document.querySelector('.S-Hr-2');
const sleepHrDay1 = document.querySelector('.S-Hr-1');
const sleepQualCurrentDay = document.querySelector('.sleep-quality-current-day');
const sleepQualDay6 = document.querySelector('.S-Qual-6');
const sleepQualDay5 = document.querySelector('.S-Qual-5');
const sleepQualDay4 = document.querySelector('.S-Qual-4');
const sleepQualDay3 = document.querySelector('.S-Qual-3');
const sleepQualDay2 = document.querySelector('.S-Qual-2');
const sleepQualDay1 = document.querySelector('.S-Qual-1');
const overallSleepHoursBox = document.querySelector('.sleep-hours-all-time');
const overallSleepQualityBox = document.querySelector('.sleep-quality-all-time');
const currentDate = document.querySelector('.current-date');
const hydrationCurrentDay = document.querySelector('.hydration-current-day');
const hydrationDay6 = document.querySelector('.H-day-6');
const hydrationDay5 = document.querySelector('.H-day-5');
const hydrationDay4 = document.querySelector('.H-day-4');
const hydrationDay3 = document.querySelector('.H-day-3');
const hydrationDay2 = document.querySelector('.H-day-2');
const hydrationDay1 = document.querySelector('.H-day-1');
const daySleepHours = document.querySelector('.current-sleep-hours');
const daySleepQuality = document.querySelector('.current-sleep-quality');
const daySteps = document.querySelector('.day-steps');
const dayActiveTime = document.querySelector('.day-active-time');
const milesWalkedDay = document.querySelector('.miles-walked-day');
const weeklySteps = document.querySelector('.weekly-steps');
const weeklyStairs = document.querySelector('.weekly-stairs');
const weeklyMinutes = document.querySelector('.weekly-minutes');
const stepComparisonDay = document.querySelector('.step-comparison');
const minutesComparison = document.querySelector('.minutes-comparison');
const stairComparison = document.querySelector('.stair-comparison');
const firstPlace = document.querySelector('.first-place');
const secondPlace = document.querySelector('.second-place');
const thirdPlace = document.querySelector('.third-place');
const fourthPlace = document.querySelector('.fourth-place');
const fifthPlace = document.querySelector('.fifth-place');
const trendDataStepsBox = document.querySelector('.trend-data-steps');
const trendDataMinutesBox = document.querySelector('.trend-data-minutes');

function populateUserInfo(id, date) {
  let user = new User(userRepo.getUserData(id));
  userName.innerText = user.name;
  userAddress.innerHTML = `<span>Address:</span> ${user.address}`;
  userEmail.innerHTML = `<span>Email:</span> ${user.email}`;
  userStride.innerHTML = `<span>Stride Length:</span> ${user.strideLength}`;
  userStepGoal.innerHTML = `<span>Daily Step Goal:</span> ${user.dailyStepGoal}`;
  userGoalAverage.innerHTML = `<span>Average Step Goal:</span> ${userRepo.getStepGoalAverage()}`;
  stepComparison.innerHTML  = (user.dailyStepGoal > userRepo.getStepGoalAverage()) ?
    `<span>Goal Comparison:</span> You're step goal is ${user.dailyStepGoal - userRepo.getStepGoalAverage()} steps above the average` :
    `<span>Goal Comparison:</span> You're step goal is ${userRepo.getStepGoalAverage() - user.dailyStepGoal} steps below the average`;
  currentDate.innerText = date;
}

function populateHydrationInfo(id, date) {
  dayHydrationBox.innerHTML = `${hydration.getDay(id, date)} oz. of water consumed`;
  let weekDataObjs = hydration.getWeek(id, date).reverse();
  let weekNumbers = weekDataObjs.map(obj => obj.numOunces);
  document.querySelectorAll('.H-day').forEach((element, index) =>
    element.innerHTML = `<span>${weekDataObjs[index].date}:</span> ${weekNumbers[index]} oz.`);
}

function populateSleepInfo(id, date) {
  let weekDataObjs = sleep.getWeekData(id, date).reverse();
  daySleepHours.innerText = `You slept ${sleep.getDayHours(id, date)} hours`;
  daySleepQuality.innerText = `Your sleep quality was graded at ${sleep.getDayQuality(id, date)}`;
  document.querySelectorAll('.S-Hr').forEach((element, index) =>
    element.innerHTML = `<span>${weekDataObjs[index].date}</span>: ${weekDataObjs[index].hoursSlept} hours`);
  document.querySelectorAll('.S-Qual').forEach((element, index) =>
    element.innerHTML = `${weekDataObjs[index].sleepQuality} quality grade`);
  overallSleepHoursBox.innerText = `Your average hours slept per day is ${sleep.calculateAverageHours(id)} hours`;
  overallSleepQualityBox.innerText = `Your average sleep quality per day is graded at ${sleep.calculateAverageQuality(id)}`
}

function populateActivityInfo(id, date) {
  daySteps.innerText = `You took ${activity.getDay(id, date).numSteps} steps today`;
  dayActiveTime.innerText = `You were active for ${activity.getDay(id, date).minutesActive} minutes today`;
  milesWalkedDay.innerText = `You walked ${activity.getMilesByDay(id, date, userRepo)} miles today`;
  weeklySteps.innerText = `You took ${activity.getStepsByWeek(id, date)} steps this week`;
  weeklyMinutes.innerText = `You averaged ${activity.getAverageByWeek('minutesActive', id, date)} minutes of activity a day this week`;
  weeklyStairs.innerText = `You averaged ${activity.getAverageByWeek('flightsOfStairs', id, date)} stairs per day this week`;
  stepComparisonDay.innerText = (activity.getDay(id, date).numSteps > activity.getAverageByDay('numSteps', date)) ?
    `You were ${activity.getDay(id, date).numSteps - activity.getAverageByDay('numSteps', date)} steps above the average` :
    `You were ${activity.getAverageByDay('numSteps', date) - activity.getDay(id, date).numSteps} steps below the average`;
  minutesComparison.innerText = (activity.getDay(id, date).minutesActive > activity.getAverageByDay('minutesActive', date)) ?
    `You were ${activity.getDay(id, date).minutesActive - activity.getAverageByDay('minutesActive', date)} minutes above the average` :
    `You were ${activity.getAverageByDay('minutesActive', date) - activity.getDay(id, date).minutesActive} minutes below the average`;
  stairComparison.innerText = (activity.getDay(id, date).flightsOfStairs > activity.getAverageByDay('flightsOfStairs', date)) ?
    `You were ${activity.getDay(id, date).flightsOfStairs - activity.getAverageByDay('flightsOfStairs', date)} stairs above the average` :
    `You were ${activity.getAverageByDay('flightsOfStairs', date) - activity.getDay(id, date).flightsOfStairs} stairs below the average`;
}

function populateFriendsList(id, date) {
  firstPlace.innerHTML = `<span>First Place</span>: ${activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[0]},
      ${activity.challengeFriends(id, date, userRepo).map(friendID => activity.getDay(friendID, date).numSteps)[0]} steps`;
  secondPlace.innerHTML = (activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[1]) ?
    `<span>Second Place</span>: ${activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[1]},
      ${activity.challengeFriends(id, date, userRepo).map(friendID => activity.getDay(friendID, date).numSteps)[1]} steps`:
    null
  thirdPlace.innerHTML = (activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[2]) ?
  `<span>Third Place</span>: ${activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[2]},
      ${activity.challengeFriends(id, date, userRepo).map(friendID => activity.getDay(friendID, date).numSteps)[2]} steps`:
    null
  fourthPlace.innerHTML = (activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[3]) ?
  `<span>Fourth Place</span>: ${activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[3]},
      ${activity.challengeFriends(id, date, userRepo).map(friendID => activity.getDay(friendID, date).numSteps)[3]} steps`:
    null
  fifthPlace.innerHTML = (activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[4]) ?
  `<span>Fifth Place</span>: ${activity.challengeFriends(id, date, userRepo).map(friendID => userRepo.getUserData(friendID).name)[4]},
      ${activity.challengeFriends(id, date, userRepo).map(friendID => activity.getDay(friendID, date).numSteps)[4]} steps`:
    null
}

function populateTrendInfo(id) {
  trendDataStepsBox.innerHTML = activity.getTrend('numSteps', id).map(day => {
    return `Day: ${day.date} Steps: ${day.numSteps}`
  })
  trendDataMinutesBox.innerHTML = activity.getTrend('minutesActive', id).map(day => {
    return `Day: ${day.date} Minutes: ${day.minutesActive}`
  })
}

populateUserInfo(22, '2019/07/25');
populateHydrationInfo(22, '2019/07/25');
populateSleepInfo(22, '2019/07/25');
populateActivityInfo(22, '2019/07/25');
populateFriendsList(22, '2019/07/25');
populateTrendInfo(22);
