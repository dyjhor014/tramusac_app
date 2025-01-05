import axios from "axios";

export interface Tercero {
    _id: string;
    razonSocial: string;
    nombreCorto: string | null;
}

export const getTercero = async (terceroId: string): Promise<Tercero[]> => {
    const response = await axios.get(`/api/tercero-sedes`, {
        params: { terceroId },
    });
    return response.data;
};