import { addReason, getReasons } from "./reasonModel.js";

//TODO: wrap inside promise?

function populateReasons() {
    const reasonDict = fetch("data/reasons.json");

    for (const r in reasonDict) {
        const desc = reasonDict[r];
        addReason(r, desc).catch(console.error);
    }

    return getReasons;
}