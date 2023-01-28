import {Dto, DtoData} from "../Dto";

export class Envelope<T = any> extends Dto {
    public readonly type: string;
    public readonly ref?: string;
    public readonly data: T;

    public constructor(data: DtoData<Envelope>) {
        super();
        this.fill(data);
    }
}