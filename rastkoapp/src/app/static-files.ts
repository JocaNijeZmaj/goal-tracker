export const castName = (email : string) : string=>{
  const arr1 = email.split('-');
  const arr2 = arr1[0].split('.');

  const fullName = `${arr2[0]}  ${arr2[1]}`;
  return fullName;
}
