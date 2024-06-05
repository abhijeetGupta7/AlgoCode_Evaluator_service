import z from "zod";

// export interface CreateSubmissionDTO {
//     userID: string,
//     problemID: string,
//     code: string,
//     language: string
// }

export const CreateSubmissionZodSchema = z.object({
  userID:z.string(),
  problemID:z.string(),
  code:z.string(),
  language:z.string()
}).strict();
  
export type CreateSubmissionDTO=z.infer<typeof CreateSubmissionZodSchema>; // alag se upar interface banaya tha phle, phir dekha zodSchema  bhi same hi h to us schema se hi extract kr liya, tumari marzi


