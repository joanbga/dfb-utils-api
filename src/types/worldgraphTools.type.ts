import z from "zod";

export const getNeighborsDetailedSchema = z.object({
    mapId: z.string().min(1, "L'identifiant de map est requis"),
    direction: z.number().min(0, "La direction est requise").max(6, "La direction doit être entre 0 et 6").optional(),
});

export type GetNeighborsDetailedRequest = z.infer<typeof getNeighborsDetailedSchema>;