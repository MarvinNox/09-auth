import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { nextServer } from "./api";

export const getServerMe = async (): Promise<User> => {
  const cookieData = await cookies();
  const { data } = await nextServer.get<User>(`/users/me`, {
    headers: { Cookie: cookieData.toString() },
  });
  return data;
};

export interface FetchNotesProps {
  search?: string;
  page?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search !== "" && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkSession = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.success;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
