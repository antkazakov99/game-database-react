abstract class AbstractClient<Type>
{
    public abstract  getById(id: number): Type | null;
    public abstract getByFilter(filter: AbstractFilter<Type>): Type[];
    public abstract add(game: Type): void;
    public abstract update(game: Type): void;
    public abstract delete(id: number): void;
}