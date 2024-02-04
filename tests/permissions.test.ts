import {Layer, Permissions} from "../src";

test('can permission be defined on layer', () => {
    expect(Permissions.canBeDefinedOnLayer('CreateMessage', Layer.Global)).toBe(true);
    expect(Permissions.canBeDefinedOnLayer('CreateMessage', Layer.Space)).toBe(true);
    expect(Permissions.canBeDefinedOnLayer('CreateMessage', Layer.Room)).toBe(true);
    expect(Permissions.canBeDefinedOnLayer('CreateMessage', Layer.Topic)).toBe(true);

    expect(Permissions.canBeDefinedOnLayer('CreateSpace', Layer.Global)).toBe(true);
    expect(Permissions.canBeDefinedOnLayer('CreateSpace', Layer.Space)).toBe(false);

    expect(Permissions.canBeDefinedOnLayer('ManageSpaceMember', Layer.Space)).toBe(true);
    expect(Permissions.canBeDefinedOnLayer('ManageSpaceMember', Layer.Room)).toBe(false);
});