export interface IUser {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    foto: string;
    telefono1: string;
    correo: string;
    sexo: number;
    role?: number;
}

export interface IUserAuth {
    token: string;
    user: IUser;
}

