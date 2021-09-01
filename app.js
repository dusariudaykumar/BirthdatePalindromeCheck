function reverseString(str) {
  var charList = str.split("");
  var reversedList = charList.reverse();
  var joinedList = reversedList.join("");
  return joinedList;
}

function checkPalindromeOrNot(str) {
  var reversedString = reverseString(str);
  return str === reversedString;
}

function convertDateToString(date) {
  var dateInStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }
  dateInStr.year = date.year.toString();
  return dateInStr;
}
function allDateFormates(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormates(date) {
  var dateFormatList = allDateFormates(date);
  var palindromeList = [];
  for (var i = 0; i < dateFormatList.length; i++) {
    var result = checkPalindromeOrNot(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return true;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var count = 0;
  while (1) {
    count++;
    var dateStr = convertDateToString(nextDate);
    var resultList = checkPalindromeForAllDateFormates(dateStr);
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [count, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

const inputDate = document.querySelector("#inputDate");
const checkBtn = document.querySelector("#checkBtn");
const output = document.querySelector(".output");
const loader = document.querySelector(".loading");

loader.style.display = "none";

function clickHandler() {
  var dateString = inputDate.value;
  loader.style.display = "none";
  if (dateString !== "") {
    var date = dateString.split("-");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };
    var dateStr = convertDateToString(date);
    var list = checkPalindromeForAllDateFormates(dateStr);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }
    if (isPalindrome) {
      output.innerText = " 🎉 Your birthdate  is palindrome 🎉";
    } else {
      const [ctr, nextDate] = getNextPalindromeDate(date);
      output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr} days.`;
    }
  } else {
    output.style.color = "red";
    output.innerText = "Please fill date field.";
  }
}

checkBtn.addEventListener("click", () => {
  loader.style.display = "block";
  setTimeout(clickHandler, 3000);
});
