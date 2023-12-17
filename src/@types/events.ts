// import { Project } from "./project";

// ----------------------------------------------------------------------

export const EventTypes = ['log', 'action'] as const;
export type EventType = (typeof EventTypes)[number];

export const EventSources = ['test', 'test_run', 'citros_ui', 'citros_agent'] as const;
export type EventSource = (typeof EventSources)[number];

export type CitrosEvent = {
    id: string;

    type: EventType;
    source: EventSource;

    msg: string; // string describing the event

    data: any; // any aditional data

    createdAt: Date | string | number;
};
