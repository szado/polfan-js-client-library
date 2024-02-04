export enum Layer {
    Global,
    Space,
    Room,
    Topic,
}

export class PermissionDefinition {
    value: number;
    maxLayer: Layer;
}

export class Permissions {
    public static readonly list = {
        Root: {value: 1 << 0, maxLayer: Layer.Space},
        CreateSpace: {value: 1 << 1, maxLayer: Layer.Global},
        ManageSpace: {value: 1 << 2, maxLayer: Layer.Space},
        ManageRole: {value: 1 << 3, maxLayer: Layer.Space},
        ManageRoom: {value: 1 << 4, maxLayer: Layer.Room},
        ManageTopic: {value: 1 << 5, maxLayer: Layer.Topic},
        ManageSpaceMember: {value: 1 << 6, maxLayer: Layer.Space},
        ManageRoomMember: {value: 1 << 7, maxLayer: Layer.Room},
        CreateMessage: {value: 1 << 8, maxLayer: Layer.Topic},
        ManagePermission: {value: 1 << 9, maxLayer: Layer.Topic},
    };

    public static getNames(): (keyof typeof this.list)[] {
        return Object.keys(this.list) as any;
    }

    public static getByName(name: keyof typeof this.list): PermissionDefinition | undefined {
        return this.list[name];
    }

    public static canBeDefinedOnLayer(permissionName: keyof typeof this.list, layer: Layer): boolean {
        const def = this.getByName(permissionName);

        if (! def) {
            throw new Error(`Invalid permission name: ${permissionName}`);
        }

        return layer <= this.getByName(permissionName).maxLayer && permissionName !== 'Root';
    }
}