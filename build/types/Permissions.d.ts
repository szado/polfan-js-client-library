export declare enum Layer {
    Global = 0,
    Space = 1,
    Room = 2,
    Topic = 3
}
export declare class PermissionDefinition {
    value: number;
    maxLayer: Layer;
}
export declare class Permissions {
    static readonly list: {
        Root: {
            value: number;
            maxLayer: Layer;
        };
        CreateSpace: {
            value: number;
            maxLayer: Layer;
        };
        ManageSpace: {
            value: number;
            maxLayer: Layer;
        };
        ManageRole: {
            value: number;
            maxLayer: Layer;
        };
        ManageRoom: {
            value: number;
            maxLayer: Layer;
        };
        ManageTopic: {
            value: number;
            maxLayer: Layer;
        };
        ManageSpaceMember: {
            value: number;
            maxLayer: Layer;
        };
        ManageRoomMember: {
            value: number;
            maxLayer: Layer;
        };
        CreateMessage: {
            value: number;
            maxLayer: Layer;
        };
        ManagePermission: {
            value: number;
            maxLayer: Layer;
        };
    };
    static getNames(): (keyof typeof this.list)[];
    static getByName(name: keyof typeof this.list): PermissionDefinition | undefined;
    static canBeDefinedOnLayer(permissionName: keyof typeof this.list, layer: Layer): boolean;
}
