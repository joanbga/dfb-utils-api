import z from "zod";

export const hasFourAdjacentCellsFreeSchema = z.object({
  mapId: z.string().min(1, "L'identifiant de map est requis"),
  cellId: z.number().min(1, "L'identifiant de cellule est requis"),
  occupiedCells: z.array(z.number()).optional()
});

export type HasFourAdjacentCellsFreeRequest = z.infer<typeof hasFourAdjacentCellsFreeSchema>;

export const getLosCellsSchema = z.object({
  mapId: z.string().min(1, "L'identifiant de map est requis"),
  cellId: z.number().min(1, "L'identifiant de cellule est requis"),
  occupiedCells: z.array(z.number()).optional(),
});
export type GetLosCellsRequest = z.infer<typeof getLosCellsSchema>;

export const getMapDataSchema = z.object({
  mapId: z.string().min(1, "L'identifiant de map est requis"),
});

export type GetMapDataRequest = z.infer<typeof getMapDataSchema>;