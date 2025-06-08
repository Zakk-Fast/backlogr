export type GameStatus = 'Backlog' | 'Playing' | 'Completed' | 'Dropped'

export type GameEntry = {
    id: string;
    title: string;
    platform: string[];
    coverImageId: string;
    status: GameStatus;
    addedAt: number;
}