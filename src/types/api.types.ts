export interface ApiError {
  error: string;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status?: number };

export async function parseJsonResponse<T>(
  response: Response,
): Promise<ApiResult<T>> {
  if (!response.ok) {
    return {
      ok: false,
      error: `Request failed with status ${response.status}`,
      status: response.status,
    };
  }

  try {
    const data = (await response.json()) as T;
    return { ok: true, data };
  } catch {
    return { ok: false, error: 'Invalid JSON response' };
  }
}
