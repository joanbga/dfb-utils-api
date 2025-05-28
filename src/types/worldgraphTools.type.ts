import z from "zod";

export const getNeighborsDetailedSchema = z.object({
    mapId: z.string().min(1, "L'identifiant de map est requis"),
    direction: z.number().min(0, "La direction est requise").max(6, "La direction doit être entre 0 et 6").optional(),
});

export type GetNeighborsDetailedRequest = z.infer<typeof getNeighborsDetailedSchema>;

export const pathfindingSchema = z.object({
    startMapId: z.string().min(0, "L'identifiant de map start est requis"),
    endMapId: z.string().min(0, "L'identifiant de map end est requis"),
    knownZaaps: z.array(z.string()).optional(),
});

export type PathfindingRequest = z.infer<typeof pathfindingSchema>;

export const getMapsToDirectionSchema = z.object({
    mapId: z.string().min(1, "L'identifiant de map est requis"),
    direction: z.number().min(0, "La direction est requise").max(6, "La direction doit être entre 0 et 6"),
    length: z.number().min(1, "La longueur est requise").max(100, "La longueur doit être entre 1 et 100").optional(),
});

export type GetMapsToDirectionRequest = z.infer<typeof getMapsToDirectionSchema>;