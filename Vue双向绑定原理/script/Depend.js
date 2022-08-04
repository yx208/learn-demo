
class Dependence {
    constructor() {
        this.subscriber = []
    }
    addSubscriber(scb) {
        this.subscriber.push(scb)
    }
    notify() {
        this.subscriber.forEach(scb => scb.update())
    }

    static target = null
}
