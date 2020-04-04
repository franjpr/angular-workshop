export interface MemberEntity {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  company: string;
}

export const createDefaultMemberEntityVm = (): MemberEntity => ({
  id: -1,
  login: "",
  avatar_url: "",
  name: "",
  company: "",
});
