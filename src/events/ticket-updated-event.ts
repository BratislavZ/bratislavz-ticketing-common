import { Topics } from './topics';

export interface TicketUpdatedEvent {
  topic: Topics.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string; // moze da se desi da update-ujemo ticket tako da ga na ne rezervisemo (npr. update-ujemo cenu)
  };
}
