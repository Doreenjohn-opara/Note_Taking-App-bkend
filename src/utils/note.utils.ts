import {Schema, Types, model} from "mongoose";

export interface INote {
    title: string;
    content:string;
    category: string;
    user: Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}

