import {Dto, DtoData} from "../Dto";

export class EnvelopeMeta extends Dto {
    public readonly type: string;
    public readonly ref?: string;

    public constructor(data: DtoData<EnvelopeMeta>) {
        super();
        this.fill(data);
    }
}