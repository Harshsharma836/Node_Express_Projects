import {parse} from 'json2csv';

const obj = [
    {name : "harsh", age : "23"},
    {name : "aman", age : "24"},
    {name : "ram", age : "26"}
]

const csv = parse(obj);
console.log(csv)