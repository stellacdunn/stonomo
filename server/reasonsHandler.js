import { addReason, getReasons } from "./reasonModel.js";
export { populateReasons };

//TODO: wrap inside promise?

async function populateReasons() {
    const reasonDict = await import('./data/reasons.json', {
        assert: {type: 'json'}
    });

    for (const r in reasonDict.default) {
        const desc = reasonDict.default[r];
        addReason(r, desc).catch(console.error);
    }

    return getReasons();
}