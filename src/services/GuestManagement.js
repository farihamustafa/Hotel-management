import { apiService } from "./apiservice";

class GuestManagement {
  async getGuestList() {
    try {
        const data = await apiService.postData("auth/list", { role_name: "Guest" });
        return data;
      } catch (error) {
        console.error("Error fetching guest list:", error);
        return null;
      }
  }
  async changestatus(id,status) {
    try {
        const data = await apiService.postData(`auth/userstatus/${id}`, { status: status });
        return data;
      } catch (error) {
        console.error("Error fetching guest list:", error);
        return null;
      }
  }
}

export const guestManagement = new GuestManagement();