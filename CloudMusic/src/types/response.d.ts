
declare interface SearchResponse {
    code: number,
    result: {
        songCount: number,
        songs: Music[]
    }
}

declare interface Music {
    name: string,
    id: number
}

declare interface ResponseBase {
    code: number
    data?: boolean
    message?: string
}

declare interface VerifyCodeResponse extends ResponseBase{}

declare interface LoginAccountResponse {
    anonimousUser: boolean
    ban: number
    baoyueVersion: number
    createTime: number
    donateVersion: number
    id: number
    salt: string
    status: number
    tokenVersion: number
    type: number
    userName: string
    vipType: number
    viptypeVersion: number
    whitelistAuthority: number
}

declare interface LoginBindingsResponse {
    bindingTime: number
    expired: boolean
    expiresIn: number
    id: number
    refreshTime: number
    tokenJsonStr: JSON
    type: number
    url: string
    userId: number
}

declare interface LoginProfileResponse {
    accountStatus: number
    authStatus: number
    authority: number
    avatarDetail: unknown
    avatarImgId: number
    avatarImgIdStr: string
    avatarImgId_str: string
    avatarUrl: string
    backgroundImgId: number
    backgroundImgIdStr: string
    backgroundUrl: string
    birthday: number
    city: number
    defaultAvatar: boolean
    description: string
    detailDescription: string
    djStatus: number
    eventCount: number
    expertTags: unknown
    experts: object
    followed: boolean
    followeds: number
    follows: number
    gender: number
    mutual: boolean
    nickname: string
    playlistBeSubscribedCount: number
    playlistCount: number
    province: number
    remarkName: unknown
    signature: string
    userId: number
    userType: number
    vipType: number
}

declare interface LoginResponse extends ResponseBase {
    account: LoginAccountResponse
    bindings: LoginBindingsResponse[]
    cookie: string
    loginType: number
    token: string
    profile: LoginProfileResponse
}

