"use strict";

const tableBody = document.querySelector(".table-body");

//fetching the data from the api
const getData = async function () {
  const response = await fetch(
    "https://coronavirus-19-api.herokuapp.com/countries"
  );
  const datas = await response.json();
  console.log(datas);
  return datas;
};

const renderData = function (datas) {
  // <tbody>
  //     <tr class="table--row">
  //       <td>asda</td>
  //       <td>abcd</td>
  //       <td>abcd</td>
  //       <td>abcd</td>
  //       <td>abcd</td>
  //       <td>abcd</td>
  //     </tr>
  // </tbody>
  // const tableBody = document.createElement("tbody");
  datas.forEach((data, i) => {
    let { country, todayCases, todayDeaths, recovered, active } = data;
    // console.log(typeof todayCases);
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

    tableBody.appendChild(tableRowEl);
  });
};

//getting the data and renderring into the table
getData().then((datas) => renderData(datas));
