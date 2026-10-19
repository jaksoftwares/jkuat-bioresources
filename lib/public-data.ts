export type PublicDataResult<T> =
  | { data: T; failed: false }
  | { data: null; failed: true; error: unknown }

export async function loadPublicData<T>(
  label: string,
  load: () => Promise<T>,
): Promise<PublicDataResult<T>> {
  try {
    return { data: await load(), failed: false }
  } catch (error) {
    if (!isMissingPublicRecord(error)) {
      console.error(`Unable to load public ${label}; showing an unavailable state.`, error)
    }
    return { data: null, failed: true, error }
  }
}

export function isMissingPublicRecord(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'PGRST116'
  )
}
