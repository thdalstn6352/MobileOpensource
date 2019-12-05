
const user = {
  weight: 0,
  metric: 'kg',
  targetBurn: 1000,
};
// Calculate value
const activities = [
  {
    activity: 'walking',
    metric: 'km',
    cal: 0.5555555555555556,
    amount: 0,
    burn: 0,
  },
  {
    activity: 'running',
    metric: 'km',
    cal: 0.7571428571428572,
    amount: 0,
    burn: 0,

  },
  {
    activity: 'jumping jacks',
    metric: 'minute',
    cal: 0.034,
    amount: 0,
    burn: 0,
  },
];
const [walking, running, jumpingjacks] = activities;

let weightMetric = 'kg';

const kiloToPounds = x => x / 0.453592;

const updateUserWeight = (weight) => {
    let pounds;

    if (weightMetric === 'kg')
    {
        pounds = kiloToPounds(parseInt(weight, 10));
    }
     user.weight = pounds;
};

const weightEnteredAnimation = () => {

};

const weightDisplay = document.getElementById('displayWeight');

//Display User's weight in bottom
const displayWeight = (w, m) => { 
  weightDisplay.innerHTML = `<div class="weight-number" id="userWeightDisplayed"> <input type="text" onkeypress="return numOnly(event)" value="${w}${m}" id="weight-input-edit"
  class="input-info" readonly="true" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="3" autofocus></div><div id="buttonsContainer"><div class="edit-button" onclick="editWeight()" </div>`;
};

// Setting up what happens after user enters weight
const weightInput = document.getElementById('weight-input');

weightInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13)
    {
        if (event.target.value < 10)
        {
            document.getElementById('alert-value').innerHTML = `The weight you entered must be greater than 10kg!`
            document.getElementById('alert').style.display = 'block'
            return;
        }

        else
        {
            document.getElementById('alert').style.display = 'none'
        }
    const pounds = parseInt(event.target.value, 10); // 유저가 입력한 값을 10진수의 정수로 저장
    
    updateUserWeight(pounds);
    weightEnteredAnimation();
    displayWeight(pounds, weightMetric);
    showCalculatorSection();
    weightInput.readOnly = true;

    document.getElementById('weight-input-edit').addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        if (event.target.value < 10) {
          alert('Needs to be 10 or more')
          return;
        }
          saveEdit();
          const pounds = parseInt(event.target.value, 10);
          updateUserWeight(pounds);
          const activityChange = [walking, running, jumpingjacks];
          activityChange.forEach((x) => { updateValues(x, activityMetric); });
      }
    });
  }
});

// Change the THEME 

    const toggleTheme = () => {
    const darkModeButton = document.getElementById('currentTheme');
    const mode = document.getElementById('mode');
    const icon = document.getElementById('icon')

    if (!document.body.classList.contains('dark-theme'))
    {
        document.body.classList.add('dark-theme');
        mode.innerHTML = 'dark';
        icon.innerHTML = '&#x263d;';
        icon.className = "moon-icon"
        darkModeButton.innerHTML = 'Back to light mode';
    }
    else {
        document.body.classList.remove('dark-theme');
        darkModeButton.innerHTML = 'Back to dark mode';
        mode.innerHTML = 'light';
        icon.innerHTML = '&#9728;';
        icon.className = "sun-icon"
  }
};

// Preset Values
let prevWeight = 0;
const option = ''; // If they are in calculator or routine mode
let currentSpeed = 6;
let activityMetric = 'mi';

// Functions calculating burn
const convertKmToMiles = x => x / 1.609344;
const changeInnerHtml = (id, change) => { document.getElementById(id).innerHTML = ` ${change}`; };
const calculateBurn = ({ cal, amount }, { weight }) => parseInt(cal * weight * amount, 10);

// Functions to help format certain data
const removeNum = str => str.replace(/[0-9]/g, '');
const removeChar = str => str.replace(/\D/g, '');
const removeSpace = str => str.replace(/\s/g, '');

// display total burn
const totalBurnHTML = document.getElementById('totalBurnRes');
const updateTotalBurn = () => {
  const totalBurn = walking.burn + running.burn + jumpingjacks.burn;
  totalBurnHTML.innerHTML = `${totalBurn} `;
};

const calcSection = document.getElementById('calculatorSection');

const showCalculatorSection = () => {
  calcSection.classList.remove('hidden');
  document.getElementById('weightInput').classList.add('hidden');
  document.getElementById('totalBurnDisplay').classList.remove('hidden');
};
const returnToHome = () => {
  calcSection.classList.add('hidden');
  document.getElementById('weightInput').classList.remove('hidden');
  document.getElementById('totalBurnDisplay').classList.add('hidden');
};

// Main Functions

const optionsToggle = () => {
  const options = document.getElementById('speedOptions');
  const dropdown = document.getElementById('metric-dropdown');

  document.addEventListener('click', (e) => { // Clicking outside
    if (e.target.id !== 'speedOption' && options.classList.contains('speed-options-open')) {
      if (e.target.id !== 'speedValue' && e.target.id !== 'metric-dropdown') {
        options.classList.remove('speed-options-open');
      }
    }
  });
  if (!options.classList.contains('speed-options-open')) {
    options.classList.add('speed-options-open');
    dropdown.classList.add('up-icon');

  } else {
    options.classList.remove('speed-options-open');
    dropdown.classList.remove('up-icon');
  }
};

// This updates the values after a user changes the metric for distance mi/km


const updateValues = (a, m) => {
    const speedPerHour = 'km/h';
    document.getElementById('speedValue').innerHTML = `${currentSpeed} ${speedPerHour}<div class='arrow metric-change mph-drop' id="metric-dropdown"></div>`;

    let value;

    if (document.getElementById(`${a.activity}-input`))
    {
        value = parseInt(document.getElementById(`${a.activity}-input`).value, 10);
    }
    else
    {
        return;
    }

    const distanceValue = convertKmToMiles(value);

  activityMetric = m;
  document.getElementById(`${a.activity}InputMetric`).innerHTML = m;

  if (distanceValue > 0) {
    a.amount = distanceValue; // used to save previously entered calculator input data
    a.burn = calculateBurn(a, user); // this is used to calculate total burn
    changeInnerHtml(`calorie${a.activity}`, calculateBurn(a, user));
    updateTotalBurn();
  }
};



const addEventForCals = (activityData) => {
  const id = removeNum(activityData); // Stripping number to just get activity
  document.getElementById(`${id}-input`).addEventListener('keyup', (event) => {
    const num = removeChar(activityData); // getting number corresponding to activities object
    const distanceValue = (activityMetric === 'mi') ? event.target.value : convertKmToMiles(event.target.value);
    activities[num].amount = distanceValue;
    changeInnerHtml(`calorie${id}`, ` ${calculateBurn(activities[num], user)}`); // Updating Cal Values
    activities[num].burn = calculateBurn(activities[num], user);
    updateTotalBurn();
  });
};
['walking0', 'running1', 'jumpingjacks2'].forEach((x) => { addEventForCals(x); });

const changeMetric = () => {
  const metricDisplay = document.getElementById('currentMetric');
  const metricDom = document.getElementById('weightDropdown');

      icon.style.right = '7px';
      metricDisplay.innerHTML = 'kg';
};

