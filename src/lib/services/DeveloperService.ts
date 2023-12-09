import {Awaitable} from "@auth/core/types";
import Developer from "@/lib/entities/Developer";
import AbstractService from "@/lib/services/AbstractService";

export class DeveloperService extends AbstractService<Developer> {
    protected createObject(fields: any): Awaitable<Developer> {
        return new Developer();
    }
}
