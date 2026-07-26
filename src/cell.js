export class Cell {
    constructor() {
        this.value = null
        this.hit = false
    }
    getValue(){
        return this.value
    }
    changeValue(newValue){
        this.value = newValue
    }
    isHit(){
        return this.hit
    }
    markHit(){
        this.hit = true
    }
    resetValue(){
        this.value = null
        this.hit = false
    }
}