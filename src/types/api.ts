// Interface pour la réponse
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}