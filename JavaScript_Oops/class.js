class ToyotaCar{
    constructor(brand , price){
        this.brand = brand;
        this.price = price
    }

    onRoadPrice = ()=>{
        let price = this.price ? this.price+20000 : 50000
        return price
    }
}

let fortuner = new ToyotaCar('fortuner' , 100000);
console.log(fortuner.onRoadPrice())