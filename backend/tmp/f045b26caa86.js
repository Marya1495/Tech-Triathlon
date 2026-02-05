
function reverseStr(str) {
    let result = "";
    for(let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}

console.log(reverseStr("hello"));



try {
console.log(calculateGrade(90));
console.log(calculateGrade(85));
console.log(calculateGrade(70));
} catch {
  console.log("ERROR");
}
