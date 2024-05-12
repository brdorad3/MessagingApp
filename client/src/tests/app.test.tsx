import App from "../App";
import {describe, it, expect} from "vitest"


describe("app", ()=>{
    it("first test", ()=>{
        expect(App()).toBe(0)
    })
})