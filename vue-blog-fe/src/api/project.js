import { request } from "@/utils";

export async function getProjects() {
    return await request.get("/api/project");
}
