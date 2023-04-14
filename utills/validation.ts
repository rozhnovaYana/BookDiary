export const checkIsNotEmpty = (s: string) => s.trim().length > 0;
export const checkIsEmail = (s: string) =>
  !!s.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);
export const checkPassword = (s: string) => s.trim().length > 8;
