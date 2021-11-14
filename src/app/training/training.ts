export interface Exercise{
    status?: 'cancelled' | 'completed';
    date?: Date;
    name: string;
    duration: number;
    calories: number;
    id?: string
}