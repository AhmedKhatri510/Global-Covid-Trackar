"use strict";

let countryData;

const tableBody = document.querySelector(".table-body");
const spinnerEl = document.querySelector(".spinner");
const paginationEl = document.querySelector(".pagination");

//fetching the data from the api
const getData = async function () {
  const response = await fetch(
    "https://coronavirus-19-api.herokuapp.com/countries"
  );
  const datas = await response.json();
  console.log(datas);

  //storing the data
  countryData = datas;

  return datas;
};

const createARecord = function (data, i) {
  if (i + 1 > 220) console.log(data.country, i + 1);
  let { country, todayCases, todayDeaths, recovered, active } = data;

  //checking for any nullish value...
  country = country || 0;
  todayCases = todayCases || 0;
  todayDeaths = todayDeaths || 0;
  recovered = recovered || 0;
  active = active || 0;

  const tableRowEl = document.createElement("tr");

  const srNoEl = document.createElement("td");
  srNoEl.textContent = i + 1;
  tableRowEl.appendChild(srNoEl);

  const countryEl = document.createElement("td");
  countryEl.textContent = country;
  tableRowEl.appendChild(countryEl);

  const todayCasesEl = document.createElement("td");
  todayCasesEl.textContent = todayCases;
  tableRowEl.appendChild(todayCasesEl);

  const todayDeathsEl = document.createElement("td");
  todayDeathsEl.textContent = todayDeaths;
  tableRowEl.appendChild(todayDeathsEl);

  const recoveredEl = document.createElement("td");
  recoveredEl.textContent = recovered;
  tableRowEl.appendChild(recoveredEl);

  const activeEl = document.createElement("td");
  activeEl.textContent = active;
  tableRowEl.appendChild(activeEl);

  //check for indicators
  if (todayDeaths >= 100) {
    todayDeathsEl.classList.add("sensitive-case");
  } else if (recovered >= 1 && recovered <= 1000) {
    recoveredEl.classList.add("safe-zone");
  } else if (todayCases >= 101 && todayCases <= 763) {
    todayCasesEl.classList.add("warning-cases");
  } else if (recoveredEl >= 1001) {
    recoveredEl.classList.add("recovery-cases");
  } else {
    recoveredEl.classList.add("recovery-cases");
  }

  return tableRowEl;
};

//pagination
let current_page = 1;
let records_per_page = 10;

const btn_next = document.getElementById("btn--next");
const btn_prev = document.getElementById("btn--prev");
const prevPageNo = document.getElementById("prev--page");
const nextPageNo = document.getElementById("next--page");

//if preview button is pressed
const prevPage = function () {
  //if current page is greater than 1 than only decrement page and render that page result
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
};

btn_prev.addEventListener("click", prevPage);

//if next button is pressed
const nextPage = function () {
  //if current page is less than number of page, then increment the current page and render that result
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }
};

btn_next.addEventListener("click", nextPage);
//return the total number of pages
function numPages() {
  console.log(Math.ceil(countryData.length / records_per_page));
  return Math.ceil(countryData.length / records_per_page);
}

const changePage = function (page) {
  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  //if page is first page then hide the prev button
  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }

  //if page is last page page then hide the next button
  if (page == numPages()) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }

  //empting the table body
  tableBody.innerHTML = "";

  //getting the current page data, and rendering it on the table body
  for (
    let i = (page - 1) * records_per_page;
    i < page * records_per_page && i < countryData.length;
    i++
  ) {
    tableBody.append(createARecord(countryData[i], i));
  }
  // page_span.innerHTML = page;
  prevPageNo.textContent = page - 1;
  nextPageNo.textContent = page + 1;
};

//getting the data and renderring into the table
// getData().then((datas) => renderData(datas));
async function init() {
  await getData();
  //display the page buttons
  paginationEl.style.display = "flex";
  //hide the spinner
  spinnerEl.classList.add("hidden");

  //render the current page
  changePage(1);
}

init();
