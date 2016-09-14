import Checkout from "./checkout"

describe("Checkout", () => {
    let co
    const pricingRules = []

    beforeEach(() => {
        co = new Checkout(pricingRules)
    })

    // new Checkout
    it("should create a new object when called with `new`", () => {
        expect(typeof co).toBe("object")
    })

    // Public Methods
    it("should expose a chainable .scan() method", () => {
        expect(typeof co.scan).toBe("function")
        expect(co.scan()).toBe(co)
    })
    it("should expose a .total() method", () => {
        expect(typeof co.total).toBe("function")
    })

    // Examples
    it("should return 32.50€ when scanning VOUCHER, TSHIRT, MUG", () => {
        co
            .scan("VOUCHER")
            .scan("TSHIRT")
            .scan("MUG")

        expect(co.total()).toBe("32.50€")
    })
    it("should return 25.00€ when scanning VOUCHER, TSHIRT, VOUCHER", () => {
        co
            .scan("VOUCHER")
            .scan("TSHIRT")
            .scan("VOUCHER")

        expect(co.total()).toBe("25.00€")
    })
    it("should return 81.00€ when scanning TSHIRT, TSHIRT, TSHIRT, VOUCHER, TSHIRT", () => {
        co
            .scan("TSHIRT")
            .scan("TSHIRT")
            .scan("TSHIRT")
            .scan("VOUCHER")
            .scan("TSHIRT")

        expect(co.total()).toBe("81.00€")
    })
    it("should return 74.50€ when scanning VOUCHER, TSHIRT, VOUCHER, VOUCHER, MUG, TSHIRT, TSHIRT", () => {
        co
            .scan("VOUCHER")
            .scan("TSHIRT")
            .scan("VOUCHER")
            .scan("VOUCHER")
            .scan("MUG")
            .scan("TSHIRT")
            .scan("TSHIRT")

        expect(co.total()).toBe("74.50€")
    })
})
