import {cast, Dto, DtoData} from "../Dto";
import {EnvelopeMeta} from "./EnvelopeMeta";

export class Envelope<T = any> extends Dto {
    public readonly meta: EnvelopeMeta;
    public readonly data: T;

    public constructor(data: DtoData<Envelope>) {
        super();
        this.fill(data, {
            meta: cast(data.meta, EnvelopeMeta),
        });
    }
}