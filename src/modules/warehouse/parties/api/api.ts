import { queryOptions } from "@tanstack/react-query";
import { instance } from "../../../../shared/API/base";

async function getParties() {
  return instance.get(`/api/parties/`);
}

async function getPartyById(id: string) {
  return instance.get(`/api/parties/${id}/`);
}

async function deleteParties(idsArr: number[]) {
  return instance.delete("/api/parties/multiple/", { data: idsArr });
}

async function patchParty(partyId: number, key: string, newValue: any) {
  return instance.patch(`/api/parties/?party_id=${partyId}`, {
    [key]: newValue,
  });
}

async function uploadPartyFile(partyId: number, formData: FormData) {
  return instance.post(`/api/parties/${partyId}/upload-file/`, formData);
}

export const partiesApi = {
  basekey: "parties",
  getPartiesQueryOptions: () => {
    return queryOptions({
      queryKey: [partiesApi.basekey, "getParties"],
      queryFn: async () => {
        const resp = await getParties();
        return resp.data;
      },
    });
  },
  getPartyQueryOptions: (id: string) => {
      return queryOptions({
        queryKey: [partiesApi.basekey, "getOrder", id],
        queryFn: async () => {
          const resp = await getPartyById(id);
          return resp.data;
        },
      });
    },

  deleteParties: (idsArr: number[]) => {
    return deleteParties(idsArr);
  },
  updatePartyStatus: (partyId: number, newValue: any) => {
    return patchParty(partyId, "status", newValue);
  },
  updatePartyTag: (partyId: number, newValue: any) => {
    return patchParty(partyId, "tag", newValue);
  },
  uploadPartyFile: (partyId: number, formData: FormData) => {
    return uploadPartyFile(partyId, formData)
  }
}