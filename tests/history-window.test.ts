import {TraversableRemoteCollection, WindowState} from "../src/state-tracker/TopicHistoryWindow";

interface SimpleMessage {
    id: number;
}

const messages: SimpleMessage[] = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
];

class TestableHistoryWindow extends TraversableRemoteCollection<SimpleMessage> {
    public constructor() {
        super('id');
    }

    public simulateNewMessageReceived(): void {
        this.set(messages[messages.length - 1]);
        this.refreshLiveState();
    }

    protected async fetchItemsAfter(): Promise<SimpleMessage[]> {
        const after = this.getAt(this.length - 1)?.id;
        if (after === undefined) {
            return null;
        }
        // Return only 3 items
        return messages.slice(after + 1, after + 4);
    }

    protected async fetchItemsBefore(): Promise<SimpleMessage[]> {
        const before = this.getAt(0)?.id;
        if (before === undefined) {
            return null;
        }
        return messages.slice(Math.max(before - 3, 0), before);
    }

    protected async fetchLatestItems(): Promise<SimpleMessage[]> {
        return messages.slice(-3);
    }

    protected async isLatestItemLoaded(): Promise<boolean> {
        return this.has(messages.length - 1);
    }
}

test('history window - fresh instance', async () => {
    const window = new TestableHistoryWindow();
    expect(window.items).toHaveLength(0);
    expect(window.limit).toEqual(50);
});

test('history window - states change', async () => {
    const window = new TestableHistoryWindow();
    window.limit = 5;

    expect(window.state).toEqual(WindowState.EMPTY);

    window.simulateNewMessageReceived(); // [9]

    expect(window.state).toEqual(WindowState.LATEST_LIVE);

    await window.fetchPrevious(); // [6,7,8,9]
    await window.fetchPrevious(); // [3,4,5,6,7]

    expect(window.state).toEqual(WindowState.PAST_FETCHED);

    await window.resetToLatest(); // [5,6,7,8,9]

    expect(window.state).toEqual(WindowState.LATEST_FETCHED);
});

test('history window - traverse back', async () => {
    const window = new TestableHistoryWindow();
    window.limit = 5;

    await window.fetchPrevious(); // 7,8,9

    expect(window.state).toEqual(WindowState.LATEST_FETCHED);
    expect(window.items).toHaveLength(3);
    [7,8,9].forEach(id => expect(window.items.map(item => item.id)).toContain(id));

    await window.fetchPrevious(); // 4,5,6,7,8

    expect(window.state).toEqual(WindowState.PAST_FETCHED);
    expect(window.items).toHaveLength(5);
    [4,5,6,7,8].forEach(id => expect(window.items.map(item => item.id)).toContain(id));

    await window.fetchPrevious(); // 1,2,3,4,5
    await window.fetchPrevious(); // 0,1,2,3,4
    await window.fetchPrevious(); // 0,1,2,3,4

    expect(window.state).toEqual(WindowState.PAST_FETCHED);
    expect(window.items).toHaveLength(5);
    [0,1,2,3,4].forEach(id => expect(window.items.map(item => item.id)).toContain(id));
});

test('history window - traverse forward', async () => {
    const window = new TestableHistoryWindow();
    window.limit = 5;

    await window.fetchNext();

    expect(window.state).toEqual(WindowState.LATEST_FETCHED);
    expect(window.items).toHaveLength(3);
    [7,8,9].forEach(id => expect(window.items.map(item => item.id)).toContain(id));

    await window.fetchPrevious(); // [4,5,6,7,8]
    await window.fetchPrevious(); // [1,2,3,4,5]
    await window.fetchNext(); // [4,5,6,7,8]

    expect(window.state).toEqual(WindowState.PAST_FETCHED);
    expect(window.items).toHaveLength(5);
    [4,5,6,7,8].forEach(id => expect(window.items.map(item => item.id)).toContain(id));

    await window.fetchNext();
    await window.fetchNext();
    await window.fetchNext(); // move to latest

    expect(window.state).toEqual(WindowState.LATEST_FETCHED);
    expect(window.items).toHaveLength(5);
    [5,6,7,8,9].forEach(id => expect(window.items.map(item => item.id)).toContain(id));
});

test('history window - reset to latest', async () => {
    const window = new TestableHistoryWindow();
    window.limit = 5;

    await window.fetchPrevious();

    expect(window.state).toEqual(WindowState.LATEST_FETCHED);

    await window.fetchPrevious();
    await window.fetchPrevious();
    await window.fetchPrevious(); // Move to start

    expect(window.state).toEqual(WindowState.PAST_FETCHED);

    await window.resetToLatest();

    expect(window.state).toEqual(WindowState.LATEST_FETCHED);
    expect(window.items).toHaveLength(3);
    [7,8,9].forEach(id => expect(window.items.map(item => item.id)).toContain(id));
});
