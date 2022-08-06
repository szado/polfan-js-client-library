import {cast, Dto, DtoData} from "../../Dto";
import {Space} from "../../Space";

export class SpaceJoined extends Dto {
    public readonly space: Space;

    public constructor(data: DtoData<SpaceJoined>) {
        super();
        this.fill(data, {
            space: cast(data.space, Space),
        });
    }
}
