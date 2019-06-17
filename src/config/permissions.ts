import { UserRole } from "../app/features/auth/models";

export enum UserAction {
  observe = "observe",
  add = "add",
  remove = "remove",
  edit = "edit",
  moderate = "moderate",
  import = "import",
  export = "export"
}

const BASIC_ACTIONS = [UserAction.observe, UserAction.add];
const MANAGE_ACTIONS = [UserAction.remove, UserAction.edit];
const MODERATE_ACTIONS = [UserAction.moderate];
const IMPORT_EXPORT_ACTIONS = [UserAction.import, UserAction.export];
const ALL_ACTIONS = [
  ...BASIC_ACTIONS,
  ...MANAGE_ACTIONS,
  ...IMPORT_EXPORT_ACTIONS,
  ...MODERATE_ACTIONS
];

export enum Scope {
  observations = "observations",
  birds = "birds",
  auth = "auth",
  users = "users"
}

export interface UserPermissions {
  [Scope.observations]?: UserAction[];
  [Scope.birds]?: UserAction[];
  [Scope.auth]?: UserAction[];
  [Scope.users]?: UserAction[];
}

export interface UserRoleDescriptor {
  value: string;
  permissions: UserPermissions;
}

export const USER_ROLES: { [key in UserRole]: UserRoleDescriptor } = {
  unauthorized: {
    value: "unauthorized",
    permissions: {
      [Scope.auth]: [UserAction.observe]
    }
  },
  observer: {
    value: "observer",
    permissions: {
      [Scope.observations]: [...BASIC_ACTIONS, ...MANAGE_ACTIONS],
      [Scope.birds]: [UserAction.observe]
    }
  },
  ringer: {
    value: "ringer",
    permissions: {
      [Scope.observations]: [
        ...BASIC_ACTIONS,
        ...MANAGE_ACTIONS,
        ...IMPORT_EXPORT_ACTIONS
      ],
      [Scope.birds]: [
        ...BASIC_ACTIONS,
        ...MANAGE_ACTIONS,
        ...IMPORT_EXPORT_ACTIONS
      ]
    }
  },
  scientist: {
    value: "scientist",
    permissions: {
      [Scope.observations]: [UserAction.observe, UserAction.export],
      [Scope.birds]: [UserAction.observe, UserAction.export]
    }
  },
  moderator: {
    value: "moderator",
    permissions: {
      [Scope.observations]: ALL_ACTIONS,
      [Scope.birds]: ALL_ACTIONS
    }
  },
  admin: {
    value: "admin",
    permissions: {
      [Scope.observations]: ALL_ACTIONS,
      [Scope.birds]: ALL_ACTIONS,
      [Scope.users]: ALL_ACTIONS
    }
  }
};
