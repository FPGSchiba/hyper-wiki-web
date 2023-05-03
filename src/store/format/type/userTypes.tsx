export interface IPermission {
    name: string
    description: string
    right: string
    level: number
}

export interface IRole {
    name: string
    description: string
    permissions: IPermission[]
}

interface IRelation {
    name: string
    description: string
    user1: IUser
    user2: IUser
    weigth: number
}

interface INames {
    forename: string
    surname: string
    aliases: string[]
    preferred: string
}

export interface IUser {
    id: string
    token: string
    username: string
    password: string
    names: INames
    roles?: string[]
    relations?: IRelation[]
}

export interface IUserRights extends IUser {
    rights: IPermission[]
}
