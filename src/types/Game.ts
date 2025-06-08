export type GameStatus = 'Backlog' | 'Playing' | 'Completed' | 'Dropped'

export type GameEntry = {
    id: string;
    title: string;
    platform: string;
    coverImageUrl: string;
    status: GameStatus;
    addedAt: string;
}