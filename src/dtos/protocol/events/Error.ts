import {Dto, DtoData} from "../../Dto";

export class Error extends Dto {
    public readonly code: string;
    public readonly message: string;

    public constructor(data: DtoData<Error>) {
        super();
        this.fill(data);
    }
}
