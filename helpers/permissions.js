import { Permissions } from 'expo';

export const getCameraRollPermissions = async () => {
  // Get camera roll permissions
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA_ROLL
  );

  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') return;
};

export const getNotificationsPermissions = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  return true;
};
