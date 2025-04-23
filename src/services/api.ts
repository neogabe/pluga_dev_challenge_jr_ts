import { Tool } from "@/types/tools";

const API_URL = "https://pluga.co/ferramentas_search.json";

export const fetchTools = async (): Promise<Tool[]> => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar ferramentas:", error);
    return [];
  }
}
