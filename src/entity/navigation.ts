/**
 * Navigation entity
 */
export interface Navigation {
  name: string;
  url: string;
  children?: Navigation[];
}
