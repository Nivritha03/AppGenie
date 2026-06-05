export type FieldType = "text" | "email" | "number" | "date" | "textarea" | "select" | "boolean";

export interface AppField {
  name: string;
  label?: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // For select types
  placeholder?: string;
}

export interface AppEntity {
  name: string;
  label?: string;
  fields: AppField[];
}

export interface AppWidget {
  type: "stats" | "chart";
  title: string;
  entity?: string; // Which entity to calculate stats from
  color?: string;
}

export interface AppConfig {
  name: string;
  entities: AppEntity[];
  widgets?: AppWidget[];
}

export interface UserSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
