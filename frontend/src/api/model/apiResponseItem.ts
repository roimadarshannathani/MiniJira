/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { Item } from './item';

/**
 * Standard API response wrapper
 */
export interface ApiResponseItem {
  /** HTTP status code */
  statusCode?: number;
  data?: Item;
  /** Response message */
  message?: string;
  /** Success flag */
  success?: boolean;
}
