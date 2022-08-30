var count = 0;
function displayCookies() {

  var tableLog = document.getElementById("cookieslog");
  tableLog.style.display = "table";
  tableLog.innerHTML = "";

  var domain = "https://shopee.vn/";
  chrome.cookies.getAll({ url: domain }, function (cookies) {
    const dataClean = cleanUpData(cookies)
    for (var i in dataClean) {
      if (i == 0) {
        var firstRow = tableLog.insertRow(-1);
        firstRow.insertCell(0).innerHTML = "<strong>NAME</strong>";
        firstRow.insertCell(1).innerHTML = "<strong>VALUE</strong>";
      }
      var row = tableLog.insertRow(-1);
      var value = dataClean[i].value;
      var name = dataClean[i].name;
      row.insertCell(0).innerHTML = name;
      row.insertCell(1).innerHTML = value;
    }
  });
}

function setCookies() {
  var domain = "https://shopee.vn/";
  var name = document.getElementById("key").value;
  var value = document.getElementById("value").value;
  chrome.cookies.set({ url: domain, name: name, value: value, expirationDate: 1610701693 }, function (cookie) {
    console.log("cookie is set");

  });
}
function clearAllCookies() {
  console.log("cookies cleared");
  chrome.cookies.getAll({}, function (cookies) {
    for (var i in cookies) {
      removeCookie(cookies[i]);
    }
  });
}

function removeCookie(cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
    cookie.path;
  chrome.cookies.remove({ "url": url, "name": cookie.name });
}
function handleCookie(data) {
  const hanlde = data.map((e, i) => {
    if (i < data.length - 1) {
      return `${e.name}=${e.value};`
    }
    else {
      return `${e.name}=${e.value}`
    }
  })
  return hanlde.join("");
}
function cleanUpData(data) {
  const csrftoken = data.filter(e => e.name === "csrftoken")
  const cookie = handleCookie(data)
  return [
    csrftoken[0],
    {
      name: "cookie",
      value: cookie,
    }
  ]


}
document.addEventListener('DOMContentLoaded', function () {
  var clear_Cookies = document.getElementById("clear_cookies");
  var set_Cookies = document.getElementById("set_cookies");
  var display_Cookies = document.getElementById("display_cookies");
  clear_Cookies.addEventListener('click', function () {
    clearAllCookies();
  });
  set_Cookies.addEventListener('click', function () {
    setCookies();
  });
  display_Cookies.addEventListener('click', function () {
    displayCookies();
  });
});