export interface Speaker {
    _id?: string;
    name: string;
    image: string;
    title: string;
    body: string;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    year: number;
    ytLink?:string;
    talk?:string;
}