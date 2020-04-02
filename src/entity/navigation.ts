/**
 * Navigation entity
 */
export interface Navigation {
  name: string;
  url?: string;
  icon?: string;
  children?: Navigation[];
}
