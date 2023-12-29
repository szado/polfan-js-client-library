import {PromiseRegistry} from "../src/state-tracker/AsyncUtils";

test('promise registry - limit the calling of async process', async () => {
    const pr = new PromiseRegistry();
    let generationCount = 0;

    async function generateResult() {
        return ++generationCount;
    }

    async function getResult() {
        const resultKey = 'test';

        if (pr.notExist('test')) {
            pr.registerByFunction(generateResult, resultKey);
        }

        await pr.get(resultKey);
        return generationCount;
    }

    const call1 = await getResult();
    expect(call1).toBe(1);
    const call2 = await getResult();
    expect(call2).toBe(1);
    const call3 = await getResult();
    expect(call3).toBe(1);

    expect(generationCount).toBe(1);
});