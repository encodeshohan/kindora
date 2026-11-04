import type { EventType } from "@/lib/constants";

export interface IEvent {
    _id: string;
    title: string;
    description: string;
    type: EventType;
    thumbnail: string;
    location: string;
    date: string;
    creatorEmail: string;
    creatorName: string;
    creatorPhoto: string;
    createdAt: string;
    updatedAt?: string;
}

export interface IJoinedEvent {
    _id: string;
    eventId: string;
    title: string;
    type: EventType;
    thumbnail: string;
    location: string;
    date: string;
    userEmail: string;
    userName: string;
    userPhoto: string;
    joinedAt: string;
}


export type EventFormValues = {
    title: string;
    description: string;
    type: EventType | "";
    thumbnail: string;
    location: string;
    date: string;
};