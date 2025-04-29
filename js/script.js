var siteName = document.getElementById("siteName");
var SiteURL = document.getElementById("SiteURL");
var tableBody = document.getElementById("tableBody");
var tableContainer = document.getElementById("tableContainer");
var NoData = document.getElementById("NoData");
var bookmarkList = [];

if (localStorage.getItem("bookmarks") != null) {
  console.log(localStorage.getItem("bookmarks"));
  
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  tableContainer.classList.remove("d-none");
  NoData.classList.add("d-none");
  displayData();
}

function getData() {
  bookmarkList.push({
    name: siteName.value,
    url: SiteURL.value,
  });
  localStorage.setItem('bookmarks',JSON.stringify(bookmarkList));
  tableContainer.classList.remove("d-none");
  NoData.classList.add("d-none");
  displayData();
  clearInputs();
}
function displayData() {
  var temp = ``;
  for (var i = 0; i < bookmarkList.length; i++) {
    temp += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${bookmarkList[i].name}</td>
            <td><a class="btn btn-success" target='_blank' href="${
              bookmarkList[i].url
            }">Visit</a></td>
            <td><button class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
          </tr>`;
  }
  tableBody.innerHTML = temp;
}
function deleteData(index){
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayData();
  if (bookmarkList.length == 0){
    localStorage.removeItem("bookmarks");
    tableContainer.classList.add("d-none");
    NoData.classList.remove("d-none");
  }
}
function clearInputs(){
  siteName.value = "";
  SiteURL.value = "";
}
function deleteAll(){
  localStorage.removeItem("bookmarks");
  bookmarkList = [];
  tableContainer.classList.add("d-none");
  NoData.classList.remove("d-none");
  clearInputs();
}