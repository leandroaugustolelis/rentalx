import { IUserCreateDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
    create(data: IUserCreateDTO): Promise<void>;
}

export { IUsersRepository };
