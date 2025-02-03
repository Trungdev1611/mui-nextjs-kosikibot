import { UserRole } from '@/constants/roles'

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;

interface UserRoleData {
  r_id: string;
  role_name: string;
  role_id: string;
  p_id: string;
  application_id: string;
  application_name: string;
  application_display_order: number;
}

interface UserData {
  u_id: string;
  username: string;
  email: string;
  profile_pic: string;
  current_workspace_id: string;
  is_ws_admin: boolean;
  user_roles: UserRoleData[];
  user_groups: any[];
  last_login_datetime: string;
  user_code: string;
}

export const isAuthorizedAdmin = (user: UserData): boolean => {
  const hasValidRole = user.user_roles.some(
    (role) =>
      role.role_id == UserRole.SuperAdmin &&
      role.application_id === PROJECT_ID,
  );

  return hasValidRole;
};

export const isAuthorizedVender = (user: UserData): boolean => {
  const hasValidRole = user.user_roles.some(
    (role) =>
      role.role_id == UserRole.Vendor &&
      role.application_id === PROJECT_ID,
  );

  return hasValidRole;
};

export const getRole = (user: UserData) => {
  if (isAuthorizedAdmin(user)) {
    return UserRole.SuperAdmin
  }

  if (isAuthorizedVender(user)) {
    return UserRole.Vendor 
  }

  return UserRole.User
}

export const typeRoute = () => {
  return 'fbss'
}
