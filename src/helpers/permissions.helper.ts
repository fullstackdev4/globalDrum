export const hasPermissions = (
  permissions: string[] = [],
  givenPermissions: string = ""
) => {
  return permissions.some((permission) =>
    givenPermissions.includes(permission)
  );
};
