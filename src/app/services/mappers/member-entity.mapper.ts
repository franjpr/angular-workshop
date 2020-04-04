import { ApiMemberEntity } from "../api-models/member-entity.model";
import {
  MemberEntity,
  createDefaultMemberEntityVm,
} from "../../models/user.model";

export const mapFromApiToVm = (ghUser: ApiMemberEntity): MemberEntity => {
  if (!ghUser) {
    return createDefaultMemberEntityVm();
  }

  return {
    id: ghUser.id,
    avatar_url: ghUser.avatar_url,
    login: ghUser.login,
  };
};
