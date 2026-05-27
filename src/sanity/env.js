export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET"
);

export const apiVersion = "2025-01-01";

function assertValue(v, errorMessage) {
  if (!v) throw new Error(errorMessage);
  return v;
}
