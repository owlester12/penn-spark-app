
export interface Course {
    dept: string;
    number: number;
    title: string;
    description: string;
    prereqs?: string[];
    "cross-listed"?: string[];
  }
