let student = {
    fullName : "Harsh",
    address : ()=>{
        let city = "Indore"
        return `${this.fullName} lives in ${city}`
    },
}
console.log(student);
console.log(student.address());

let employee = {
    calTax(){
        console.log(`Tax rate is 50%`)
    }
}

let harsh = {
    salary : 50000
}
// Setting the prototype
harsh.__proto__ = employee
harsh.calTax()